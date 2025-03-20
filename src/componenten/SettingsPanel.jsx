import React from 'react';

function SettingsPanel({settings, onChange}) {
    return (
        <div className="settings-panel">
            <h3>Instellingen</h3>
            <label>
                Kalender synchroniseren:
                <input
                    type="checkbox"
                    checked={settings.syncCalender}
                    onChange={(e) => onChange({...settings, syncCalender: e.target.checked})}
                />
            </label>
            <label>
                Meldingstype:
                <select
                    value={settings.notificationType}
                    onChange={(e) => onChange({...settings, notificationType: e.target.value})}>
                    <option value="push">Push</option>
                    <option value="email">Email</option>
                </select>
            </label>
            <label>
                Meldingsgeluid:
                <select
                    value={settings.notificationSound}
                    onChange={(e) => onChange({...settings, notificationSound: e.target.value})}>
                    <option value="default">Standaard</option>
                    <option value="chime">Chime</option>
                </select>
            </label>
            <label>
                Voltooide herinneringen weergeven:
                <input
                    type="checkbox"
                    checked={settings.showCompleted}
                    onChange={(e) => onChange({...settings, showCompleted: e.target.checked})}
                />
            </label>
            <label>
                Notificaties inschakelen:
                <input
                    type="checkbox"
                    checked={settings.notificationsEnabled}
                    onChange={(e) => onChange({...settings, notificationsEnabled: e.target.checked})}
                />
            </label>
        </div>
    );
}

export default SettingsPanel;