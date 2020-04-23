import { FORMULARIO_PROYECTO, OBTENERPROYECTOS, AGREGARPROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from "../../types";

// ? el reducer lo unico que hace es cmbiar el state
export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                //!hace una copia de state y el formulario le da true
                ...state,
                formulario: true
            }
        case OBTENERPROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGARPROYECTO: {
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorFormulario: false
            }
        }
        case VALIDAR_FORMULARIO: {
            return {
                ...state,
                errorFormulario: true
            }
        }
        // selecciona un proyecto actual
        case PROYECTO_ACTUAL: {
            console.log('caseo de proyecto actual')
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto.id === action.payload)
            }
        }
        case ELIMINAR_PROYECTO: {
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto.id !== action.payload),
                // para que se elimine el proyecto actual
                proyecto: null

            }
        }

        default:
            return state;
    }
};