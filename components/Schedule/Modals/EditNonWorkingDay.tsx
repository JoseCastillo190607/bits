import { ChangeEvent,useContext, useState } from "react";
import CalendarsContext from "../../../context/NewCalendarContext/CalendarsContext";
import {Dialog, DialogContent} from "@material-ui/core"
//import {Events} from './event'
import {EditNonWorkingDayModal} from './editNonWorkingDayModal'


export const EditNonWorkingDay = () => {
  const {state, dispatch} = useContext(CalendarsContext) 
  return(
    <Dialog open={state.createNonWorkingDayModal} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>

        <EditNonWorkingDayModal idCalendar={1}/>

    </Dialog>
  )
}