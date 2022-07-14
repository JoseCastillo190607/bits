import {
    login,
    logout
} from "../../actions/auth";
import { AdminTypes } from "../../context/AdminContext/AdminTypes";

describe('Testing auth actions', () => {

    test('Should log in', () => {

        const admin = {
            id: "605ce652d02d02c9ce7d5782",
            Nombre: "Jonathan Zuñiga",
            Usuario: "jonathan.zuniga@it-seekers.com",
            image: "https://lh3.googleusercontent.com/a-/AOh14GjyX7KQF9CiSIUpk7P3w5w8Q7yRsVMQAZRAUzX6=s96-c"
        };

        const loginAction = login(admin);

        expect(loginAction).toEqual({
            type: AdminTypes.login,
            payload: admin
        });
    });

    test('Should logout', () => {

        const logoutAction = logout();

        expect(logoutAction).toEqual({
            type: AdminTypes.logout
        })
    });

});