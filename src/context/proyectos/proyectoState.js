import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import ProyectoReducer from './ProyectoReducer';
//? ACCIONES QUE puede hacer el usuario
import {
    FORMULARIO_PROYECTO, OBTENERPROYECTOS, AGREGARPROYECTO, VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ERROR
} from '../../types';

import clienteAxios from '../../config/axios';

//* importando los types 
const ProyectoState = props => {
    const initialState = {
        proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto: null,
        mensaje:''
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
    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios('/api/proyectos');
            dispatch({
                type: OBTENERPROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //? Agregar nuevo proyecto

    const agregarNuevoProyecto = async (proyecto) => {
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(resultado);
            //?Insertar el proyecto en el state con un dispatch
            dispatch({
                type: AGREGARPROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //? seleccion el proyecto que usuario dio click

    const proyectoActual = proyectoId => {

        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //? Elimina un proyecto
    const eliminarProyecto = async (proyectoId) => {


        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    return (
        <proyectoContext.Provider
            value={{
                //* states here
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
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