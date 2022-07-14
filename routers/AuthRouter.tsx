import { Route, Switch } from "react-router";
import CandidateScreen from "../screens/CandidateScreen";
import LoginScreen from "../screens/LoginScreen";
import LoginScreen2 from "../screens/LoginScreen2";
import MiEmpresaScreen from "../screens/MiEmpresaScreen";
import PasswordScreen from "../screens/PasswordScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RecoverPassword from '../screens/RecoverPassword';

import '../styles/Welcome.css';

const BitsPublicRouter = () => {
    return (
        <div>
            <Switch>
                <Route
                    path="/login"
                    component={LoginScreen2}
                />

                <Route
                    path="/candidate/:register/:token/:tab"
                    component={CandidateScreen}
                />
                {/* Regresar el componente de WelcomeScreen */}
                <Route
                    path="/Bienvenido"
                    component={WelcomeScreen}
                />

                <Route
                    path="/Contraseña/:email"
                    component={PasswordScreen}
                />
                <Route 
                    path="/Miempresa"
                    component={MiEmpresaScreen}
                />
                <Route 
                    path="/RecoverPassword"
                    component={RecoverPassword}
                />
            </Switch>
        </div>
    )
}

export default BitsPublicRouter;
