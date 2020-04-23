import React, { useReducer } from 'react';
import TareaContext from './taskContext';
import taskReducer from './taskReducer';
//? importando los types

import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA } from '../../types';

const TareaState = props => {
    const initicalState = {
        tareas: [
            { id: 1, nombre: 'Elegir plataforma', estado: true, proyectoId: 1 },
            { id: 2, nombre: 'Elegir Colores', estado: true, proyectoId: 2 },
            { id: 3, nombre: 'Elegir plataforma de pago', estado: false, proyectoId: 3 },
            { id: 4, nombre: 'Elegir hosting', estado: true, proyectoId: 4 },
            { id: 5, nombre: 'Elegir angular', estado: true, proyectoId: 1 },
            { id: 6, nombre: 'Elegir un cel', estado: true, proyectoId: 2 },
            { id: 7, nombre: 'Elegir hosting', estado: true, proyectoId: 3 },
            { id: 8, nombre: 'Elegir hosting', estado: true, proyectoId: 4 },
            { id: 9, nombre: 'Elegir hosting', estado: true, proyectoId: 2 },
        ],
        tareasproyecto: null,
        errortarea: false
    }
    //? crear el dispatch y state
    const [state, dispatch] = useReducer(taskReducer, initicalState);
    //* creacion de las funciones

    //? Obtener las tereas de proyectos

    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    //? agregar una tarea al proyecto seleccionado

    const agregarTarea = (tarea) => {
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea

        })
    }

    //? valida y muestar un error en caso de que haya un error

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //? eliminzar tarea por el id

    const eliminarTarea = (id) => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }
    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                //?funciones 
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea

            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;