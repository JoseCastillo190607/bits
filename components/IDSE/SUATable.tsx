import styles from "../../styles/IDSE/IDSE.module.css"
import {useQuery, useMutation} from "@apollo/client"
import { GET_MOVIMIENTOSIDSE, UPDATE_ESTATUSMOVIMIENTO,GET_MOVIMIENTOS_TXT } from "../../Querys/querys";
import { useEffect, useState } from "react";
import {formatter} from "../../helpers/formatoMoneda"
import {saveAs} from 'file-saver'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
};

const SUATable = (props: TabPanelProps) =>{
  const {loading, error, data, refetch} = useQuery(GET_MOVIMIENTOSIDSE)
  const {loading: loadingtxt, error:errotxt, data:datatxt, refetch:refetchtxt} = useQuery(GET_MOVIMIENTOS_TXT)
  const movimientosTXT = datatxt?.GET_MOVIMIENTOS_TXT
  console.log('movimientos Idse',movimientosTXT)
  const resultado = data?.GET_MOVIMIENTOSIDSE
  const [updateEstatusMovimiento] = useMutation(UPDATE_ESTATUSMOVIMIENTO,{
    refetchQueries:[{query:GET_MOVIMIENTOSIDSE}]
  })
  const [filtrado, setFiltrado] =  useState<any[]>([])
  const [movimientosFiltrados, setMovimientosFiltrados] =useState<any[]>([])
  const [textoTXT, setTextoTXT] =useState('')
  const [isCheck, setIsCheck] =  useState<any[]>([])
  const [movimientos, setMovimientos] =  useState<any[]>([])


  useEffect(()=>{
    obtenerDatos();
  },[resultado, isCheck, movimientosTXT])

  useEffect(()=>{
    if(movimientosTXT) setMovimientos(movimientosTXT)
  },[movimientosTXT])

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


  
  const actualizaVariables = async() =>{
    await refetchtxt({
      input:{
        id: "1,2,3,4,5,6",
        Desde: "SUA",
        Tipo: "Alta"
      }
    })
  
   movimientos?.map((lis:any)=>{
    console.log('asdasdas',lis.Resultado)
    setMovimientosFiltrados((current)=> [...current, lis.Resultado])
    setTextoTXT((current) => current =  current + lis.Resultado + ',')
   })

    console.log('movimientos',textoTXT)


    const blob = new Blob([textoTXT], {type:'text/plain;charset=utf-8'})
    saveAs(blob, 'miarchivo.txt')
  }

  return(
    <div className={styles.contenedor}>
      <div className={styles.contenedorTitulo}>
        Movimientos SUA
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
      <button className={styles.botonDescargar}>
          <div className={styles.iconoDescargar}></div>
          <div onClick={actualizaVariables}>
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
              <td className={styles.tituloTabla}>SCBC</td>
              <td className={styles.tituloTabla}>Movimiento</td>
              <td className={styles.tituloTabla}>Fecha del movimiento</td>
              <td className={styles.tituloTabla}>Estatus</td>
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
              <td>{formatter(lis.SCB)}</td>
              <td>{lis.Tipo}</td>
              <td>{lis.Fecha}</td>
              <td>{lis.estatusMovimiento}</td>
             </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SUATable