import { useContext } from 'react'
import { Grid, Box } from '@material-ui/core'
import ModalState from '../../context/ModalContext/ModalState'
import ProjectModalState from '../../context/ProjectsContext/ProjectModalState'
import { AdminContext } from '../../context/AdminContext/AdminContext'
import ShowSchedule from './ShowSchedule'
import ShowSchedule2 from './ShowSchedule2'

const Schedule = () =>{

    const { adminState, adminDispatch } = useContext(AdminContext)

    return(
        <Box>
            <Box mt={3} ml={5} className="Title">
                Estructura de Equipo
            </Box>
            <Box pt={3} ml={1}>
                <Grid container direction="row">
                    <Grid xs={8} item className="Rectangle">
                        <ModalState>
                            <ShowSchedule />
                        </ModalState>
                    </Grid>
                    <Grid xs={4} item className="Rectangle">
                        <ModalState>
                            <ShowSchedule2 />
                        </ModalState>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )

}

export default Schedule