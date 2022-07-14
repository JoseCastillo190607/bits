import { ChangeEvent,useContext, useState } from "react";
import CalendarsContext from "../../../context/NewCalendarContext/CalendarsContext";
import { clearCalendarsModal } from "../../../context/NewCalendarContext/Actions";
import {FormHelperText, Button, Dialog, DialogContent, TextField, DialogActions,Select, InputLabel,FormControl,MenuItem,FormControlLabel,Checkbox, Tabs, Tab } from "@material-ui/core"
import { Form} from "semantic-ui-react";
import SaveIcon from '@material-ui/icons/Save';
import styles from '../Calendars.module.css'
import { useFormik} from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {Events} from "../../../components/Schedule/Modals/event";
import { GET_ALL_PROJECT} from "../../../Querys/querys";


export const CreateEvent = () => {
    const {state, dispatch} = useContext(CalendarsContext)
    const [tabSelect, setTabSelect] = useState(0);
    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setTabSelect(newValue)
    };
        
  return(
    <Dialog open={state.createEventModal} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
          <div>
              <Tabs
                  value={tabSelect}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="fullWidth"
                  TabIndicatorProps={{
                    style: {
                        display: "none",
                    },
                  }} 
                  centered>
                  <Tab 
                    label="Eventos" 
                    value={0}
                    className = {tabSelect === 0 ? styles.selectedTab : styles.unselectedTab }
                  />
                  <Tab 
                    label="Incidencias" 
                    value={1} 
                    className = {tabSelect === 1 ? styles.selectedTab : styles.unselectedTab }

                    />
              </Tabs>
          </div> 
        <DialogContent>
            {tabSelect === 0 ? <Events/> : <h1>Incidencia</h1>}
        </DialogContent>
    </Dialog>
  )
}