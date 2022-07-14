import { Box, Grid } from "@material-ui/core";
import AppleIcon from '@material-ui/icons/Apple';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const WelcomeScreeen = () => {
    const params = decodeURIComponent(window.location.hash.replace(/-/g, ' ').replace(/#/g, ''));
    const localName = localStorage.getItem('user');
    return (
        <div className="Welcome__Screen">
            <Grid direction="row" container justify="flex-start">
                <Box ml={5} mt={5}>
                    <img src="/assets/svg/logo-bits.svg" alt="BITS" />
                </Box>
            </Grid>

            <Grid direction="row" container justify="center">
                <h1 className="Welcome__User">{localName}</h1>
            </Grid>

            <Grid direction="row" container justify="center">
                <h1 className="Welcome__Seeker">¡BIENVENID@ SEEKER!</h1>
            </Grid>

            <Grid direction="row" container justify="center">
                <p className="Welcome__Text">
                    Tu registro ha finalizado, descarga nuestra aplicación <b>BITS</b> y 
                    déjanos acompañarte en esta nueva experiencia.
                </p>
            </Grid>

            <Grid direction="row" container justify="center">
                <h2 className="Welcome__App">¡ESCANEA Y DESCARGA!</h2>
            </Grid>

            <Grid direction="row" container justify="center" alignItems="center">
                <div className="WelcomeScreen__Images">
                    <div>
                        <img src="/assets/BitsAppStore.png" alt="BitsAppStore" height="140" />
                        <span className="App-Store"><AppleIcon /> App Store</span>
                    </div>
                    <div>
                        <img src="/assets/BitsPlayStore.png" alt="BitsPlayStore" height="140" />
                        <span className="App-Store"><PlayArrowIcon /> Play Store</span>
                    </div>
                </div>
            </Grid>
        </div>
    )
};

export default WelcomeScreeen;
