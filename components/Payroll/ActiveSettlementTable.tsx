import {useState, useEffect, useContext, useReducer} from "react";
import { useToggle } from '../../hooks/useToggle';
import EliminaSettlement from "./Modals/EliminaSettlement";
import CrearSettlementModal from "./Modals/CrearSettlementModal";
import { tabSettlementPayrollReducer } from "../../context/PayrollContext/TabSettlementPayrollReducer"
import { openSettlementPayrollModal } from "../Team/Modals/ModalSettlementModal";
import { createSettlementModal, deleteSettlementProcess } from "../../context/PayrollProcess/SettlementActions";

import SettlementPayrollProcessContext from "../../context/PayrollProcess/SettlementPayrollProcessContext";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_SETTLEMENTPAYROLL } from "../../Querys/querys";
import styles from './PayrollStyles.module.css'
import { getDateDay,getDateComplete } from "../../helpers/Payroll/Payroll";
import { formatter } from "../../helpers/formatoMoneda";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const ActivePayrollTable = (props: TabPanelProps) =>{
    const resultPayroll = useQuery(GET_ALL_SETTLEMENTPAYROLL);
    const allPayroll = resultPayroll.data?.GET_ALL_SETTLEMENTPAYROLL;

    const [PayrollState, PayrollDispatch,] = useReducer(tabSettlementPayrollReducer, { loading: true, SettlementPayrolls: [], SettlementPayrollFilter: [] });
    const history = useHistory();
    const {state, dispatch} = useContext(SettlementPayrollProcessContext)
    const [anchorEl, setAnchorEl] = useState<any>(null);

    useEffect(()=>{
        obtenerDatos();
    },[])
    const obtenerDatos = async () => {
      //const resultPayroll = useQuery(GET_ALL_SETTLEMENTPAYROLL);
      //const allPayroll = resultPayroll.data?.GET_ALL_SETTLEMENTPAYROLL;
      //let Payroll = await getPayroll();
      //setPayroll(Payroll)
    }
    const abreEliminaSettlement = (id: any) => {
        openSettlementPayrollModal({ _id: id, showEliminar:true }, dispatch);
        setAnchorEl(null);
    }

    const createModal = () =>{
      createSettlementModal({createSettlement: true}, dispatch)
  }

    const eliminaSettlement = (id:any) =>{
      deleteSettlementProcess({_id: id, deleteModal: true}, dispatch)
    }

    return(
      <>
        <div className={styles.pp_contenedor}>
          <div className={styles.pp_contenedorBoton}>
              <button className={styles.pp_botonCrear}
                onClick={()=> createModal()}
                >
                <div>
                  <span className={styles.pp_signo}>+</span>
                </div> 
                <div>
                  Solicitud de baja
                </div>
              </button>
          </div>
        </div>
        <div className={styles.pp_contenedorLista}>
          
          <div className={styles.pc_contenedorNombre}>
          <div>
            <span className={styles.pc_tituloPrincipal}>Finiquitos</span>
          </div>
       </div>
          {allPayroll?.map((lis:any)=>
              lis.recessionJob === "Finiquito" &&(
            <div className={styles.pp_lista}>
              <div className={styles.pp_ColumnaUnoLista}>
                <div className={styles.pp_tituloGrupo}>
                  <span>{lis.Collaborator}</span>
                </div>
                <div className={styles.pp_procesoCalcular}>
                  <span>Calcular</span>
                </div>
                <div className={styles.pp_contenedorBarras}>
                  <div className={styles.pc_circuloAmarillo}>
                    <div className={styles.pd_iconoCompleto}></div>
                  </div>
                  <div className={styles.pc_lineaSeguimientoPrincipalCompleto}></div>
                  <div className={styles.pc_circuloAmarillo}>
                    <div className={styles.pc_circuloBlanco}></div>
                  </div>
                  <div className={styles.pc_lineaSeguimientoPrincipal}></div>
                  <div className={styles.pc_circuloGris}></div>
                  <div className={styles.pc_lineaSeguimientoPrincipal}></div>
                  <div className={styles.pc_circuloGris}></div>
                </div>
              </div>
              <div className={styles.pp_ColumnaDosLista}>
                <div className={`${styles.pp_columnaInterna} ${styles.pp_internaUno}`}>
                  <div>
                    <span className={styles.pp_textoInterno}>RFC</span>
                  </div>
                  <div>
                    <span className={styles.pp_valorInterno}>{lis.users.RFC}</span>
                  </div>
                </div>
                <div className={`${styles.pp_columnaInterna} ${styles.pp_internaUno}`}>
                  <div>
                    <span className={styles.pp_textoInterno}>Empresa</span>
                  </div>
                  <div>
                    <span className={styles.pp_valorInterno}>{lis.users.Company}</span>
                  </div>
                </div>
                <div className={`${styles.pp_columnaInterna} ${styles.pp_internaUno}`}>
                  <div>
                    <span className={styles.pp_textoInterno}>Fecha de baja</span>
                  </div>
                  <div>
                    <span className={styles.pp_valorInterno}>{getDateComplete(lis.dischargeDate)}</span>
                  </div>
                </div>
                <div className={`${styles.pp_columnaInterna} ${styles.pp_internaUno}`}>
                  <div>
                    <span className={styles.pp_textoInterno}>Fecha de alta</span>
                  </div>
                  <div>
                    <span className={styles.pp_valorInterno}>{getDateComplete(lis.users.dateOfAdmission)}</span>
                  </div>
                </div>
              </div>
              <div className={styles.pp_ColumnaTresLista}>
                <div>
                  <button className={styles.pp_botonComenzar}  onClick={() => history.push(`/InitSettlement/${lis.id}/${lis.Collaborator}`)}>
                    Continuar
                  </button>
                </div>
                <div 
                  className={styles.pp_contenedorIconoEliminar}
                  onClick={() => eliminaSettlement(lis.id)}
                  >
                  <img className={styles.pp_iconoEliminar} src='/assets/svg/icono_eliminar-nomina.svg'></img>
                  <span className={styles.pp_textoEliminar}>Eliminar</span>
                </div>
              </div>
            </div>
          ))}

        <div className={styles.pc_contenedorNombre}>
          <div>
            <span className={styles.pc_tituloPrincipal}>Liquidacion</span>
          </div>
       </div>
           {allPayroll?.map((lis:any)=>
            lis.recessionJob === "Liquidacion" &&(
            <div className={styles.pp_lista}>
              <div className={styles.pp_ColumnaUnoLista}>
                <div className={styles.pp_tituloGrupo}>
                  <span>{lis.Collaborator}</span>
                </div>
                <div className={styles.pp_procesoCalcular}>
                  <span>Calcular</span>
                </div>
                <div className={styles.pp_contenedorBarras}>
                  <div className={styles.pc_circuloAmarillo}>
                    <div className={styles.pd_iconoCompleto}></div>
                  </div>
                  <div className={styles.pc_lineaSeguimientoPrincipalCompleto}></div>
                  <div className={styles.pc_circuloAmarillo}>
                    <div className={styles.pc_circuloBlanco}></div>
                  </div>
                  <div className={styles.pc_lineaSeguimientoPrincipal}></div>
                  <div className={styles.pc_circuloGris}></div>
                  <div className={styles.pc_lineaSeguimientoPrincipal}></div>
                  <div className={styles.pc_circuloGris}></div>
                </div>
              </div>
              <div className={styles.pp_ColumnaDosLista}>
                <div className={`${styles.pp_columnaInterna} ${styles.pp_internaUno}`}>
                  <div>
                    <span className={styles.pp_textoInterno}>RFC</span>
                  </div>
                  <div>
                    <span className={styles.pp_valorInterno}>{lis.users.RFC}</span>
                  </div>
                </div>
                <div className={`${styles.pp_columnaInterna} ${styles.pp_internaUno}`}>
                  <div>
                    <span className={styles.pp_textoInterno}>Empresa</span>
                  </div>
                  <div>
                    <span className={styles.pp_valorInterno}>{lis.users.Company}</span>
                  </div>
                </div>
                <div className={`${styles.pp_columnaInterna} ${styles.pp_internaUno}`}>
                  <div>
                    <span className={styles.pp_textoInterno}>Fecha de Baja</span>
                  </div>
                  <div>
                    <span className={styles.pp_valorInterno}>{getDateComplete(lis.dischargeDate)}</span>
                  </div>
                </div>
                <div className={`${styles.pp_columnaInterna} ${styles.pp_internaUno}`}>
                  <div>
                    <span className={styles.pp_textoInterno}>Fecha de alta</span>
                  </div>
                  <div>
                    <span className={styles.pp_valorInterno}>{getDateComplete(lis.users.dateOfAdmission)}</span>
                  </div>
                </div>
              </div>
              <div className={styles.pp_ColumnaTresLista}>
                <div>
                  <button className={styles.pp_botonComenzar}  onClick={() => history.push(`/InitSettlement/${lis.id}/${lis.Collaborator}`)}>
                    Continuar
                  </button>
                </div>
                <div 
                  className={styles.pp_contenedorIconoEliminar}
                  onClick={() => eliminaSettlement(lis.id)}
                  >
                  <img className={styles.pp_iconoEliminar} src='/assets/svg/icono_eliminar-nomina.svg'></img>
                  <span className={styles.pp_textoEliminar}>Eliminar</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <CrearSettlementModal getDatos={obtenerDatos}/>
        <EliminaSettlement getDatos={obtenerDatos}/>
      </>
    )
}

export default ActivePayrollTable