import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:5001/detect', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob', // Handle the binary response
            });
            const imageUrl = URL.createObjectURL(response.data);
            setImageUrl(imageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setIsLoading(false); // Завершение загрузки
        }
    };


    return (
        <div className="App">
            <h1>Upload Image</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileSelect}/>
                <button type="submit">Upload</button>
            </form>
            <div className="image-container">
                {isLoading && <div className="loader"></div>}
                {imageUrl && <img src={imageUrl} alt="Processed" style={{maxWidth: '100%', maxHeight: '400px'}}/>}
            </div>
        </div>
    );
}

export default App;
