import { 
    ActionTabNonWorkingDayReducer, 
    NonWorkingDay,
    StateTabNonWorkingDayTypesInterface,
    TabNonWorkingDayTypes
} from '../../interfaces/TabNonWorkingDay.interfaces';

const initialState: StateTabNonWorkingDayTypesInterface = {
    loading: true,
    NonWorkingDays: [],
    NonWorkingDayFilter: [],
    NonWorkingDay: {
        _id: '',
        calendarId: '',
        name: '',
        initDate: '',
        endDate: '',
        status: ''
    }
};

export const TabNonWorkingDayReducer = (
    state = initialState,
    action: ActionTabNonWorkingDayReducer
) => {

    const substractByID = (e: NonWorkingDay) => e._id !== action!.payload;
    const updateNonWorkingDay = (NonWorkingDay: NonWorkingDay) => NonWorkingDay._id === action.payload._id
        ? { ...NonWorkingDay, ...action.payload.data }
        : NonWorkingDay;

    const dictionary = {
        [TabNonWorkingDayTypes.init]: () => ({
            NonWorkingDays: action.payload,
            NonWorkingDayFilter: action.payload,
            loading: false
        }),
        [TabNonWorkingDayTypes.add]: () => ({
            ...state,
            NonWorkingDays: [...state.NonWorkingDays, action.payload],
            NonWorkingDayFilter: [...state.NonWorkingDayFilter!, action.payload],
        }),
        [TabNonWorkingDayTypes.substract]: () => ({
            ...state,
            NonWorkingDays: state.NonWorkingDays.filter(substractByID),
            NonWorkingDayFilter: state.NonWorkingDays.filter(substractByID)
        }),
        [TabNonWorkingDayTypes.scheduleDrop]: () => ({
            ...state,
            NonWorkingDays: state.NonWorkingDays.map(updateNonWorkingDay),
            NonWorkingDayFilter: state.NonWorkingDays.map(updateNonWorkingDay)
        }),
        [TabNonWorkingDayTypes.filter]: () => ({
            ...state,
            NonWorkingDayFilter: action.payload
        }),

        [TabNonWorkingDayTypes.setNonWorkingDay]: () => ({
            ...state,
            NonWorkingDays: action.payload
        }),
        [TabNonWorkingDayTypes.cleanNonWorkingDay]: () => ({
            ...state,
            NonWorkingDays: {}
        }),
    };

    return dictionary[action.type]() || state;
};