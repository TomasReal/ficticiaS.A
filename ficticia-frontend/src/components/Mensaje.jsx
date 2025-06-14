import React from 'react'
import './Mensaje.css'

const Mensaje = ({ texto, tipo }) => {
    return (
        <div className={`mensaje mensaje-${tipo}`}>
            <span>{texto}</span>
        </div>
    )
}

export default Mensaje
