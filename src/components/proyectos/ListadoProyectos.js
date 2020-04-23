import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext';

const ListadoProyectos = () => {

    const proyectosContext = useContext(proyectoContext);
    //? Importando el proyecto desde el context
    const { proyectos, obtenerProyectos } = proyectosContext;

    //?cargando los proyectos por medio de useEffect 
    useEffect(() => {
        obtenerProyectos();
    }, [])

    //*Revisar si proyectos tiene contenido
    if (proyectos.length === 0) return <p>No hay proyecto, compienza agregando uno </p>;




    return (
        <div>
            <ul className="listado-proyectos">
                {proyectos.map(proyecto => (
                    <Proyecto
                        key={proyecto.id}
                        proyecto={proyecto}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ListadoProyectos
