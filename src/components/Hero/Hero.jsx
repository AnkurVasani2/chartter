import React, { useRef, useState } from 'react';
import './Hero.css';  // Ensure the correct path to your CSS file
import axios from 'axios';
import GraphArea from '../Graph/GraphArea';

const Hero = () => {
    const [columns, setColumns] = useState([]);
    const [message, setMessage] = useState('');
    const [graphType, setGraphType] = useState('line'); // Default graph type
    const [selectedXColumn, setSelectedXColumn] = useState('');
    const [selectedYColumn, setSelectedYColumn] = useState('');
    const [plotFilename, setPlotFilename] = useState('');
    const [key, setKey] = useState(0); // State to force remount of GraphArea
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadFile(file);
        }
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setColumns(response.data.column_names);
            setMessage('File uploaded successfully');
        } catch (error) {
            setMessage('File upload failed');
        }
    };

    const handleGenerateGraph = async () => {
        const data = {
            graph_type: graphType,
            x_column: selectedXColumn,
            y_column: selectedYColumn
        };

        try {
            const response = await axios.post('http://localhost:5000/generate_graph', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setPlotFilename(response.data.plot_filename);
            setMessage('Graph generated successfully');
            setKey((prevKey) => prevKey + 1); // Increment key to force remount of GraphArea
        } catch (error) {
            setMessage('Graph generation failed');
        }
    };

    return (
        <div className="Hero">
            <div className="hero-para">
                <h1>Upload any <strong>.csv or .xls</strong> file to Generate Dynamic and Interesting Graphs on the go.</h1>
                <button className="upload" onClick={handleButtonClick}>
                    <h4>Upload File</h4>
                </button>
            </div>
            <div className="upload-file">
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                {message && <p>{message}</p>}
                {columns.length > 0 && (
                    <div className="column">
                        <h2 id="heading">Select Column Names:</h2>
                        <div className="axis-selection">
                            <div>
                                <h3>X Axis:</h3>
                                {columns.map((column, index) => (
                                    <div key={index} className="column-item">
                                        <input
                                            type="radio"
                                            name="x-column"
                                            value={column}
                                            id={`x-column-${index}`}
                                            onChange={(e) => setSelectedXColumn(e.target.value)}
                                        />
                                        <label htmlFor={`x-column-${index}`}>{column}</label>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h3>Y Axis:</h3>
                                {columns.map((column, index) => (
                                    <div key={index} className="column-item">
                                        <input
                                            type="radio"
                                            name="y-column"
                                            value={column}
                                            id={`y-column-${index}`}
                                            onChange={(e) => setSelectedYColumn(e.target.value)}
                                        />
                                        <label htmlFor={`y-column-${index}`}>{column}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="graph-type-selection">
                            <label htmlFor="graph-type">Select Graph Type:</label>
                            <select
                                id="graph-type"
                                value={graphType}
                                onChange={(e) => setGraphType(e.target.value)}
                            >
                                <option value="line">Line Graph</option>
                                <option value="scatter">Scatter Plot</option>
                                <option value="bar">Bar Chart</option>
                            </select>
                        </div>
                        <button className="generate" onClick={handleGenerateGraph}>Generate Graph</button>
                    </div>
                )}
            </div>
            {plotFilename && <GraphArea plotFilename={plotFilename} key={key} />}
        </div>
    );
};

export default Hero;
