import {useState, useEffect, useContext} from "react";
import EliminaPayroll from "./Modals/EliminaPayroll";
import CrearPayrollsModal from "./Modals/CrearPayrollsModal";
import { createPrenominaModal, deletePayrollProcess } from "../../context/PayrollProcess/Actions";
import PayrollProcessContext from "../../context/PayrollProcess/PayrollProcessContext";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PAYROLL, UPDATE_PAYROLL_STATE } from "../../Querys/querys";
import styles from './PayrollStyles.module.css'
import { getDateDay } from "../../helpers/Payroll/Payroll";
import { formatter } from "../../helpers/formatoMoneda";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const ActivePayrollTable = (props: TabPanelProps) =>{
    const resultPayroll = useQuery(GET_ALL_PAYROLL);
    const allPayroll = resultPayroll.data?.GET_ALL_PAYROLL;

    const history = useHistory();
    const {state, dispatch} = useContext(PayrollProcessContext)
    const [anchorEl, setAnchorEl] = useState<any>(null);

    useEffect(()=>{
        obtenerDatos();
    },[])
    const obtenerDatos = async () => {
    }

    const openCreatePrenomina = () =>{
      createPrenominaModal({id_: '',createPrenomina: true},dispatch)
      setAnchorEl(null)
    }

    const eliminaPayroll = (id:any) =>{
      deletePayrollProcess({_id: id, deleteModal: true}, dispatch)
    }

    const [updatePayroll] = useMutation(UPDATE_PAYROLL_STATE);

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

    console.log('allPayroll', allPayroll)
    return(
      <>
        <div className={styles.pp_contenedor}>
          <div className={styles.pp_contenedorBoton}>
              <button className={styles.pp_botonCrear}
                onClick={()=> openCreatePrenomina()}
                >
                <div>
                  <span className={styles.pp_signo}>+</span>
                </div> 
                <div>
                  Nueva pre-n??mina
                </div>
              </button>
          </div>
        </div>
        <div className={styles.pp_contenedorLista}>
          {allPayroll.map((lis:any)=>
         lis.status === "Activo" &&(
            <div className={styles.pp_lista}>
              <div className={styles.pp_ColumnaUnoLista}>
                <div className={styles.pp_tituloGrupo}>
                  <span>{lis.group_name}</span>
                </div>
                <div className={styles.pp_tituloGrupo}>
                  <span>{lis.frecuency_payment} {getDateDay(lis.init_date)} {getDateDay(lis.end_date)}</span>
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
                    <span className={styles.pp_valorInterno}>{formatter(lis.perception)}</span>
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
                      history.push(`/InitPayroll/${lis.id}/${lis.group_name}`)
                    }}>
                    Continuar
                  </button>
                </div>
                <div 
                  className={styles.pp_contenedorIconoEliminar}
                  onClick={() => eliminaPayroll(lis.id)}
                  >
                  <img className={styles.pp_iconoEliminar} src='/assets/svg/icono_eliminar-nomina.svg'></img>
                  <span className={styles.pp_textoEliminar}>Eliminar</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <CrearPayrollsModal getDatos={obtenerDatos}/>
        <EliminaPayroll getDatos={obtenerDatos}/>
      </>
    )
}

export default ActivePayrollTable