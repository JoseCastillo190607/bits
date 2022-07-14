import { Dispatch} from "react";
import { getPolitic } from "../services/PoliticService";
import { Politic, TabPoliticTypes } from '../interfaces/TabPolitic.interfaces';

export const startPolitic = async (dispatch: Dispatch<any>, politic: string) => {
    const Politic = await getPolitic();
    let ArrayFiltrado = Politic.data.filter((r:any) => politic.includes(r.politic))
    dispatch(setPolitic(ArrayFiltrado));
};

export const setPolitics: any = (Politic: Politic[]) => ({
    type: TabPoliticTypes.init,
    payload: Politic
});

export const setPolitic = (Politic: Politic) => ({
    type: TabPoliticTypes.setPolitic,
    payload: Politic
});

export const cleanPolitic = () => ({
    type: TabPoliticTypes.cleanPolitic
});

export const filterPolitic = (Politic: Politic[]) => ({
    type: TabPoliticTypes.filter,
    payload: Politic
});

export const substractPolitic = (id: string) => ({
    type: TabPoliticTypes.substract,
    payload: id
});


export const addNewPolitic = (Politic: Politic) => ({
    type: TabPoliticTypes.add,
    payload: Politic
});