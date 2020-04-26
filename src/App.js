import React from 'react';

// ?  habilitar el router en nuestro proyecto
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//! importar nuestros componentes
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

//* ipmportando nuestros contexts
import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tasks/taskState';
import AlertaState from './context/alertas/alertaState';
import Authstate from './context/auth/authState';
import tokenAuth from './config/tokenAuth';
//* componente para poder proteger nuestras rutas
import RutaPrivada from './rutas/RutaPrivada';
//? usando nuestro context personalizado

//? Revisar si tenemos token

const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}

function App() {

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <Authstate>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router >
          </Authstate>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
