import React, { useState } from "react";


function Settings({ onLogout }) {
    const [settings, setSettings] = useState({
        syncCalendar: false,
        notificationType: "push",
        notificationSound: "default",
        showCompleted: true,
        notificationsEnabled: true
    });
    const [message, setMessage] = useState("");

    const syncCalendar = async () => {
        setMessage("Agenda synchronisatie wordt afgehandeld via Todoist.");
    };

    function handleSyncChange(e) {
        const checked = e.target.checked;
        if (checked) {
            const confirmed = window.confirm("Weet je zeker dat je de agenda wilt synchroniseren?");
            if (confirmed) {
                syncCalendar();
                setSettings({ ...settings, syncCalendar: true });
            } else {
                setSettings({ ...settings, syncCalendar: false });
            }
        } else {
            setSettings({ ...settings, syncCalendar: false });
        }
    }

    function handleSave() {
        alert("Instellingen opgeslagen!");
    }

    return (
        <div className="page-container">
            <h2>Instellingen</h2>
            <div className="settings-panel">
                <label>
                    Agenda synchroniseren:
                    <input
                        type="checkbox"
                        checked={settings.syncCalendar}
                        onChange={handleSyncChange}
                    />
                </label>
                <label>
                    Meldingstype:
                    <select
                        value={settings.notificationType}
                        onChange={(e) =>
                            setSettings({ ...settings, notificationType: e.target.value })
                        }
                    >
                        <option value="push">Push</option>
                        <option value="email">Email</option>
                    </select>
                </label>
                <label>
                    Meldingsgeluid:
                    <select
                        value={settings.notificationSound}
                        onChange={(e) =>
                            setSettings({ ...settings, notificationSound: e.target.value })
                        }
                    >
                        <option value="default">Standaard</option>
                        <option value="chime">Chime</option>
                    </select>
                </label>
                <label>
                    Voltooide herinneringen weergeven:
                    <input
                        type="checkbox"
                        checked={settings.showCompleted}
                        onChange={(e) =>
                            setSettings({ ...settings, showCompleted: e.target.checked })
                        }
                    />
                </label>
                <label>
                    Notificaties inschakelen:
                    <input
                        type="checkbox"
                        checked={settings.notificationsEnabled}
                        onChange={(e) =>
                            setSettings({ ...settings, notificationsEnabled: e.target.checked })
                        }
                    />
                </label>
            </div>
            <button className="btn" onClick={handleSave}>Instellingen Opslaan</button>
            <button className="btn" onClick={onLogout}>Uitloggen</button>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default Settings;