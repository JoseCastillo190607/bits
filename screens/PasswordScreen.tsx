import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Button } from "@material-ui/core";
import AppleIcon from '@material-ui/icons/Apple';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { ErrorAlert } from "../alerts/errorAlert";
import { updatePasswordCandidate } from "../services/candidateService";
import { SuccessfulAlert } from "../alerts/successAlerts";

const PasswordScreen = () => {
    const [password, setPassword] = useState<string>('');
    const params = useParams<any>();

    const onSubmit = async () => {
        if (password.length > 7) {
            let result = await updatePasswordCandidate(params.email, password);
            if (result) {
                await SuccessfulAlert({ text: "Contraseña Actualizada." });
                window.location.href = '/Bienvenido';
            }
        } else return await ErrorAlert({ text: "La contraseña debe tener mínimo 8 caracteres." });
    }
    return (
        <div className="Welcome__Screen">
            <Grid direction="row" container justify="flex-start">
                <Box ml={5} mt={5}>
                    <img src="/assets/svg/logo-bits.svg" alt="BITS" />
                </Box>
            </Grid>

            <Grid direction="row" container justify="center">
                <h1 className="Welcome__Seeker">CONFIGURA TU CONTRASEÑA SEEKER!</h1>
            </Grid>

            <Grid direction="row" container justify="center" alignItems="center">
                <input type="password" placeholder="Ingrese su contraseña" onChange={(e) => setPassword(e.target.value)} />
            </Grid>

            <Box mt={2}>
                <Grid direction="row" container justify="center" alignItems="center">
                    <Button className="buttonSave" onClick={onSubmit}>Guardar</Button>
                </Grid>
            </Box>

            <Box mt={5}>
                <Grid direction="row" container justify="center">
                    <h2 className="Welcome__App">ESCANEA Y DESCARGA</h2>
                </Grid>

                <Grid direction="row" container justify="center" alignItems="center">
                    <div className="WelcomeScreen__Images">
                        <div>
                            <img src="/assets/BitsAppStore.png" alt="BitsAppStore" height="140" />
                            <span className="App-Store"><AppleIcon /> App Store</span>
                        </div>
                        <div>
                            <img src="/assets/BitsPlayStore.png" alt="BitsPlayStore" height="140" />
                            <span className="App-Store"><PlayArrowIcon /> Google Play</span>
                        </div>
                    </div>
                </Grid>
            </Box>
        </div>
    )
};

export default PasswordScreen;
