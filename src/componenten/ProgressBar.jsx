import React from 'react';

const ProgressBar = ({ percentage }) => {
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    return (
        <div className="progress-bar-container">
            <div
                className="progress-bar-fill"
                style={{ width: `${clampedPercentage}%` }}
            >
                <span className="progress-bar-text">{clampedPercentage}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;