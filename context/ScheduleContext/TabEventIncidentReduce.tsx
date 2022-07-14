import { 
    ActionTabEventIncidentReducer, 
    EventIncident,
    StateTabEventIncidentTypesInterface,
    TabEventIncidentTypes
} from '../../interfaces/tabEventIncident.interfaces';

const initialState: StateTabEventIncidentTypesInterface = {
    loading: true,
    EventIncidents: [],
    EventIncidentFilter: [],
    EventIncident: {
        _id: '',
        calendarId: '',
        name: '',
        initDate: '',
        endDate: '',
        status: ''
    }
};

export const TabEventIncidentReducer = (
    state = initialState,
    action: ActionTabEventIncidentReducer
) => {

    const substractByID = (e: EventIncident) => e._id !== action!.payload;
    const updateEventIncident = (EventIncident: EventIncident) => EventIncident._id === action.payload._id
        ? { ...EventIncident, ...action.payload.data }
        : EventIncident;

    const dictionary = {
        [TabEventIncidentTypes.init]: () => ({
            EventIncidents: action.payload,
            EventIncidentFilter: action.payload,
            loading: false
        }),
        [TabEventIncidentTypes.add]: () => ({
            ...state,
            EventIncidents: [...state.EventIncidents, action.payload],
            EventIncidentFilter: [...state.EventIncidentFilter!, action.payload],
        }),
        [TabEventIncidentTypes.substract]: () => ({
            ...state,
            EventIncidents: state.EventIncidents.filter(substractByID),
            EventIncidentFilter: state.EventIncidents.filter(substractByID)
        }),
        [TabEventIncidentTypes.scheduleDrop]: () => ({
            ...state,
            EventIncidents: state.EventIncidents.map(updateEventIncident),
            EventIncidentFilter: state.EventIncidents.map(updateEventIncident)
        }),
        [TabEventIncidentTypes.filter]: () => ({
            ...state,
            EventIncidentFilter: action.payload
        }),

        [TabEventIncidentTypes.setEventIncident]: () => ({
            ...state,
            EventIncidents: action.payload
        }),
        [TabEventIncidentTypes.cleanEventIncident]: () => ({
            ...state,
            EventIncidents: {}
        }),
    };

    return dictionary[action.type]() || state;
};