function handleFileUpload(req, res) {
    try {
        // You can perform additional actions here if needed
        res.status(200).json({ success: true, message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = { handleFileUpload };