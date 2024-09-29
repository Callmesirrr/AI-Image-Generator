import React, { useRef, useState } from 'react';
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg'

const ImageGenerator = () => {
    
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);
    
    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return;
        }
        const response = await fetch(
            `https://lexica.art/api/v1/search?q=${inputRef.current.value}`
        );
        let data = await response.json();
        if (data.images.length > 0) {
            setImage_url(data.images[0].src); // URL for the image
        } else {
            setImage_url(default_image); // Fallback if no images are found
        }
    };

    return (
        <div className='ai-image-generator'>
            <div className="header">AI Image <span>Generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img src={image_url === "/" ? default_image : image_url} alt="" />
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want To See'/>
                <div className="generate-btn" onClick={imageGenerator}>Generate</div>
            </div>
        </div>
    );
}

export default ImageGenerator;