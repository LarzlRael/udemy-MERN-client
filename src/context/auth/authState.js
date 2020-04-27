
import React, { useReducer } from 'react'
import { REGISTRO_EXITOSO, REGISTRO_ERROR, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, CERRAR_SESION } from "../../types";

//* importando el reducer
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const Authstate = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState);


    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/users', datos);
            console.log(respuesta);
            //? almacenamiento del token
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            usuarioAutenticado();

        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                payload: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        } try {
            const respuesta = await clienteAxios.post('/api/users', datos);
            //? almacenamiento del token
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            usuarioAutenticado();

        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                payload: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    //? Retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            //TODO: funcion para enviar token por headers
            tokenAuth(token);
        }
        try {
            const respuesta = await clienteAxios.get('api/auth')
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,

            })
        }
    }
    /* ------------------------------ */
    /* Cuando el usaurio inicia sesion */
    /* ------------------------------ */
    const iniciarSesion = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            console.log(respuesta);
            //? almacenamiento del token
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });
            //Obtener el ususario
            usuarioAutenticado();

        } catch (error) {
            console.log({ error })
            console.log(error.response.data.msg)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }

    }

    //? Funcion para cerrar sesion
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }
    return (
        <AuthContext.Provider
            value={{
                //? states
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                
                //? functions
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >{props.children}
        </AuthContext.Provider>
    )
}
export default Authstate;