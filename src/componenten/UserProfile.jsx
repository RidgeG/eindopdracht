import React, { useState } from 'react';

function UserProfile({ user, onUpdate }) {
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
        onUpdate({ ...user, profileImage });
    }

    return (
        <div className="user-profile">
            <h3>Welkom, {user.name || "Onbekend"}</h3>
            <p>Email: {user.email || "Onbekend"}</p>
            <div className="user-photo">
                <p>Profielfoto:</p>
                {preview ? (
                    <img src={preview} alt="Profielfoto" className="profile-img" />
                ) : (
                    <p>Geen profielfoto</p>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <button className="btn" onClick={handleSave}>Profiel bijwerken</button>
        </div>
    );
}

export default UserProfile;
