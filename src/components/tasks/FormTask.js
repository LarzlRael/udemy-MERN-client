import React, { useContext, useState, useEffect } from 'react'

// ? importando todo context

import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tasks/taskContext';

const FormTask = () => {
    // * extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //* extraer las funcones del state
    const tareasContext = useContext(TareaContext);
    //?Obtener el state del formulario
    const { obtenerTareas, agregarTarea, validarTarea, errortarea, tareaSeleccionada,
        actualizarTarea, limpiarTarea } = tareasContext;
    // Effect que detecta si hay una tarea seleccionada

    useEffect(() => {
        if (tareaSeleccionada != null) {
            guardarTarea(tareaSeleccionada);
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada])


    //?state del fomrulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    if (!proyecto) return null;

    //? Array desctrturing para extrar el proyecto actual
    const [proyectoActual] = proyecto;
    //?Leer los valores del formulario

    const handleChange = (e) => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    }

    //Extraer el nombre del proyecto
    const { nombre } = tarea;
    const onSubmit = (e) => {
        e.preventDefault();

        //?validar
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }
        //*Si es edicion o es una nueva tarea

        if (tareaSeleccionada === null) {
            //? agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);


        } else {
            //? actualizar tarea existente
            actualizarTarea(tarea);
            //?? Funcion para limpiar tarea
            limpiarTarea();
        }
        //? obtener  y filtrar las tareas
        obtenerTareas(proyectoActual.id)

        //? reinicar el form
        guardarTarea({
            nombre: ''
        })

    }
    return (
        <div className="formulario">
            <form onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre Tarea ..."
                        className="input-text"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    )
}

export default FormTask
