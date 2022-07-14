import { Box } from '@material-ui/core';
import Body from '../components/Collaborator/Body';
import BodyNuevoIngreso from '../components/Collaborator/BodyNuevoIngreso';

import '../components/Collaborator/Collaborator.css';

const NuevoIngresoCollaboratorScreen = () => {
    return (
        <Box boxShadow={0}>
            <BodyNuevoIngreso />
        </Box>
    );
}

export default NuevoIngresoCollaboratorScreen;