import React, { useState, useEffect, useContext } from 'react'
import TablaPersonas from './TablaPersonas'
import FormularioPersona from './FormularioPersona'
import Mensaje from './Mensaje'
import { personasService } from '../services/personasService'
import './GestorPersonas.css'
import { AuthContext } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

const GestorPersonas = () => {
    const [personas, setPersonas] = useState([])
    const [personaSeleccionada, setPersonaSeleccionada] = useState(null)
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' })
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        cargarPersonas()
    }, [])

    const cargarPersonas = async () => {
        setCargando(true)
        try {
            const data = await personasService.obtenerTodas()
            setPersonas(data)
            mostrarMensaje('Personas cargadas correctamente', 'exito')
        } catch (error) {
            mostrarMensaje('Error al cargar las personas: ' + error.message, 'error')
        } finally {
            setCargando(false)
        }
    }

    const mostrarMensaje = (texto, tipo) => {
        setMensaje({ texto, tipo })
        setTimeout(() => {
            setMensaje({ texto: '', tipo: '' })
        }, 5000)
    }

    const manejarAgregarPersona = () => {
        setPersonaSeleccionada(null)
        setMostrarFormulario(true)
    }

    const manejarEditarPersona = (persona) => {
        setPersonaSeleccionada(persona)
        setMostrarFormulario(true)
    }

    const manejarEliminarPersona = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar esta persona?')) {
            try {
                await personasService.eliminar(id)
                await cargarPersonas()
                mostrarMensaje('Persona eliminada correctamente', 'exito')
            } catch (error) {
                mostrarMensaje('Error al eliminar la persona: ' + error.message, 'error')
            }
        }
    }

    const manejarGuardarPersona = async (datosPersona) => {
        try {
            if (personaSeleccionada) {
                await personasService.actualizar(personaSeleccionada.id, datosPersona)
                mostrarMensaje('Persona actualizada correctamente', 'exito')
            } else {
                await personasService.crear(datosPersona)
                mostrarMensaje('Persona creada correctamente', 'exito')
            }
            await cargarPersonas()
            setMostrarFormulario(false)
            setPersonaSeleccionada(null)
        } catch (error) {
            mostrarMensaje('Error al guardar la persona: ' + error.message, 'error')
        }
    }

    const manejarCancelarFormulario = () => {
        setMostrarFormulario(false)
        setPersonaSeleccionada(null)
    }

    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="gestor-personas">
            <header className="gestor-header">
                <h1>Gestor de Personas - FICTICIA SA</h1>
                <button
                    className="btn btn-primary"
                    onClick={manejarAgregarPersona}
                    disabled={cargando}
                >
                    Agregar Persona
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </button>
            </header>

            {mensaje.texto && (
                <Mensaje texto={mensaje.texto} tipo={mensaje.tipo} />
            )}

            {mostrarFormulario && (
                <FormularioPersona
                    persona={personaSeleccionada}
                    onGuardar={manejarGuardarPersona}
                    onCancelar={manejarCancelarFormulario}
                />
            )}

            <TablaPersonas
                personas={personas}
                onEditar={manejarEditarPersona}
                onEliminar={manejarEliminarPersona}
                cargando={cargando}
            />
        </div>
    )
}

export default GestorPersonas
