import { useContext, useState, useEffect } from "react"
import EmpresaContext from "../../../context/Empresa/EmpresaContext"
import {FormHelperText, Button, Dialog, DialogContent, TextField, DialogActions,Select, InputLabel,FormControl,MenuItem,FormControlLabel,Checkbox  } from "@material-ui/core"
import { clearEmpresaModal } from "../../../context/Empresa/Actions"
import styles from "../../../styles/MiEmpresa/CrearEmpresa.module.css"
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import IdentidadLegal from "./subMenus/IdentidadLegal"
import CertificadosLlaves from "./subMenus/CertificadosLlaves"
import InformacionBancaria from "./subMenus/InformacionBancaria"


const CrearEmpresa = () => {
  const {state, dispatch} = useContext(EmpresaContext)
  console.log('Crear empresa', state)
  const [activo, setActivo] = useState('1')
  const [fileLogo, setFileLogo] = useState<any>();
  const [fileIMSS, setFileIMSS] = useState<any>();
  const [fileSello, setFileSello] = useState<any>();
  const [tabIdentidad, setTabIdentid] = useState<string>('1')

  const handleClose = () => {
    clearEmpresaModal({}, dispatch)
  } 

  useEffect(()=>{
    setActivo(activo)
    console.log('activo', activo)
  },[activo])

  console.log('activo', state)

  return(
    <Dialog open={state.createEmpresa} aria-labelledby="form-dialog-title" onClose={handleClose} maxWidth={"md"}>
      <div className={styles.contenedorTitulo}>
        <div className={styles.tituloCrearEmpresa}>
          Agregar nueva empresa
        </div>
        <div className={styles.contenedorCerrarModal}>
          <div className={styles.iconoCerrarModal}></div>      
        </div>
      </div>
      <div className={styles.contenedorTabs}>
        <TabsUnstyled defaultValue={0} >
          <TabsListUnstyled className={styles.tabs}>
            {(state.tabUno === true)?
              <TabUnstyled className={`${styles.tab} ${activo === '1'? styles.tabCompletaSeleccionado : styles.tabCompletaSinSeleccion}`} onClick={(e)=> setActivo('1')}>
                <div>
                  Identidad legal
                </div>
                <div className={styles.circuloCompletoSeleccionado}>
                  <div className={styles.iconoCompleto}></div>
                </div>
              </TabUnstyled>            
            :
              <TabUnstyled className={`${styles.tab} ${activo === '1'? styles.tabSeleccionadoSinTerminar : styles.tabSinSeleccionSinTerminar}`} onClick={(e)=> setActivo('1')}>
                <div>
                  Identidad legal
                </div>
                <div className={styles.circuloCompletoSeleccionado}>
                  <div className={styles.iconoCompleto}></div>
                </div>
              </TabUnstyled>    
            }
            {(state.tabUno === true)?
              <TabUnstyled className={`${styles.tab} ${activo === '2'? styles.tabSeleccionadoSinTerminar : styles.tabSinSeleccionSinTerminar}`} onClick={(e)=> setActivo('2')}>
                <div>
                  Certificados y llaves
                </div>
                <div className={styles.circuloSinSeleccionSinTerminar}></div>
              </TabUnstyled>
              :
              <TabUnstyled className={`${styles.tab} ${activo === '2'? styles.tabSeleccionadoSinTerminar : styles.tabSinSeleccionSinTerminar}`} >
                <div>
                  Certificados y llaves
                </div>
                <div className={styles.circuloSinSeleccionSinTerminar}></div>
              </TabUnstyled>
            }
            {(state.tabDos === true)?
              <TabUnstyled className={`${styles.tab} ${activo === '3'? styles.tabSeleccionadoSinTerminar : styles.tabSinSeleccionSinTerminar}`} onClick={(e)=> setActivo('3')}>
                <div>
                  Informacion bancaria
                </div>
                <div className={styles.circuloSinSeleccionSinTerminar}></div>
              </TabUnstyled>
              :
              <TabUnstyled className={`${styles.tab} ${activo === '3'? styles.tabSeleccionadoSinTerminar : styles.tabSinSeleccionSinTerminar}`}>
                <div>
                  Informacion bancaria
                </div>
                <div className={styles.circuloSinSeleccionSinTerminar}></div>
              </TabUnstyled>
            }
            
          </TabsListUnstyled>
          {(activo === '1')?
            <IdentidadLegal setActivo={setActivo} fileLogo={fileLogo} setFileLogo={setFileLogo} fileIMSS={fileIMSS} setFileIMSS={setFileIMSS} fileSello={fileSello} setFileSello={setFileSello} />
          :
          null
          } 
          {(activo === '2')?
           <CertificadosLlaves setActivo={setActivo} fileLogo={fileLogo} setFileLogo={setFileLogo} fileIMSS={fileIMSS} setFileIMSS={setFileIMSS} fileSello={fileSello} setFileSello={setFileSello} />
          :
          null
          } 
          {(activo === '3')?
            <InformacionBancaria setActivo={setActivo} fileLogo={fileLogo} setFileLogo={setFileLogo} fileIMSS={fileIMSS} setFileIMSS={setFileIMSS} fileSello={fileSello} setFileSello={setFileSello} />
          :
          null
          } 
        </TabsUnstyled>
      </div>
    </Dialog>
  )
}

export default CrearEmpresa