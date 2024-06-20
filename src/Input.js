import React from 'react'

function Input({ type, placeholder  }) {
    return (
        <div>
            <input className="rounded-md border border-1 border-neutral-600 rounded py-2 w-full" type={type} placeholder={placeholder} />
        </div>
    )
}

export default Input