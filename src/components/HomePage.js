import React, { useState, useEffect } from 'react';
import './css/Home.css'; // Import the CSS for styling

function Home() {
    const [logData, setLogData] = useState([]);
    const [recentImage, setRecentImage] = useState(null);
    const [recentImageName, setRecentImageName] = useState('');
    const [headers, setHeaders] = useState([]);

    useEffect(() => {
        fetchRecentLog();
        fetchRecentImage();
    }, []);

    const fetchRecentLog = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/csvs');
            if (response.ok) {
                const csvFiles = await response.json();
                if (csvFiles.length > 0) {
                    const recentCSV = csvFiles[0];
                    const csvRowsResponse = await fetch('http://localhost:5000/api/csvRows');
                    if (csvRowsResponse.ok) {
                        const csvData = await csvRowsResponse.json();
                        const startIndex = csvData.indexOf(recentCSV) + 1;
                        const endIndex = csvData.indexOf(recentCSV + "||END||");
                        const fileData = csvData.slice(startIndex, endIndex);
                        setHeaders(fileData[0].slice(0, 4)); // Get only the first 4 columns
                        setLogData(fileData.slice(1, 11).map(row => row.slice(0, 4))); // Show max 10 rows, first 4 columns
                    }
                }
            } else {
                console.error('Failed to fetch recent log');
            }
        } catch (error) {
            console.error('Error fetching recent log:', error);
        }
    };

    const fetchRecentImage = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/images');
            if (response.ok) {
                const images = await response.json();
                if (images.length > 0) {
                    images[images.length-1] = images[images.length-1].replaceAll('.\\images', '')
                    images[images.length-1] = images[images.length-1].replaceAll('\\','/')
                    images[images.length-1] = images[images.length-1].replaceAll('.tif','.png')
                    setRecentImage(images[images.length-1]);
                    setRecentImageName(images[images.length-1].split('/').pop());
                }
            } else {
                console.error('Failed to fetch recent image');
            }
        } catch (error) {
            console.error('Error fetching recent image:', error);
        }
    };

    return (
        <div className="home-container">
            <div className="left-section">
                <h2>Recent Picture</h2>
                <div className="image-placeholder">
                    {recentImage ? (
                        <>
                            <img className="recent-image" src={require(`./images/${recentImageName}`)} alt={recentImage} />
                            <p className="image-title">{recentImageName}</p>
                        </>
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
            </div>
            <div className="right-section">
                <h2>Recent Logs</h2>
                <table>
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {logData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;