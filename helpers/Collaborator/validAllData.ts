import { endRegister } from "../../services/candidateService";

export const validAllData = async (state: any) => {
    if (state.progress[1] < 100) return "Completa tu Informacion de Datos Personales";
    if (state.progress[2] < 100) return "Completa tu Informacion de Salud y Emergencias";
    if (state.progress[3] < 100) return "Completa tu Informacion de Datos para el Pago";
    if (state.progress[4] < 100) return "Completa tu Informacion de Expediente";

    if (state.collaborator.Estatus !== "accepted") return "Tu proceso no puede finalizar, acepta tu Información de Alta";

    await endRegister(state.collaborator);
    return true;
}