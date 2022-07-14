import {
    ActionTabPoliticReducer,
    Politic,
    StateTabPoliticInterface,
    TabPoliticTypes
} from '../../interfaces/TabPolitic.interfaces';

const initialState: StateTabPoliticInterface = {
    loading: true,
    Politics: [],
    PoliticsFilter: [],
    Politic: {
        _id: '',
        PolicyName:'',
        EconomicDays:'',
        AnniversaryVacationPremium:'',
        PantryValueType:'',
        PantryValueCap:'',
        PantryValue:'',
        SavingsFundType:'',
        SavingsFundCap:'',
        SavingsFund:'',
        RestaurantValue:'',
        RestaurantValueType:'',
        RestaurantValueCap:'',
        AbsenceDiscount:'',
        DisabilityDiscount:'',
        VoucherCost:'',
        DiscountDay:'',
        SeniorityDate:'',
        ContractStartDate: ''
    }
};

export const tabPoliticReducer = (
    state = initialState,
    action: ActionTabPoliticReducer
) => {

    const substractByID = (e: Politic) => e._id !== action!.payload;
    const updatePolitic = (Politic: Politic) => Politic._id === action.payload._id
        ? { ...Politic, ...action.payload.data }
        : Politic;

    const dictionary = {
        [TabPoliticTypes.init]: () => ({
            Politics: action.payload,
            PoliticsFilter: action.payload,
            loading: false
        }),
        [TabPoliticTypes.add]: () => ({
            ...state,
            Politics: [...state.Politics, action.payload],
            PoliticsFilter: [...state.PoliticsFilter!, action.payload],
        }),
        [TabPoliticTypes.substract]: () => ({
            ...state,
            Politics: state.Politics.filter(substractByID),
            PoliticsFilter: state.Politics.filter(substractByID)
        }),
        [TabPoliticTypes.scheduleDrop]: () => ({
            ...state,
            Politics: state.Politics.map(updatePolitic),
            PoliticsFilter: state.Politics.map(updatePolitic)
        }),
        [TabPoliticTypes.filter]: () => ({
            ...state,
            PoliticsFilter: action.payload
        }),

        [TabPoliticTypes.setPolitic]: () => ({
            ...state,
            Politic: action.payload
        }),
        [TabPoliticTypes.cleanPolitic]: () => ({
            ...state,
            Politic: {}
        }),
    };

    return dictionary[action.type]() || state;
};