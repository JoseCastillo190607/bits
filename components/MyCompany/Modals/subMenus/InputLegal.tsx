import { useContext, useEffect, useState } from "react";
import { Padding } from "@mui/icons-material";
import { alpha, styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { updateState } from "../../../../context/Empresa/Actions";
import EmpresaContext from "../../../../context/Empresa/EmpresaContext";

const InputEmpresa = (props:any) =>{
  const {state, dispatch} = useContext(EmpresaContext)
  const {texto, nombre, modulo} = props
  const [estado, setEstado] = useState({})

  const handleChange = async(event:any)=>{
    console.log('evento', event.target.value)
    await updateState(event, state, dispatch, nombre, event.target.value, modulo)
  }

  useEffect(()=>{
    setEstado(state)
  },[state])

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#C7CCDC",
      fontSize: "13px",
    },
    "& label": {
      color: "#C7CCDC",
      fontSize: "13px",
      fontFamily: "Roboto",
      height: "15px"
    },
    "& label:active": {
      color: "#C7CCDC",
      fontSize: "13px",
      fontFamily: "Roboto"
    },
    "& fieldset": {
      color: "red",
      fontSize: "13px",
      fontFamily: "Roboto"
    },
    "& .MuiInputBase-input": {
      color: "#303030",
      width: "369px",
      height: "32px",
      padding: "5px 5px",
      fontSize: "13px",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
      color: "red",
      fontSize: "13px"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        color: "red",
        fontSize: "13px",

      },
      "&:hover fieldset": {
        color: "red",
      },
      "&.Mui-focused fieldset": {        
        fontSize: "13px",
        color: "red",
      }
    }
  });

  return(
    <CssTextField label={texto} id="outline-basic"  onChange={(e) => handleChange(e)} defaultValue={state?.identidadLegal?.nombre}/>
  )
}

export default InputEmpresa