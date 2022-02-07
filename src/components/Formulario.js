import React, { Fragment, useState } from 'react';
import { v4 as uuid } from 'uuid';

const Formulario = ({crearCita}) => {

  // STATES

  // Crear state de una cita
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  });

  // Extraer datos de la cita
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Función que se ejecuta cada vez que el usuario escribe en un input
  const actualizarState = event => {
    actualizarCita({
      ...cita,
      [event.target.name]: event.target.value
    })
  }

  // State para errores de formulario
  const [ error, actualizarError ] = useState(false);

  // Cuando se envía el formulario para agregar una cita
  const submitCita = event => {
    event.preventDefault();

    // 1. Validar
    if ( mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ) {
      actualizarError(true);
      return;
    }

    // Borrar aviso de error si se ha pasado la validación
    actualizarError(false);

    // 2. Asignar un ID único a la cita
    cita['id'] = uuid();

    // 3. Crear la cita y añadirla al state principal de la app
    crearCita(cita);

    // 4. Reiniciar form
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })
  }

  return (
    <Fragment>
      <h2>Crear cita</h2>

      {
        error
        ? <p className='alerta-error'>Todos los campos son obligatorios</p>
        : null
      }

      <form
        onSubmit = {submitCita}
      >
        <label>Nombre Mascota</label>
        <input
          type = 'text'
          name = 'mascota'
          className = 'u-full-width'
          placeholder = 'Nombre Mascota'
          onChange = {actualizarState}
          value = {mascota}
        />
        <label>Nombre Dueño</label>
        <input
          type = 'text'
          name = 'propietario'
          className = 'u-full-width'
          placeholder = 'Nombre del dueño de la mascota'
          onChange = {actualizarState}
          value = {propietario}
        />
        <label>Fecha</label>
        <input
          type = 'date'
          name = 'fecha'
          className = 'u-full-width'
          onChange = {actualizarState}
          value = {fecha}
        />
        <label>Hora</label>
        <input
          type = 'time'
          name = 'hora'
          className = 'u-full-width'
          onChange = {actualizarState}
          value = {hora}
        />
        <label>Síntomas</label>
        <textarea
          className = 'u-full-width'
          name = 'sintomas'
          onChange = {actualizarState}
          value = {sintomas}
        ></textarea>

        <button
          type = 'submit'
          className = 'u-full-width button-primary'
        >Agregar Cita</button>
      </form>
    </Fragment>
  )
}

export default Formulario;