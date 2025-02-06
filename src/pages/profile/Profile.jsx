import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import UserProfile from "../../componenten/UserProfile.jsx";

function Profile () {
    const {user} = useContext(AuthContext);


    return (
        <div>
            <h2>Profielpagina</h2>
            {user ? (
                <UserProfile user={user} onUpdate={(updatedUser) => console.log("Update:", updatedUser)}/>
            ) : (
                <p>Geen gebruikersinformatie beschikbaar.</p>
            )}
        </div>
    );
}

export default Profile;