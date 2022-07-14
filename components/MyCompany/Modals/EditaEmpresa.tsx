import { useContext, useEffect, useState} from "react"
import EmpresaContext from "../../../context/Empresa/EmpresaContext"
import {Dialog} from "@material-ui/core"
import { clearEmpresaModal } from "../../../context/Empresa/Actions"
import styles from '../../../styles/MiEmpresa/EditaEmpresa.module.css'
import { GET_ENTERPRISE } from "../../../Querys/querys"
import { useQuery } from "@apollo/client"


const EditaEmpresa = () =>{
  const {state, dispatch} = useContext(EmpresaContext)
  const {data: dataEnterprise}= useQuery(GET_ENTERPRISE,{
    variables:{
      getEnterpriseId: state._id
    }
  })

  const handleClose = () => {
    clearEmpresaModal({}, dispatch)
  } 

  console.log('Datos', dataEnterprise)

  return(
    <Dialog open={state.updateEmpresa} aria-labelledby="form-dialog-title" onClose={handleClose} maxWidth={"md"}>
      <div className={styles.contenedor}>
        <div className={styles.contenedorTitulo}>
          <div className={styles.titulo}>
            Editar empresa
          </div>
          <div className={styles.iconoCerrarEmpresa}></div> 
        </div>
        <div className={styles.contenedorFormulario}>
          <div className={styles.formularioColumnaUno}>
            <div>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Nombre de la empresa</legend>
                <input 
                  type="text"
                  className={styles.input}
                  defaultValue={dataEnterprise?.GET_ENTERPRISE?.name}
                  />
              </fieldset>
            </div>
            <div className={styles.contenedorFieldset}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>R&aacute;zon social</legend>
                <input 
                  type="text"
                  className={styles.input}
                  defaultValue={dataEnterprise?.GET_ENTERPRISE?.name}
                  />
              </fieldset>
            </div>
            <div className={styles.contenedorFieldset}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>logo</legend>
                <input 
                  type="text"
                  className={styles.input}
                  defaultValue={dataEnterprise?.GET_ENTERPRISE?.logo}
                  />
              </fieldset>
            </div>
            <div className={styles.contenedorFieldset}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>RFC</legend>
                <input 
                  type="text"
                  className={styles.input}
                  defaultValue={dataEnterprise?.GET_ENTERPRISE?.taxRegime}
                  />
              </fieldset>
            </div>
            <div className={styles.contenedorFieldset}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>R&eacute;gimen fiscal</legend>
                <input 
                  type="text"
                  className={styles.input}
                  defaultValue={dataEnterprise?.GET_ENTERPRISE?.propertyRegime}
                  />
              </fieldset>
            </div>
            <div className={styles.contenedorFieldset}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Direcci&oacute;n</legend>
                <input 
                  type="text"
                  className={styles.input}
                  defaultValue={dataEnterprise?.GET_ENTERPRISE?.address}
                  />
              </fieldset>
            </div>
            <div className={styles.contenedorFieldset}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Estado</legend>
                <input 
                  type="text"
                  className={styles.input}
                  defaultValue={dataEnterprise?.GET_ENTERPRISE?.state}
                  />
              </fieldset>
            </div>
            <div className={styles.contenedorFieldset}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Código postal</legend>
                <input 
                  type="text"
                  className={styles.input}
                  defaultValue={dataEnterprise?.GET_ENTERPRISE?.zipCode}
                  />
              </fieldset>
            </div>
          </div>
          <div className={styles.formularioColumnaDos}>
            <div className={styles.tituloColumnaDos}>Agrega uno o varios registros patronales y su prima de riesgo</div>
            <div className={styles.contenedorArchivos}>
              <div>
                <div className={styles.textoArchivos}>
                  Llave del certificado de sello digital
                </div>
                <div className={styles.contenedorDocumento}>
                <div className={styles.iconoVerDocumento}></div>
                <div className={styles.textoVerDocumento}>
                  Ver documento
                </div>
              </div>
            </div>
            <div>
              <button className={styles.botonsubirArchivosLlaves}>
                <div className={styles.iconoSubirArchivos}></div>
                <div>
                  Cambiar archivo
                </div>
              </button>
              </div>
            </div>
            <div className={`${styles.contenedorArchivos} ${styles.contenedorArchivosDos}`}>
            <div className={styles.textoArchivos}>
              Certificado de sello digital
            </div>
            <div>
              <button className={styles.botonSeleccionarArchivo}>
                <div className={styles.iconoSubirArchivos}></div>
                <div>
                  Seleccionar archivo
                </div>
              </button>
            </div>
          </div>
          <div className={styles.contenedorContrasena}>
          <fieldset className={styles.fieldsetContrasena}>
            <legend>Contrase&ntilde;a para el certificado de sello digital</legend>
            <input type="password"></input>
            <div className={styles.iconoVerContrasena}></div>
          </fieldset>
        </div>
        <div className={styles.contenedorRegistro}>
        <div className={styles.contenedorInputsRegistro}>
          <div>
            <input 
              type="text" 
              placeholder="Registro patronal"
              name="uno"
              className={styles.inputRegistroPatronal}
              />
          </div>
          <div className={styles.lineaInputs}></div>
          <div>
            <input 
              type="text" 
              placeholder="Prima de riesgo"
              name="dos"
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
        </div>
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
    </Dialog>
  )
}

export default EditaEmpresa 