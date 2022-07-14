import { useContext,useState } from 'react';
import Switch from '@mui/material/Switch';
import PerceptionContext from '../../context/ConfigPayrollContext/PerceptionContext';
import { FormControlLabel } from '@mui/material';
import {updatePerception} from '../../helpers/Nomina/Perceptions'


const IOSSwitch = (props:any) =>{
  const [value, setValue] = useState(props.Value)
  const {state, dispatch} = useContext(PerceptionContext)
  

  const handleChange = async(event:any) =>{
    if(value === true){
      let nuevoValor = false
      setValue(nuevoValor);
      await updatePerception(event, state, dispatch, props.NombreCampo, nuevoValor)
    }else{
      let nuevoValor = true
      setValue(nuevoValor)
      await updatePerception(event, state, dispatch, props.NombreCampo, nuevoValor)
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
  export default IOSSwitch