import { useContext, useState, useEffect } from "react"
import EmpresaContext from "../../../context/Empresa/EmpresaContext"
import { clearEmpresaModal } from "../../../context/Empresa/Actions"
import {Dialog} from "@material-ui/core"
import styles from '../../../styles/MiEmpresa/CrearProyecto.module.css'
import { useFormik } from "formik"
import * as Yup from "yup"
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT, GET_ALL_PROJECT } from "../../../Querys/querys"
import { SuccessfulAlert } from "../../../alerts/successAlerts"

const CrearProyecto = () =>{
  const {state, dispatch} = useContext(EmpresaContext)
  const [createNewProyect] = useMutation(CREATE_PROJECT,
    {refetchQueries: [{query: GET_ALL_PROJECT}]} )

  const handleClose = () => {
    clearEmpresaModal({}, dispatch)
  } 

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit:(formData) =>{
      createNewProyect({
        variables:{
          input:{
            proyectName: formData.nombre,
            client: formData.cliente
          }
        }
      })
      SuccessfulAlert({text:'Registro Actualizado'})
      handleClose() 
    }
  })

  return(
    <Dialog open={state.createProject} aria-labelledby="form-dialog-title" onClose={handleClose} maxWidth={"md"}>
      <div className={styles.contenedorPrincipal}>
        <div className={styles.titulo}>
          Agregar &Aacute;rea o Proyecto
        </div>
        <Form onSubmit={formik.handleSubmit} >
          <div className={styles.contenedorInputs}>
            <div className={styles.textoInputs}>
              Nombre
            </div>
            <div>
              <input 
                type="text"
                name="nombre"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className={styles.contenedorError}>
              <span>{formik.touched.nombre && formik.errors.nombre}</span>
            </div>
            <div className={styles.textoInputs}>
              Cliente
            </div>
            <div>
              <input 
                type="text"
                name="cliente"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className={styles.contenedorError}>
              <span>{formik.touched.cliente && formik.errors.cliente}</span>
            </div>
            <div className={styles.contenedorBotones}>
              <button 
                className={styles.botonCancelar}
                onClick={() => handleClose()}
                type="button"
                >
                Cancelar
              </button>
              <button 
                className={styles.botonGuardar}
                type="submit"
                >
                <div className={styles.iconoGuardar}></div>
                Guardar
              </button>
            </div>
          </div>
        </Form>
      </div>
    </Dialog>
  )
}

const initialValues = () =>{
  return{
    nombre:"",
    cliente: ""
  }
}

const validationSchema = ()=>{
  return{
    nombre: Yup.string().required("Por favor ingresa el nombre").max(100, "El tamaño maximo es 100 caracteres"),
    cliente: Yup.string().required("Por favort ingresa el cliente").max(100, "El tamaño maximo es 100 caracteres")
  }
}

export default CrearProyecto



