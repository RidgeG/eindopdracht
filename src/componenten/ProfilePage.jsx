import React, { useState, useEffect } from "react";
import axios from "axios";
import { DATAVORTEX_CONFIG } from "../config";


function UserProfile({ user, onUpdate }) {
    const [userData, setUserData] = useState(user);
    const [preview, setPreview] = useState(user.profileImage || "");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState("");


    useEffect(() => {
        if (userData && userData.username) {
            const jwtToken = localStorage.getItem("jwt_token");
            axios
                .get(
                    `https://api.datavortex.nl/kalenderapp/users/${username}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${jwtToken}`,
                            "X-Api-Key": DATAVORTEX_CONFIG.API_KEY,
                        },
                    }
                )
                .then((res) => {
                    setUserData(res.data);
                })
                .catch((err) => {
                    console.error("Error fetching user data:", err);
                });
        }
    }, [userData.username]);

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    async function handleUpload() {
        if (!selectedFile) {
            setUploadMessage("Selecteer eerst een foto.");
            return;
        }
        try {
            // Haal de JWT-token direct op bij de request
            const jwtToken = localStorage.getItem("jwt_token");
            const formData = new FormData();
            formData.append("file", selectedFile);

            const response = await axios.post(
                `https://api.datavortex.nl/kalenderapp/users/${username}/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-Api-Key": DATAVORTEX_CONFIG.API_KEY,
                        "Authorization": `Bearer ${jwtToken}`,
                    },
                }
            );

            setUploadMessage("Foto succesvol geüpload!");
            onUpdate({ ...userData, profileImage: preview });
        } catch (error) {
            console.error("Foto upload mislukt:", error.response?.data || error.message);
            setUploadMessage("Foto upload mislukt.");
        }
    }

    return (
        <div className="user-profile">
            {preview ? (
                <img src={preview} alt="Profielfoto" className="profile-img" />
            ) : (
                <p>Geen profielfoto</p>
            )}
            <h3>Welkom, {userData.name || "Onbekend"}</h3>
            <p>Email: {userData.email || "Onbekend"}</p>
            <div className="user-photo">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button className="btn" onClick={handleUpload}>
                    Upload Foto
                </button>
                {uploadMessage && <p className="message">{uploadMessage}</p>}
            </div>
            <button className="btn" onClick={() => onUpdate({ ...userData, profileImage: preview })}>
                Profiel bijwerken
            </button>
        </div>
    );
}

export default UserProfile;