import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../context/auth/authContext';

const Barra = () => {
    //?Extra la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    //? recargando para que se llene la informacion con el use effect
    useEffect(() => {
        usuarioAutenticado()
    }, [])

    return (
        <div>
            <header className="app-header">

                {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}
                <nav className="nav-principal">
                    <button
                        className="btn btn-blank cerrar-sesion"
                        onClick={() => cerrarSesion()}
                    >
                        Cerrar Sesion
                    </button>
                </nav>
            </header>
        </div>
    )
}

export default Barra
