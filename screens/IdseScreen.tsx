import IDSETab from "../components/IDSE/IDSE"
import SUATab from "../components/IDSE/SUATab"

import styles from "../styles/IDSE/IDSE.module.css"

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

const IdseScreen = () => {
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


  return(
    <div>
    <Box mt={3} ml={5} className="Title">
        Movimientos IDSE
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
                <CustomTab label="IDSE" value={0}/>
                <CustomTab label="SUA" value={1}/>
            </CustomTabs>
        </Grid>

    </Box>

    <div className="contenedor2">
        {tab === 0 && <IDSETab value={tab} index={0} />}

        {tab === 1 && <SUATab value={tab} index={1} />}
    </div>
</div>
  )
}

export default IdseScreen