import axios from "axios";
import { ErrorAlert } from "../../alerts/errorAlert";
import { SuccessfulAlert } from "../../alerts/successAlerts";

export const getBasicUserService = async (email: String) => {

    let user = await axios.post('/', { email })
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));

    if (user.error) return alert("error");

    return user;

};

export const putUserPuestos = async(idUser: any, idPuesto: string, Puesto: string, Mensaje: string) =>{
    try{
        const user = await axios.put(`/user/puestos/?id=${idUser}`, {idPuesto:idPuesto, Puesto:Puesto})
        if(user.data.data){
            return SuccessfulAlert({text: `${Mensaje}`});
        } else{
            ErrorAlert({text: "Algo salio mal"})
        }
    } catch{
        return ErrorAlert({text: 'Ocurrio un error con el servidor'})
    }
}

export const putUserPuestosElimina = async(idUser: any, idPuesto: string, Puesto: string, Mensaje: string) =>{
    try{
        const user = await axios.put(`/user/puestos/elimina/?id=${idUser}`, {idPuesto:idPuesto, Puesto:Puesto})
        if(user.data.data){
            return SuccessfulAlert({text: `${Mensaje}`});
        } else{
            ErrorAlert({text: "Algo salio mal"})
        }
    } catch{
        return ErrorAlert({text: 'Ocurrio un error con el servidor'})
    }
}


export const getUsersDisponiblesPuesto = async(puesto: string) =>{
    try {
        const user = await axios.get(`/user/puestos/disponibles/?puesto=${puesto}`)
        return user.data
    } catch {
        return ErrorAlert({text: "Ocurrio un error en el servicio"})
    }
}

export const getUsersPuesto = async(puesto: string) =>{
    try {
        const user = await axios.get(`/user/puestos/?puesto=${puesto}`)
        return user.data
    } catch {
        return ErrorAlert({text: "Ocurrio un error en el servicio"})
    }
}

export const getInfoPuesto = async(id:any) =>{
    try {
        const user = await axios.get(`/puestos/puesto/?id=${id}`)
        return user.data
    } catch {
        return ErrorAlert({text: "Ocurrio un error en el servicio"})
    }
}