import { useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { Box, Grid } from "@material-ui/core";
import styles from "../../src/components/Payroll/PayrollStyles.module.css";
import { useState,useEffect, useContext } from "react";
import { GET_EVENTUALPAYROLLCOLLABORATOR_DISPERSION, GET_EVENTUALPAYROLL,GET_ALL_DISPERSIONLAYOUT } from "../Querys/querys";
import CustomTabs from '../components/Collaborators/Tab/CustomTabs';
import CustomTab from '../components/Collaborators/Tab/CustomTabMain';
import {formatter} from "../helpers/formatoMoneda"
import { getDateDay, getDateYear } from "../helpers/Payroll/Payroll";
import { openfondosInsuficientes, openaceptarDispersar, openSinNominasSeleccionadas } from "../context/PayrollProcess/Actions";
import PayrollProcessContext from "../context/PayrollProcess/PayrollProcessContext";
import FondosInsufucientesModal from '../components/Payroll/Modals/EventualFondosInsuficientesModal'
import AceptarDispersar from '../components/Payroll/Modals/AceptarDispersar'
import SinNominasModal from '../components/Payroll/Modals/SinNominasModal'
import ProgressBar from '../components/Payroll/ProgressBar'
import { utils, writeFile } from "xlsx"

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const PayrollTimbrar = (props: TabPanelProps) => {
  const {state, dispatch} = useContext(PayrollProcessContext)
  const { id, tab } = useParams<any>();
  const [filtrado, setFiltrado] =  useState<any[]>([])
  const [isCheck, setIsCheck] =  useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [diferencia, setDiferencia] = useState(0)
  const [inicio, setInicio] = useState(15000)
  const [disponibleDispersar, setDisponibleDispersar] = useState(true)
  const [barraProgreso, setBarraProgreso] = useState<any[]>([]) 
  const history = useHistory();

  const {data: dataDipsersion, loading: loadingDispersion, startPolling, stopPolling} = useQuery(GET_EVENTUALPAYROLLCOLLABORATOR_DISPERSION, {
    variables: { getEventualpayrollcollaboratorDispersionId: id },
  });

  const {loading, error, data} = useQuery(GET_EVENTUALPAYROLL,{
    variables:{getEventualPayrollId: id}
  })
  const PayrollData = data?.GET_EVENTUALPAYROLL

  const allPayrollDispersion = dataDipsersion?.GET_EVENTUALPAYROLLCOLLABORATOR_DISPERSION;

  const {data: dataDipsersionExcell, loading: loadingDispersionExcell } = useQuery(GET_ALL_DISPERSIONLAYOUT, {
    variables: { getAllDispersionlayoutId: id },
  });

  const allPayrollCollaboratorExcell = dataDipsersionExcell?.GET_ALL_DISPERSIONLAYOUT;

  const handleChange = () =>{
    console.log(1)
  }

  useEffect(() => {
    obtenerDatos();
    actualizaSaldos();
    // startPolling(1000);
    return () =>{
      // stopPolling()
    }
  }, [allPayrollDispersion, isCheck, startPolling, stopPolling]);

  const obtenerDatos = async () => {
    await setFiltrado(allPayrollDispersion)
  };


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

  const handleSelectAll = (e:any) =>{
    if(!e.target.checked){
      setIsCheck([])
    }
    let filtradoSeleccionado = (allPayrollDispersion.filter((lis:any)=>{
      return e.target.checked && !isCheck.includes(lis.id)
    }).map((lis:any) =>(lis.id)))

    setIsCheck(filtradoSeleccionado)
  }

  const handleClick =  (e:any) => {
    const {id, checked} = e.target
    setIsCheck([...isCheck, id])
    if(!checked){
      setIsCheck(isCheck.filter((lis:any) => lis !== id))
    }

  }

  const handleOnExport = (Tipo: any) => {

    if(Tipo === 'Layout') {

      var woorkBook = utils.book_new(),
      woorkSheet = utils.json_to_sheet(allPayrollCollaboratorExcell);

      utils.book_append_sheet(woorkBook,woorkSheet,"ReporteDispersionLayout")

      writeFile(woorkBook, "ReporteDispersionLayout.xlsx")
    } else {

      var woorkBook = utils.book_new(),
      woorkSheet = utils.json_to_sheet(allPayrollDispersion);

      utils.book_append_sheet(woorkBook,woorkSheet,"ReporteDispersion")

      writeFile(woorkBook, "ReporteDispersion.xlsx")

    }
  }

  const actualizaSaldos = ( ) =>{
    let arrayTotales = (allPayrollDispersion?.filter((lis:any)=>{
      return isCheck.includes(lis.id)
    }).map((lis:any) =>(lis.total)))

    let arrayLiquidadas = (allPayrollDispersion?.filter((lis:any) =>lis?.dispersionStatus === 'LIQUIDADO'))
    
    setBarraProgreso(arrayLiquidadas)

    if(arrayTotales?.length > 0) {
      const suma = (acc:any, curr:any) => acc +curr
      setTotal(arrayTotales.reduce(suma))
      setDiferencia(inicio - arrayTotales.reduce(suma))

      if((inicio - arrayTotales.reduce(suma)) >= 0){
        setDisponibleDispersar(true)
      }else{
        setDisponibleDispersar(false)
      }

    }else{
      setTotal(0)
      setDiferencia(inicio)
      setDisponibleDispersar(true)
    }
  }

  const openFondosInsuficientes = () => {
    openfondosInsuficientes({fondosInsuficientes:true }, dispatch);
  }

  const openAceptaDispersar = () => {
    openaceptarDispersar({aceptarDispersar:true}, dispatch)
  }


  const openSinSeleccion = () => {
    openSinNominasSeleccionadas({sinNominasSeleccionadas:true }, dispatch);
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
          <div className={styles.pc_lineaSeguimiento}>
          </div>
          <div className={styles.pc_circuloGris}>
          </div>
        </div>
      </div>
      <div className={styles.pc_contenedorBotones}>
        {(isCheck.length > 0)?
          (disponibleDispersar)?
            <button className={styles.pd_botonDispersarDos}
            onClick={()=> openAceptaDispersar()}
            >
              <div className={styles.pd_iconoDispersarDos}></div>
                Dispersar
            </button>  
            :
            <div>
            <button 
              className={styles.pd_botonDispersarDosInactivo}
              onClick={()=> openFondosInsuficientes()}
              >
            <div className={styles.pd_iconoDispersarDos}></div>
              Dispersar
            </button>
            </div>
          :
          <button 
            className={styles.pd_botonDispersarDosInactivo}
            onClick={()=> openSinSeleccion()}
            >
            <div className={styles.pd_iconoDispersarDos}></div>
            Dispersar
          </button>  
          }

          <button className={styles.pc_botonDispersarInactivo}
          onClick={() => history.push(`/EventualPayrollTimbrar/${id}/${tab}`)}
          >
            <div
            >
            Ir a Timbrar
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
          {
          
          (loading)?
          null
          :
          (PayrollData?.payroll_type === 'PTU')?
            <div>
              <span className={styles.pc_tituloPeriodo}>Monto:{formatter(PayrollData.total)} </span>&nbsp;-&nbsp;
              <span className={styles.pc_tituloPeriodo}>Factor Ingreso: {PayrollData.FactorIngresos}</span>&nbsp; 
              <span className={styles.pc_tituloPeriodo}>Factor Dias: {PayrollData.FactorDias}</span>
            </div>
            :
            <div>
              <span className={styles.pc_tituloPeriodo}>Fondo de ahorro:</span>&nbsp;-&nbsp;
              <span className={styles.pc_tituloPeriodo}>{getDateDay(PayrollData?.init_date)} {getDateDay(PayrollData?.end_date)}</span>&nbsp; 

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
            {formatter(inicio)}
          </div>
        </div>
        <div className={styles.pd_contenedorInterno}>
          <div className={styles.pd_tituloSaldos}>
            Monto a pagar
          </div>
          <div className={styles.pd_saldoInterno}>
            {formatter(total)}
          </div>
        </div>
        <div className={styles.pd_contenedorInterno}>
          <div className={styles.pd_tituloSaldos}>
            Diferencia
          </div>
          {(disponibleDispersar)?
            <div className={styles.pd_saldoInterno}>
              {formatter(diferencia)}
            </div>  
            :
            <div className={styles.pd_saldoInternoNegativo}>
              {formatter(diferencia)}
            </div>
          }
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
      <button className={styles.pc_botonDescargar} onClick={()=> handleOnExport("Layout")}>
          <div className={styles.pc_iconoDescargar}></div>
          <div>
            Descargar Layout
          </div>
        </button>
      <button className={styles.pc_botonDescargar} onClick={()=> handleOnExport("Reporte")}>
          <div className={styles.pc_iconoDescargar}></div>
          <div>
            Descargar reporte
          </div>
        </button>
        </div>
      <div className={styles.p_contenedorTablaDispersion}>
        <table className={styles.pd_tablaPrincipal}>
          <thead className={styles.pd_contenedorTitulos}>
            <td className={`${styles.pd_columnaTitulos} ${styles.pd_primerColumnaTitulo}`}>
            <div id="colaboladores" className={styles.checkboxitem}>
                      <input
                        id="check"
                        type="checkbox"
                        onChange={(e) => handleSelectAll(e)}
                      ></input>
                      <label htmlFor="check"> Colaboradores </label>
                    </div>
            </td>
            <td className={styles.pd_columnaTitulos}>RFC</td>
            <td className={styles.pd_columnaTitulos}>Banco</td>
            <td className={styles.pd_columnaTitulos}>Cuenta bancaria</td>
            <td className={styles.pd_columnaTitulos}>CLABE</td>
            <td className={styles.pd_columnaTitulos}>Percepción</td>
            {(PayrollData?.payroll_type === 'PTU')?
            <td className={styles.pd_columnaTitulos}>Retencion ISR</td>
            :
            <>
              <td className={styles.pd_columnaTitulos}>Aportación trabajador</td>
              <td className={styles.pd_columnaTitulos}>Aportación patrón</td>
            </>
            }
            <td className={styles.pd_columnaTitulos}>Total</td>
          </thead>
          <tbody className={styles.pc_contenedorTitulos}>
          {filtrado?.map((lis:any, index:Number)=>(
              <tr>
                <td className={`${styles.pd_columnaDatos} ${styles.pd_primerColumna}`}>
                <div id="colaboladores" className={styles.checkboxitem}>
                      <input
                        id={lis.id}
                        key={lis.id}
                        type="checkbox"
                        checked ={isCheck.includes(lis.id)}
                        onChange={(e) => handleClick(e)}
                        value={lis.id}
                      ></input>
                      <label htmlFor={lis.id}>  {lis.colaborator} </label>
                    </div>
                </td>
                <td className={styles.pd_columnaDatos}>{lis.users.RFC}</td>
                <td className={styles.pd_columnaDatos}>{lis.users.bank}</td>
                <td className={styles.pd_columnaDatos}>{lis.users.accountNumber}</td>
                <td className={styles.pd_columnaDatos}>{lis.users.clabeNum}</td>
                <td className={styles.pd_columnaDatos}>{formatter(lis.perception)}</td>
                {(PayrollData?.payroll_type === 'PTU')? 
                  <td className={styles.pd_columnaDatos}>{formatter(lis.deduction)}</td>
                :  
                <>
                  <td className={styles.pd_columnaDatos}>{formatter(lis.total/2)}</td>
                  <td className={styles.pd_columnaDatos}>{formatter(lis.total/2)}</td>
                </>
                }
                <td className={styles.pd_columnaDatos}>{formatter(lis.total)}</td>
                <td className={styles.pd_columnaDatos}>
                  {(lis.dispersionStatus === "EnEspera")?
                    <div className={`${styles.pd_botonEstatus} ${styles.pd_botonEstatusUno}`}>
                      <div className={styles.pd_textoBotonEstatus}>
                        Dispersar
                      </div>
                      <div className={styles.pd_botonInternoDispersar}>
                      <div className={styles.pd_iconoDispersar}></div>
                      </div>
                    </div>
                  : null
                  }
                  {(lis.dispersionStatus === "ENPROCESO")?
                    <div className={`${styles.pd_botonEstatus} ${styles.pd_botonEstatusDos}`}>
                    <div className={styles.pd_textoBotonEstatusDos}>
                      En proceso...
                    </div>
                  </div>
                  : null
                  }
                  {(lis.dispersionStatus === "DEVUELTO")?
                    <div className={styles.pd_botonEstatusTres}>
                    <div className={styles.pd_contenedorEstatusTres}>
                      <div className={styles.pd_contEstatusTres}>
                        <div className={styles.pd_iconoError}></div>
                        <div className={styles.pd_textoBotonError}>
                          Error al dispersar
                        </div>
                      </div>
                      <div className={styles.pd_textoBotonErrorDos}>
                        Intentar nuevamente
                      </div>
                    </div>
                    <div className={styles.pd_botonInternoDispersar}>
                      <div className={styles.pd_iconoIntentar}></div>
                    </div>
                  </div>
                  : null
                  }
                  {(lis.dispersionStatus === "LIQUIDADO")?
                    <div className={`${styles.pd_botonEstatus} ${styles.pd_botonEstatusCuatro}`}>
                    <div className={styles.pd_textoBotonEstatusCuatro}>
                      Finalizado
                    </div>
                      <div className={styles.pd_iconoEstatusCuatro}></div>
                    </div>
                  : null
                  }
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
      <div className={styles.pd_contenedorBarraDispersando}>
        <ProgressBar valor={((100/isCheck?.length)*barraProgreso?.length)}/>
      </div>
    </div>
    <FondosInsufucientesModal />
    <AceptarDispersar
      totalesDispersar={isCheck?.length}
      totales={allPayrollDispersion?.length}
      seleccionados={isCheck} 
    />
    <SinNominasModal />
    </>
  );
};

export default PayrollTimbrar;

