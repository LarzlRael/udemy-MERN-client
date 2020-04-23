import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import ProyectoReducer from './ProyectoReducer';
//? ACCIONES QUE puede hacer el usuario
import {
    FORMULARIO_PROYECTO, OBTENERPROYECTOS, AGREGARPROYECTO, VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL, ELIMINAR_PROYECTO
} from '../../types';

//* Importando uuid
import uuid from 'uuid/v4';

//* importando los types 
const ProyectoState = props => {
    const proyectos = [
        { nombre: 'Tienda virtual', id: 1 },
        { nombre: 'Infranet', id: 2 },
        { nombre: 'diseño de sitios web', id: 3 },
    ]
    const initialState = {
        proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto: null
    }

    //? Dispatch para ejectuar las acciones
    //! useReducer 1 paramentro, el nombre el reducer 2el initial state
    const [state, dispatch] = useReducer(ProyectoReducer, initialState);
    //?Serie de funciones páara el Crud

    const mostrarFormulario = () => {
        // ? cuando se llava a esta funcion tambien se llama el type
        console.log('Esto deberua cambiar el estatdo');
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // ? VALIDA EL fomrulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }


    //? Obtener los proyectos
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENERPROYECTOS,
            payload: proyectos
        })
    }

    //? Agregar nuevo proyecto

    const agregarNuevoProyecto = (proyecto) => {
        proyecto.id = uuid();
        //Insertar el prouecto en el state con un dispatch
        dispatch({
            type: AGREGARPROYECTO,
            payload: proyecto
        })
    }

    //? seleccion el proyecto que usuario dio click

    const proyectoActual = proyectoId => {
        console.log('id del proyecto', proyectoId)

        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //? Elimina un proyecto
    const eliminarProyecto = (proyectoId) => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    return (
        <proyectoContext.Provider
            value={{
                //* states here
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                //*funciones abajo
                mostrarFormulario,
                obtenerProyectos,
                agregarNuevoProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto

            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}
export default ProyectoState;