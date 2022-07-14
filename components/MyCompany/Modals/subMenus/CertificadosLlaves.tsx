import { useState,useContext } from "react"
import styles from "../../../../styles/MiEmpresa/CertificadosLlaves.module.css"
import EmpresaContext from "../../../../context/Empresa/EmpresaContext"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Form } from "semantic-ui-react";
import { updateState, clearEmpresaModal, addRegistroPatronal } from "../../../../context/Empresa/Actions"
import File_Helper_Incident from "../../../Collaborator/Expedient/Fields/File_Helper_Incident";
import { TextField } from "@material-ui/core";
import { filterPuestos } from "../../../../actions/tabPuesto"

const CertificadosLlaves = (props:any) =>{
  const {state, dispatch} =useContext(EmpresaContext)

  const [registrosPatronales, setRegistrosPatronales] = useState<any[]>([])
  const [showPassword, setShowPassword] = useState(false)

  const initialValues = () =>{
    return{
      password: state.certificadoLlaves.password
    }
  }

  const cambioEstado = async(event:any, value:{}) =>{
    
    console.log('valor que entra',value)
    await updateState(event, state, dispatch,'certificadoLlaves',value, 'tabDos')
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit:(formData) =>{
      /*
      let objeto ={
        registroPatronal: formData.uno,
        primadeRiesgo: formData.dos
      }*/
      props.setActivo('3')
      cambioEstado('', formData)
    },

  })

  const inputFile = () => {
  
    if(props.fileIMSS === undefined){
      
        return <div >
            <File_Helper_Incident
            name="ArchivoIMSSEmpresa"
            parametrofrom="ArchivoIMSSEEmpresa"
            setArchives={props.setFileIMSS}
            archives={props.fileIMSS}
            accept = ".cer"
            style="CambiarArchivo"
            />
        </div>
    }else{
        return <div className={styles.GreenContour}>
            <File_Helper_Incident
                name="ArchivoIMSSEmpresa"
                parametrofrom="ArchivoIMSSEEmpresa"
                setArchives={props.setFileIMSS}
                archives={props.fileIMSS}
                accept = ".cer"
                style="CambiarArchivo"
            />
        </div>
    }

    
  }

  const inputFileSello = () => {
  
    if(props.fileSello === undefined){
      
        return <div >
            <File_Helper_Incident
            name="ArchivoSelloEmpresa"
            parametrofrom="ArchivoSelloEmpresa"
            setArchives={props.setFileSello}
            archives={props.fileSello}
            accept = ".cer"
            style="SeleccionarArchivo"
            />
        </div>
    }else{
        return <div className={styles.GreenContour}>
            <File_Helper_Incident
                name="ArchivoSelloEmpresa"
                parametrofrom="ArchivoSelloEmpresa"
                setArchives={props.setFileSello}
                archives={props.fileSello}
                accept = ".cer"
                style="SeleccionarArchivo"
            />
        </div>
    }

    
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    props.setFileIMSS(undefined)
    props.setFileSello(undefined)
    props.setFileLogo(undefined)
    props.setActivo('1')
    clearEmpresaModal({}, dispatch);
  };

  const deleteReg = async(PrimaRiesgo: any, RegistroPatronal: any) => {
    const newReg: any[]= []
    state.registroPatronal?.forEach((reg:any) =>{
      if(reg.PrimaRiesgo !== PrimaRiesgo && reg.RegistroPatronal !== RegistroPatronal){
        newReg.push(reg)
      }
    })
    await addRegistroPatronal(newReg, dispatch)
  }
  const muestraRegistroPatronal = (reg: any) =>{
    console.log(typeof reg, reg.PrimaRiesgo, reg.RegistroPatronal)
    return<div className={styles.lineaRegistro}>
      <div className={styles.lineanombreRegistro}>{reg.RegistroPatronal}</div>
      <div className={styles.lineaDivisionRegistro}></div>
      <div className={styles.lineaprimaRiesgo}>{reg.PrimaRiesgo}</div>
      <div className={styles.lineaContenedorEliminar} onClick={()=>deleteReg(reg.PrimaRiesgo, reg.RegistroPatronal)}>
        <div className={styles.iconoLineaPrimaRiesgo}></div>
      </div>
    </div>
  }

  const textAlign="text-align"
  const marginLeft="margin-left"
  const marginRight="margin-right"
  return(
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <div className={styles.contenedorLlaves}>
          <div className={styles.tituloLlaves}>
            Certificados IMSS
          </div>
          <div className={styles.contenedorArchivos}>
            <div>
              <div className={styles.textoArchivos}>
              Llave del certificado de sello digital
              </div>
              <div className={styles.contenedorDocumento}>
                {/*<div className={styles.iconoVerDocumento}></div>*/}
                <div className={styles.textoVerDocumento}>
                  {/*Ver documento*/}
                </div>
              </div>
            </div>
            {inputFile()}
          </div> 
          <div className={`${styles.contenedorArchivos} ${styles.contenedorArchivosDos}`}>
            <div className={styles.textoArchivos}>
              Certificado de sello digital
            </div>
            {inputFileSello()}
          </div>
          <div className={styles.contenedorContrasena}>
            <TextField
              type={showPassword? "text" : "password"} 
              name="password"
              defaultValue={state.certificadoLlaves.password}
              label="Contrase&ntilde;a certificado de sello digital*"
              variant="outlined"
              size="small"
              fullWidth={true}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={styles.password}
              error={
                formik.touched.password && Boolean(formik.errors.password)
              }
              InputProps={{
                readOnly: false,
                endAdornment: <div className={styles.iconoVerContrasena} onClick={handleClickShowPassword} ></div>,
              }}
              style={{
                marginLeft: '26px',
                marginRight: '26px'
              }}
              />
              
          </div>
        </div>
        <div className={styles.contenedorRegistro}>
          <div className={styles.contenedorInputsRegistro}>
            <div>
              <input 
                type="text" 
                placeholder="Registro patronal"
                name="uno"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={styles.inputRegistroPatronal}
                />
            </div>
            <div className={styles.lineaInputs}></div>
            <div>
              <input 
                type="text" 
                placeholder="Prima de riesgo"
                name="dos"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={styles.inputPrimaRiesgo}
                />
            </div>
            <button 
              className={styles.botonAgregarRegistroPatronal}
              type="submit"
              >
              Agregar
            </button>
          </div>
        </div>
        <div className={styles.contenedorRegistros}>
          <div>
              {
                
              state.registroPatronal?.map((reg:any)=>(
                
                muestraRegistroPatronal(reg)
                
              ))}
              
          </div>
        </div>
        <div className={styles.contenedorBotones}>
          <button className={styles.botonCancelar} onClick={handleClose}>
            Cancelar
          </button>
          <button 
          className={styles.botonSiguiente}
          type="submit"
          >
            <div>
              Siguiente 
            </div>
            <div className={styles.iconoSiguiente}></div>
          </button>
        </div>
      </Form>
    </div>
  )
}



const validationSchema = () =>{
  return{
    password: Yup.string().required("Obligatorio")
  }
}


export default CertificadosLlaves