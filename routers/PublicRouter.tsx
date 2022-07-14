import { ElementType } from 'react';
import {
    Route,
    Redirect
} from 'react-router';
import { Props } from '../interfaces/props';

type PublicRouterT = {
    isLoggedIn: Boolean,
    component: ElementType,
    path: string
};

const PublicRouter = ({
    isLoggedIn,
    component: Component,
    ...rest
}: PublicRouterT) => {
    return (
        <Route
            {...rest}
            component={(props: Props) => (
                (!isLoggedIn)
                    ? <Component {...props} />
                    : <Redirect to='/' />
            )}
        />
    )
};

export default PublicRouter;
