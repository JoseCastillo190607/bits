import {
    ActionTabPerceptionReducer,
    Perception,
    StateTabPerceptionInterface,
    TabPerceptionTypes
} from '../../interfaces/TabPerceptions.interfaces';

const initialState: StateTabPerceptionInterface = {
    loading: true,
    Perceptions: [],
    PerceptionsFilter: [],
    Perception: {
        _id: '',
        ConceptName: '',
        SATKey: '',
        ConceptType: '',
        AccountingAccount: '',
        PayType: '',
        ISRTax: '',
        ISNTax: '',
        SocialSecurity: '',
        IntegratesIMSS: '',
        TaxBoth: ''
    }
};

export const tabPerceptionReducer = (
    state = initialState,
    action: ActionTabPerceptionReducer
) => {

    const substractByID = (e: Perception) => e._id !== action!.payload;
    const updatePerception = (Perception: Perception) => Perception._id === action.payload._id
        ? { ...Perception, ...action.payload.data }
        : Perception;

    const dictionary = {
        [TabPerceptionTypes.init]: () => ({
            Perceptions: action.payload,
            PerceptionsFilter: action.payload,
            loading: false
        }),
        [TabPerceptionTypes.add]: () => ({
            ...state,
            Perceptions: [...state.Perceptions, action.payload],
            PerceptionsFilter: [...state.PerceptionsFilter!, action.payload],
        }),
        [TabPerceptionTypes.substract]: () => ({
            ...state,
            Perceptions: state.Perceptions.filter(substractByID),
            PerceptionsFilter: state.Perceptions.filter(substractByID)
        }),
        [TabPerceptionTypes.scheduleDrop]: () => ({
            ...state,
            Perceptions: state.Perceptions.map(updatePerception),
            PerceptionsFilter: state.Perceptions.map(updatePerception)
        }),
        [TabPerceptionTypes.filter]: () => ({
            ...state,
            PerceptionsFilter: action.payload
        }),

        [TabPerceptionTypes.setPerception]: () => ({
            ...state,
            Perception: action.payload
        }),
        [TabPerceptionTypes.cleanPerception]: () => ({
            ...state,
            Perception: {}
        }),
    };

    return dictionary[action.type]() || state;
};
