import { useContext} from "react"
import EmpresaContext from "../../../context/Empresa/EmpresaContext"
import styles from '../../../styles/MiEmpresa/CrearSede.module.css'
import {Dialog} from "@material-ui/core"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Form } from "semantic-ui-react";
import { GET_ALL_SEDE, UPDATE_SEDE } from "../../../Querys/querys"
import { useMutation } from "@apollo/client";
import { clearEmpresaModal } from "../../../context/Empresa/Actions"
import { SuccessfulAlert } from "../../../alerts/successAlerts"

const EditaSede = () => {
  const {state, dispatch} = useContext(EmpresaContext)

  const [updateSede] = useMutation(UPDATE_SEDE,{
    refetchQueries:[{query: GET_ALL_SEDE}]
  })
  
  const handleClose = () => {
    console.log("Hola no")
    clearEmpresaModal({}, dispatch)
  } 
  
  console.log('state', state)

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit:(formData) =>{
      updateSede({
        variables:{
          updateSedeId: state._id,
          input:{
            sedeName: formData.nombre
          }
        }
      })
      SuccessfulAlert({text:'Registro Actualizado'})
      handleClose() 
    }
  })

  return(
    <Dialog open={state.updateSede} aria-labelledby="form-dialog-title" onClose={handleClose} maxWidth={"md"}>
      <div className={styles.contenedorPrincipal}>
        <div className={styles.contenedorTitulo}>
          Agregar sede
        </div>
        <Form onSubmit={formik.handleSubmit}>
          <div className={styles.contenedorInput}>
            <input
              name="nombre"
              className={styles.inputNombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={state.nombreSede}
              />
          </div>
          <div className={styles.contenedorError}>
            <span>{formik.touched.nombre && formik.errors.nombre}</span>
          </div>
          <div className={styles.contendorBotones}>
              <button 
                className={styles.botonCancelar}
                type="button"
                onClick={() => handleClose()}>
                Cancelar  
              </button>
              <button 
                className={styles.botonGuardar}
                type="submit"
                >
                <div className={styles.iconoGuardar}></div>
                <div>Guardar</div>
              </button>
          </div>
        </Form>
      </div>
    </Dialog>
  )
}

const initialValues = () =>{
  return{
    nombre: ""
  }
}

const validationSchema = () =>{
  return{
    nombre: Yup.string().required("Por favor ingresa el nombre").max(100, 'El tamaño maximo es 100 caracteres')
  }
}

export default EditaSede 