import { useContext, useState } from 'react';
import AdminPermisosContext from '../../../context/AdminContext/AdminPermisosContext/AdminPermisosContext'
import Switch from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { updateAdmin } from '../../../helpers/Administradores/Administradores';

const IOSSwitch = (props:any) =>{
  const [value, setValue] = useState(props.Value)
  const {state, dispatch} = useContext(AdminPermisosContext)

  const handleChange = async(event:any) =>{
    if(value === true){
      let nuevoValor = false
      setValue(nuevoValor)
      await updateAdmin(event, state, dispatch, props.NombreCampo, nuevoValor, props.Modulo)
    }else{
      let nuevoValor = true
      setValue(nuevoValor)
      await updateAdmin(event, state, dispatch, props.NombreCampo, nuevoValor, props.Modulo)
    }
  }


  return(
    <div>
        <FormControlLabel
          control={<Switch checked={value} onChange={handleChange} name="ejemplo"/>}
          label=""
        />
    </div>
  )
  
}
  export default IOSSwitch