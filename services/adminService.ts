import { CallToAction } from "@material-ui/icons";
import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { SuccessfulAlert } from "../alerts/successAlerts";


export const getAdminByEmail = async (email: String) => {
    let admin = await axios.get(`/admin/${email}`)
        .then(res => {
            res.data.status = res.status;
            return res.data;
        })
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    return admin;
};

export const getAllAdmins = async () => {
    try {
        const admins = await axios.get(`/admin`);
        return admins.data;
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    };
};

export const getAdminProyectos = async () => {
    try {
        const admins = await axios.get(`/admin/proyectos/admins`);
        return admins.data
    } catch {
        return ErrorAlert({text: "Ocurrio un error con el servidor"})
    }
}

export const getAdminEnProyecto = async (proyecto: string) =>{
    try{
        const admins = await axios.get(`/admin/proyectos/admins/proyecto/?proyecto=${proyecto}`)
        return admins.data
    }catch {
        return ErrorAlert({text: "Ocurrio un error en el servicio"})
    }
}

export const getAdminsDisponibles = async(proyecto: string) =>{
    try {
        const admins = await axios.get(`/admin/proyectos/disponibles/?proyecto=${proyecto}`)
        return admins.data
    } catch {
        return ErrorAlert({text: "Ocurrio un error en el servicio"})
    }
}

export const deleteAdmin = async (_id: string) => {
    try {
        const admin = await axios.delete(`/admin/${_id}`);
        return SuccessfulAlert({ text: admin.data.data });
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    };
};

export const putAdminProyectos = async(idAdministrador: any, idProyectos: string, Proyectos: string, Mensaje: string) =>{
    try{
        const admin = await axios.put(`/admin/proyectos/prueba/?id=${idAdministrador}`, {idProyectos:idProyectos, Proyectos:Proyectos})
        if(admin.data.data){
            return SuccessfulAlert({text: `${Mensaje}`});
        } else{
            ErrorAlert({text: "Algo salio mal"})
        }
    } catch{
        return ErrorAlert({text: 'Ocurrio un error con el servidor'})
    }
}


export const postAdmin = async (email: string) => {
    try {
        const admin = await axios.post(`/admin`, { email });
        if (admin.data.data) {
            return SuccessfulAlert({ text: "El administrador se agregó exitosamente." });
        } else ErrorAlert({ text: "El correo ya existe." });
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    };
};


export const putAdmin = async (_id: string, email: string) => {
    try {
        const admin = await axios.put(`/admin/${_id}`, { email });
        return SuccessfulAlert({ text: admin.data.data });
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    };
};

export const postPermisos = async(idAdministrador: string, Permisos: any) =>{
    try{
        const admin = await axios.post(`/permisos/permiso/?id=${idAdministrador}`,{Permisos})
        if(admin.data.data){
            return SuccessfulAlert({text: "Se actualizaron los permisos"})
        } else {
            ErrorAlert({text: "Algo salio mal"})
        }
    }catch{
        ErrorAlert({text: "Algo salio mal"})
    }
};

export const getAdminCorreoProyectos = async(Usuario: string) =>{
    try{
        const admins = await axios.get(`/admin/permisos/usuario/proyectos/?id=${Usuario}`)
        return admins.data
    }catch{
        return ErrorAlert({text:"Ocurrio un error en el servidor"})
    }
}