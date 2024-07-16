import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Graph/GraphArea.css';

const GraphArea = ({ plotFilename, key }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/get_plot?filename=${plotFilename}`, {
                    responseType: 'arraybuffer',  // Ensure response is treated as binary data
                });
                const blob = new Blob([response.data], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(blob);
                setImageUrl(imageUrl);
            } catch (error) {
                console.error('Error fetching graph:', error);
            }
        };

        fetchImage();

        return () => {
            // Cleanup function to revoke the URL when component unmounts
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [plotFilename, key]); // Include key as a dependency to force refresh

    const handleDownloadImage = () => {
        // Create a link element
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'generated_plot.png'; // Specify the filename for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div key={key} className="graph-area">
            {imageUrl ? (
                <>
                    <img src={imageUrl} alt="Generated Graph" />
                    <button onClick={handleDownloadImage}>Download Image</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default GraphArea;
