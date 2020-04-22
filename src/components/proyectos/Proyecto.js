import React from 'react'

const Proyecto = ({ proyecto }) => {
    return (
        <li>
            <button
                type="button"
                className="listado-proyecto"
            >
                {proyecto.nombre}
            </button>
        </li>
    );
}

export default Proyecto;