import { BrowserRouter as Router, Switch, } from "react-router-dom";
import PublicRouter from './PublicRouter';
import BitsPublicRouter from './AuthRouter';
import PrivateRouter from "./PrivateRouter";
import BitsRouter from './BitsRouter';
import { useEffect, } from "react";
import { firebase } from '../firebase/firebase-config';
import { AdminContext } from '../context/AdminContext/AdminContext';
import { startLogin, startLogout } from '../actions/auth';
import { useContext } from 'react';
import Loading from '../components/Loading';


export const AppRouter = () => {
    const { adminState, adminDispatch } = useContext(AdminContext);
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user: any) => {
            // Validate admin and session
            if (user) {
                startLogin(adminDispatch!, user/* , setIsLoggedIn */);
            } else {
                firebase.auth().signOut();
                startLogout(adminDispatch!);
                /* setIsLoggedIn(false); */
            }
        });
    }, [adminDispatch]);
    if (adminState!.loading) return <Loading />
    const Recover = true
    //console.log(adminState!.logged)
    return (
        <Router>
            <div>
                <Switch>
                    {/* Login */}
                    <PublicRouter
                        path="/login"
                        component={BitsPublicRouter}
                        isLoggedIn={adminState!.logged}
                    />

                    {/* Nuevo Ingreso */}
                    <PublicRouter
                        path="/candidate"
                        component={BitsPublicRouter}
                        isLoggedIn={adminState!.logged}
                    />

                    {/* Bienvenido Usuario */}
                    <PublicRouter
                        path="/Bienvenido"
                        component={BitsPublicRouter}
                        isLoggedIn={adminState!.logged}
                    />

                    {/* Contraseña Usuario */}
                    <PublicRouter
                        path="/Contraseña"
                        component={BitsPublicRouter}
                        isLoggedIn={adminState!.logged}
                    />

                    {/* Recuperar contraseña */}
                   <PublicRouter
                        path="/RecoverPassword"
                        component={BitsPublicRouter}
                        isLoggedIn={adminState!.logged}
                    />

                    {/* Bits */}
                    <PrivateRouter
                        path="/"
                        component={BitsRouter}
                        isLoggedIn={adminState!.logged}
                    />
                    <PrivateRouter
                        path="/Miempresa"
                        component={BitsPublicRouter}
                        isLoggedIn={adminState!.logged}
                    />
                   
                </Switch>
            </div>
        </Router>
    )
}
