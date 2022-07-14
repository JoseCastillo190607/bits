import { Grid } from '@material-ui/core';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext/AdminContext';

const WelcomeUser = () => {
    const { adminState } = useContext(AdminContext);
    const { Nombre } = adminState!;
    return (
        <Grid direction="row" container item>
            <span id="WelcomeUser">Bienvenid@ {Nombre}!</span>
        </Grid>
    );
};

export default WelcomeUser;