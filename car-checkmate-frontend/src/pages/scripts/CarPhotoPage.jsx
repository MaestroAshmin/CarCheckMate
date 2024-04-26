import React, { useState, useRef } from 'react';
import '../styles/CarPhotoPage.css';

export default function CarPhotoPage({ formData, setFormData }) {
    const [carPhotos, setCarPhotos] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    function selectFiles() {
        fileInputRef.current.click();
    }

    function onFileSelect(event) {
        const files = event.target.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!carPhotos.some((e) => e.name === files[i].name)) {
                setCarPhotos((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ]);
            }
        }
        // const files = event.target.files;
        // if (files.length === 0) return;
        // const newFiles = Array.from(files).filter(file => file.type.split('/')[0] === 'image');
        // setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    }

    function deleteImage(index) {
        setCarPhotos((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
    }

    function onDragOver(event) {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    }

    function onDragLeave(event) {
        event.preventDefault();
        setIsDragging(false);
    }

    function onDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        onFileSelect({ target: { files } });
    }

    function uploadImages() {
        console.log('Images: ', carPhotos);
        setFormData({ ...formData, carPhotos: carPhotos });

        // // Convert Blobs to array of Blobs
        // const blobArray = selectedFiles.map(file => new Blob([file], { type: file.type }));

        // // Optionally, you can update the formData state with the blobArray
        // setFormData(prevFormData => ({
        //     ...prevFormData,
        //     carPhotos: blobArray,
        // }));

        // Optionally, you can reset the selected files array
        setSelectedFiles([]);
    }

    return (
        <div className='card'>
            <div className='top'>
                <p>Drag & Drop image uploading</p>
            </div>
            <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                {isDragging ? (
                    <span className='select'>Drop images here</span>
                ) : (
                    <>
                        Drag & Drop image here or
                        <span className='select' role="button" onClick={selectFiles}>
                            Browse
                        </span>
                    </>
                )}
                <input name='carPhotos' type='file' className='file' multiple ref={fileInputRef} onChange={onFileSelect} style={{ display: 'none' }}></input>
            </div>
            <div className='upload-container'>
                {carPhotos.map((image, index) => (
                    <div className='image' key={index}>
                        <span className='delete' onClick={() => deleteImage(index)}>&times;</span>
                        <img src={image.url} alt={image.name} />
                    </div>
                ))}
            </div>
            <button type='button' onClick={uploadImages}>
                Upload
            </button>
        </div>
    );
}
