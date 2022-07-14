
import { useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Grid } from "@material-ui/core";
import styles from "../../src/components/Payroll/PayrollStyles.module.css";
import CustomTabs from '../components/Collaborators/Tab/CustomTabs';
import CustomTab from '../components/Collaborators/Tab/CustomTabMain';
import { useMutation, useQuery } from "@apollo/client";
import {
    GET_EVENTUALPAYROLL,
    GET_EVENTUALPAYROLLCOLLABORATOR,
    UPDATE_EVENTUALPAYROLL_STATE
} from "..//Querys/querys";
import {formatter} from "../helpers/formatoMoneda"
import { getDateDay, getDateYear } from "../helpers/Payroll/Payroll"

import { utils, writeFile } from "xlsx"


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

export const InitPayroll = (props: TabPanelProps) => {
  const { id, tab } = useParams<any>();
  const [filtrado, setFiltrado] = useState([])
  const history = useHistory();

  const resultPayrollCollaborator = useQuery(GET_EVENTUALPAYROLLCOLLABORATOR, {
    variables: { getEventualpayrollcollaboratorId: id },
  });

  const {loading, data} = useQuery(GET_EVENTUALPAYROLL,{
    variables:{ getEventualPayrollId: id}
  })



  const allPayrollCollaborator =
    resultPayrollCollaborator.data?.GET_EVENTUALPAYROLLCOLLABORATOR;
  const PayrollData = data?.GET_EVENTUALPAYROLL

  console.log('Datos',PayrollData)

  useEffect(() => {
      obtenerDatos();
  }, [allPayrollCollaborator]);

  const obtenerDatos = async () => {
    await setFiltrado(allPayrollCollaborator)
  };

  const handleChange = () =>{
  }

  const datosFiltrados = (e:any) =>{
    if(e !== '') {
      let expresion = new RegExp(`${e}.*`, "i")
      const nuevoFiltrado = filtrado.filter((lis:any) => expresion.test(lis.colaborator))
      setFiltrado(nuevoFiltrado)
    }else{
      obtenerDatos()
    }
  }

  const [updatePayroll] = useMutation(UPDATE_EVENTUALPAYROLL_STATE);

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

    utils.book_append_sheet(woorkBook,woorkSheet,"ReporteCalculoEventual")

    writeFile(woorkBook, "ReporteCalculoEventual.xlsx")
  
}

  return (
    <>
      <Box mt={3} ml={5} className="Title">
        Nóminas
      </Box>
      <Box p={5} pb={3} pt={0}>
        <Grid
          container
          justify="flex-start"
        >
          <CustomTabs
            value={2}
            onChange={handleChange}
            aria-label="simple tabs example"
          > 
            <CustomTab label="Pre-Nómina" value={0}/>
            <CustomTab label="Finiquito / Liquidación" value={1}/>
            <CustomTab label="Eventuales" value={2}/>
            <CustomTab label="Históricas" value={3}/>
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
                history.push(`/EventualPayrollDispersar/${id}/${tab}`)
              }}>
            <div>
            Ir a Dispersar
            </div>
            <div className={styles.pc_iconoDispersar}></div>
          </button>
      </div>
     </div>
     <div className={styles.pc_contenedorPrincipal}>
      <div className={styles.pc_contenedorNombre}>
        <div>
          <span className={`${styles.pc_tituloPrincipal} ${styles.e_titulo}`}>{tab}</span>
        </div>
          {
          
          (loading)?
          null
          :
          (PayrollData?.payroll_type === 'PTU')?
            <div className={styles.e_titulo}>
              <span className={styles.pc_tituloPeriodo}>Monto:{formatter(PayrollData.total)} </span>&nbsp;-&nbsp;
              <span className={styles.pc_tituloPeriodo}>Factor Ingreso: {PayrollData.FactorIngresos}</span>&nbsp; 
              <span className={styles.pc_tituloPeriodo}>Factor Dias: {PayrollData.FactorDias}</span>
            </div>
            :
            <div className={styles.e_titulo}>
              <span className={styles.pc_tituloPeriodo}>Fondo de ahorro:</span>&nbsp;-&nbsp;
              <span className={styles.pc_tituloPeriodo}>{getDateDay(PayrollData?.init_date)} {getDateDay(PayrollData?.end_date)}</span>&nbsp; 

            </div>
          }
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
      <button className={styles.pc_botonDescargar}  onClick={()=> handleOnExport()}>
          <div className={styles.pc_iconoDescargar}></div>
          <div>
            Descargar reporte
          </div>
        </button>
        </div>
      <div className={styles.pc_contenedorTabla}>
        <table className={styles.pc_tablaPrincipal}>
        {(PayrollData?.payroll_type === 'PTU')?
          <thead className={styles.pc_contenedorTitulos}>
            <td className={styles.pc_primerColumna}>
              <span className={styles.pc_signo}>#</span> 
              <span>Colaborador</span>
            </td>
            <td className={styles.pc_columnaTitulos}>Salario diario</td>
            <td className={styles.pc_columnaTitulos}>Fecha inicial  </td>
            <td className={styles.pc_columnaTitulos}>Fecha final  </td>
            <td className={styles.pc_columnaTitulos}>Días laborados </td>
            <td className={styles.pc_columnaTitulos}>Ingresos anuales </td>
            <td className={styles.pc_columnaTitulos}>Importe por ingresos </td>
            <td className={styles.pc_columnaTitulos}>Importe por días </td>
            <td className={styles.pc_columnaTitulos}>Total a repartir </td>
            <td className={styles.pc_columnaTitulos}>Retención ISR  </td>
            <td className={styles.pc_columnaTitulos}>Total dispersar TSU  </td>
          </thead>
          :
          <thead className={styles.pc_contenedorTitulos}>
            <td className={styles.pc_primerColumna}>
              <span className={styles.pc_signo}>#</span> 
              <span>Colaborador</span>
            </td>
            <td className={styles.pc_columnaTitulos}>Salario diario</td>
            <td className={styles.pc_columnaTitulos}>Número de aportaciones</td>
            <td className={styles.pc_columnaTitulos}>Porcentaje de aportación</td>
            <td className={styles.pc_columnaTitulos}>Aportaciones trabajador</td>
            <td className={styles.pc_columnaTitulos}>Aportación patrón</td>
            <td className={styles.pc_columnaTitulos}>Total</td>
        </thead>
          }
        {(PayrollData?.payroll_type === 'PTU')?
            <tbody>
            {
              filtrado?.map((collaborator:any, index:any)=>(
                <tr>
                  <td className={styles.pc_columnaDatos}>
                    <span className={styles.pc_signo}>{index + 1}</span> 
                    <span>{collaborator.colaborator}</span>
                  </td>
                  <td className={styles.pc_columnaDatos}>{collaborator.sd}</td>
                  <td className={styles.pc_columnaDatos}>{collaborator.init_datePTU}</td>
                  <td className={styles.pc_columnaDatos}>{collaborator.end_datePTU}</td>
                  <td className={styles.pc_columnaDatos}>{collaborator.workingDaysPTU}</td>
                  <td className={styles.pc_columnaDatos}>{collaborator.AnnualIncomePTU}</td>
                  <td className={styles.pc_columnaDatos}>{collaborator.IncomeAmountPTU}</td>
                  <td className={styles.pc_columnaDatos}>{collaborator.IncomeDaysPTU}</td>
                  <td className={styles.pc_columnaDatos}>{collaborator.TotalDealPTU}</td>
                  <td className={styles.pc_columnaDatos}>{collaborator.deduction}</td>
                  <td className={styles.pc_columnaDatos}>{collaborator.total}</td>
                </tr>
              ))
            }
            </tbody>
            :
            <tbody>
            {
              filtrado?.map((collaborator:any, index:any)=>(
                <tr>
                <td className={styles.pc_columnaDatos}>
                  <span className={styles.pc_signo}>{index + 1}</span> 
                  <span>{collaborator.colaborator}</span>
                </td>
                <td className={styles.pc_columnaDatos}>{collaborator.sd}</td>
                <td className={styles.pc_columnaDatos}>{collaborator.NoContributions}</td>
                <td className={styles.pc_columnaDatos}>{collaborator.PercentageContributions}</td>
                <td className={styles.pc_columnaDatos}>{collaborator.WorkerContributions}</td>
                <td className={styles.pc_columnaDatos}>{collaborator.EmployerContributions}</td>
                <td className={styles.pc_columnaDatos}>{collaborator.total}</td>
              </tr>
              ))
            }
          </tbody>
          }
        </table>
      </div>    
      <div>
        <div className={styles.pd_contenedorBarraEstado}>
          <div className={styles.pd_barraEstado} >
            <div className={styles.pd_contenedorRegreso}
              onClick={() => history.push(`/payroll`)}
            >
              <div className={styles.pd_botonRegreso}></div>
              <div>Regresar a "Eventual"</div>
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
    </>
    );
}
    
export default InitPayroll;

