export const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 0

    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mesActual = hoy.getMonth()
    const mesNacimiento = nacimiento.getMonth()

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < nacimiento.getDate())) {
        edad--
    }

    return edad
}

export const formatearFecha = (fecha) => {
    if (!fecha) return ''

    const fechaObj = new Date(fecha)
    return fechaObj.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
}

export const formatearFechaParaInput = (fecha) => {
    if (!fecha) return ''

    const fechaObj = new Date(fecha)
    const year = fechaObj.getFullYear()
    const month = String(fechaObj.getMonth() + 1).padStart(2, '0')
    const day = String(fechaObj.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}
