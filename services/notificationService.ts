import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { SuccessfulAlert } from "../alerts/successAlerts";

export const getNotifications = async () => {
    try {
        const notification = await axios.get(`/notifications/sort`);
        return notification.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getNotification = async (_id: string) => {
    try {
        const notification = await axios.get(`/notifications/notification/${_id}`);
        return notification.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const postNotification = async (data: object) => {
    try {
        const notification = await axios.post(`/notifications`, { data });
        if (notification.data.data) {
            return SuccessfulAlert({ text: "Notificación creada correctamente." });
        } else return ErrorAlert({ text: "Notificación no creada." });
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const deleteNotification = async (_id: string) => {
    try {
        const notification = await axios.delete(`/notifications/${_id}`);
        if (notification.data.data) {
            return SuccessfulAlert({ text: "Notificación eliminada correctamente." });
        } else return ErrorAlert({ text: "Notificación no eliminada." });
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};