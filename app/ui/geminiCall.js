"use client";
import React, { useEffect, useState } from "react";

const GeminiCall = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/ai");
        if (!response.ok) {
          throw new Error("Network response was not ok");
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
    <div className="overflow-hidden mt-5 md:w-4/6 m-auto rounded-lg text-gray-300 pr-4 pl-4 relative">
      <h1 className="text-2xl m-auto w-screen font-semibold text-white">
        AI Summary
      </h1>
      <p>{data}</p>
    </div>
  );
};

export default GeminiCall;
