import { useContext, useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import PoliticContext from '../../../context/ConfigPayrollContext/PoliticContext';

import { styled } from '@mui/material/styles';
import { FormControl, FormControlLabel, FormGroup } from '@mui/material';
import {updatePolitic} from '../../../helpers/Nomina/Politics'


const IOSSwitchPolitics = (props:any) =>{
  const [value, setValue] = useState(props.Value)
  const {state, dispatch} = useContext(PoliticContext)
  

  const handleChange = async(event:any) =>{
    if(value === true){
      let nuevoValor = false
      setValue(nuevoValor);
      await updatePolitic(event, state, dispatch, props.NombreCampo, nuevoValor)
    }else{
      let nuevoValor = true
      setValue(nuevoValor)
      await updatePolitic(event, state, dispatch, props.NombreCampo, nuevoValor)
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
  export default IOSSwitchPolitics