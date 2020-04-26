import { REGISTRO_EXITOSO, REGISTRO_ERROR, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, CERRAR_SESION } from "../../types";


export default (state, action) => {

    switch (action.type) {
        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null
            }
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                autenticado: null,
                mensaje: action.payload
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload
            }


        default:
            return state;
    }
};