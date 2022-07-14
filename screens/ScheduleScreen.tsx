import { ChangeEvent, useState, useEffect, useContext } from 'react'
import { AdminContext } from '../context/AdminContext/AdminContext'
import { Box } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import ScheduleTabs from '../components/Schedule/Tab/ScheduleTabs'
import ScheduleTab from '../components/Schedule/Tab/ScheduleTabMain'
import Schedule from '../components/Schedule/Schedule'



const CollaboratorsScreenBase = () => {

    const [tab, setTab] = useState(0)
    const {adminState} = useContext(AdminContext)

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setTab(newValue)
        localStorage.setItem('currentPill', String(newValue))
    }

    useEffect(() => {
        let pill = localStorage.getItem('currentPill')
        if (pill) setTab(Number(pill))
        else setTab(0)
    }, [tab])

    return (
        <div>
            <Box mt={3} ml={5} className="Title">
                Calendario
            </Box>
            <Box p={5} pb={3} pt={0}>
                <Grid
                    container
                    justify="flex-start"
                >
                    <ScheduleTabs
                        value={tab}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                    > 
                        <ScheduleTab label="Pagina 1" value={0}/>
                    </ScheduleTabs>
                </Grid>
            </Box>
            <div className="contenedor2">
                {tab === 0 && <Schedule/>}


            </div>
        </div>

    )

}

export default CollaboratorsScreenBase