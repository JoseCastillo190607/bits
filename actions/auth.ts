import {
    Dispatch,
} from 'react';
import { ErrorAlert } from '../alerts/errorAlert';
import { WarningAlert } from '../alerts/WarningAlert';
import { AdminProps, DispatchAdmin } from '../context/AdminContext/AdminContext';
import { AdminTypes } from '../context/AdminContext/AdminTypes';
import { firebase } from '../firebase/firebase-config';
import {
    loginGoogleService,
    logoutService,
    renewTokenService
} from '../services/auth/authService';
import { csrfService } from '../services/auth/csrfService';
import axios from 'axios';
import { AttentionAlert2 } from "../alerts/attentionAlert2";

export const startLogin = async (
    adminDispatch: Dispatch<DispatchAdmin>,
    user: firebase.User,
) => {

    // Check if exist session
    if (!localStorage.getItem('token')) {
        const resp = await loginGoogleService({ Nombre: user.displayName, email: user.email!, img: user.photoURL! });
        console.log('datos usuario',resp)
        if (resp.error) {
            const { error } = resp;
            firebase.auth().signOut();
            localStorage.removeItem('token');
            if (resp.status === 404) return AttentionAlert2({ text: error });

            return ErrorAlert({ text: error });
        };

        const { admin, token } = resp.data;
        // Get CSRF Token
        const csrf = await csrfService();
        if (csrf.error) return ErrorAlert({ text: csrf.error });

        localStorage.setItem('token', token);
        axios.defaults.headers.common['x-token'] = token;

        adminDispatch(login({
            id: admin._id,
            Nombre: admin.Nombre,
            Usuario: user.email!,
            image: user.photoURL!,
            Cargando: false,
            Proyectos:{
                idProyectos: admin.Proyectos.idProyectos,
                Proyectos: admin.Proyectos.Proyectos
            },
            Permisos:{
                tipoAdmin: admin.Permisos.tipoAdmin
            },
            PermisosContex: admin.Permisos
        }));

        // setIsLoggedIn(true)

    } else {
        // Get CSRF Token
        await csrfService().then((csrf) => {

            if (csrf.error) return ErrorAlert({ text: csrf.error });

            // Renew Token to keep alive session
            renewTokenService().then((resp) => {

                if (resp) {

                    // Close session if there is no session
                    if (resp.error) {
                        firebase.auth().signOut();
                        localStorage.removeItem('token');
                        return ErrorAlert({ text: resp.error })
                    }

                    const { admin, token } = resp.data;

                    localStorage.setItem('token', token);

                    adminDispatch(login({
                        id: admin._id,
                        Nombre: admin.Nombre,
                        Usuario: user.email!,
                        image: user.photoURL!,
                        Cargando: false,                
                        Proyectos:{
                            idProyectos: admin.Proyectos.idProyectos,
                            Proyectos: admin.Proyectos.Proyectos
                        },
                        Permisos:{
                            tipoAdmin: admin.Permisos.tipoAdmin
                        },
                        PermisosContex: admin.Permisos
                    }))
                    // setIsLoggedIn(true)
                }

            });
        });

    };
 
};

export const startLogout = async (dispatch: Dispatch<DispatchAdmin>) => {
    await logoutService();

    dispatch(logout());
};

export const login: any = (admin: AdminProps) => ({
    type: AdminTypes.login,
    payload: admin
});

export const logout: any = () => ({
    type: AdminTypes.logout
});