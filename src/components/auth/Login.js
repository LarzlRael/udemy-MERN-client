import React, { useState, useContext,useEffect } from 'react'
import { Link } from 'react-router-dom'

//* importando el context
import AlertaContext from '../../context/alertas/alertaContexts';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {

    //? Declarando el context
    const alertaContext = useContext(AlertaContext);
    // destructurando el context
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;


    //!usando Efect //en caso de quel usuario no existe o el password sea incorrecto
    useEffect(() => {
        if (autenticado) {
            props.history.push('/proyectos');
        }
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado])


    //? state para iniciar seesion
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    })
    //? extrayendo
    const { email, password } = usuario;
    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    //? cuando el usuario le da a submit

    const onSubmit = (e) => {
        e.preventDefault();

        //?Validar que no haya campos 
        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son necesarios', 'alerta-error');
            return;
        }
        //? pasarlo al action
        iniciarSesion({ email, password });
    }
    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`} >
                {alerta.msg}
            </div>) : null}

            <div className="contenedor-form sobra-dark">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={onSubmit}>
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
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="InIciar Sesión" />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
    )
}

export default Login
