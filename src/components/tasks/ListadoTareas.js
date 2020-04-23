import React, { Fragment, useContext } from 'react'
import Tarea from './Tarea';
//? usando nuestro contexts
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tasks/taskContext';



const ListadoTareas = () => {

    const proyectosContext = useContext(proyectoContext);
    //? Importando Solo el proyecto del state principal
    const { proyecto, eliminarProyecto } = proyectosContext;

    //?Obtener las tarea del proyecto
    const tareasContext = useContext(TareaContext);
    //?Obteniendo lo que esta en state de tareas
    const { tareasproyecto } = tareasContext;


    //?si mp hay proyecto seleccionado
    if (!proyecto) return <h2>Seleccion un proyecto</h2>;

    //? Array desctrturing para extrar el proyecto actual
    const [proyectoActual] = proyecto;




    //? Eliminar el proyecto

    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual.id);
    }
    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ? (<li className="tarea"><p>No hay tarea</p></li>)
                    : (tareasproyecto.map(tarea => (
                        <Tarea
                            key={tarea.id}
                            tarea={tarea} />
                    )))
                }
                <button
                    type="button"
                    className="btn btn-eliminar"
                    onClick={onClickEliminar}
                >Eliminar Proyecto &times;</button>
            </ul>

        </Fragment>
    )
}

export default ListadoTareas
