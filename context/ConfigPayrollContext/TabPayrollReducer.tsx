import {
    ActionTabPayrollGroupReducer,
    PayrollGroup,
    StateTabPayrollGroupInterface,
    TabPayrollGroupTypes
} from '../../interfaces/TabPayrollGroup.interfaces';

const initialState: StateTabPayrollGroupInterface = {
    loading: true,
    PayrollGroups: [],
    PayrollGroupsFilter: [],
    PayrollGroup: {
        _id: '',
        GroupName: '',
        PaymentScheme: '',
        CompanyName: '',
        BankAccount: '',
        PayrollPeriod: '',
        SocialSecurity: '',
        MonthlyISR: '',
        PayrollPeriodDays: '',
        RegulationISR: '',
        SubsidyEmployee: ''
    }
};

export const tabPayrollGroupReducer = (
    state = initialState,
    action: ActionTabPayrollGroupReducer
) => {

    const substractByID = (e: PayrollGroup) => e._id !== action!.payload;
    const updatePayrollGroup = (PayrollGroup: PayrollGroup) => PayrollGroup._id === action.payload._id
        ? { ...PayrollGroup, ...action.payload.data }
        : PayrollGroup;

    const dictionary = {
        [TabPayrollGroupTypes.init]: () => ({
            PayrollGroups: action.payload,
            PayrollGroupsFilter: action.payload,
            loading: false
        }),
        [TabPayrollGroupTypes.add]: () => ({
            ...state,
            PayrollGroups: [...state.PayrollGroups, action.payload],
            PayrollGroupsFilter: [...state.PayrollGroupsFilter!, action.payload],
        }),
        [TabPayrollGroupTypes.substract]: () => ({
            ...state,
            PayrollGroups: state.PayrollGroups.filter(substractByID),
            PayrollGroupsFilter: state.PayrollGroups.filter(substractByID)
        }),
        [TabPayrollGroupTypes.scheduleDrop]: () => ({
            ...state,
            PayrollGroups: state.PayrollGroups.map(updatePayrollGroup),
            PayrollGroupsFilter: state.PayrollGroups.map(updatePayrollGroup)
        }),
        [TabPayrollGroupTypes.filter]: () => ({
            ...state,
            PayrollGroupsFilter: action.payload
        }),

        [TabPayrollGroupTypes.setPayrollGroup]: () => ({
            ...state,
            PayrollGroup: action.payload
        }),
        [TabPayrollGroupTypes.cleanPayrollGroup]: () => ({
            ...state,
            PayrollGroup: {}
        }),
    };

    return dictionary[action.type]() || state;
};