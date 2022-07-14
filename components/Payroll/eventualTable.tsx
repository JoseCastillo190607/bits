import {useState, useEffect, useContext} from "react";
import EliminaEventualPayroll from "./Modals/EliminaEventualPayroll";
import CrearEventualPayrollsModal from "./Modals/CrearEventualPayrollsModal";
import { createEventualnominaModal, deleteEventualProcess } from "../../context/PayrollProcess/EventualActions";
import EventualPayrollProcessContext from "../../context/PayrollProcess/EventualPayrollProcessContext";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_EVENTUALPAYROLL, UPDATE_EVENTUALPAYROLL_STATE } from "../../Querys/querys";
import styles from './PayrollStyles.module.css'
import { getDateDay, getDateYear } from "../../helpers/Payroll/Payroll";
import { formatter } from "../../helpers/formatoMoneda";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const ActivePayrollTable = (props: TabPanelProps) =>{
    const resultPayroll = useQuery(GET_ALL_EVENTUALPAYROLL);
    const allPayroll = resultPayroll.data?.GET_ALL_EVENTUALPAYROLL;

    const history = useHistory();
    const {state, dispatch} = useContext(EventualPayrollProcessContext)
    const [anchorEl, setAnchorEl] = useState<any>(null);

    useEffect(()=>{
        obtenerDatos();
    },[])
    
    const obtenerDatos = async () => {

    }

    const [updatePayroll] = useMutation(UPDATE_EVENTUALPAYROLL_STATE);

    const updateState = (id:any) =>{
      updatePayroll({
        variables: {
          input: {
            id: id
            ,statusProgress: "Calcular",
          },
        },
      });
    }

    const createModal = () =>{
      createEventualnominaModal({createEventual: true}, dispatch)
  }

    const eliminaEventual = (id:any) =>{
      deleteEventualProcess({_id: id, deleteModal: true}, dispatch)
    }

    console.log('Eventuales',allPayroll)
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
                  Nueva Nómina Eventual
                </div>
              </button>
          </div>
        </div>
        <div className={styles.pp_contenedorLista}>
          {allPayroll?.map((lis:any)=>
            <div className={styles.pp_lista}>
              <div className={styles.pp_ColumnaUnoLista}>
                <div className={styles.pp_tituloGrupo}>
                  <span>{lis.group_name}</span>
                </div>
                <div className={styles.pp_tituloGrupo}>
                  {(lis.payroll_type === 'PTU')?
                  <span>{lis.payroll_type} {lis.AnioPTU}</span>
                  :
                  <span>{lis.payroll_type} {getDateDay(lis?.init_date)} {getDateDay(lis?.end_date)}</span>
                  }
                </div>
                <div className={styles.pp_procesoCalcular}>
                  <span>1 Calcular</span>
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
                    <span className={styles.pp_textoInterno}>Empleados</span>
                  </div>
                  <div>
                    <span className={styles.pp_valorInterno}>{lis.employees}</span>
                  </div>
                </div>
                <div className={`${styles.pp_columnaInterna} ${styles.pp_internaUno}`}>
                  <div>
                    <span className={styles.pp_textoInterno}>Percepciones</span>
                  </div>
                  <div>
                    <span className={styles.pp_valorInterno}>{formatter(lis.perception)}</span>
                  </div>
                </div>
                <div className={`${styles.pp_columnaInterna} ${styles.pp_internaUno}`}>
                  <div>
                    <span className={styles.pp_textoInterno}>Deducciones</span>
                  </div>
                  <div>
                    <span className={styles.pp_valorInterno}>{formatter(lis.deduction)}</span>
                  </div>
                </div>
                <div className={`${styles.pp_columnaInterna} ${styles.pp_internaUno}`}>
                  <div>
                    <span className={styles.pp_textoInterno}>Total</span>
                  </div>
                  <div>
                    <span className={styles.pp_valorInterno}>{formatter(lis.total)}</span>
                  </div>
                </div>
              </div>
              <div className={styles.pp_ColumnaTresLista}>
                <div>
                  <button className={styles.pp_botonComenzar}  onClick={() =>
                    {
                      updateState(lis.id)
                      history.push(`/InitEventualPayroll/${lis.id}/${lis.group_name}`)
                    }}>
                    Continuar
                  </button>
                </div>
                <div 
                  className={styles.pp_contenedorIconoEliminar}
                  onClick={() => eliminaEventual(lis.id)}
                  >
                  <img className={styles.pp_iconoEliminar} src='/assets/svg/icono_eliminar-nomina.svg'></img>
                  <span className={styles.pp_textoEliminar}>Eliminar</span>
                </div>
              </div>
            </div>
        )}
        </div>

        <CrearEventualPayrollsModal getDatos={obtenerDatos}/>
        <EliminaEventualPayroll getDatos={obtenerDatos}/>
      </>
    )
}

export default ActivePayrollTable