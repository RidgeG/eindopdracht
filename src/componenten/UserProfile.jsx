import React, { useState } from 'react';
import axios from 'axios';

function UserProfile({ user, onUpdate, onUploadPhoto }) {
    const [profileImage, setProfileImage] = useState(user.profileImage || '');
    const [preview, setPreview] = useState(user.profileImage || '');



    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    function handleSave() {
        // Update de andere gegevens via onUpdate, bijvoorbeeld naam of e-mail
        onUpdate({ ...user, profileImage });
    }

    function handleUpload() {
        // Upload de foto naar Datavortex via de onUploadPhoto callback
        const fileInput = document.getElementById("profile-photo-input");
        if (fileInput && fileInput.files[0]) {
            onUploadPhoto(fileInput.files[0]);
        }
    }

    return (
        <div className="user-profile">
            <h3>Welkom, {user.name || "Onbekend"}</h3>
            <p>Email: {user.email || "Geen e-mailadres"}</p>
            <div className="user-photo">
                <p>Profielfoto:</p>
                {preview ? (
                    <img src={preview} alt="Profielfoto" className="profile-img" />
                ) : (
                    <p>Geen profielfoto</p>
                )}
                <input
                    id="profile-photo-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button className="btn" onClick={handleUpload}>Foto Uploaden</button>
            </div>
            <button className="btn" onClick={handleSave}>Profiel bijwerken</button>
        </div>
    );
}

export default UserProfile;