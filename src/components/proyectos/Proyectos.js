import React from 'react'
//? importando los componentes

import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTask from '../tasks/FormTask';
import ListadoTareas from '../tasks/ListadoTareas';

const Proyectos = () => {
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
