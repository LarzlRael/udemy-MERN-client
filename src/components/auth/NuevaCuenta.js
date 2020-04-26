import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
//* importando el context
import AlertaContext from '../../context/alertas/alertaContexts';
import AuthContext from '../../context/auth/authContext';

//? estos props son mas que todo para usar el routing
const NuevaCuenta = (props) => {
    //? Declarando el context
    const alertaContext = useContext(AlertaContext);
    // destructurando el context
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    //?En caso de que el usuario se haya atenticado o registrado o sea un registro duplicado

    //!usando Efect
    useEffect(() => {
        if (autenticado) {
            props.history.push('/proyectos');
        }
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
    }, [mensaje, autenticado])

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
        if (password !== confirmar) {

            mostrarAlerta('Las contraseñas deber sers iguales', 'alerta-error');
            return;
        }
        //* pasarlo al action
        registrarUsuario({
            nombre, email, password
        })
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
                            autoComplete="off"
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
