import axios from "axios";
import { firebase } from '../../firebase/firebase-config';

type loginUsPsType = {
    email: String,
    password: String
};

type loginGoogleAdmin = {
    Nombre: string | null;
    email: String,
    img: String
};

// Login with google button
export const loginGoogleService = async (user: loginGoogleAdmin) => {

    let res = await axios.put('/auth/google/', user)
        .then(res => {
            res.data.status = res.status;
            return res.data
        })
        .catch((err) => {
            const { error } = err.response?.data || false;

            return {
                error: error ? error : err,
                status: err.response?.status | 500
            };

        });

    return res;
};

// Login firebase
export const logwithfirebase = async (user: loginGoogleAdmin) => {

    let res = await axios.put('/auth/google/', user)
        .then(res => {
            res.data.status = res.status;
            return res.data
        })
        .catch((err) => {
            const { error } = err.response?.data || false;

            return {
                error: error ? error : err,
                status: err.response?.status | 500
            };

        });

    return res;
};

export const getPermisosAdmin = async(email:string) =>{
    try{
        let result: any = {};
        result = await axios.get(`/admin/permisos/usuario/?email=${email}`)
        return result?.data?.data
    }catch{
        return (console.log('error'))
    }
}

// Login with credantials (in future)
export const loginUsPsService = async (credentials: loginUsPsType) => {

    let res = await axios.post('/auth', credentials)
        .then(res => res.data)
        .catch((error) => {
            return { error: "Ocurrio un error con el servidor." };
        });

    return res;

};

// Renew token to keep session live
export const renewTokenService = async () => {

    const token = localStorage.getItem('token');

    // Send token in headers when page or browser is reload
    if (token) axios.defaults.headers.common['x-token'] = token;

    let res = await axios.get('/auth/renew')
        .then(res => res.data)
        .catch((err) => {
            const { error } = err.response?.data || false;

            return {
                error: error ? error : "Ocurrio un error con el servidor.",
                status: err.response?.status | 500
            };
        });

    return res;
};

// Expire session
export const logoutService = async () => {
    const res = await axios.get('/auth/logout')
        .then(res => res)
        .catch((err) => {
            const { error } = err.response?.data || false;

            return {
                error: error ? error : "Ocurrio un error con el servidor.",
                status: err.response?.status | 500
            };
        });

    localStorage.removeItem('token');
    firebase.auth().signOut();

    return res;
}