import React from 'react'

const FormTask = () => {
    return (
        <div className="formulario">
            <form action="">
                <div className="contenedor-input">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre Tarea ..."
                        className="input-text"
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Agregar Tarea"
                    />
                </div>
            </form>
        </div>
    )
}

export default FormTask
