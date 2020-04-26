import React, { useReducer } from 'react';
import TareaContext from './taskContext';
import taskReducer from './taskReducer';
//? importando los types
import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA } from '../../types';

//? importando el cliente de axios 
import clienteAxios from '../../config/axios';

const TareaState = props => {
    const initicalState = {

        tareasproyecto: [],
        errortarea: false,
        tareSeleccionada: null
    }
    //? crear el dispatch y state
    const [state, dispatch] = useReducer(taskReducer, initicalState);
    //* creacion de las funciones

    //? Obtener las tereas de proyectos

    const obtenerTareas = async (proyecto) => {

        try {
            const resultado = await clienteAxios.get(`/api/tareas`, { params: { proyecto } });
            console.log(resultado);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })

        } catch (error) {

        }
    }

    //? agregar una tarea al proyecto seleccionado

    const agregarTarea = async (tarea) => {
        console.log(tarea)
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado)
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea

            })
        } catch (error) {

        }

    }

    //? valida y muestar un error en caso de que haya un error

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //? eliminzar tarea por el id

    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } })
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {

        }
    }

    //? Edito o modifica una tarea

    const actualizarTarea = async (tarea) => {

        console.log(tarea);

        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            console.log(resultado);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    //?extrae una tarea para edicion
    const guardarTareaActual = (tarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //? Elimina o limpia la tarea selleciona
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return (
        <TareaContext.Provider
            value={{
                // tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaSeleccionada: state.tareSeleccionada,
                //?funciones 
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea

            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;