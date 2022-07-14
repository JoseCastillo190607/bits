import { useContext, useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import styles from "../../../../styles/MiEmpresa/IdentidadLegal.module.css"
import InputEmpresa from "./InputLegal";
import EmpresaContext from "../../../../context/Empresa/EmpresaContext";
import { updateState, clearEmpresaModal } from "../../../../context/Empresa/Actions";
import { useFormik } from "formik"
import * as Yup from "yup"
import { Form } from "semantic-ui-react";
import EyeIcon from "../../../../assets/svg/eye.svg";
import File_Helper_Incident from "../../../Collaborator/Expedient/Fields/File_Helper_Incident";
import RemoveFile from "../../../../assets/svg/remove_file.svg";

const IdentidadLegal = (props:any) => {
  const {state, dispatch} = useContext(EmpresaContext)

  const initalValues = () =>{
    return{
      nombre: state.identidadLegal.nombre,
      razonSocial: state.identidadLegal.razonSocial,
      logo: "",
      rfc: state.identidadLegal.rfc,
      regimenFiscal: state.identidadLegal.regimenFiscal,
      direccion: state.identidadLegal.direccion,
      estado: state.identidadLegal.estado,
      codigoPostal: state.identidadLegal.codigoPostal
    }
  }


  useEffect(() => {

  },);



  const cambioEstado = async(event:any, value:{}) =>{
    console.log('valor que entra',value)
    await updateState(event, state, dispatch,'identidadLegal',value, 'tabUno')
  }

  const formik = useFormik({
    initialValues: initalValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit:(formData) =>{
      props.setActivo('2')
      cambioEstado('', formData)
    }
  })


  const handleClose = () => {
    props.setFileIMSS(undefined)
    props.setFileSello(undefined)
    props.setFileSello(undefined)
    props.setActivo('1')
    clearEmpresaModal({}, dispatch);
  };


  const inputFile = () => {

    if(props.fileLogo === undefined){
        return <div className={styles.contenedorInternoIconoLogo}>
            <File_Helper_Incident
            name="ArchivoLogoEmpresa"
            parametrofrom="ArchivoLogoEmpresa"
            setArchives={props.setFileLogo}
            archives={props.fileLogo}
            accept = ".PNG, .JGP, .png, .jpg"
            />
        </div>
    }else{
        return <div className={styles.contenedorInternoIconoLogoWithFile}>
            <File_Helper_Incident
                name="ArchivoLogoEmpresa"
                parametrofrom="ArchivoLogoEmpresa"
                className="image-file"
                setArchives={props.setFileLogo}
                archives={props.fileLogo}
                image={RemoveFile}
                accept = ".PNG, .JGP, .png, .jpg"
            />
        </div>
    }

    
  }

  return(
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <div className={styles.contenedorNuevo}>
          <div className={styles.contenedorInput}>
            <TextField
              type="text"
              name="nombre"
              defaultValue={state.identidadLegal.nombre}
              label="Nombre de la empresa*"
              variant="outlined"
              size="small"
              fullWidth={true}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={styles.inputEjemplo}
              error={
                formik.touched.nombre && Boolean(formik.errors.nombre)
              }
              InputProps={{
                readOnly: false,
              }}
              />
          </div>
          <div className={styles.contenedorError}>
            <span>{formik.touched.nombre && Boolean(formik.errors.nombre) && formik.errors.nombre}</span>
          </div>
          <div className={styles.contenedorInput}>
            <TextField
              type="text"
              name="razonSocial"
              defaultValue={state.identidadLegal.razonSocial}
              label="Razon Social*"
              variant="outlined"
              size="small"
              fullWidth={true}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                formik.touched.razonSocial && Boolean(formik.errors.razonSocial)
              }
              InputProps={{
                readOnly: false,
              }}
              />
              <div className={styles.contenedorError}>
                <span>{formik.touched.razonSocial && Boolean(formik.errors.razonSocial) && formik.errors.razonSocial}</span>
              </div>
          </div>

          <div className={styles.contenedorInputLogo}>
            <div className={styles.contenedorInternoLogo}>
              <p className={styles.textInternoLogo}>Cargar imagen de logotipo …*</p>
            </div>
            {inputFile()}
          </div>
   

          <div className={styles.contenedorError}>
                <span>{formik.touched.rfc && Boolean(formik.errors.rfc) && formik.errors.rfc}</span>
              </div>
          <div className={styles.contenedorInput}>
            <TextField
              type="text"
              name="rfc"
              defaultValue={state.identidadLegal.rfc}
              label="RFC*"
              variant="outlined"
              size="small"
              fullWidth={true}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                formik.touched.rfc && Boolean(formik.errors.rfc)
              }
              InputProps={{
                readOnly: false,
              }}
              />
              <div className={styles.contenedorError}>
                <span>{formik.touched.rfc && Boolean(formik.errors.rfc) && formik.errors.rfc}</span>
              </div>
          </div>
          <div className={styles.contenedorInput}>
            <TextField
              type="text"
              name="regimenFiscal"
              defaultValue={state.identidadLegal.regimenFiscal}
              label="Regimen fiscal*"
              variant="outlined"
              size="small"
              fullWidth={true}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                formik.touched.razonSocial && Boolean(formik.errors.regimenFiscal)
              }
              InputProps={{
                readOnly: false,
              }}
              />
              <div className={styles.contenedorError}>
                <span>{formik.touched.regimenFiscal && Boolean(formik.errors.regimenFiscal) && formik.errors.regimenFiscal}</span>
              </div>
          </div>
          <div className={styles.contenedorInput}>
            <TextField
              type="text"
              name="direccion"
              defaultValue={state.identidadLegal.direccion}
              label="Direccion*"
              variant="outlined"
              size="small"
              fullWidth={true}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                formik.touched.direccion && Boolean(formik.errors.direccion)
              }
              InputProps={{
                readOnly: false,
              }}
              />
              <div className={styles.contenedorError}>
                <span>{formik.touched.direccion && Boolean(formik.errors.direccion) && formik.errors.direccion}</span>
              </div>
          </div>
          <div className={styles.contenedorInput}>
            <TextField
              type="text"
              name="estado"
              defaultValue={state.identidadLegal.estado}
              label="Estado*"
              variant="outlined"
              size="small"
              fullWidth={true}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                formik.touched.estado && Boolean(formik.errors.estado)
              }
              InputProps={{
                readOnly: false,
              }}
              />
              <div className={styles.contenedorError}>
                <span>{formik.touched.estado && Boolean(formik.errors.estado) && formik.errors.estado}</span>
              </div>
          </div>
          <div className={styles.contenedorInput}>
            <TextField
              type="number"
              name="codigoPostal"
              defaultValue={state.identidadLegal.codigoPostal}
              label="Codigo postal*"
              variant="outlined"
              size="small"
              fullWidth={true}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                formik.touched.codigoPostal && Boolean(formik.errors.codigoPostal)
              }
              InputProps={{
                readOnly: false,
              }}
              />
              <div className={styles.contenedorError}>
                <span>{formik.touched.codigoPostal && Boolean(formik.errors.codigoPostal) && formik.errors.codigoPostal}</span>
              </div>
          </div>
          <div className={styles.contenedorBotones}>
            <button className={styles.botonCancelar}  onClick={handleClose}>
              Cancelar
            </button>
            <button 
              className={styles.botonSiguiente}
              //onClick={(e) => cambioEstado(e, !state.tabUno)}
              type="submit"
              >
              <div>
              Siguiente 
              </div>
              <div className={styles.iconoSiguiente}></div>
            </button>
          </div>
        </div>
      </Form>
    </div>
  )
}

const validationSchema = () =>{
  return{
    nombre: Yup.string().required("Obligatorio").max(100,'El tamaño maximo es 100 caracteres'),
    razonSocial: Yup.string().required("Obligatorio").max(100, 'El tamaño maximo es 100 caracteres'),
    rfc: Yup.string().required("Obligatorio").max(13,'El tamaño maximo es 13 caracteres'),
    regimenFiscal: Yup.string().required("Obligatorio"),
    direccion: Yup.string().required("Obligatorio").max(100,'El tamaño maximo es 100 caracteres'),
    estado: Yup.string().required("Obligatorio"),
    codigoPostal: Yup.string().required("Obligatorio").max(5, 'El tamaño maximo es 5 caracteres'),
  }
}

export default IdentidadLegal