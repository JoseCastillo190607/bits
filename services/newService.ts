import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { LoadingAlert, LoadingFile } from "../alerts/loadingAlerts";
import { SuccessfulAlert } from "../alerts/successAlerts";
import { INew } from "../interfaces/News.interfaces";
const serverError = "Ocurrio un error con el servidor.";

export const getNews = async () => {
    try {
        let news = await axios.get(`/news`);
        return news.data.data;
    } catch {
        return ErrorAlert({ text: serverError });
    }
}

export const postNew = async (data: INew) => {
    try {
        if (data.Image) {
            LoadingFile();
            let file = new FormData();
            file.append('document', data.File);
            const ImageUri = await axios.post(`/news/image`, file, {
                headers: {
                    'Content-Type': `multipart/form-data;boundary=${file}`
                }
            });
            data.ImageUri = ImageUri.data.data;
        }
        LoadingAlert({ title: "Creando noticia..." });
        await axios.post(`/news`, data);
        return SuccessfulAlert({ text: "Noticia creada correctamente." });
    } catch {
        return ErrorAlert({ text: serverError });
    }
}

export const resendNew = async (data: INew) => {
    try {
        if (data.Image) {
            LoadingFile();
            let file = new FormData();
            file.append('document', data.File);
            const ImageUri = await axios.post(`/news/image`, file, {
                headers: {
                    'Content-Type': `multipart/form-data;boundary=${file}`
                }
            });
            await axios.delete(`/news/delete/image`, { data: { key: data.ImageUri } });
            data.ImageUri = ImageUri.data.data;
        }
        LoadingAlert({ title: "Reenviando noticia..." });
        await axios.put(`/news`, data);
        return SuccessfulAlert({ text: "¡Éxito! Noticia guardada correctamente" });
    } catch {
        return ErrorAlert({ text: serverError });
    }
}

export const deletetNew = async (id: string) => {
    try {
        LoadingAlert({ title: "Eliminando noticia..." });
        await axios.delete(`/news/${id}`);
        return SuccessfulAlert({ text: "Noticia eliminada correctamente." });
    } catch {
        return ErrorAlert({ text: serverError });
    }
}

export const getCurrentNews = async () => {
    try {
        let result = await axios.get(`/news/getCurrentNews`);
        return result.data.data;
    } catch {
        return ErrorAlert({ text: serverError });
    }
}