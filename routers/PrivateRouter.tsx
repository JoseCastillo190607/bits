import { ElementType, } from 'react';
import { Props } from '../interfaces/props';
import {
    Route,
    Redirect
} from 'react-router';

type PrivateRouterT = {
    isLoggedIn: Boolean,
    component: ElementType,
    path: string
}

const PrivateRouter = ({
    isLoggedIn,
    component: Component,
    ...rest
}: PrivateRouterT) => {
    return (
        <Route
            {...rest}
            component={(props: Props) => (
                (isLoggedIn)
                    ? <Component {...props} />
                    : <Redirect to='/login' />
            )}
        />
    )
};

export default PrivateRouter;
