import { useMutation, useQuery } from "@apollo/client";
import { Box, Grid } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDateDay, getDateYear } from "../helpers/Payroll/Payroll";
import styles from "../../src/components/Payroll/PayrollStyles.module.css"
import { GET_PAYROLLCOLLABORATOR_TIMBRADO, GET_PAYROLL, UPDATE_PAYROLL_STATE } from "../Querys/querys";
import CustomTabs from '../components/Collaborators/Tab/CustomTabs';
import CustomTab from '../components/Collaborators/Tab/CustomTabMain';
import {formatter} from "../helpers/formatoMoneda"
import { utils, writeFile } from "xlsx"

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const PayrollTimbrar = (props: TabPanelProps) => {
  const { id, tab } = useParams<any>();
  const [filtrado, setFiltrado] =  useState<any[]>([])
  const history = useHistory();

  const {loading, error, data} = useQuery(GET_PAYROLL,{
    variables:{getPayrollId: id}
  })
  
  const PayrollData = data?.GET_PAYROLL

  const resultPayrollTimbrado = useQuery(GET_PAYROLLCOLLABORATOR_TIMBRADO, {
    variables: { getPayrollcollaboratorTimbradoId: id },
  });

  const allPayrollTimbrado = resultPayrollTimbrado.data?.GET_PAYROLLCOLLABORATOR_TIMBRADO;

  const handleChange = () =>{
    console.log(1)
  }

  useEffect(() => {
    obtenerDatos();
  }, [allPayrollTimbrado]);

  const datosFiltrados = (e:any) =>{
    if(e !== '') {
      let expresion = new RegExp(`${e}.*`, "i")
      const nuevoFiltrado = filtrado.filter((lis:any) => expresion.test(lis.colaborator))
      setFiltrado(nuevoFiltrado)
    }else{
      obtenerDatos()
    }
  }

  const obtenerDatos = async () => {
    await setFiltrado(allPayrollTimbrado)
  };

  
  const [updatePayroll] = useMutation(UPDATE_PAYROLL_STATE);

  const updateState = (id:any) =>{
    updatePayroll({
      variables: {
        input: {
          id: id
          ,statusProgress: "Terminar",
        },
      },
    });
  }


  const handleOnExport = () => {

    var woorkBook = utils.book_new(),
    woorkSheet = utils.json_to_sheet(allPayrollTimbrado);

    utils.book_append_sheet(woorkBook,woorkSheet,"ReporteTimbrado")

    writeFile(woorkBook, "ReporteTimbrado.xlsx")
  
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
            value={tab}
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
            <div className={styles.pd_iconoCompleto}>
            </div>
          </div>
          <div className={styles.pc_lineaSeguimientoCompleto}>
          </div>
          <div className={styles.pc_circuloAmarillo}>
            <div className={styles.pd_iconoCompleto}>
            </div>
          </div>
          <div className={styles.pc_lineaSeguimientoCompleto}>
          </div>
          <div className={styles.pc_circuloAmarillo}>
            <div className={styles.pc_circuloBlanco}>
            </div>    
          </div>
          <div className={styles.pc_lineaSeguimiento}>
          </div>
          <div className={styles.pc_circuloGris}>
          </div>
        </div>
      </div>
      <div className={styles.pc_contenedorBotones}>
          <button className={styles.pt_botonTimbrar}>
            <div className={styles.pd_iconoDerechaDos}></div>
            Timbrar
          </button>
          <button className={styles.pt_botonFinalizar}
          onClick={() =>
          {
              updateState(id)
          }}
          >
            <div>
              Terminar
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
              <span className={styles.pc_tituloPeriodo}>Periódo: &nbsp;{getDateDay(PayrollData?.init_date)}</span>&nbsp;-&nbsp;
              <span className={styles.pc_tituloPeriodo}>{getDateDay(PayrollData?.end_date)}</span>&nbsp; 
              <span className={styles.pc_tituloPeriodo}>{getDateYear(PayrollData?.end_date)}</span>
            </div>
          }
       </div>
       <div className={styles.pd_contenedorTituloSaldos}>
       <div className={styles.pd_cuentaBancaria}>
        <div className={styles.pd_textoCuentaBancaria}>
          Cuenta Bancaria
        </div>
         <div className={styles.pd_contenedorCuentaBancaria}>
          4915 3345 2234 5678
         </div>
       </div>
       <div className={styles.pd_contenedorSaldos}>
        <div className={styles.pd_contenedorInterno}>
          <div className={styles.pd_tituloSaldos}>
            Saldo disponible
          </div>
          <div className={styles.pd_saldoInterno}>
            {formatter(2500000)}
          </div>
        </div>
        <div className={styles.pd_contenedorInterno}>
          <div className={styles.pd_tituloSaldos}>
            Monto a pagar
          </div>
          <div className={styles.pd_saldoInterno}>
            {formatter(250000)}
          </div>
        </div>
        <div className={styles.pd_contenedorInterno}>
          <div className={styles.pd_saldoInterno}>
            Diferencia
          </div>
          <div className={styles.pd_saldoInterno}>
            {formatter(2250000)}
          </div>
        </div>
       </div>
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
      <button className={styles.pc_botonDescargar}  onClick={()=> handleOnExport()}>
          <div className={styles.pc_iconoDescargar}></div>
          <div>
            Descargar reporte
          </div>
        </button>
        </div>
      <div className={styles.p_contenedorTablaDispersion}>
        <table className={styles.pd_tablaPrincipal}>
          <thead className={styles.pd_contenedorTitulos}>
            <td className={`${styles.pt_columna} ${styles.pt_primerColumna}`}>Colaborador</td>
            <td className={`${styles.pt_columna} ${styles.pt_columnaTitulos}`}>RFC</td>
            <td className={`${styles.pt_columna} ${styles.pt_columnaTitulos}`}>Percepciones</td>
            <td className={`${styles.pt_columna} ${styles.pt_columnaTitulos}`}>Deducciones</td>
            <td className={`${styles.pt_columna} ${styles.pt_columnaTitulos}`}>Total</td>
          </thead>
          <tbody className={styles.pc_contenedorTitulos}>
            {
              filtrado?.map((payroll:any)=>(
                <tr>
                  <td className={`${styles.pt_columnaDatos} ${styles.pt_primerDato}`}>{payroll.colaborator}</td>
                  <td className={styles.pt_columnaDatos}>{payroll.users.RFC}</td>
                  <td className={styles.pt_columnaDatos}>{formatter(payroll.perception)}</td>
                  <td className={styles.pt_columnaDatos}>{formatter(payroll.deduction)}</td>
                  <td className={`${styles.pt_columnaDatos} ${styles.pt_columnaIconos}`}>
                    {formatter(payroll.netIncomeTaxable)}
                    <td className={styles.pt_iconoPrefactura}></td>
                    <td className={styles.pt_iconoXML}></td>
                    <td className={styles.pt_iconoPDF}></td>
                    
                  </td>
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
              onClick={() => history.push(`/payrolldispersar/${id}/${tab}`)}>
              <div className={styles.pd_botonRegreso}></div>
              <div>Regresar a "Dispersar"</div>
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
};

export default PayrollTimbrar;
