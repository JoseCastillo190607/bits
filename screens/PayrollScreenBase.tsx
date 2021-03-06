import { ChangeEvent, useState, useEffect, } from 'react';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import ActivePayrollTab from '../components/Payroll/ActivePayrollTab';
import SettlementPayrollTab from '../components/Payroll/settlementPayrollTab';
import HistoricalPayrollTab from '../components/Payroll/HistoricalPayrollTab';
import CustomTabs from '../components/Collaborators/Tab/CustomTabs';
import CustomTab from '../components/Collaborators/Tab/CustomTabMain';
import '../components/Collaborators/collaborator.css';
import ReportsPayrollTab from '../components/Payroll/ReportsPayrollTab';
import CalculadoraTab from '../components/Payroll/CalculadoraTab';
import '../components/ConfigPayroll/ConfigPayroll.css';
import EventualTab from '../components/Payroll/EventualTab';

const PayrollScreenBase = () => {
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
                Nóminas
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
                        <CustomTab label="Pre-Nómina" value={0}/>
                        <CustomTab label="Finiquito / Liquidación" value={1}/>
                        <CustomTab label="Eventuales" value={2}/>
                        <CustomTab label="Históricas" value={3}/>
                        <CustomTab label="Calculadora" value={4}/>
                        <CustomTab label="Reportes" value={6} />
                    </CustomTabs>
                </Grid>
            </Box>
            <div className="contenedor2">
                {tab === 0 && <ActivePayrollTab value={tab} index={0} />}
                {tab === 1 && <SettlementPayrollTab value={tab} index={1} />}
                {tab === 2 && <EventualTab value={tab} index={2} />}
                {tab === 3 && <HistoricalPayrollTab value={tab} index={3} />}
                {tab === 4 && <CalculadoraTab value={tab} index={4} />}
                {tab === 6 && <ReportsPayrollTab value={tab} index={6} />}
            </div>
        </div>
    )
};

export default PayrollScreenBase;
