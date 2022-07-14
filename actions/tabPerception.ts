import { Dispatch} from "react";
import { getPerceptions } from '../services/payrollServices/PerceptionService';
import { Perception, TabPerceptionTypes } from '../interfaces/TabPerceptions.interfaces';

export const startPerception = async (dispatch: Dispatch<any>, perception: string) => {
    const Perception = await getPerceptions();
    let ArrayFiltrado = Perception.data.filter((r:any) => perception.includes(r.perception))
    dispatch(setPerception(ArrayFiltrado));
};

export const setPerceptions: any = (Perception: Perception[]) => ({
    type: TabPerceptionTypes.init,
    payload: Perception
});

export const setPerception = (Perception: Perception) => ({
    type: TabPerceptionTypes.setPerception,
    payload: Perception
});

export const cleanPerception = () => ({
    type: TabPerceptionTypes.cleanPerception
});

export const filterPerception = (Perception: Perception[]) => ({
    type: TabPerceptionTypes.filter,
    payload: Perception
});

export const substractPerception = (id: string) => ({
    type: TabPerceptionTypes.substract,
    payload: id
});


export const addNewPerception = (Perception: Perception) => ({
    type: TabPerceptionTypes.add,
    payload: Perception
});