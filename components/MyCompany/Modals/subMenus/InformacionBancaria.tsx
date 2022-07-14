import { useContext, useEffect, useState } from "react";
import styles from "../../../../styles/MiEmpresa/informacionBancaria.module.css"
import InputEmpresa from "./InputLegal"
import EmpresaContext from "../../../../context/Empresa/EmpresaContext";
import { updateState, clearEmpresaModal } from "../../../../context/Empresa/Actions";
import { useFormik } from "formik"
import * as Yup from "yup"
import { Form, Button } from "semantic-ui-react";
import { TextField } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { GET_ALL_ENTERPRISE, CREATE_ENTERPRISE, CREATE_REGISTROPATRONAL } from "../../../../Querys/querys";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import {
  postFileIncidentAWS, postFilesEnterprisAWS,
} from "../../../../services/candidateService";

const InformacionBancaria = (props:any) => {
  const {state, dispatch} = useContext(EmpresaContext)
  const [registroPatronal, setRegistroPatronal] = useState([])
  const [createNewCompany] = useMutation(CREATE_ENTERPRISE, {
    refetchQueries: [{ query: GET_ALL_ENTERPRISE }],
  });

  const [createRegistroPatronal] = useMutation(CREATE_REGISTROPATRONAL);

  const insertArchive = async (idEmpresa: any) =>{
    
    if(props.fileLogo !== undefined){
      const restultLOGO = await postFilesEnterprisAWS(props.fileLogo, idEmpresa, "LogoEmpresa","LogoEmpresa",false);
    }
    if(props.fileIMSS !== undefined){
      const restultIMSS = await postFilesEnterprisAWS(props.fileIMSS, idEmpresa, "IMSSEmpresa","IMSSEmpresa",false);
    }
    if(props.fileSello !== undefined){
      const restultSELLO = await postFilesEnterprisAWS(props.fileSello, idEmpresa, "SELLOEmpresa","SELLOEmpresa",false);
    }

    handleClose();

    SuccessfulAlert({
      title: "¡Exito!",
      text: "¡Se agregó la empresa!",
    });
    
    //console.log(restult)

  }

  const insertRegistroPatronal = (idEmpresa: any) =>{

  state.registroPatronal?.forEach((reg:any) =>{
      if(reg.RegistroPatronal !== "" ||  reg.PrimaRiesgo !== ""){
         createRegistroPatronal({
          variables: {
            input: {
              identerprise: parseInt(idEmpresa),
              registroPatronal: reg.RegistroPatronal,
              primaRiesgo: reg.PrimaRiesgo,
            },
          },
        })
      }
      
    })

  }

  const cambioEstado = async(event:any, value:{}) =>{
    console.log('valor que entra', value)
    await updateState(event, state, dispatch, 'informacionBancaria', value,'tabTres')
    console.log('Datos Completos', state)
    
    createNewCompany({
      variables: {
        input: {
          name: state.identidadLegal.nombre,
          logo: '',
          industry: '',
          taxRegime: state.identidadLegal.rfc,
          propertyRegime: state.identidadLegal.regimenFiscal,
          surcharge: '',
          state: state.identidadLegal.estado,
          address: state.identidadLegal.direccion,
          zipCode: String(state.identidadLegal.codigoPostal),
          bankaccount: state.informacionBancaria.cuentaBancaria,
          IMSSSubdelegationKey:'',
          fileCER: '',
          extrahours: false,
          automaticCalculationsVariables: false,
          useSTPaspaymentmethod: false,
          STPaccount: state.informacionBancaria.cuentaClabeSTP,
          stpCLABE: state.informacionBancaria.cuentaSTP,
          IMSSminimumwage: false,
          operationsIMSSSender: false,
          CertificateOfUserIMSS: "NA",
          CertificatePaswordIMSS:state.certificadoLlaves.password,
          IMSSCertificate: "NA",
          FIELCertificate: "NA",
          FIELPrivateKey: "NA",
          RazonSocial: state.identidadLegal.razonSocial
        },
      },
    }).then((data)=>{
      //console.log(data)
      insertRegistroPatronal(data?.data.CREATE_ENTERPRISE.id)

      if(props.fileLogo !== undefined || props.fileIMSS !== undefined || props.fileSello !== undefined){
        insertArchive(data?.data.CREATE_ENTERPRISE.id)

      }else{
        handleClose();
        SuccessfulAlert({
            title: "¡Exito!",
            text: "¡Se agregó la empresa!",
        });
      }
    });
  }

  const initialValues = () => {
    return{
      cuentaBancaria: state.informacionBancaria.cuentaBancaria,
      cuentaSTP: state.informacionBancaria.cuentaSTP,
      cuentaClabeSTP:state.informacionBancaria.cuentaClabeSTP
    }
  }
  
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit:(formData) => {
      cambioEstado('', formData)
    }
  })

  const handleClose = () => {
    props.setFileIMSS(undefined)
    props.setFileSello(undefined)
    props.setFileLogo(undefined)
    props.setActivo('1')
    clearEmpresaModal({}, dispatch);
  };

  return(
    <>
    <Form onSubmit={formik.handleSubmit}>
      <div className={styles.contenedorInformacionBancaria}>
        <div className={styles.contenedorInput}>
          <TextField
            type="text"
            name="cuentaBancaria"
            defaultValue={state.informacionBancaria.cuentaBancaria}
            label="Cuenta Bancaria*"
            variant="outlined"
            size="small"
            fullWidth={true}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.cuentaBancaria && Boolean(formik.errors.cuentaBancaria)
              }
            InputProps={{
                
                readOnly: false
              }}
          />
        </div>
          <div className={styles.contenedorError}>
            <span>{formik.touched.cuentaBancaria && Boolean(formik.errors.cuentaBancaria) && formik.errors.cuentaBancaria}</span>
          </div>
        <div className={styles.contenedorInput}>
          <TextField
            type="text"
            name="cuentaSTP"
            defaultValue={state.informacionBancaria.cuentaSTP}
            label="Cuenta STP"
            variant="outlined"
            size="small"
            fullWidth={true}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.cuentaSTP && Boolean(formik.errors.cuentaSTP)
            }
            InputProps={{
              readOnly: false,
            }}
          />
        </div>
        <div className={styles.contenedorError}>
          <span>{formik.touched.cuentaSTP && Boolean(formik.errors.cuentaSTP) && formik.errors.cuentaSTP}</span>
        </div>
        <div className={styles.contenedorInput}>
          <TextField
            type="text"
            name="cuentaClabeSTP"
            defaultValue={state.informacionBancaria.cuentaClabeSTP}
            label="Cuenta CLAVE STP*"
            variant="outlined"
            size="small"
            fullWidth={true}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.cuentaClabeSTP && Boolean(formik.errors.cuentaClabeSTP)
            }
            InputProps={{
              readOnly: false,
            }}
          />
        </div>
        <div className={styles.contenedorError}>
          <span>{formik.touched.cuentaClabeSTP && Boolean(formik.errors.cuentaClabeSTP) && formik.errors.cuentaClabeSTP}</span>
        </div>
      </div>
      <div className={styles.contenedorBotones}>
        <div>
          <button className={styles.botonCancelarModal} onClick={handleClose}>
            Cancelar
          </button>
        </div>
        <div>
          <button className={styles.botonCrearEmpresaModal} type="submit">
            <div className={styles.iconoCrearEmpresaModal}></div>
            <div>
              Crear
            </div>
          </button>
        </div>
      </div>
    </Form>    
    </>
  )
}


const validationSchema = () => {
  return{
    cuentaBancaria: Yup.string().required("Obligatorio"),
    cuentaSTP: Yup.string().required("Obligatorio"),
    cuentaClabeSTP: Yup.string().required("Obligatorio"),
  }
}


export default InformacionBancaria