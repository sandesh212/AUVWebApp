import React, { useState, useEffect } from 'react';
import './css/Images.css'; // Ensure to import the CSS for styling

function Images() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/images');
            if (response.ok) {
                const data = await response.json();
                setImages(data);
                if (data.length > 0) {
                    data[0] = data[0].replaceAll('.\\images', '');
                    data[0] = data[0].replaceAll('\\','/');
                    data[0] = data[0].replaceAll('.tif','.png');
                    handleImageClick(data[0]);
                }
            } else {
                console.error('Failed to fetch images');
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleImageClick = (image) => {
        image = image.replaceAll('.\\images', '');
        image = image.replaceAll('\\','/');
        image = image.replaceAll('.tif','.png');
        setSelectedImage(image);
        
        console.log(selectedImage);
        console.log("Selected Image:", image);
    };

    const openInNewTab = () => {
        const image = document.getElementById("selectedImage");
        const imageUrl = image.getAttribute("src");
        window.open("http://localhost:3000" + imageUrl, "_blank");
    };

    const downloadImage = (image) => {
        // Create a temporary anchor element
        const anchor = document.createElement('a');
        anchor.href = `./images/${image}`;
        anchor.download = image; // Specify the filename
        anchor.click();
    };

    return (
        <div className="images-container">
            <div className="images-list">
                    {images.map((image, index) => (
                        <div key={index} onClick={() => handleImageClick(image)}>
                            <img alt={`Image ${index}: ${image}`} />
                        </div>
                    ))}
                </div>
            <div className="image-preview">
                {selectedImage ? (
                    <>
                        <img id="selectedImage" src={require(`./images/${selectedImage}`)} alt={selectedImage} />
                    </>
                ) : (
                    <p>No image selected</p>
                )}
                <div className="buttons">
                    <button onClick={openInNewTab}>Pop Out</button>
                    <button onClick={() => downloadImage(selectedImage)}>Download Image</button>
                    <button onClick={() => alert('Decompress')}>Decompress</button>
                </div>
            </div>
        </div>
    );
}

export default Images;