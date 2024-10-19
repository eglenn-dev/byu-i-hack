"use client";
import React, { useEffect, useState } from 'react';

const GeminiCall = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/ai');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
                setData(responseData.response.candidates[0].content.parts[0].text);
                console.log(responseData.response.candidates[0].content.parts[0].text);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h3>AI Summary</h3>
            <p>{data}</p>
        </div>
    );
};

export default GeminiCall;