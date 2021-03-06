
import { useState, useEffect, useContext} from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Grid } from "@material-ui/core";
import styles from "../../src/components/Payroll/PayrollStyles.module.css";
import CustomTabs from '../components/Collaborators/Tab/CustomTabs';
import CustomTab from '../components/Collaborators/Tab/CustomTabMain';
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_PAYROLL,
  GET_PAYROLLCOLLABORATOR,
  UPDATE_PAYROLL_STATE
} from "..//Querys/querys";
import CrearIncidencias from "../components/Payroll/Modals/CrearIncidenciasModal/CrearIncidencias";
import {formatter} from "../helpers/formatoMoneda"
import PayrollProcessContext from "../context/PayrollProcess/PayrollProcessContext";
import {createincidenciaModal} from "../context/PayrollProcess/Actions";
import { getDateDay, getDateYear } from "../helpers/Payroll/Payroll";
import { utils, writeFile } from "xlsx"

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

export const InitPayroll = (props: TabPanelProps) => {
  const { id, tab } = useParams<any>();
  const [filtrado, setFiltrado] = useState([])
  const {state: payrollState, dispatch: payrollDispatch} = useContext(PayrollProcessContext) 
  const history = useHistory();

  const resultPayrollCollaborator = useQuery(GET_PAYROLLCOLLABORATOR, {
    variables: { getPayrollcollaboratorId: id },
  });
  const {loading, data} = useQuery(GET_PAYROLL,{
    variables:{ getPayrollId: id}
  })

  const allPayrollCollaborator =
    resultPayrollCollaborator.data?.GET_PAYROLLCOLLABORATOR;
  const PayrollData = data?.GET_PAYROLL

  useEffect(() => {
      obtenerDatos();
  }, [allPayrollCollaborator]);

  const obtenerDatos = async () => {
    await setFiltrado(allPayrollCollaborator)
  };

  const createModal = (id:any) =>{
    createincidenciaModal({_id:id,createIncidencia: true}, payrollDispatch)
  }

  const handleChange = () =>{
    console.log()
  }


  const datosFiltrados = (e:any) =>{
    if(e !== '') {
      let expresion = new RegExp(`${e}.*`, "i")
      const nuevoFiltrado = filtrado.filter((lis:any) => expresion.test(lis.colaborator))
      console.log('nuevoFiltrado', nuevoFiltrado)
      setFiltrado(nuevoFiltrado)
    }else{
      obtenerDatos()
    }
  }

  const [updatePayroll] = useMutation(UPDATE_PAYROLL_STATE);

  const updateState = (id:any) =>{
    updatePayroll({
      variables: {
        input: {
          id: id
          ,statusProgress: "Dispersar",
        },
      },
    });
  }



  const handleOnExport = () => {

      var woorkBook = utils.book_new(),
      woorkSheet = utils.json_to_sheet(allPayrollCollaborator);

      utils.book_append_sheet(woorkBook,woorkSheet,"ReporteCalculo")

      writeFile(woorkBook, "ReporteCalculo.xlsx")
    
  }
  

  return (
    <>
      <Box mt={3} ml={5} className="Title">
        N??minas
      </Box>
      <Box p={5} pb={3} pt={0}>
        <Grid
          container
          justify="flex-start"
        >
          <CustomTabs
            value={tab}
            onChange={handleChange}
            aria-label="simple tabs example"
          > 
            <CustomTab label="Pre-N??mina" value={0}/>
            <CustomTab label="Finiquito / Liquidaci??n" value={1}/>
            <CustomTab label="Eventuales" value={2}/>
            <CustomTab label="Hist??ricas" value={3}/>
            <CustomTab label="Calculadora" value={4}/>
            <CustomTab label="Reportes" value={5}/>
          </CustomTabs>
        </Grid>
     </Box>
     <div className={styles.pc_contenedorTitulo}>
      <div className={styles.pc_contenedorProceso}>
        <div>
          <span className={styles.pc_tituloProceso}>Calcular</span>
          <span className={styles.pc_tituloProceso}>Dispersar</span>
          <span className={styles.pc_tituloProceso}>Timbrar</span>
          <span className={styles.pc_tituloProceso}>Terminar</span>
        </div>
        <div className={styles.pc_contenedorIconoSeguimiento}>
          <div className={styles.pc_circuloAmarillo}>
            <div className={styles.pc_circuloBlanco}>
            </div>
          </div>
          <div className={styles.pc_lineaSeguimiento}>
          </div>
          <div className={styles.pc_circuloGris}>
          </div>
          <div className={styles.pc_lineaSeguimiento}>
          </div>
          <div className={styles.pc_circuloGris}>
          </div>
          <div className={styles.pc_lineaSeguimiento}>
          </div>
          <div className={styles.pc_circuloGris}>
          </div>
        </div>
      </div>
      <div className={styles.pc_contenedorBotones}>
          <button className={styles.pc_botonCalcular}>
            <div className={styles.pc_iconoCalcular}></div>
            Calcular
          </button>
          <button 
            className={styles.pc_botonDispersar}
            onClick={() =>
              {
                updateState(id)
                history.push(`/payrolldispersar/${id}/${tab}`)
              }}>
            <div>
            Ir a Dispersar
            </div>
            <div className={styles.pc_iconoDispersar}></div>
          </button>
      </div>
     </div>
     <div className={styles.pc_contenedorPrincipal}>
      <div className={styles.pc_tituloContenedorPrincipal}>
        <div className={styles.pc_contenedorNombre}>
          <div>
            <span className={styles.pc_tituloPrincipal}>{tab}</span>
          </div>
          {(loading)?
            null
            :
            <div>
              <span className={styles.pc_tituloPeriodo}>Peri??do: &nbsp;{getDateDay(PayrollData?.init_date)}</span>&nbsp;-&nbsp;
              <span className={styles.pc_tituloPeriodo}>{getDateDay(PayrollData?.end_date)}</span>&nbsp; 
              <span className={styles.pc_tituloPeriodo}>{getDateYear(PayrollData?.end_date)}</span>
            </div>
          }
       </div>
        <div>
          <button 
            className={styles.pc_botonAgregarIncidencias}
            onClick={()=> createModal(id)}
            >
            <div className={styles.pc_iconoAgregarDos}></div>
            <div>Agregar Incidencia</div>
          </button>
        </div>
      </div>
      <div className={styles.pc_contenedorBuscadorDescargar}>
      <div className={styles.pc_contenedorBuscador}>
        <input 
          type="text" 
          placeholder="Buscar al colaborador por nombre"
          className={styles.pc_inputBuscador}
          onChange={(e) => datosFiltrados(e.target.value)}
          >
        </input>
        <div className={styles.pc_iconoBuscador}></div>
      </div>
      <button className={styles.pc_botonDescargar} onClick={()=> handleOnExport()}>
          <div className={styles.pc_iconoDescargar}></div>
          <div>
            Descargar reporte
          </div>
        </button>
        </div>
      <div className={styles.pc_contenedorTabla}>
        <table className={styles.pc_tablaPrincipal}>
          <thead className={styles.pd_contenedorTitulos}>
            <td className={styles.pc_primerColumna}>
              <span className={styles.pc_signo}>#</span> 
              <span>Colaborador</span>
            </td>
            <td className={styles.pc_columnaTitulos}>Ingreso neto mensual</td>
            <td className={styles.pc_columnaTitulos}>Ingreso diario</td>
            <td className={styles.pc_columnaTitulos}>Salario diario gravable</td>
            <td className={styles.pc_columnaTitulos}>D??as del per??odo</td>
            <td className={styles.pc_columnaTitulos}>D??as laborados</td>
            <td className={styles.pc_columnaTitulos}>Sueldo bruto</td>
            <td className={styles.pc_columnaTitulos}>Subsidio al empleo</td>
            <td className={styles.pc_columnaTitulos}>ISR</td>
            <td className={styles.pc_columnaTitulos}>Cuota IMSS trabajador</td>
            <td className={styles.pc_columnaTitulos}>Fondo de ahorro</td>
            <td className={styles.pc_columnaTitulos}>Cr??dito INFONAVIT</td>
            <td className={styles.pc_columnaTitulos}>Incidencias</td>
            <td className={styles.pc_columnaTitulos}>Sueldo neto gravable</td>
            <td className={styles.pc_columnaTitulos}>Total a pagar no gravable</td>
          </thead>
          <tbody>
            {
              filtrado?.map((collaborator:any, index:any)=>(
                <tr>
                  <td className={styles.pc_columnaDatos}>
                    <span className={styles.pc_signo}>{index + 1}</span> 
                    <span>{collaborator.colaborator}</span>
                  </td>
                  <td className={styles.pc_columnaDatos}>{formatter(collaborator.netIncome)}</td>
                  <td className={styles.pc_columnaDatos}>{formatter(collaborator.DS)}</td>
                  <td className={styles.pc_columnaDatos}>{formatter(collaborator.GDS)}</td>
                  <td className={styles.pc_columnaDatos}>{collaborator.periodDays}</td>
                  <td className={styles.pc_columnaDatos}>{collaborator.workingDays}</td>
                  <td className={styles.pc_columnaDatos}>{formatter(collaborator.grossSalary)}</td>
                  <td className={styles.pc_columnaDatos}>{formatter(collaborator.Subsidy)}</td>
                  <td className={styles.pc_columnaDatos}>{formatter(collaborator.ISR)}</td>
                  <td className={styles.pc_columnaDatos}>{formatter(collaborator.IMSS)}</td>
                  <td className={styles.pc_columnaDatos}>{formatter(collaborator.SavingsFund)}</td>
                  <td className={styles.pc_columnaDatos}>{formatter(collaborator.INFONAVIT)}</td>
                  <td className={styles.pc_columnaDatos}>{formatter(collaborator.incident)}</td>
                  <td className={styles.pc_columnaDatos}>{formatter(collaborator.netIncomeTaxable)}</td>
                  <td className={styles.pc_columnaDatos}>{formatter(collaborator.TotalIncomeNotTaxable)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>    
      <div>
        <div className={styles.pd_contenedorBarraEstado}>
          <div className={styles.pd_barraEstado} >
            <div className={styles.pd_contenedorRegreso}
              onClick={() => history.push(`/payroll`)}
            >
              <div className={styles.pd_botonRegreso}></div>
              <div>Regresar a "Pre-n&oacute;mina"</div>
            </div>
              <button className={styles.pd_botonSalir}
                onClick={() => history.push(`/payroll`)}
              >
                Salir
              </button>
          </div>
        </div>
      </div>
      
    </div>

    <CrearIncidencias/>
    </>
    );
}
    
export default InitPayroll;

