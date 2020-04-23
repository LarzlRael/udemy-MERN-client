import React, { useContext } from 'react'

//? importando el context 
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tasks/taskContext';


const Proyecto = ({ proyecto }) => {
    const proyectosContext = useContext(proyectoContext);
    //?Obtener el state del formulario
    const { proyectoActual } = proyectosContext;
    //?Funcion para agregar un proyecto actual

    const tareasContext = useContext(TareaContext);
    const { obtenerTareas } = tareasContext;


    //?Funcion para agregar al proyecto actual
    const seleccionarProyecto = (id) => {
        proyectoActual(id); // ? fijar un 
        obtenerTareas(id); //? Filtar las tareas cuando se da click
    }
    return (
        <li>
            <button
                type="button"
                className="listado-proyecto"
                onClick={() => seleccionarProyecto(proyecto.id)}
            >
                {proyecto.nombre}
            </button>
        </li>
    );
}

export default Proyecto;