import { ChangeEvent, useState, useEffect, useContext } from 'react';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import PayrollGroupTab from '../components/ConfigPayroll/PayrollGroupTab';
import PoliticsTab from '../components/ConfigPayroll/PoliticsTab';
import ConceptsTab from '../components/ConfigPayroll/ConceptsTab';
import TablesValueTab from '../components/ConfigPayroll/TablesValueTab';

import CustomTabs from '../components/Collaborators/Tab/CustomTabs';
import CustomTab from '../components/Collaborators/Tab/CustomTabMain';
import '../components/ConfigPayroll/ConfigPayroll.css';


const ConfigPayrollScreenBase = () => {
    const [tab, setTab] = useState(0);

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setTab(newValue)
        localStorage.setItem('currentPill', String(newValue));
    };

    useEffect(() => {
        let pill = localStorage.getItem('currentPill');
        if (pill) setTab(Number(pill));
        else setTab(0);
    }, [tab]);

    return (
        <div>
            <Box mt={3} ml={5} className="Title">
                Configuraciones
            </Box>
            <Box p={5} pb={3} pt={0}>

            <Grid
                    container
                    justify="flex-start"
                >
                    <CustomTabs
                        value={tab}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                    > 
                        <CustomTab label="Nómina" value={0}/>
                        <CustomTab label="Polítícas" value={1}/>
                        <CustomTab label="Conceptos" value={2}/>
                        <CustomTab label="Tablas y valores" value={3}/>
                    </CustomTabs>
                </Grid>

            </Box>

            <div className="contenedor2">
                {tab === 0 && <PayrollGroupTab value={tab} index={0} />}

                {tab === 1 && <PoliticsTab value={tab} index={1} />}

                {tab === 2 && <ConceptsTab value={tab} index={2} />}

                {tab === 3 && <TablesValueTab value={tab} index={3} />}
            </div>
        </div>
    )
};
export default ConfigPayrollScreenBase;
