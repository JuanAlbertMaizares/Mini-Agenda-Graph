import React from 'react'

export const Notify = ({errorMessage}) => {
    if (!errorMessage) return null 
    
    return (
        <div style={{color: 'red', position: 'fixed', top: 0, left: 0, width: '100%', textAlign: 'center', backgroundColor: 'lightgray'}}>
            {errorMessage}
        </div>
    )
}
