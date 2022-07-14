import { useContext, useState } from 'react';
import { Checkbox } from '@material-ui/core';
import { styled } from '@material-ui/core';
import AdminPermisosContext from '../../../context/AdminContext/AdminPermisosContext/AdminPermisosContext'
import { updateAdmin } from '../../../helpers/Administradores/Administradores';

const BpCheckbox = (props:any) =>{
  const [value, setValue] = useState(props.Value)
  const {state, dispatch} = useContext(AdminPermisosContext)
  

  const handleChange = async(event:any) =>{
      setValue(event.target.checked)
      await updateAdmin(event, state, dispatch, props.NombreCampo, event.target.checked, props.Modulo)
      
    }
  
    
    const BpIcon = styled('span')(({ theme }) => ({
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
      });


    return (
      <Checkbox
        sx={{
          '&:hover': { bgcolor: 'transparent' },
        }}
        disableRipple
        color="default"
        checked={value}
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        inputProps={{ 'aria-label': 'Checkbox demo' }}
        onChange={handleChange}
        {...props}
      />
    );
  }

  export default BpCheckbox