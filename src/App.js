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
//? usando nuestro context personalizado
function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
              <Route exact path="/proyectos" component={Proyectos} />
            </Switch>
          </Router >
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
