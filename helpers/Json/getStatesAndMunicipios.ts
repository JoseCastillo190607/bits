import { estadosMunicipios } from "./estados-municipios";
import { paisesEstados } from "./paises-estados";

export const getStates = (country: string) => {
    let states = paisesEstados.filter(({ country: pais }: any) => country === pais);
    return states[0].states || [];
}

export const getMunicipios = (state: string) => {
    return estadosMunicipios[state] || [];
}