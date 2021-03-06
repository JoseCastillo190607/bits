import styles from './PayrollStyles.module.css'
import { useQuery } from '@apollo/client'
import { GET_PAYROLLCOLLABORATOR_IMPUESTO } from '../../Querys/querys'
import { useEffect, useState, useContext } from 'react'
import { formatter } from "../../helpers/formatoMoneda"
import AlertaReporte from "../Payroll/Modals/AlertaReportes"
import { openalertaReporte } from "../../context/PayrollProcess/Actions";
import PayrollProcessContext from "../../context/PayrollProcess/PayrollProcessContext";


const ReportsPayrollTable =()=>{
  const {state, dispatch} = useContext(PayrollProcessContext)
  const [datosExcel, setDatosExcel] = useState<any[]>([])
  const [mensajeAlerta, setMensajeAlerta] = useState('')
  const [datos, setDatos] = useState({
    tipoReporte: '',
    Anio: '',
    Mes: 0
  })

  const {loading, error, data, refetch}  = useQuery(GET_PAYROLLCOLLABORATOR_IMPUESTO)
  const resultado = data?.GET_PAYROLLCOLLABORATOR_IMPUESTO


  useEffect(()=>{
   },[datos])

  const cambioDatos = (valor:any, desde: string) =>{
    if(desde === 'tipoReporte'){
      setDatos({...datos, tipoReporte: valor.target.value })
    } 
    if(desde === 'Anio'){
      setDatos({...datos, Anio: valor.target.value })
    }
    if(desde === 'Mes'){
       setDatos({...datos, Mes: parseInt(valor.target.value)})
    }
  }

  const consultaReporte =() =>{
    switch(true){
      case (datos.tipoReporte === '' && datos.Anio ==='' && datos.Mes === 0):
        setMensajeAlerta('Por favor selecciona alguno de los filtros para continuar')
        openalertaReporte({alertaReporte:true }, dispatch);
        break
      case (datos.tipoReporte === '' && datos.Anio ==='' && datos.Mes !== 0): 
        setMensajeAlerta('Por favor selecciona Tipo o Año para continuar')
        openalertaReporte({alertaReporte:true }, dispatch);
        break
      case (datos.tipoReporte !== '' && datos.Anio === '' && datos.Mes !== 0) :
        setMensajeAlerta('Por favor selecciona Año para continuar')
        openalertaReporte({alertaReporte:true }, dispatch);
        break
      case (datos.tipoReporte !== '' && datos.Anio === '' && datos.Mes === 0):
        setMensajeAlerta('Por favor selecciona Año o Mes para continuar')
        openalertaReporte({alertaReporte:true }, dispatch);
        break
      case (datos.tipoReporte === '' && datos.Anio !== '' && datos.Mes === 0):
        setMensajeAlerta('Por favor selecciona Tipo o Mes para continuar')
        openalertaReporte({alertaReporte:true }, dispatch);
        break
      default:
        refetch({
          input: datos
        })
    }
  } 
  return(
    <>
      <div className={styles.r_contenedorTitulos}>
        <div className={styles.r_flex}>
          <div className={styles.r_titulo}>
            Tipo
          </div>
          <div>
            <select
              name="selectTipo"
              className={styles.r_select}
              onChange={(target) => cambioDatos(target,'tipoReporte')}
            >
              <option value="">Selecciona...</option>
              <option value="IMSS">IMSS</option>
              <option value="ISR">ISR</option>
              <option value="ISN">ISN</option>
              <option value="INFONAVIT">INFONAVIT</option>
              <option value="FONACOT">FONACOT</option>
            </select>
          </div>
        </div>
        <div className={styles.r_flex}>
          <div className={styles.r_tituloFecha}>A&ntilde;o</div>
          <select
              name="selectTipo"
              className={styles.r_select}
              onChange={(target) => cambioDatos(target,'Anio')}
            >
              <option value="">Selecciona...</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
        </div>
        <div className={styles.r_flex}>
          <div className={styles.r_tituloFecha}>
            Mes
          </div>
          <select
              name="selectTipo"
              className={styles.r_select}
              onChange={(target) => cambioDatos(target,'Mes')}
            >
              <option value="0">Selecciona...</option>
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
        </div>
        <button 
          className={styles.pc_botonCalcular}
          onClick={() => consultaReporte()}
          >
            <div className={styles.pc_iconoCalcular}></div>
            Calcular
          </button>
        <div>
        </div>
      </div>
      <div className={styles.r_contenedorPrincipal}>
        <div className={styles.r_contenedorTarjetas}>
          {resultado?.map((lis:any)=>(
          <div className={styles.r_tarjeta}>
            <div className={styles.r_barraTarjeta}></div>
              <div className={styles.r_datosTarjeta}> 
                <div className={styles.r_tituloTarjeta}>
                  {lis.Tipo}
                </div>
                <div className={styles.r_subtituloTarjeta}>
                  Mes
                </div>
                <div className={styles.r_datoTarjeta}>
                  {lis.Mes}
                </div>
                <div className={styles.r_subtituloTarjeta}> 
                  Monto
                </div>
                <div className={styles.r_datoTarjeta}>
                  {formatter(lis.MontoImpuesto)}
                </div>
                <div className={styles.r_contenedorIconos}>
                <div className={styles.pt_iconoTarjetasExcel}></div>
                <div className={styles.pt_iconoTarjetasPDF}></div>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    <AlertaReporte mensaje={mensajeAlerta}/>
    </>
  )
}

export default ReportsPayrollTable