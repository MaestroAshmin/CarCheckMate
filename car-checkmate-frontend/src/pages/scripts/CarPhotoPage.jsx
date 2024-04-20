import React, {useState, useRef} from 'react';
import '../styles/CarPhotoPage.css'

export default function CarPhotoPage({ formData, setFormData }) {

    const [images, setImages]=useState([]);
    const [isDragging, setIsDraging] = useState(false)
    const fileInputRef = useRef(null);
    
    function selectFiles(){
        fileInputRef.current.click();
    }

    function onFileSelect(event){
        const files = event.target.files;
        if(files.length == 0) return;
        for(let i=0; i< files.length; i++){
            if(files[i].type.split('/')[0] != 'image') continue;
            if(!images.some((e)=>e.name === files[i].name)){
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url:URL.createObjectURL(files[i]),
                    
                    },
                ]);
            }
        }
    }

    function deleteImage(index){
        setImages((prevImages) => 
            prevImages.filter((_,i) => i!=index)
        );
    }

    function onDragOver(event){
        event.preventDefault();
        setIsDraging(true);
        event.dataTransfer.dropEffect = "copy";
    }
    
    function onDragLeave(event){
        event.preventDefault();
        setIsDraging(false);
    }
    
    function onDrop(event){
        event.preventDefault();
        setIsDraging(false);
        const files = event.dataTransfer.files;
    }

    function uploadImages(){
        console.log('Images: ', images)
        
            setFormData({ ...formData, images: images });
        

    }
    return(
        <div className='card'>
            <div className='top'>
                <p>Drag & Drop image uploading</p>
            </div>
            <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                {isDragging ? (
                    <span className='select'>Drop images here</span>
                ):(
                    <>
                        Drag & Drop image here or (" ")
                        <span className='select' role="button" onClick={selectFiles}>
                            Browse
                        </span> */
                    </>
                )

                }

                <input name='file' type='file' className='file' multiple ref={fileInputRef} onChange={onFileSelect}></input>
            </div>
            <div className='upload-container'>

                {images.map((images, index) =>(
                    <div className='image'>
                    <span className='delete' onClick={() => deleteImage(index)}>&times;</span>               
                    <img src={images.url} alt={images.name}/>
                </div>
                ))

                }

            </div>
            <button type='button' onClick={uploadImages}>
                upload
            </button>
        </div>
    )

}
