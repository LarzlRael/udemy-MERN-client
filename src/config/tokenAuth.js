import clienteAxios from "./axios";

//? funcione que sirve para poder enviar los headers

const tokenAuth = (token) => {
    if (token) {
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;