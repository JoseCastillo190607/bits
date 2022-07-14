import { useState, useEffect, useContext } from 'react'
import { AdminContext } from '../context/AdminContext/AdminContext'
import { Box } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import Schedule2 from '../components/Schedule/Schedule2'
import ModalState from '../context/ModalContext/ModalState'
import IncidentNameText from "../components/Schedule/IncidentNameText"
import {
    GET_CALENDAR,
    GET_ALL_PERCEPTIONS_CALENDAR,
    GET_DEDUCTIONS_CALENDAR
} from "..//Querys/querys"
import { useQuery } from "@apollo/client"
import { useHistory, useParams } from "react-router-dom"
import NonWorkingDayTab from "../components/Schedule/Tab/nonWorkingDayTab2"

const ScheduleScreenScreenBase = () => {

    const [tab, setTab] = useState(0)
    const {adminState} = useContext(AdminContext)
    const { id } = useParams<any>()
    const [filtrado, setFiltrado] = useState([])
    const resultSchedule = useQuery(GET_CALENDAR, {
        variables: { id: id },
    });
    const allSchedule = resultSchedule.data?.GET_CALENDAR;
    //console.log(allSchedule);    

    useEffect(() => {
        obtenerDatos();
    }, [allSchedule]);

    const obtenerDatos = async () => {
        await setFiltrado(allSchedule)
        //console.log('Filtrado',filtrado)
    };

    return (
        <div>
            <Box mt={3} ml={5} className="Title">
                <Grid container direction="row">
                    <Grid xs={8}>Calendarios</Grid>
                    <Grid xs={3}>
                        {/*}<NonWorkingDayTab idCalendar={id} />{*/}
                    </Grid>
                </Grid>
                
            </Box>

            <div>
                {filtrado?.map((Schedule:any, index:any) =>(
                    <Schedule2 idCalendar={id} nameCalendar={Schedule.name} />
                ))}
            </div>

        </div>

    )

}

export default ScheduleScreenScreenBase