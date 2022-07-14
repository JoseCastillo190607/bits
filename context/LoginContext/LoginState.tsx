import {useReducer} from 'react';
import LoginContext, {initialState} from "./LoginContext";
import LoginReducer from './LoginReducer';

const LoginState = (props:any) => {
    const [state,dispatch] = useReducer(LoginReducer, initialState)
    return (
        <LoginContext.Provider value={{state,dispatch}}>
                  {props.children}
        </LoginContext.Provider>
    )
}

export default LoginState;