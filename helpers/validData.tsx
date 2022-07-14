import moment from 'moment';
import Swal from 'sweetalert2';
import { WarningAlert } from '../alerts/WarningAlert';
import { CollaboratorModal } from '../interfaces/TabCollaborator.interfaces';

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const especiales = Array.from(",.-;:_´ç¨Ç`+^*¡'=)(/&%$·!„…–}{~[]‚´≠”“÷¬∞¢#@|><");

export const validateDataCollaborator = (data: CollaboratorModal) => {
    const currentDate = moment();
    const validYears = 10;
    const isAdult = (birthday: string) => currentDate.year() - moment(birthday).year() >= validYears;

    if (
        data.Nombre === "" ||
        data.ApellidoPaterno === "" ||
        data.FechaNacimiento === "" ||
        data.FechaIngreso === "" ||
        data.email === "" ||
        data.Sede === "" ||
        data.Cliente === "" ||
        data.Proyecto === "" ||
        data.Proyecto === " "
    ) return WarningAlert({ title: "¡Error!", text: "¡Por favor, ingresa todos los datos!" }).then(() => false)

    // Verify Email
    if (!validateEmail(data.email)) return WarningAlert({ title: "¡Error!", text: "¡Por favor, ingresa un email válido!" }).then(() => false);

    if (!valString(data.Nombre!, 'nombre')) return false;
    if (!valString(data.ApellidoPaterno!, 'apellido paterno')) return false;
    if (!valEmail(data.email)) return false;
    if (moment(data.FechaIngreso).isAfter(currentDate)) return WarningAlert({ title: "¡Error!", text: "¡Por favor, ingresa una fecha de ingreso válida!" }).then(() => false);
    if (!isAdult(data.FechaNacimiento)) return WarningAlert({ title: "¡Error!", text: `¡El colaborador debe ser mayor a ${validYears} años!` }).then(() => false);

    return true

};

const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const valString = (str: string, type: string) => {

    if (str === "") {
        return alertForm(type);
    };

    if (str.trim().length < 3) {
        return alertForm(type);
    };

    if (numbers.some(v => str.includes(v))) {
        return alertForm(type);
    }

    if (especiales.some(v => str.includes(v))) {
        return alertForm(type);
    }

    return true
};

const valEmail = (email: string) => {

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(email).toLowerCase());

    const host = email.split('@');

    if (!isValid) {
        return alertForm('correo');
    };

    if (numbers.some(v => host[1].includes(v))) {
        return alertForm('correo');
    }

    return true
};


const alertForm = (type: string) => {
    Swal.fire({
        title: "¡Error!",
        text: `Por favor, ingresa un ${type} válido`,
        icon: "warning",
        confirmButtonText: "Entendido",
    }).then((dismiss) => {
        if (dismiss) {
            return false;
        };
    });
};