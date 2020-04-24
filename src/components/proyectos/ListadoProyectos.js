import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext';

//? Librerias de react-transition-group
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoProyectos = () => {

    const proyectosContext = useContext(proyectoContext);
    //? Importando el proyecto desde el context
    const { proyectos, obtenerProyectos } = proyectosContext;

    //?cargando los proyectos por medio de useEffect 
    useEffect(() => {
        obtenerProyectos();
        // eslit-disable-next-line
    }, [])

    //*Revisar si proyectos tiene contenido
    if (proyectos.length === 0) return <p>No hay proyecto, compienza agregando uno </p>;

    return (
        <ul className="listado-proyectos">
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto.id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    )
}

export default ListadoProyectos
