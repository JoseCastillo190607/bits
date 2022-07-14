import { Grid, TextField } from '@material-ui/core';
import GoogleButton from '../components/Login/GoogleButton';
import  '../components/Login/login.css';
import EmailLogin from '../components/Login/EmailLogin'
import MicrodoftButton from '../components/Login/MicrodoftButton';
import LoginState from "../context/LoginContext/LoginState";

const LoginScreen2 = () => {

    
    const marginRight = 'margin-right'
    return (
        <div>
            <Grid item className="login" container direction="row">
                <Grid item className="container-full" container justify="center">
                    <Grid item xs={6} container 
                    style={{
                        marginRight: "50%"
                    }}
                    >
                        <div className="container-multilogin">
                            <div className="multilogin">
                                <div className='welcome-div'>
                                    <b>
                                    ¡Bienvenid@ de vuelta!
                                    </b>
                                </div>
                                <Grid>
                                    <GoogleButton />
                                    
                                </Grid>
                                <Grid>
                                    <MicrodoftButton />
                                    
                                </Grid>
                                
                                <div className='container-line-login'>
                                    <div className='div-lineleft-login'>
                                        <hr className='line-login'></hr>
                                    </div>
                                    <div className='div-linecenter-login'>
                                        O
                                    </div>
                                    <div className='div-linerigt-login'>
                                        <hr className='line-login'></hr>
                                    </div>
                                    
                                </div>
                                <Grid>
                                    <EmailLogin />
                                    
                                </Grid>
                                <div className='conteiner-footer-login'>
                                    2022 TODOS LOS DERECHOS RESERVADOS. BITS
                                </div>
                            </div>
                        </div>
                            
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};

export default LoginScreen2;