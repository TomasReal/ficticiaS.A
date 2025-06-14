const API_BASE_URL = 'http://localhost:8080/personas'

const obtenerHeaders = () => {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    }
}

const manejarRespuesta = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
    }
    return response.json()
}

export const personasService = {
    obtenerTodas: async () => {
        const response = await fetch(API_BASE_URL, {
            method: 'GET',
            headers: obtenerHeaders()
        })
        return manejarRespuesta(response)
    },

    obtenerPorId: async (id) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'GET',
            headers: obtenerHeaders()
        })
        return manejarRespuesta(response)
    },

    crear: async (persona) => {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: obtenerHeaders(),
            body: JSON.stringify(persona)
        })
        return manejarRespuesta(response)
    },

    actualizar: async (id, persona) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: obtenerHeaders(),
            body: JSON.stringify(persona)
        })
        return manejarRespuesta(response)
    },

    eliminar: async (id) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: obtenerHeaders()
        })
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
        }
        return true
    }
}
