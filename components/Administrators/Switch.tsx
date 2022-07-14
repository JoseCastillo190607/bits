import { useContext, useEffect, useState } from 'react';
import {updateAdmin} from '../../context/AdministratorsContext/Actions'
import AdministratorsContext from '../../context/AdministratorsContext/AdministratorsContext';
import { styled } from '@mui/system';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';

const blue = {
  500: '#11ca73',
};

const grey = {
  400: '#BFC7CF',
  500: '#AAB4BE',
  600: '#6F7E8C',
};

const Root = styled('span')(
  ({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 27px;
  height: 12px;
  padding: 2px 3px 4px 5px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${theme.palette.mode === 'dark' ? grey[600] : grey[400]};
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 11px;
    height: 11px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 22px;
      top: 3px;
      background-color: #fff;
    }

    .${switchUnstyledClasses.track} {
      background: ${blue[500]};
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }d
  `,
);

const Switch = (props:any) => {
  const label = { componentsProps: { input: { 'aria-label': 'Demo switch' } } };
  console.log('VALOR DEL ESTADO ', props.Value)
  const [value, setValue] = useState(props.Value)
  const {state, dispatch} = useContext(AdministratorsContext)


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
    console.log('Primera Prubea', state)
  }


  return (
    <div>
      <SwitchUnstyled checked={value} onChange={handleChange} component={Root} {...label} />
    </div>
  );
}

export default Switch
