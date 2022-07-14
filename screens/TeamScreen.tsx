import { useContext } from 'react';
import { Grid, Box } from '@material-ui/core';
import Clients from '../components/Team/Clients';
import Projects from '../components/Team/Projects';
import Sedes from '../components/Team/Sedes';
import '../components/Team/Team.css';
import ModalState from '../context/ModalContext/ModalState';
import ProjectModalState from '../context/ProjectsContext/ProjectModalState';
import { AdminContext } from '../context/AdminContext/AdminContext';



const TeamScreen = () => {
    const { adminState, adminDispatch } = useContext(AdminContext);

    return (
        <Box>
            <Box mt={3} ml={5} className="Title">
                Estructura de Equipo
            </Box>

            <Box pt={3} ml={1}>
                <Grid container direction="row">
                    {(adminState?.PermisosContex?.Modulos?.EstructuraEquipo?.Sedes?.Ver) === true?
                        <Grid xs item className="Rectangle">
                            <ModalState>
                                <Sedes />
                            </ModalState>
                        </Grid>
                    :null
                    }
                    {(adminState?.PermisosContex?.Modulos?.EstructuraEquipo?.Clientes?.Ver) === true?
                        <Grid xs item className="Rectangle">
                            <ModalState>
                                <ProjectModalState>
                                    <Clients />
                                </ProjectModalState>
                            </ModalState>
                        </Grid>:null
                }
                </Grid>
            </Box>
                {(adminState?.PermisosContex?.Modulos?.EstructuraEquipo?.Proyectos?.Ver === true)?
                    <Box ml={1}>
                        <Grid container direction="row">
                            <Grid xs item className="Rectangle">
                                <ModalState>
                                    <ProjectModalState>
                                        <Projects />
                                    </ProjectModalState>
                                </ModalState>
                            </Grid>
                        </Grid>
                    </Box>
                :null
                }
        </Box>
    )
};

export default TeamScreen;
