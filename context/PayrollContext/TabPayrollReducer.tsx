import {
    ActionTabPayrollReducer,
    Payroll,
    StateTabPayrollInterface,
    TabPayrollTypes
} from '../../interfaces/TabPayroll.interfaces';

const initialState: StateTabPayrollInterface = {
    loading: true,
    Payrolls: [],
    PayrollFilter: [],
    Payroll: {
        _id: '',
        PayrollType: '',
        InitDate: '',
        EndDate: '',
        PaymentFrecuency: '',
        PayrollGroups: {}
    }
};


export const tabPayrollReducer = (
    state = initialState,
    action: ActionTabPayrollReducer
) => {

    const substractByID = (e: Payroll) => e._id !== action!.payload;
    const updatePayroll = (Payroll: Payroll) => Payroll._id === action.payload._id
        ? { ...Payroll, ...action.payload.data }
        : Payroll;

    const dictionary = {
        [TabPayrollTypes.init]: () => ({
            Payrolls : action.payload,
            PayrollFilter: action.payload,
            loading: false
        }),
        [TabPayrollTypes.add]: () => ({
            ...state,
            Payrolls: [...state.Payrolls, action.payload],
            PayrollFilter: [...state.PayrollFilter!, action.payload],
        }),
        [TabPayrollTypes.substract]: () => ({
            ...state,
            Payrolls: state.Payrolls.filter(substractByID),
            PayrollFilter: state.Payrolls.filter(substractByID)
        }),
        [TabPayrollTypes.scheduleDrop]: () => ({
            ...state,
            Payrolls: state.Payrolls.map(updatePayroll),
            PayrollFilter: state.Payrolls.map(updatePayroll)
        }),
        [TabPayrollTypes.filter]: () => ({
            ...state,
            PayrollFilter: action.payload
        }),

        [TabPayrollTypes.setPayroll]: () => ({
            ...state,
            Payroll: action.payload
        }),
        [TabPayrollTypes.cleanPayroll]: () => ({
            ...state,
            Payroll: {}
        }),
    };

    return dictionary[action.type]() || state;
};