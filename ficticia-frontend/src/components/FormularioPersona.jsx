import React, { useState, useEffect } from 'react'
import { formatearFechaParaInput } from '../utils/fechas'
import './FormularioPersona.css'

const FormularioPersona = ({ persona, onGuardar, onCancelar }) => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        identificacion: '',
        fechaNacimiento: '',
        genero: '',
        activo: true,
        maneja: false,
        usaLentes: false,
        diabetico: false,
        otraEnfermedad: ''
    })

    const [errores, setErrores] = useState({})

    useEffect(() => {
        if (persona) {
            setFormData({
                nombreCompleto: persona.nombreCompleto || '',
                identificacion: persona.identificacion || '',
                fechaNacimiento: formatearFechaParaInput(persona.fechaNacimiento) || '',
                genero: persona.genero || '',
                activo: persona.activo !== undefined ? persona.activo : true,
                maneja: persona.maneja || false,
                usaLentes: persona.usaLentes || false,
                diabetico: persona.diabetico || false,
                otraEnfermedad: persona.otraEnfermedad || ''
            })
        }
    }, [persona])

    const manejarCambio = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errores[name]) {
            setErrores(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validarFormulario = () => {
        const nuevosErrores = {}

        if (!formData.nombreCompleto.trim()) {
            nuevosErrores.nombreCompleto = 'El nombre completo es requerido'
        }

        if (!formData.identificacion.trim()) {
            nuevosErrores.identificacion = 'La identificación es requerida'
        }

        if (!formData.fechaNacimiento) {
            nuevosErrores.fechaNacimiento = 'La fecha de nacimiento es requerida'
        }

        if (!formData.genero) {
            nuevosErrores.genero = 'El género es requerido'
        }

        setErrores(nuevosErrores)
        return Object.keys(nuevosErrores).length === 0
    }

    const manejarEnvio = (e) => {
        e.preventDefault()
        if (validarFormulario()) {
            onGuardar(formData)
        }
    }

    return (
        <div className="formulario-overlay">
            <div className="formulario-container">
                <h2>{persona ? 'Editar Persona' : 'Agregar Nueva Persona'}</h2>

                <form onSubmit={manejarEnvio} className="formulario-persona">
                    <div className="campo-grupo">
                        <label htmlFor="nombreCompleto">Nombre Completo *</label>
                        <input
                            type="text"
                            id="nombreCompleto"
                            name="nombreCompleto"
                            value={formData.nombreCompleto}
                            onChange={manejarCambio}
                            className={errores.nombreCompleto ? 'error' : ''}
                        />
                        {errores.nombreCompleto && (
                            <span className="mensaje-error">{errores.nombreCompleto}</span>
                        )}
                    </div>

                    <div className="campo-grupo">
                        <label htmlFor="identificacion">Identificación *</label>
                        <input
                            type="text"
                            id="identificacion"
                            name="identificacion"
                            value={formData.identificacion}
                            onChange={manejarCambio}
                            className={errores.identificacion ? 'error' : ''}
                        />
                        {errores.identificacion && (
                            <span className="mensaje-error">{errores.identificacion}</span>
                        )}
                    </div>

                    <div className="campo-grupo">
                        <label htmlFor="fechaNacimiento">Fecha de Nacimiento *</label>
                        <input
                            type="date"
                            id="fechaNacimiento"
                            name="fechaNacimiento"
                            value={formData.fechaNacimiento}
                            onChange={manejarCambio}
                            className={errores.fechaNacimiento ? 'error' : ''}
                        />
                        {errores.fechaNacimiento && (
                            <span className="mensaje-error">{errores.fechaNacimiento}</span>
                        )}
                    </div>

                    <div className="campo-grupo">
                        <label htmlFor="genero">Género *</label>
                        <select
                            id="genero"
                            name="genero"
                            value={formData.genero}
                            onChange={manejarCambio}
                            className={errores.genero ? 'error' : ''}
                        >
                            <option value="">Seleccionar género</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>
                        {errores.genero && (
                            <span className="mensaje-error">{errores.genero}</span>
                        )}
                    </div>

                    <div className="campo-grupo checkbox-grupo">
                        <label>
                            <input
                                type="checkbox"
                                name="activo"
                                checked={formData.activo}
                                onChange={manejarCambio}
                            />
                            Activo
                        </label>
                    </div>

                    <div className="campo-grupo checkbox-grupo">
                        <label>
                            <input
                                type="checkbox"
                                name="maneja"
                                checked={formData.maneja}
                                onChange={manejarCambio}
                            />
                            Maneja
                        </label>
                    </div>

                    <div className="campo-grupo checkbox-grupo">
                        <label>
                            <input
                                type="checkbox"
                                name="usaLentes"
                                checked={formData.usaLentes}
                                onChange={manejarCambio}
                            />
                            Usa Lentes
                        </label>
                    </div>

                    <div className="campo-grupo checkbox-grupo">
                        <label>
                            <input
                                type="checkbox"
                                name="diabetico"
                                checked={formData.diabetico}
                                onChange={manejarCambio}
                            />
                            Diabético
                        </label>
                    </div>

                    <div className="campo-grupo">
                        <label htmlFor="otraEnfermedad">Otra Enfermedad</label>
                        <textarea
                            id="otraEnfermedad"
                            name="otraEnfermedad"
                            value={formData.otraEnfermedad}
                            onChange={manejarCambio}
                            rows="3"
                            placeholder="Describir otra enfermedad si aplica"
                        />
                    </div>

                    <div className="botones-formulario">
                        <button type="button" className="btn btn-secondary" onClick={onCancelar}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {persona ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormularioPersona
