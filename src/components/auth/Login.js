import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
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

        //?
    }
    return (
        <div className="form-usuario">
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
                            type="email"
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
