import React from 'react'
import { calcularEdad, formatearFecha } from '../utils/fechas'
import './TablaPersonas.css'

const TablaPersonas = ({ personas, onEditar, onEliminar, cargando }) => {
    if (cargando) {
        return (
            <div className="tabla-container">
                <div className="cargando">Cargando personas...</div>
            </div>
        )
    }

    if (personas.length === 0) {
        return (
            <div className="tabla-container">
                <div className="sin-datos">No hay personas registradas</div>
            </div>
        )
    }

    return (
        <div className="tabla-container">
            <table className="tabla-personas">
                <thead>
                    <tr>
                        <th>Nombre Completo</th>
                        <th>Identificación</th>
                        <th>Fecha Nacimiento</th>
                        <th>Edad</th>
                        <th>Género</th>
                        <th>Activo</th>
                        <th>Maneja</th>
                        <th>Usa Lentes</th>
                        <th>Diabético</th>
                        <th>Otra Enfermedad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map((persona) => (
                        <tr key={persona.id}>
                            <td>{persona.nombreCompleto}</td>
                            <td>{persona.identificacion}</td>
                            <td>{formatearFecha(persona.fechaNacimiento)}</td>
                            <td>{calcularEdad(persona.fechaNacimiento)} años</td>
                            <td>{persona.genero}</td>
                            <td>
                                <span className={`estado ${persona.activo ? 'activo' : 'inactivo'}`}>
                                    {persona.activo ? 'Sí' : 'No'}
                                </span>
                            </td>
                            <td>
                                <span className={`estado ${persona.maneja ? 'si' : 'no'}`}>
                                    {persona.maneja ? 'Sí' : 'No'}
                                </span>
                            </td>
                            <td>
                                <span className={`estado ${persona.usaLentes ? 'si' : 'no'}`}>
                                    {persona.usaLentes ? 'Sí' : 'No'}
                                </span>
                            </td>
                            <td>
                                <span className={`estado ${persona.diabetico ? 'si' : 'no'}`}>
                                    {persona.diabetico ? 'Sí' : 'No'}
                                </span>
                            </td>
                            <td>{persona.otraEnfermedad || 'Ninguna'}</td>
                            <td>
                                <div className="acciones">
                                    <button
                                        className="btn btn-secondary btn-small"
                                        onClick={() => onEditar(persona)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-small"
                                        onClick={() => onEliminar(persona.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablaPersonas
