import {
    ActionTabEventualPayrollReducer,
    EventualPayroll,
    StateTabEventualPayrollInterface,
    TabEventualPayrollTypes
} from '../../interfaces/TabEventualPayroll.interfaces';

const initialState: StateTabEventualPayrollInterface = {
    loading: true,
    EventualPayrolls: [],
    EventualPayrollFilter: [],
    EventualPayroll: {
        id: '',
        _id: '',
        group_name: '',
        payroll_type: '',
        init_date: '',
        end_date: '',
        employees: 0,
        perception: 0,
        deduction: 0,
        total: 0,
        id_group_payroll: 0,
        status: '',
        statusProgress: '',
        AportacionPatronal: false,
        AnioPTU: '',
        MontoRepartirPTU: ''
    }
};


export const tabEventualPayrollReducer = (
    state = initialState,
    action: ActionTabEventualPayrollReducer
) => {

    const substractByID = (e: EventualPayroll) => e._id !== action!.payload;
    const updateEventualPayroll = (EventualPayroll: EventualPayroll) => EventualPayroll._id === action.payload._id
        ? { ...EventualPayroll, ...action.payload.data }
        : EventualPayroll;

    const dictionary = {
        [TabEventualPayrollTypes.init]: () => ({
            EventualPayrolls : action.payload,
            EventualPayrollFilter: action.payload,
            loading: false
        }),
        [TabEventualPayrollTypes.add]: () => ({
            ...state,
            EventualPayrolls: [...state.EventualPayrolls, action.payload],
            EventualPayrollFilter: [...state.EventualPayrollFilter!, action.payload],
        }),
        [TabEventualPayrollTypes.substract]: () => ({
            ...state,
            EventualPayrolls: state.EventualPayrolls.filter(substractByID),
            EventualPayrollFilter: state.EventualPayrolls.filter(substractByID)
        }),
        [TabEventualPayrollTypes.scheduleDrop]: () => ({
            ...state,
            EventualPayrolls: state.EventualPayrolls.map(updateEventualPayroll),
            EventualPayrollFilter: state.EventualPayrolls.map(updateEventualPayroll)
        }),
        [TabEventualPayrollTypes.filter]: () => ({
            ...state,
            EventualPayrollFilter: action.payload
        }),

        [TabEventualPayrollTypes.setEventualPayroll]: () => ({
            ...state,
            EventualPayroll: action.payload
        }),
        [TabEventualPayrollTypes.cleanEventualPayroll]: () => ({
            ...state,
            EventualPayroll: {}
        }),
    };

    return dictionary[action.type]() || state;
};