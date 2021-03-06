import { useContext, useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { updateAdmin } from '../../../helpers/Administradores/Administradores';

import PoliticContext from '../../../context/ConfigPayrollContext/PoliticContext';


import {updatePolitic} from '../../../helpers/Nomina/Politics'
import '../../ConfigPayroll/Politic.css'


const BpCheckbox = (props:any) =>{
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
  
    
    /*const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: 3,
        width: 14,
        height: 14,
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 0 0 1px rgb(16 22 26 / 40%)'
            : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#ffffff',
        backgroundImage:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
            : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '.Mui-focusVisible &': {
          outline: '2px auto rgba(19,124,189,.6)',
          outlineOffset: 2,
        },
        'input:disabled ~ &': {
          boxShadow: 'none',
          background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
        },
      }));

    const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: '#fabb00',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
          display: 'block',
          width: 14,
          height: 14,
        },
        'input:hover ~ &': {
          backgroundColor: '#fabb00',
          width: 14,
          height: 14
        },
      });*/


    return (
      <Checkbox
        sx={{
          '&:hover': { bgcolor: 'transparent' },
        }}
        disableRipple
        color="primary"
        checked={value}
        className= "checkBoxModalPolitics"
        inputProps={{ 'aria-label': 'Checkbox demo' }}
        onChange={handleChange}
        {...props}
        value={value}
      />
    );
  }

  export default BpCheckbox