import React, { useContext, useEffect } from 'react'
//? importando los componentes

import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTask from '../tasks/FormTask';
import ListadoTareas from '../tasks/ListadoTareas';
import AuthContext from '../../context/auth/authContext';

const Proyectos = () => {

    //?Extra la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    //? recargando para que se llene la informacion con el use effect

    useEffect(() => {
        usuarioAutenticado()
    }, [])
    return (
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Barra />
                <main>
                    <FormTask />
                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Proyectos
