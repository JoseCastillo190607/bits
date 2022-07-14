import { AdminTypes } from './AdminTypes';

const initalState = { loading: true };

type Action = {
    type: AdminTypes,
    payload?: any
}

export const adminReducer = (state = initalState, action: Action) => {
    const dictionary = {
        [AdminTypes.login]: () => {
            return {
                ...action.payload,
                logged: true,
                loading: false,
            };
        },
        [AdminTypes.logout]: () => ({
            logged: false,
            loading: false,
        })
    };

    return dictionary[action.type]() || state;
};