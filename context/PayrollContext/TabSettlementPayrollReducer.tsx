import {
    ActionTabSettlementPayrollReducer,
    SettlementPayroll,
    StateTabSettlementPayrollInterface,
    TabSettlementPayrollTypes
} from '../../interfaces/TabSettlementPayroll.interfaces';

const initialState: StateTabSettlementPayrollInterface = {
    loading: true,
    SettlementPayrolls: [],
    SettlementPayrollFilter: [],
    SettlementPayroll: {
        _id: '',
        dischargeDate: '',
        dischargeType: '',
        reason: '',
        recessionJob: '',
        Taxable: false,
        NotTaxable: false,
        Mixed: false,
        Total: 0,
        idConcept: 0,
        Concepts: {},
        idCollaborator: 0
    }
};


export const tabSettlementPayrollReducer = (
    state = initialState,
    action: ActionTabSettlementPayrollReducer
) => {

    const substractByID = (e: SettlementPayroll) => e._id !== action!.payload;
    const updateSettlementPayroll = (SettlementPayroll: SettlementPayroll) => SettlementPayroll._id === action.payload._id
        ? { ...SettlementPayroll, ...action.payload.data }
        : SettlementPayroll;

    const dictionary = {
        [TabSettlementPayrollTypes.init]: () => ({
            SettlementPayrolls : action.payload,
            SettlementPayrollFilter: action.payload,
            loading: false
        }),
        [TabSettlementPayrollTypes.add]: () => ({
            ...state,
            SettlementPayrolls: [...state.SettlementPayrolls, action.payload],
            SettlementPayrollFilter: [...state.SettlementPayrollFilter!, action.payload],
        }),
        [TabSettlementPayrollTypes.substract]: () => ({
            ...state,
            SettlementPayrolls: state.SettlementPayrolls.filter(substractByID),
            SettlementPayrollFilter: state.SettlementPayrolls.filter(substractByID)
        }),
        [TabSettlementPayrollTypes.scheduleDrop]: () => ({
            ...state,
            SettlementPayrolls: state.SettlementPayrolls.map(updateSettlementPayroll),
            SettlementPayrollFilter: state.SettlementPayrolls.map(updateSettlementPayroll)
        }),
        [TabSettlementPayrollTypes.filter]: () => ({
            ...state,
            SettlementPayrollFilter: action.payload
        }),

        [TabSettlementPayrollTypes.setSettlementPayroll]: () => ({
            ...state,
            SettlementPayroll: action.payload
        }),
        [TabSettlementPayrollTypes.cleanSettlementPayroll]: () => ({
            ...state,
            SettlementPayroll: {}
        }),
    };

    return dictionary[action.type]() || state;
};