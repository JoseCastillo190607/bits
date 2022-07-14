import { Grid } from '@material-ui/core';
import GoogleButton from '../components/Login/GoogleButton';
import  '../components/Login/login.css';

const LoginScreen = () => {
    return (
        <div>
            <Grid item className="login" container direction="row">
                <Grid item container xs={6} justify="center">
                    <div className="container-left">
                        <Grid><img width="50%" src="assets/logo-login.png" alt="BITS" /></Grid>
                        <Grid>
                            <GoogleButton />
                        </Grid>
                    </div>
                    <Grid className="terms_conditions" container direction="row" justify="center" alignItems="flex-end">2021 TODOS LOS DERECHOS RESERVADOS. BITS</Grid>
                </Grid>
                <Grid item className="container-right" container xs={6} justify="center"></Grid>
            </Grid>
        </div>
    )
};

export default LoginScreen;