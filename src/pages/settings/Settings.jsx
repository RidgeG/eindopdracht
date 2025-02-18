import React, {useState} from 'react';
import SettingsPanel from "../../componenten/SettingsPanel.jsx";

function Settings({onLogout}) {
    const [settings, setSettings] = useState({
        syncCalendar: false,
        notificationType: 'push',
        notificationSound: 'default',
        showCompleted: true,
        notificationsEnabled: true
    });

    function handleSettingsChange(newSettings) {
        setSettings(newSettings);
    }

    function handleSave() {
        alert('Instellingen opgeslagen!');
    }

    return (
        <div>
            <h2>Instellingen</h2>
            <SettingsPanel settings={settings} onChange={handleSettingsChange}/>
            <button className="settings-button" onClick={handleSave}>Instellingen Opslaan</button>
            <button className="settings-button" onClick={onLogout}>Uitloggen</button>
        </div>
    );

}

export default Settings;