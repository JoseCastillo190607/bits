import { ChangeEvent, useState, useEffect, useContext, createRef} from 'react'
import { useHistory, useParams } from "react-router-dom";

import { AdminContext } from '../context/AdminContext/AdminContext';

import AdminPermisos from '../components/Admin/AdministratorPermissions/Body'


import { IPROPS } from "../interfaces/Collaborator";

import CustomTabs from '../components/Collaborators/Tab/CustomTabs';
import CustomTab from '../components/Collaborators/Tab/CustomTab';
import {Box, Button, Grid, TextField} from '@material-ui/core'


const AdministratorScreen = ({
  tab = "Administradores",
  numTab,
  title,
  labels = [],
  components = [],
  back= '/collaborators/id/0',
  progress = 0
}: IPROPS) =>{

  const history = useHistory();
  const [tabs, setTab] = useState(0)
  const {idUser,user} = useParams<any>();
  const {adminState} = useContext(AdminContext)

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setTab(newValue)
    localStorage.setItem('currentPill', String(newValue));
  };

    return(
      <div>
        <Box mt={3} ml={5} className="Title">
          Colaboradores
        </Box>
        <Box p={5} pb={3} pt={0}>
          <Grid
            container
            justify="flex-start"
          >
          </Grid>
        </Box>
        <AdminPermisos back={back}/>
      </div>
    )
}

export default AdministratorScreen;