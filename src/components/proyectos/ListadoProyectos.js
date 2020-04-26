import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto'

//* importando los context
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContexts';

//? Librerias de react-transition-group
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoProyectos = () => {

    const proyectosContext = useContext(proyectoContext);
    //? Importando el proyecto desde el context
    const { proyectos, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const { mensaje, alerta, mostrarAlerta } = alertaContext;


    //?cargando los proyectos por medio de useEffect 
    useEffect(() => {
        //?Si hay un error
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();
        
        // eslint-disable-next-line
    }, [mensaje])

    //*Revisar si proyectos tiene contenido
    if (proyectos.length === 0) return <p>No hay proyecto, compienza agregando uno </p>;

    return (
        <ul className="listado-proyectos">

            {alerta ? (<div className={`alerta ${alerta.categoria}`}>
                {alerta.msg}
            </div>) : null}
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
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
