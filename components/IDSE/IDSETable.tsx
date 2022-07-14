import styles from "../../styles/IDSE/IDSE.module.css"
import {useQuery, useMutation} from "@apollo/client"
import { GET_MOVIMIENTOSIDSE, UPDATE_ESTATUSMOVIMIENTO } from "../../Querys/querys";
import { useReducer, useState,useEffect, useContext } from "react";
import {formatter} from "../../helpers/formatoMoneda"
import PayrollProcessContext from "../../context/PayrollProcess/PayrollProcessContext";
import { openalertaEnviarIDSE } from "../../context/PayrollProcess/Actions";
import EnviarIDSEModal from "./Modals/EnviarIDSEModal";
import DescartarIDSEModal from "./Modals/DescartarEnviarModal";


interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
};

const IDSETable = (props: TabPanelProps) =>{
  const {state, dispatch} = useContext(PayrollProcessContext)
  const {loading, error, data, refetch} = useQuery(GET_MOVIMIENTOSIDSE)
  const resultado = data?.GET_MOVIMIENTOSIDSE
  const [updateEstatusMovimiento] = useMutation(UPDATE_ESTATUSMOVIMIENTO,{
    refetchQueries:[{query:GET_MOVIMIENTOSIDSE}]
  })
  const [filtrado, setFiltrado] =  useState<any[]>([])
  const [isCheck, setIsCheck] =  useState<any[]>([])


  useEffect(()=>{
    obtenerDatos();
  },[resultado, isCheck])

  const obtenerDatos = async () => {
    await setFiltrado(resultado)
  };

  const datosFiltrados = (e:any) =>{
    if(e !== '') {
      let expresion = new RegExp(`${e}.*`, "i")
      const nuevoFiltrado = filtrado?.filter((lis:any) => expresion.test(lis.Nombre))
      console.log('nuevoFiltrado', nuevoFiltrado)
      setFiltrado(nuevoFiltrado)
    }else{
      obtenerDatos()
    }
  }

  const cambioEstatus = (id:any) =>{
    updateEstatusMovimiento({
      variables:{
        updateEstatusmovimientoId:id
      }
    })
  }

  const handleSelectAll = (e:any) =>{
    if(!e.target.checked){
      setIsCheck([])
    }
    let filtradoSeleccionado = (resultado.filter((lis:any)=>{
      return e.target.checked && !isCheck.includes(lis.id)
    }).map((lis:any) =>(lis.id)))

    setIsCheck(filtradoSeleccionado)
  }

  const handleClick =  (e:any) => {
    const {id, checked} = e.target
    setIsCheck((current)=> current =[...current, parseInt(id)])
    if(!checked){
      setIsCheck((current) => current = [...current,isCheck.filter((lis:any) => lis !== parseInt(id))])
    }
  }

  const enviarIDSE = () =>{
    console.log('Hola')
    openalertaEnviarIDSE({alertaEnviarIDSE:true }, dispatch);
  }


  return(
    <div className={styles.contenedor}>
      <div className={styles.contenedorTitulo}>
        Movimientos IDSE
      </div>
      <div className={styles.contenedorAccionesTitulo}>
        <div className={styles.contenedorInput}>
          <div>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Buscar al colaborador por nombre"
              onChange={(e) => datosFiltrados(e.target.value)}/>
        </div>  
        <div className={styles.iconoBuscar}></div>
      </div>
      <button 
        className={styles.pc_botonDispersarInactivo}
        onClick={() =>  enviarIDSE()}>
            <div
            >
            Enviar
            </div>
            <div className={styles.pc_iconoDispersar}></div>
          </button>
      <button className={styles.botonDescargar}>
          <div className={styles.iconoDescargar}></div>
          <div>
            Descargar reporte
          </div>
        </button>
      </div>
      <div className={styles.contenedorTabla}>
        <table className={styles.tabla}>
          <thead className={styles.thead}>
            <tr>
              <td className={`${styles.tituloTabla} ${styles.primeraColumna}`}>
                <div id="colaboladores" className={styles.checkboxitem}>
                  <input
                    id="check"
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e)}
                    ></input>
                      <label htmlFor="check"> Colaboradores </label>
                </div>
              </td>
              <td className={styles.tituloTabla}>NSS</td>
              <td className={styles.tituloTabla}>SBC</td>
              <td className={styles.tituloTabla}>Movimiento</td>
              <td className={styles.tituloTabla}>Fecha del movimiento</td>
              <td className={styles.tituloTabla}>Acciones</td>
            </tr>
          </thead>
          <tbody>
            {filtrado?.map((lis:any)=>(
             <tr className={styles.datoTabla}>
              <td className={styles.primeraColumna}>
                <div id="colaboladores" className={styles.checkboxitem}>
                      <input
                        id={lis.id}
                        key={lis.id}
                        type="checkbox"
                        value={lis.id}
                        checked ={isCheck.includes(lis.id)}
                        onChange={(e) => handleClick(e)}
                      ></input>
                      <label htmlFor={lis.id}>  {lis.Nombre} </label>
                    </div>
                </td>
              <td>{lis.IMSS}</td>
              <td>{formatter(lis.SCB)}</td>
              <td>{lis.Tipo}</td>
              <td>{lis.Fecha}</td>
              <td>
                <button 
                  className={styles.botonExterno}
                  onClick={()=> cambioEstatus(lis.idMovimiento)}
                  >
                  Descartar
                </button>
              </td>
             </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EnviarIDSEModal/>
      <DescartarIDSEModal/>
    </div>
  )
}

export default IDSETable