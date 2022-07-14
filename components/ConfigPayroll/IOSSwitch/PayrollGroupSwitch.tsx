import { useContext, useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import PoliticContext from '../../../context/ConfigPayrollContext/PayrollGroupContext';

import { styled } from '@mui/material/styles';
import { FormControl, FormControlLabel, FormGroup } from '@mui/material';
import {updatePayrollGroup} from '../../../helpers/Nomina/PayrollGroup'


const IOSSwitchPayrollGroup = (props:any) =>{
  const [value, setValue] = useState(props.Value)
  const {state, dispatch} = useContext(PoliticContext)
  

  const handleChange = async(event:any) =>{
    if(value === true){
      let nuevoValor = false
      setValue(nuevoValor);
      await updatePayrollGroup(event, state, dispatch, props.NombreCampo, nuevoValor)
    }else{
      let nuevoValor = true
      setValue(nuevoValor)
      await updatePayrollGroup(event, state, dispatch, props.NombreCampo, nuevoValor)
    }
  }

  return(
    <div>
        <FormControlLabel
          control={<Switch checked={value} onChange={handleChange}/>}
          label=""
        />
    </div>
  )
  
}
  export default IOSSwitchPayrollGroup