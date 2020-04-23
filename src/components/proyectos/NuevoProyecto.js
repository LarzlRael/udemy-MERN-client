import React, { Fragment, useState, useContext } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //?Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);

    //*Extrer el valor del state por medio de context
    const { formulario, errorFormulario, mostrarFormulario, agregarNuevoProyecto, mostrarError } = proyectosContext;

    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });
    // ? Extraer nombre de proyecto

    const { nombre } = proyecto;

    const onchangeProyecto = (e) => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    //? Cuando el usuario envia un proyecto
    const onSubmitProyecto = (e) => {
        console.log('enviando .....')
        e.preventDefault();

        //*validar el proyecto
        if (nombre === '') {
            mostrarError();
            return;
        }
        //*Agregar al state 
        agregarNuevoProyecto(proyecto);

        //*Reicnicar el form
        guardarProyecto({
            nombre: ''
        })

    }

    //? mostrar el formulario con un submit 
    const onClickFormulario = () => {
        //? mostrando el formulario del context
        mostrarFormulario()
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >Nuevo Proyecto</button>
            {
                formulario
                    ?
                    (<form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre del proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onchangeProyecto}
                        />
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar Proyecto"
                        />
                    </form>
                    )
                    : null
            }
            {
                errorFormulario ?
                    <p className="mensaje error">El nombre del proyecto es obligatorio</p>
                    : null
            }
        </Fragment>
    );
}

export default NuevoProyecto;