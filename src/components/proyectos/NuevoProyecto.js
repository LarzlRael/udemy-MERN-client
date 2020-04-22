import React, { Fragment, useState } from 'react';

const NuevoProyecto = () => {

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
        e.preventDefault();

        //*validar el proyecto

        //*Agregar al state

        //* agregar al state

        //*Reicnicar el form

    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
            >Nuevo Proyecto</button>
            <form
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
        </Fragment>
    );
}

export default NuevoProyecto;