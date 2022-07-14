import { useQuery } from '@apollo/client'
import id from 'date-fns/esm/locale/id/index.js'
import { useEffect, useState } from 'react'
import { formatter } from '../../helpers/formatoMoneda'
import { GET_CALCULADORA } from '../../Querys/querys'
import styles from './PayrollStyles.module.css'

const CalculadoraTable = () =>{
  const {loading, error, data, refetch} = useQuery(GET_CALCULADORA)
  const [imssCheck, setImssCheck] = useState(false)
  const [subsidioCheck, seSubsidioCheck] = useState(false)
  const resultado = data?.GET_CALCULADORA
  const [datos, setDatos] = useState({
    Periodo: '',
    SueldoBruto: 0,
    Imss: '',
    SubsidioEmpleo: ''
  })

  useEffect(()=>{
    setImssCheck(imssCheck)
  },[imssCheck])


  const actualizaDatos = (valor:any, desde: string) =>{
    if(desde === 'Periodo'){
      setDatos({...datos, Periodo: valor.target.value})
    }
    if(desde=== 'SueldoBruto'){
      setDatos({...datos, SueldoBruto: parseFloat(valor.target.value)})
    }
  }

  const seleccionInputs=  (e:any) =>{
    const {id, checked} = e.target  
    if(id == "2"){
      if(!checked){
        seSubsidioCheck((current)=> false)
        setDatos({...datos, SubsidioEmpleo: ''})
      }else{
        seSubsidioCheck((current)=> true)
        setDatos({...datos, SubsidioEmpleo: 'Subsidio Empleo'})
      }
    }else{
      if(!checked){
        setImssCheck((current)=> false)
        setDatos({...datos, Imss: ''})
      }else{
        setImssCheck((current)=> true)
        setDatos({...datos, Imss: 'IMSS'})
      }
    }
  }

  const buscaResultados =() =>{
    console.log('Entra', datos)
    refetch({
      input:datos
    })
  }

  return(
    <>
      <div className={styles.c_contenedor}>
        <div className={styles.c_tituloPrincipal}>
          Calculadora de sueldo
        </div>
        <div className={styles.c_contenedorPrincipal}>
          <div className={styles.c_contenedorTabla}>
            <div className={styles.c_tituloContenedor}>Periodo</div>
            <div>
              <select
                className={styles.c_SelectPeriodo}
                onChange={(e)=> actualizaDatos(e, 'Periodo')}
              >
                <option value="" defaultChecked>Seleccione...</option>
                <option value="Semanal">Semanal</option>
                <option value="Catorcenal">Catorcenal</option>
                <option value="Quincenal">Quincenal</option>
                <option value="Mensual">Mensual</option>
              </select>
            </div>
            <div className={styles.c_tituloContenedor}>Tipo</div>
            <div>
              <select
                className={styles.c_SelectPeriodo}
                onChange={(e)=> actualizaDatos(e, 'Periodo')}
              >
                <option value="" defaultChecked>Seleccione...</option>
                <option value="Neto">Neto</option>
                <option value="Bruto">Bruto</option>
              </select>
            </div>
            <div className={styles.c_tituloContenedor}>Sueldo bruto</div>
            <div>
              <input 
              type="number" 
              onChange={(e) => actualizaDatos(e,'SueldoBruto')} 
              className={styles.c_inputSueldo} 
              />
            </div>
            <div className={styles.c_contenedorRadio}>
              <div id="IMSS" className={styles.c_radios}>
              
                <input
                  id="1"
                  key="1"
                  type="checkbox"
                  value="1"  
                  onChange={(e)=> seleccionInputs(e)}
                  checked={imssCheck}
                ></input>
                <label htmlFor="1" className={styles.c_textoRadio}>IMSS</label>
              </div>
            </div>
            <div className={styles.c_contenedorRadio}>
              <div id="IMSS" className={styles.c_radios}>
                <input
                  id="2"
                  key="2"
                  type="checkbox"
                  value="2"
                  checked={subsidioCheck}
                  onChange={(e)=> seleccionInputs(e)}
                ></input>
                <label htmlFor="2" className={styles.c_textoRadio}>Subsidio al empleo</label>
              </div>
            </div>
            <div className={styles.c_contenedorBoton}>
              <button 
                className={styles.c_botonCalcular}
                onClick={() => buscaResultados()}
                >
                Calcular
              </button>
            </div>
          </div>
          <div className={styles.c_contenedorTabla}>
            <div className={styles.c_tituloContenedor}>Resultado</div>
            {resultado?.map((lis:any)=>(
              <>
            <div className={styles.c_contenedorResultados}>
              <div className={styles.c_resultados}>
                <div className={styles.c_tituloResultados}>
                  L&iacute;mite inferior
                </div>
                <div className={styles.c_valorResultado}>
                {formatter(lis.LimiteInferior)}
                </div>
              </div>
              <div className={styles.c_resultados}>
                <div className={styles.c_tituloResultados}>
                  Excedente del l&iacute;mite inferior
                </div>
                <div className={styles.c_valorResultado}>
                  {formatter(lis.Excedente)}
                </div>
              </div>
              <div className={styles.c_resultados}>
                <div className={styles.c_tituloResultados}>
                  % Excedente del l&iacute;mite inferior
                </div>
                <div className={styles.c_valorResultado}>
                  {formatter(lis.PorcentajeExcedente)}
                </div>
              </div>
              <div className={styles.c_resultados}>
                <div className={styles.c_tituloResultados}>
                  Cuota fija
                </div>
                <div className={styles.c_valorResultado}>
                  {formatter(lis.CuotaFija)}
                </div>
              </div>
              <div className={styles.c_resultados}>
                <div className={styles.c_tituloResultados}>
                  Impuesto marginal
                </div>
                <div className={styles.c_valorResultado}>
                  {formatter(lis.ImpuestoMarginal)}
                </div>
              </div>
              <div className={styles.c_resultados}>
                <div className={styles.c_tituloResultados}>
                  Impuesto a retener
                </div>
                <div className={styles.c_valorResultado}>
                  {formatter(lis.ImpuestoRetenido)}
                </div>
              </div>
              <div className={styles.c_resultados}>
                <div className={styles.c_tituloResultados}>
                  IMSS
                </div>
                <div className={styles.c_valorResultado}>
                  {formatter(lis.Imss)}
                </div>
              </div>
              <div className={styles.c_resultados}>
                <div className={styles.c_tituloResultados}>
                  Subsidio al empleo
                </div>
                <div className={styles.c_valorResultado}>
                  {formatter(lis.SubsidioEmpleo)}
                </div>
              </div>
            </div>
            <div className={styles.c_resultadoNeto}>
              <div className={styles.c_tituloResultadoNeto}>Sueldo Neto</div>
              <div className={styles.c_valorResultado}>{formatter(lis.SueldoNeto)}</div>
            </div>
              </>
            ))}

          </div>
        </div>
      </div>
    </>
  )
}

export default CalculadoraTable