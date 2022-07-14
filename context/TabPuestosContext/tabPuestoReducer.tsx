import {
    ActionTabPuestoReducer,
    Puesto,
    StateTabPuestoInterface,
    TabPuestoTypes
} from '../../interfaces/TabPuesto.interfaces';

const initialState: StateTabPuestoInterface = {
    loading: true,
    Puestos: [],
    PuestosFilter: [],
    Puesto: {
        _id: '',
        NombrePuesto: '',
        AreaProyecto: '',
        PuestoSuperior: '',
        Descripcion: '',
    }
};

export const tabPuestoReducer = (
    state = initialState,
    action: ActionTabPuestoReducer
) => {

    const substractByID = (e: Puesto) => e._id !== action!.payload;
    const updatePuesto = (Puesto: Puesto) => Puesto._id === action.payload._id
        ? { ...Puesto, ...action.payload.data }
        : Puesto;

    const dictionary = {
        [TabPuestoTypes.init]: () => ({
            Puestos: action.payload,
            PuestosFilter: action.payload,
            loading: false
        }),
        [TabPuestoTypes.add]: () => ({
            ...state,
            Puestos: [...state.Puestos, action.payload],
            PuestosFilter: [...state.PuestosFilter!, action.payload],
        }),
        [TabPuestoTypes.substract]: () => ({
            ...state,
            Puestos: state.Puestos.filter(substractByID),
            PuestosFilter: state.Puestos.filter(substractByID)
        }),
        [TabPuestoTypes.scheduleDrop]: () => ({
            ...state,
            Puestos: state.Puestos.map(updatePuesto),
            PuestosFilter: state.Puestos.map(updatePuesto)
        }),
        [TabPuestoTypes.filter]: () => ({
            ...state,
            PuestosFilter: action.payload
        }),

        [TabPuestoTypes.setPuesto]: () => ({
            ...state,
            Puesto: action.payload
        }),
        [TabPuestoTypes.cleanPuesto]: () => ({
            ...state,
            Puesto: {}
        }),
    };

    return dictionary[action.type]() || state;
};