const { GridFSBucket } = require('mongodb');
const fs = require('fs');
const path = require('path');

let gfs;

function initializeGridFSBucket(db) {
    gfs = new GridFSBucket(db, { bucketName: 'files' });
}

function uploadFiles(req, res, next) {
    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const uploadedFiles = Object.values(files);

    const uploadPromises = uploadedFiles.map(file => {
        const { name } = file;
        const filePath = path.join(__dirname, 'uploads', name);
        return new Promise((resolve, reject) => {
            file.mv(filePath, err => {
                if (err) {
                    console.error(`Error uploading ${name}:`, err);
                    reject(`Error uploading ${name}`);
                } else {
                    const readStream = fs.createReadStream(filePath);
                    const uploadStream = gfs.openUploadStream(name);

                    readStream.pipe(uploadStream);

                    uploadStream.on('error', err => {
                        console.error(`Error uploading ${name} to GridFS:`, err);
                        reject(`Error uploading ${name} to GridFS`);
                    });

                    uploadStream.on('finish', () => {
                        fs.unlinkSync(filePath);
                        resolve(uploadStream.id);
                    });
                }
            });
        });
    });

    Promise.all(uploadPromises)
        .then(ids => {
            req.uploadedFileIds = ids;
            next();
        })
        .catch(error => {
            res.status(500).json({ error });
        });
}

module.exports = { initializeGridFSBucket, uploadFiles };