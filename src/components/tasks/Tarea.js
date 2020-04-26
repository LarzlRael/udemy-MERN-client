import React, { useContext } from 'react'
import TareaContext from '../../context/tasks/taskContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({ tarea }) => {

    const proyectosContext = useContext(proyectoContext);
    //? Importando Solo el proyecto del state principal
    const { proyecto } = proyectosContext;


    const tareasContext = useContext(TareaContext);
    //?Obtener el state del formulario
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    //Extraer el proyecto
    const [proyectoActual] = proyecto;


    //?Funcion que se ejecucuta cuando el usuario presiona el btn de eliminar tarea
    const tareaEliminar = (id) => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id)
    }
    //?Funcion que modifica el estado de las tareas
    const cambiarEstado = (tarea) => {
        console.log('estado de tarea ', tarea.estado);
        tarea.estado = !tarea.estado;
        console.log('tarea despues ', tarea)
        actualizarTarea(tarea);
    }
    //? agrega una tarea acutal cuando el suarus desea editarla

    const seleccionTarea = (tarea) => {
        guardarTareaActual(tarea);
    }

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado
                    ?
                    (<button
                        type="button"
                        className="completo"
                        onClick={() => cambiarEstado(tarea)}
                    >Completo</button>
                    )
                    :
                    (<button
                        type="button"
                        className="Incompleto"
                        onClick={() => cambiarEstado(tarea)}
                    >Incompleto</button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionTarea(tarea)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => { tareaEliminar(tarea._id) }}
                >Eliminar</button>
            </div>
        </li>
    )
}

export default Tarea
