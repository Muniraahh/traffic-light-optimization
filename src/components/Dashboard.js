import React, { useState } from 'react';
import axios from 'axios';
import { FileUpload } from "../components/ui/file-upload";
import bg1 from "../../src/assets/background1.jpg";
import bg2 from "../../src/assets/bg2.webp"
import { Progress } from './ui/progress';

const Dashboard = () => {
    const [video1, setVideo1] = useState(null);
    const [video2, setVideo2] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleVideo1Change = (file) => setVideo1(file);
    const handleVideo2Change = (file) => setVideo2(file);

    const handleUpload = async () => {
        if (!video1 || !video2) {
            alert("Please upload both videos before proceeding.");
            return;
        }

        const formData = new FormData();
        formData.append('video1', video1);
        formData.append('video2', video2);

        setLoading(true);
        setProgress(10); // Initial progress when upload starts
        
        try {
            const progressInterval = setInterval(() => {
                setProgress((prevProgress) => (prevProgress < 90 ? prevProgress + 10 : prevProgress));
            }, 1000); // Increment progress every second
            
            const response = await axios.post('http://127.0.0.1:5000/compare', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            clearInterval(progressInterval); // Stop incrementing progress
            setResult(response.data); // Set the response result
            setProgress(100); // Set progress to 100% when the API call finishes
        } catch (error) {
            console.error('Error uploading videos', error);
        } finally {
            setLoading(false);
            setTimeout(() => setProgress(0), 500); // Reset progress after a short delay
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${result ? bg2 : bg1})` }}></div>
            
            {/* Content */}
            <div className="relative z-10">
                <h1 className="text-5xl md:text-6xl font-extrabold text-black drop-shadow-md shadow-white text-center bg-white/50 p-4 rounded-md mb-5">
                    Real-Time Traffic Light Optimization
                </h1>

                <div className="container mx-auto flex flex-col items-center space-y-6">
                    {/* File Upload */}
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-center space-x-6 space-y-6 md:space-y-0">
                        <div className="w-full max-w-lg min-h-96 border border-dashed bg-white/50 dark:bg-black/50 border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                            <FileUpload name="video1" onChange={handleVideo1Change} />
                        </div>

                        <div className="w-full max-w-lg min-h-96 border border-dashed bg-white/50 dark:bg-black/50 border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                            <FileUpload name="video2" onChange={handleVideo2Change} />
                        </div>
                    </div>

                    {/* Upload Button */}
                    <button
                        className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-7"
                        onClick={handleUpload}
                        disabled={loading} // Disable button when uploading
                    >
                        {loading ? "Processing..." : "Upload & Process"}
                    </button>

                    {/* Progress Bar */}
                    {loading && (
                        <div className="w-full max-w-2xl mt-4">
                            <Progress value={progress} className="w-full" />
                        </div>
                    )}

                    {/* Display Results */}
                    {result && (
                        <div className="mt-8 text-white text-center">
                            <h2 className="text-2xl">Results</h2>
                            <p>Vehicle Count in Video 1: {result.total_vehicles_video_1}</p>
                            <p>Vehicle Count in Video 2: {result.total_vehicles_video_2}</p>
                            <p>Optimized Green Light Time for Video 1: {result.green_light_duration_video_1} seconds</p>
                            <p>Optimized Green Light Time for Video 2: {result.green_light_duration_video_2} seconds</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
