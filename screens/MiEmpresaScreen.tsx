import { ChangeEvent, useState, useEffect, useContext } from 'react';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InformacionGral from "../components/MyCompany/InformacionGral";
import "../styles/ScreensCss/MiEmpresa.css";
import ContactoMiCompania from "../components/Contacto/ContactoMiCompania";
import MisOutSourcers from "../components/MisOutsourcers/MisOutSourcers";
import InactivosCollaboratorTab from '../components/Collaborators/InactivosCollaboratorTab'
import {Administrators} from '../components/Administrators/Administrators'
import AdministratorsContex from "../context/AdministratorsContext/AdministratorsState"
import DocumentsContext from '../context/DocumentContext/DocumentsState';
import CustomTabs from '../components/Collaborators/Tab/CustomTabs';
import CustomTab from '../components/Collaborators/Tab/CustomTabMain';
import { Grid } from '@material-ui/core';
import { AllDocuments } from '../components/Documents/AllDocuments';
import InformacionGeneral from '../components/MyCompany/InformacionGeneral';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


export default function MiEmpresaScreen() {
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
                        <CustomTab label="Información básica" value={0}/>
                        <CustomTab label="Mis Outsourcers" value={1}/>
                        <CustomTab label="Usuarios y permisos" value={2}/>
                        <CustomTab label ="Configuración de documentos" value={3}/>
                    </CustomTabs>
                </Grid>

            </Box>

            <div className="contenedor2">
                {tab === 0 && <InformacionGeneral value={tab} index={0} />}

                {tab === 1 && <MisOutSourcers value={tab} index={1} />}

                {tab === 2 && 
                  <AdministratorsContex>
                    <Administrators value={tab} index={2} />
                  </AdministratorsContex>                
                }
                {tab === 3 && 
                    <DocumentsContext>
                      <AllDocuments value={tab} index={3} />
                    </DocumentsContext>
                }

            </div>
        </div>
  );
}
