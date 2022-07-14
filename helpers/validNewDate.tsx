import moment from "moment";
import { WarningAlert } from "../alerts/WarningAlert"
import { StateCalendarModalForm } from "../interfaces/Calendar.interfaces"

export const validDate = async (data: StateCalendarModalForm) => {
    const currentDate = moment();
    if (
        data.tipo === "" ||
        data.titulo === "" ||
        data.descripcion === "" ||
        data.fechaInicio === "" ||
        data.fechaFinal === "" ||
        data.proyecto.length === 0
    ) return WarningAlert({ title: "¡Error!", text: "¡Por favor, ingresa todos los datos!" }).then(() => false)

    const start = moment(data.fechaInicio);
    const end = moment(data.fechaFinal);
    
    if (start.isBefore(currentDate)) return WarningAlert({ title: "¡Error!", text: "¡La fecha inicial debe ser mayor a la actual!" }).then(() => false);
    if (end.isBefore(start)) return WarningAlert({ title: "¡Error!", text: "¡La fecha final debe ser mayor a la fecha inicial!" }).then(() => false);
    if (data.titulo.length <= 5) return WarningAlert({ title: "¡Error!", text: "¡Ingresa un título mayor a 5 caracteres!" }).then(() => false);
    if (data.descripcion.length <= 6) return WarningAlert({ title: "¡Error!", text: "¡Por favor, describe más sobre el evento!" }).then(() => false);
    return true;
}