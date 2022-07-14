import {
    ActionTabDeduccionReducer,
    Deduccion,
    StateTabDeduccionInterface,
    TabDeduccionTypes
} from '../../interfaces/TabDeduccion.interfaces';

const initialState: StateTabDeduccionInterface = {
    loading: true,
    Deducciones: [],
    DeduccionesFilter: [],
    Deduccion: {
        _id: '',
        ConceptName: '',
        SATKey: '',
        ISRTax: '',
        TaxBoth: ''

    }
};

export const tabDeduccionReducer = (
    state = initialState,
    action: ActionTabDeduccionReducer
) => {

    const substractByID = (e: Deduccion) => e._id !== action!.payload;
    const updateDeduccion = (Deduccion: Deduccion) => Deduccion._id === action.payload._id
        ? { ...Deduccion, ...action.payload.data }
        : Deduccion;

    const dictionary = {
        [TabDeduccionTypes.init]: () => ({
            Deducciones: action.payload,
            DeduccionesFilter: action.payload,
            loading: false
        }),
        [TabDeduccionTypes.add]: () => ({
            ...state,
            Deducciones: [...state.Deducciones, action.payload],
            DeduccionesFilter: [...state.DeduccionesFilter!, action.payload],
        }),
        [TabDeduccionTypes.substract]: () => ({
            ...state,
            Deducciones: state.Deducciones.filter(substractByID),
            DeduccionesFilter: state.Deducciones.filter(substractByID)
        }),
        [TabDeduccionTypes.scheduleDrop]: () => ({
            ...state,
            Deducciones: state.Deducciones.map(updateDeduccion),
            DeduccionesFilter: state.Deducciones.map(updateDeduccion)
        }),
        [TabDeduccionTypes.filter]: () => ({
            ...state,
            DeduccionesFilter: action.payload
        }),

        [TabDeduccionTypes.setDeduccion]: () => ({
            ...state,
            Deduccion: action.payload
        }),
        [TabDeduccionTypes.cleanDeduccion]: () => ({
            ...state,
            Deduccion: {}
        }),
    };

    return dictionary[action.type]() || state;
};
