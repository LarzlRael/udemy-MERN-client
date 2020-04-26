import React, { useReducer } from 'react';

import AlertaContext from './alertaContexts';
import alertaReducer from './alertaReducer';

import { MONSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types"; 

const AlertaState = props => {
    const initialState = {
        alerta: null
    }
    const [state, dispath] = useReducer(alertaReducer, initialState);

    //?Funciones
    const mostrarAlerta = (msg, categoria) => {
        dispath({
            type: MONSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });
        setTimeout(() => {
            dispath({
                type: OCULTAR_ALERTA
            })
        }, 5000);
    }

    return (
        <AlertaContext.Provider
            value={{
                //? estados
                alerta: state.alerta,

                //?funciones
                mostrarAlerta
            }}
        >
            {props.children}
        </AlertaContext.Provider>
    )
}

export default AlertaState;