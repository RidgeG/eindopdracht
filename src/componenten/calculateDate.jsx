import React from 'react'

function calculateDate({ date}){
    const formattedDate = new Date(date).toLocaleDateString();
    return <span>{formattedDate}</span>;
}

export default calculateDate;