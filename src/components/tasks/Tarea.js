import React, { useContext } from 'react'
import TareaContext from '../../context/tasks/taskContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({ tarea }) => {

    const proyectosContext = useContext(proyectoContext);
    //? Importando Solo el proyecto del state principal
    const { proyecto } = proyectosContext;


    const tareasContext = useContext(TareaContext);
    //?Obtener el state del formulario
    const { eliminarTarea, obtenerTareas } = tareasContext;

    //Extraer el proyecto
    const [proyectoActual] = proyecto;


    //?Funcion que se ejecucuta cuando el usuario presiona el btn de eliminar tarea
    const tareaEliminar = (id) => {
        eliminarTarea(id);
        obtenerTareas(proyectoActual.id)
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
                    >Completo</button>
                    )
                    :
                    (<button
                        type="button"
                        className="Incompleto"
                    >Incompleto</button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => { tareaEliminar(tarea.id) }}
                >Eliminar</button>
            </div>
        </li>
    )
}

export default Tarea
