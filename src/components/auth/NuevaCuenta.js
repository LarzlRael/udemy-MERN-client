import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContexts'
const NuevaCuenta = () => {
    //? Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    //? state para iniciar seesion
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })
    //? extrayendo
    const { nombre, email, password, confirmar } = usuario;
    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    //? cuando el usuario le da a submit

    const onSubmit = (e) => {
        e.preventDefault();

        //* Validar qwue no haya campos vacios
        if (nombre.trim() === ''
            || email.trim() === ''
            || password.trim() === ''
            || confirmar.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //* Password minimo de 6 caracteres
        if (password.length < 6) {
            mostrarAlerta('El password debe ser almenos de 6 caracteres', 'alerta-error');
            return;
        }
        //* Los 2 password son iguales
        if (password != confirmar) {

            mostrarAlerta('Los password no son iguales', 'alerta-error');
            return;
        }
        //* pasarlo al action
    }
    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`} >
                {alerta.msg}
            </div>) : null
            }
            <div className="contenedor-form sobra-dark">
                <h1>Obtener una Cuenta</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            onChange={onChange}
                            value={nombre}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            onChange={onChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            onChange={onChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Tu confirmar"
                            onChange={onChange}
                            value={confirmar}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme" />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div >
    )
}

export default NuevaCuenta
