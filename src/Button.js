import React from 'react';

function Button({ text, onClick}) {
    return (
        <button className="bg-blue-800 text-white font-bold rounded-md text-black text-m cursor-pointer disabled:pointer-events-none disabled:text-opacity-50" onClick={onClick}>{text}</button>
    )
}

export default Button