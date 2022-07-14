import axios from "axios";
import { AnyAaaaRecord } from "dns";
import moment from "moment";
import { ErrorAlert } from "../alerts/errorAlert";
import { LoadingAlert, LoadingUser } from "../alerts/loadingAlerts";
import { SuccessfulAlert } from "../alerts/successAlerts";
import { WarningAlert } from "../alerts/WarningAlert";
import { validData } from "../helpers/Collaborator/validateInput";
const serverError = "Ocurrió un error con el servidor.";

export const getCandidates = async () => {
    try {
        let result = await axios.get(`/candidates`);
        return result.data.data;
    } catch {
        return ErrorAlert({ text: serverError });
    }
};

export const getCandidate = async (id: string, band: boolean, token: string = '') => {
    try {
        let result: any = {};
        if (band) result = await axios.get(`/candidates/${id}`);
        else result = await axios.get(`/register/${token}`);
        return result?.data?.data;
    } catch {
        return ErrorAlert({ text: serverError });
    }
};

export const postCandidate = async (data: any) => {
    try {
        let band = await validData(data);
        if (band === true) {
            LoadingAlert({});
            let CartaOferta = data.Archivos.CartaOferta;
            delete data.Archivos;
            let result = await axios.post(`/candidates`, data);
            if (result.data.data) {
                const formData = new FormData();
                formData.append('CartaOferta', CartaOferta);
                result = await axios.post(`/candidates/${result.data.data._id}/${result.data.data.CurrentToken}`, formData, {
                    headers: {
                        'Content-Type': `multipart/form-data;boundary=${formData}`
                    }
                });
                if (result.data.data) {
                    return true
                } else return false;
            } else {
                await ErrorAlert({ text: "El correo ya existe en la base de datos." });
                return WarningAlert({ text: "Por motivos de seguridad corrige los cambios y vuelve a subir la Carta Oferta del nuevo ingreso" });
            }
        } else return ErrorAlert({ text: band });
    } catch (err) {
        console.log(err)
        return ErrorAlert({ text: serverError });
    }
};


export const putCandidate = async (data: any, emailSent: string = 'no') => {

    if(typeof(data.Archivos.CartaOferta) === 'object'){
        try {
            let band = await validData(data);
            if (band === true) {
                LoadingUser();
                let CartaOferta = data.Archivos.CartaOferta;
                let result = await axios.put(`/candidates/${data._id}`, { data, emailSent });
                console.log('Esto regresa la actualizacion');
                console.log(result);
                if (result.data.message === 'ok'){
                    const formData = new FormData();
                    formData.append('CartaOferta', CartaOferta);
                    result = await axios.post(`/candidates/${result.data.data._id}/${result.data.data.CurrentToken}`, formData, {
                    headers: {
                        'Content-Type': `multipart/form-data;boundary=${formData}`
                    }
                });
                    
                    if (result.data.data) {
                        return true
                    } else return false;
                }else {
                   /* if (result.data.message === 'DuplicateKey'){
                        await ErrorAlert({ text: "El correo ya existe en la base de datos." });
                        return WarningAlert({ text: "Por motivos de seguridad corrige los cambios y vuelve a subir la Carta Oferta del nuevo ingreso" });
                   
                    }else{
                        await ErrorAlert({ text: "Ocurrio algun error coc el servidor" });
                        return WarningAlert({ text: "Por motivos de seguridad corrige los cambios y vuelve a subir la Carta Oferta del nuevo ingreso" });
                   
                    }*/
                    await ErrorAlert({ text: "El correo ya existe en la base de datos." });
                    return WarningAlert({ text: "Por motivos de seguridad corrige los cambios y vuelve a subir la Carta Oferta del nuevo ingreso" });
                   

                    }
            } else return ErrorAlert({ text: band });
        } catch (err) {
            console.log(err);
            return ErrorAlert({ text: serverError });
        }
    }else{
        try {
            let band = await validData(data);
            if (band === true) {
                LoadingUser();

                let result = await axios.put(`/candidates/${data._id}`, { data, emailSent });
                console.log(result);
                if (result.data.data){
                    if(result.data.data.codeName){
                    if (result.data.data.codeName === 'DuplicateKey'){
                        await ErrorAlert({ text: "El correo ya existe en la base de datos." });
                        return WarningAlert({ text: "Por motivos de seguridad corrige los cambios y vuelve a subir la Carta Oferta del nuevo ingreso" });
                   
                    }else{
                        await ErrorAlert({ text: "Ocurrio algun error con el servidor" });
                        return WarningAlert({ text: "Por motivos de seguridad corrige los cambios y vuelve a subir la Carta Oferta del nuevo ingreso" });
                   
                    }
                    }else{
                    return true;
                    }
                } 
            } else return ErrorAlert({ text: band });
        } catch (err:any) {
            console.log(err);
            if (err.codeName === 'DuplicateKey'){
                await ErrorAlert({ text: "El correo ya existe en la base de datos." });
                return WarningAlert({ text: "Por motivos de seguridad corrige los cambios y vuelve a subir la Carta Oferta del nuevo ingreso" });
           
            }
            return ErrorAlert({ text: serverError });
        }
        /*let band = await validData(data);
        if (band === true) {
            axios.put(`/candidates/${data._id}`, { data, emailSent })
            .then(response => {
                console.log(response)
                if (response.data.data){
                    if(response.data.data.codeName){
                    if (response.data.data.codeName === 'DuplicateKey'){
                        ErrorAlert({ text: "El correo ya existe en la base de datos." });
                        WarningAlert({ text: "Por motivos de seguridad corrige los cambios y vuelve a subir la Carta Oferta del nuevo ingreso" });
                   
                    }else{
                        ErrorAlert({ text: "Ocurrio algun error con el servidor" });
                        WarningAlert({ text: "Por motivos de seguridad corrige los cambios y vuelve a subir la Carta Oferta del nuevo ingreso" });
                   
                    }
                }else{
                    return true;

                }

                }
            })
            .catch(err => {
                console.log(err.response)
                return ErrorAlert({ text: serverError });

              //reject(err.response.data.error)
            })
        }*/
        
    }
    
};

export const endRegister = async (data: any) => {
    try {
        let band = await validData(data);
        if (band === true) {
            LoadingUser();
            let result = await axios.put(`/register/end/register/${data._id}`, data);
            if (result.data.data) return true;
        } else return ErrorAlert({ text: band });
    } catch (err) {
        console.log(err)
        return ErrorAlert({ text: serverError });
    }
};

export const rejectInformation = async (token: string, Comentario: string) => {
    try {
        LoadingAlert({ title: "Enviando Comentario..." });
        let result = await axios.patch(`/register/reject/${token}`, { Comentario });
        if (result.data.data) {
            return SuccessfulAlert({ text: "Se envió tu comentario, puedes seguir con tu registro." });

        } 
        else ErrorAlert({ text: "Tu sesion ha expirado favor de solicitarlo a tu reclutador." });
    } catch (err) {
        return ErrorAlert({ text: serverError });
    }
};

export const acceptInformation = async (token: string) => {
    try {
        LoadingAlert({ title: "Enviando Comentario..." });
        let result = await axios.patch(`/register/accept/${token}`);
        if (result.data.data) {
            await SuccessfulAlert({ text: "Puedes seguir con tu registro futuro seeker." });
        } else ErrorAlert({ text: "Tu sesión ha expirado favor de solicitarlo a tu reclutador." });
    } catch (err) {
        return ErrorAlert({ text: serverError });
    }
};

export const postFileAWS = async (e: any, id: string, desde:string,name?:string,remove_file?:boolean) => {
    debugger;
    try {
        LoadingAlert({ title: "Subiendo Archivo..." });
        let file = new FormData();
        file.append('document', e.target.files[0]);
        if (name) file.append('name', name);
        if (remove_file)file.append('remove_file', JSON.stringify(remove_file))
        
        const result = await axios.post(`/candidates/postFileHelper/file/${desde}/${id}/${e.target.name}`, file, {
            headers: {
                'Content-Type': `multipart/form-data;boundary=${file}`
            }
        });
        return result.data.data;
    } catch (err) {
        console.log(err)
        return ErrorAlert({ text: serverError });
    }
};

export const postFileIncidentAWS = async (e: any, id: string, desde:string,name?:string,remove_file?:boolean) => {
    try {

        LoadingAlert({ title: "Cargando..." });
        let file = new FormData();
        file.append('document', e.target.files[0]);
        if (name) file.append('name', name);
        if (remove_file)file.append('remove_file', JSON.stringify(remove_file))
        
        const result = await axios.post(`/candidates/postFileIncidentHelper/file/${desde}/${id}/${e.target.name}`, file, {
            headers: {
                'Content-Type': `multipart/form-data;boundary=${file}`
            }
        });
        return result.data.data;
    } catch (err) {
        console.log(err)
        return ErrorAlert({ text: serverError });
    }
};

export const postFileNoticeAWS = async (e: any, id: string, desde:string,name?:string,remove_file?:boolean) => {
    debugger;
    try {

        LoadingAlert({ title: "Cargando..." });
        let file = new FormData();
        file.append('document', e);
        if (name) file.append('name', name);
        if (remove_file)file.append('remove_file', JSON.stringify(remove_file))
        
        const result = await axios.post(`/candidates/postFileNoticeHelper/file/${desde}/${id}/${e.name}`, file, {
            headers: {
                'Content-Type': `multipart/form-data;boundary=${file}`
            }
        });
        return result.data.data;
    } catch (err) {
        console.log(err)
        return ErrorAlert({ text: serverError });
    }
};

export const postFilesEnterprisAWS = async (e: any, id: string, desde:string,name?:string,remove_file?:boolean) => {
    try {

        LoadingAlert({ title: "Cargando..." });
        let file = new FormData();
        file.append('document', e.target.files[0]);
        if (name) file.append('name', name);
        if (remove_file)file.append('remove_file', JSON.stringify(remove_file))
        
        if (name === 'LogoEmpresa'){
            const result = await axios.post(`/candidates/postFileLogoEnterpriseHelper/file/${desde}/${id}/${e.target.name}`, file, {
                headers: {
                    'Content-Type': `multipart/form-data;boundary=${file}`
                }
            });
            return result.data.data;
        }else{
            if (name === 'IMSSEmpresa'){
                const result = await axios.post(`/candidates/postFileIMSSEnterpriseHelper/file/${desde}/${id}/${e.target.name}`, file, {
                    headers: {
                        'Content-Type': `multipart/form-data;boundary=${file}`
                    }
                });
                return result.data.data;
            }else{
                if (name === 'SELLOEmpresa'){
                    const result = await axios.post(`/candidates/postFileSELLOEnterpriseHelper/file/${desde}/${id}/${e.target.name}`, file, {
                        headers: {
                            'Content-Type': `multipart/form-data;boundary=${file}`
                        }
                    });
                    return result.data.data;
                }else{
                    return ErrorAlert({ text: serverError });
                }
                
            }
            
        }
        
        
    } catch (err) {
        console.log(err)
        return ErrorAlert({ text: serverError });
    }
};

export const postLogoCompanyAWS = async (e: any, id: string, desde:string,name?:string,remove_file?:boolean) => {

    debugger;
    try {

        LoadingAlert({ title: "Cargando..." });
        let file = new FormData();
        file.append('document', e);
        if (name) file.append('name', name);
        if (remove_file)file.append('remove_file', JSON.stringify(remove_file))
        
        const result = await axios.post(`/candidates/postLogoCompanyHelper/file/${desde}/${id}/${e.name}`, file, {
            headers: {
                'Content-Type': `multipart/form-data;boundary=${file}`
            }
        });
        return result.data.data;
    } catch (err) {
        console.log(err)
        return ErrorAlert({ text: serverError });
    }
};

export const postFileAWS2 = async (e: any, id: string) => {
    try {
        LoadingAlert({ title: "Subiendo Archivo..." });
        let file = new FormData();
        file.append('document', e.target.files[0]);
        const result = await axios.post(`/candidates/upload/file/${id}/AvisoRetencion_PDF`, '', {
            headers: {
                'Content-Type': `multipart/form-data;boundary=NA`
            }
        });
        return result.data.data;
    } catch (err) {
        console.log(err)
        return ErrorAlert({ text: serverError });
    }
};

export const deleteFileAWS = async (id: string, type: string) => {
    try {
        LoadingAlert({ title: "Eliminado Archivo..." });
        const result = await axios.delete(`/candidates/delete/file/${id}`, { data: { type } });
        return result.data.data;
    } catch (err) {
        console.log(err)
        return ErrorAlert({ text: serverError });
    }
};

export const declineCandidate = async (id: string, reason: string) => {
    try {
        LoadingAlert({ title: "Declinando Candidato..." });
        const result = await axios.put(`/candidates/decline/${id}`, { reason });
        if (result.data.data) {
            await SuccessfulAlert({ text: "Se ha declinado al nuevo ingreso correctamente." });
        } else ErrorAlert({ text: serverError });
    } catch (err) {
        console.log(err)
        return ErrorAlert({ text: serverError });
    }
};

export const convertCandidate = async (id: string, FechaIngreso: string, Name: string) => {
    try {
        LoadingAlert({ title: "Convirtiendo Candidato..." });
        const result = await axios.put(`/candidates/convert/${id}`, { FechaIngreso });
        if (result.data.band) {
            await SuccessfulAlert({ title: "¡Conversión exitosa!", text: "Acabas de sumar a un nuevo Seeker"});           
        } else ErrorAlert({ text: result.data.data });
    } catch (err) {
        console.log(err)
        return ErrorAlert({ text: serverError });
    }
};

export const updatePasswordCandidate = async (email: string, password: string) => {
    try {
        LoadingAlert({ title: "Guardando Datos..." });
        const result = await axios.put(`/register/update/password/candidate/${email}`, { password });
        if (result.data.data) {
            return result.data.data;
        } else ErrorAlert({ text: result.data.data });
    } catch (err) {
        console.log(err)
        return ErrorAlert({ text: serverError });
    }
};