// src/components/Dashboard.js
import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [video1, setVideo1] = useState(null);
    const [video2, setVideo2] = useState(null);
    const [result, setResult] = useState(null);

    const handleVideo1Change = (e) => setVideo1(e.target.files[0]);
    const handleVideo2Change = (e) => setVideo2(e.target.files[0]);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('video1', video1);
        formData.append('video2', video2);

        try {
            const response = await axios.post('http://127.0.0.1:5000/compare', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error uploading videos', error);
        }
    };

    return (
        <div className="dashboard">
            <h1>Real-Time Traffic Light Optimization</h1>
            
            <div className="upload-section">
                <input type="file" onChange={handleVideo1Change} />
                <input type="file" onChange={handleVideo2Change} />
                <button onClick={handleUpload}>Upload & Process</button>
            </div>
            
            {result && (
                <div className="results">
                    <h2>Results</h2>
                    <p>Vehicle Count in Video 1: {result.vehicle_count_video1}</p>
                    <p>Vehicle Count in Video 2: {result.vehicle_count_video2}</p>
                    <p>Optimized Green Light Time for Video 1: {result.optimized_time_video1} seconds</p>
                    <p>Optimized Green Light Time for Video 2: {result.optimized_time_video2} seconds</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
