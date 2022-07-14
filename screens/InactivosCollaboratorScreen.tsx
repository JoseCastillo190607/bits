import { Box } from '@material-ui/core';
import Body from '../components/Collaborator/Body';
import BodyNuevoIngreso from '../components/Collaborator/BodyNuevoIngreso';
import BodyInactivos from '../components/Collaborator/BodyInactivos';


import '../components/Collaborator/Collaborator.css';

const InactivosCollaboratorScreen = () => {
    return (
        <Box boxShadow={0}>
            <BodyInactivos />
        </Box>
    );
}

export default InactivosCollaboratorScreen;