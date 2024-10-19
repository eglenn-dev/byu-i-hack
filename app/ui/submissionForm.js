"use client";
import React, { useState } from "react";
import { createPost } from "./actions";

export default function SubmissionForm() {
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    return (
        <form className="flex flex-col gap-4 w-72" onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            createPost(new FormData(e.target));
        }}>
            <label className="flex flex-col">
                <span>Location</span>
                <input className="h-11 p-2 rounded-full text-black" required type="text" id="location" name="location" placeholder="123 Street, ST 12345" />
            </label>
            <div className="flex flex-col gap-4">
                <label className="mr-auto ml-auto">
                    <input
                        required
                        className="text-black"
                        type="radio"
                        id="vehicle"
                        name="type"
                        value="vehicle"
                        checked={type === "vehicle"}
                        onChange={handleTypeChange}
                    />
                    Vehicle
                </label>
                <label className="mr-auto ml-auto">
                    <input
                        type="radio"
                        id="neighborhood"
                        name="type"
                        value="neighborhood"
                        checked={type === "neighborhood"}
                        onChange={handleTypeChange}
                    />
                    Neighborhood
                </label>
                <label className="flex flex-col text-black">
                    Description
                    <textarea className="h-48 p-3 w-82 rounded-3xl" required style={{ resize: "none" }} id="description" name="description" placeholder="Tell us about what happened..." />
                </label>
                <label className="flex flex-col">
                    Date of Incident
                    <input required className="text-black" type="date" id="date" name="date" />
                </label>
            </div>
            {type === "vehicle" ? (
                <div>
                    <label className="flex flex-col">
                        License Plate
                        <input className="text-black" required={type === "vehicle"} type="text" id="license" name="license" />
                    </label>
                </div>
            ) : (type === "neighborhood" ? (
                <div>
                    <label className="flex flex-col">
                        Category
                        <select className="text-black" required={type === "neighborhood"} id="category" name="category">
                            <option value="">Select one</option>
                            <option value="domestic-violence">Domestic Violence</option>
                            <option value="vandalism">Vandalism</option>
                            <option value="theft">Theft</option>
                            <option value="burglary">Burglary</option>
                            <option value="noise">Noise Complaint</option>
                            <option value="animal">Animal Control</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                </div>
            ) : "")}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
                type="submit">
                {loading ? "Loading..." : "Submit Form"}
            </button>
        </form>
    );
}