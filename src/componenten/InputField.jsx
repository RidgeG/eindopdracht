import React from 'react';

const InputField = ({ type, label, value, onChange, required }) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                className="input-field"
            />
        </div>
    );
};

export default InputField;