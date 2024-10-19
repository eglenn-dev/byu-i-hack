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
        <div>
            <form className="flex flex-col gap-4" onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                createPost(new FormData(e.target));
            }}>
                <label>
                    <span>Location</span>
                    <input required type="text" id="location" name="location" placeholder="123 Street, ST 12345" />
                </label>
                <div className="flex flex-col gap-4">
                    <label>
                        <input
                            required
                            type="radio"
                            id="vehicle"
                            name="type"
                            value="vehicle"
                            checked={type === "vehicle"}
                            onChange={handleTypeChange}
                        />
                        Vehicle
                    </label>
                    <label>
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
                    <label>
                        Description
                        <textarea required style={{ resize: "none" }} id="description" name="description" placeholder="Tell us about what happened..." />
                    </label>
                    <label>
                        Date of Incident
                        <input required type="date" id="date" name="date" />
                    </label>
                </div>
                {type === "vehicle" ? (
                    <div>
                        <label>
                            License Plate
                            <input required={type === "vehicle"} type="text" id="license" name="license" />
                        </label>
                    </div>
                ) : (type === "neighborhood" ? (
                    <div>
                        <label>
                            Category
                            <select required={type === "neighborhood"} id="category" name="category">
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
                <button disabled={loading} type="submit">{loading ? "Loading..." : "Submit Form"}</button>
            </form>
        </div>
    );
}