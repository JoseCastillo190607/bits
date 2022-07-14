import {useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useHistory } from "react-router-dom";
import '../ConfigPayroll/tableISR.css'
import '../ConfigPayroll/PayrollGroup.css'
import { useQuery, useLazyQuery } from "@apollo/client";
import {  GET_ALL_FINISH_PAYROLL_YEAR, GET_PAYROLLCOLLABORATOR_HISTORICAL,GET_ALL_PAYROLLCOLLABORATOR_EXCELL,GET_ALL_LISTARAYA  } from "../../Querys/querys";

import {formatter} from "../../helpers/formatoMoneda"
import { getDateMonthYear, getDateMonth, getMonth } from "../../helpers/Payroll/Payroll";

import styles from "../../../src/components/Payroll/PayrollStyles.module.css";
import moment from "moment";
import { forEachTrailingCommentRange } from "typescript";
import { utils, writeFile } from "xlsx"

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    year: any;
    filtro: any
};

const HistoricPayrollTable = (props: TabPanelProps) =>{
  const {year, filtro} = props
  //console.log('props',filtro)

  
  const [iconoSemanal, setIconoSemanal] = useState(false)
  
  //const resultHistoric= useQuery(GET_ALL_FINISH_PAYROLL);
  //const allHistoric = resultHistoric.data?.GET_ALL_FINISH_PAYROLL;

  const resultHistoric= useQuery(GET_ALL_FINISH_PAYROLL_YEAR, {
      variables: { init_date: year },
  });
  const allHistoric = resultHistoric.data?.GET_ALL_FINISH_PAYROLL_YEAR;
  //console.log(allHistoric)

  let idHistorics: string = '0'
  allHistoric?.forEach((historic: any) =>{
    idHistorics = idHistorics +','+ historic.id
  })
  //console.log(idHistorics);

  const resultAllCollaborator= useQuery(GET_PAYROLLCOLLABORATOR_HISTORICAL, {
    variables: { payroll: idHistorics },
  });
  const allCollaborator = resultAllCollaborator.data?.GET_PAYROLLCOLLABORATOR_HISTORICAL;
  //console.log(allCollaborator)

  const [filtrado, setFiltrado] =  useState(allCollaborator)
  //console.log(filtrado);

  const resultPayrollCollaboratorExcell = useQuery(GET_ALL_PAYROLLCOLLABORATOR_EXCELL, {
    variables: { getAllPayrollcollaboratorExcellId: 1 },
  });

  const allPayrollCollaboratorExcell = resultPayrollCollaboratorExcell.data?.GET_ALL_PAYROLLCOLLABORATOR_EXCELL;

  const resultListaRaya = useQuery(GET_ALL_LISTARAYA);

  const allListaRayaExcell = resultListaRaya.data?.GET_ALL_LISTARAYA;
  
  

  let filtetHistoric: any[]=[]
  let filtetHistoricNotRepeated: any[]=[]
  let foundHistoric: any ={}
  let filterExcelCollaborator: any[]=[]
  let filterListaRaya: any[]=[]

  allHistoric?.forEach((playRoll:any) =>{
    filtrado?.forEach((collaborator: any) =>{
      if(playRoll.id == collaborator.idPayroll){
        filtetHistoric.push(playRoll)
      }
    })
  })


  //console.log(filtetHistoric);
  
  filtetHistoricNotRepeated = filtetHistoric.filter( (element: any) =>{
    var exists = !foundHistoric[element.id];
    foundHistoric[element.id] = true;
    return exists;
  })
  //console.log(filtetHistoricNotRepeated);
  

  let titlePlayRoll: any[]=[]
  let titlePlayRollNotRepeated: any[]=[]
  let found: any ={}

  filtetHistoricNotRepeated?.forEach((playRoll: any) =>{
    titlePlayRoll.push(playRoll.init_date)
  })
  titlePlayRollNotRepeated = titlePlayRoll.filter( (element: any) =>{
    return found.hasOwnProperty(element)? false : (found[element]=true);
  })
  //console.log(titlePlayRollNotRepeated);
  

  const history = useHistory();

  const datosFiltrados = () =>{
    
    if(filtro !== '') {
        let expresion = new RegExp(`${filtro}.*`, "i")

        //console.log('expresion', expresion)
        const nuevoFiltrado = allCollaborator.filter((lis:any) =>expresion.test(lis.colaborator))
        //console.log('nuevoFiltrado', nuevoFiltrado)
        setFiltrado(nuevoFiltrado)
    }else{
      
      setFiltrado(allCollaborator)
    }
    
  }

  const handleOnExport = (id: any) => {
    
    allPayrollCollaboratorExcell?.forEach((excell:any) =>{
        if(excell.idPayroll == id){
          filterExcelCollaborator.push(excell)
        }
    })

    var woorkBook = utils.book_new(),
    woorkSheet = utils.json_to_sheet(filterExcelCollaborator);

    utils.book_append_sheet(woorkBook,woorkSheet,"Reporte_Nomina")

    writeFile(woorkBook, "ReporteNomina.xlsx")
  }

  const handleOnExportListaRaya = (id: any) => {
    
    allListaRayaExcell?.forEach((excell:any) =>{
        if(excell.idPayroll == id){
          filterListaRaya.push(excell)
        }
    })

    var woorkBook = utils.book_new(),
    woorkSheet = utils.json_to_sheet(filterListaRaya);

    utils.book_append_sheet(woorkBook,woorkSheet,"Reporte_Poliza_Contable")

    writeFile(woorkBook, "Reporte_Poliza_Contable.xlsx")
  }
  

  useEffect(()=>{
    datosFiltrados()
  },[filtro])

  const obtenerDatos = async () =>{
    
  }
  const boxShadow = 'box-shadow'
  return(
    <>
      {titlePlayRollNotRepeated?.map((month: any) =>(
        <div className="contenedorPrincipal">
          <div className="contenedorHeader">
              <div>
                <span className="tituloHeader-playroll">{moment(month).format('MMMM')} {year}</span>
              </div>
            </div>
          <div>
            {filtetHistoricNotRepeated?.map((lis:any)=>
            getMonth(lis.init_date) === getMonth(month) &&(
              <Accordion className="conteinerPlayRoll"
              style={{
                boxShadow: 'none'
              }}
              > 
                <div className="contenedorTabla">
                  <div className="contenedorTituloTablaValores">
                    <Grid container spacing={1}>
                      <Grid item xs={4} className="tituloTablasValores centrado ">
                        <div className="primerElementoTablaValores">
                          <AccordionSummary
                          aria-controls="panel2a-content"
                          id="panel2a-header" 
                          onClick={(e) => setIconoSemanal(!iconoSemanal)}>
                            <div className={`iconoLista  ${iconoSemanal === true ? "iconoListaActivo": "iconoListaActivo"} `}>
                              <span className={`${iconoSemanal === true ? "iconoActivo": "iconoActivo"}`}>^</span>
                            </div>
                          </AccordionSummary>
                        </div>
                        <div className="tableValuesPrimerElemento">
                          <span className="textotituloTabla-playroll">{lis.group_name}</span>
                        </div>
                      </Grid>
                      <Grid item xs={3} className="tituloTablasValores centrado ">
                        <div className="tableValuesPrimerElemento">
                          <span className="textotituloTabla-playroll">Periódo {getDateMonthYear(lis.init_date)} {getDateMonth(lis.init_date)} - {getDateMonth(lis.end_date)}</span>
                        </div>
                      </Grid>
                      <Grid item xs={2} className="tituloTablasValores centrado">
                        <div className="tableValuesPrimerElemento">
                          <span className="textotituloTabla-playroll">Empleados: {lis.employees}</span>
                        </div>
                      </Grid>
                      <Grid item xs={2} className="tituloTablasValores centrado">
                        <div className="tableValuesPrimerElemento">
                          <span className="textotituloTabla-playroll">Total: {formatter(lis.total)}</span>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <AccordionDetails>
                  <div className="filaTablaValoresTop">
                  <Grid container spacing={3} className="contenedorTablaValores">
                      <Grid item xs={6} className="tituloTablasValores centrado ">
                        <Grid item xs={4}>
                            <div className="conteinerDetails-playroll">
                                <span className="textotituloTablaDetalle-playroll">Detalle de Nómina</span>
                            </div>
                        </Grid>   
                        <Grid item xs={4}>
                          <div className="conteinerDetails-playroll">
                            <div>
                              <img className={styles.pc_iconoFlechaAmarilla} src='/assets/svg/icono-FlechaAmarilla.png' onClick={() => handleOnExport(lis.id)}> 
                              </img>
                            </div>
                            <div className="counteinderText-playroll">
                              <span className="textoTablaDetalle-playroll">Reporte de Nómina</span>
                            </div>
                                
                          </div>
                        </Grid>   
                        <Grid item xs={4}>
                          <div className="conteinerDetails-playroll">
                            <div>
                              <img className={styles.pc_iconoFlechaAmarilla} src='/assets/svg/icono-FlechaAmarilla.png' > 
                              </img>
                            </div>
                            <div className="counteinderText-playroll"></div>
                                <span className="textoTablaDetalle-playroll"> Recibos de nómina ZIP</span>
                            </div>
                        </Grid>   
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} className="contenedorTablaValores">
                      <Grid item xs={6} className="tituloTablasValores centrado ">
                        <Grid item xs={4}>
                            <div className="conteinerDetails-playroll">
                              <div>
                                <img className={styles.pc_iconoFlechaAmarilla} src='/assets/svg/icono-FlechaAmarilla.png' onClick={() => history.push(`/InitPayroll/${lis.id}/${lis.group_name}`)}> 
                                </img>
                              </div>
                              <div className="counteinderText-playroll">
                                <span className="textoTablaDetalle-playroll">Nómina</span>
                              </div>
                                    
                            </div>
                        </Grid>   
                        <Grid item xs={4}>
                          <div className="conteinerDetails-playroll">
                            <div>
                              <img className={styles.pc_iconoFlechaAmarilla} src='/assets/svg/icono-FlechaAmarilla.png'  onClick={() => handleOnExportListaRaya(lis.id)}> 
                              </img>
                            </div>
                            <div className="counteinderText-playroll">
                              <span className="textoTablaDetalle-playroll"> Reporte de Poliza Contable</span>
                            </div>
                              
                          </div>
                        </Grid>   

                        <Grid item xs={4}>
                          <div className="conteinerDetails-playroll">
                            <div>
                              <img className={styles.pc_iconoFlechaAmarilla} src='/assets/svg/icono-FlechaAmarilla.png'> 
                              </img>
                            </div>
                            <div className="counteinderText-playroll">
                              <span className="textoTablaDetalle-playroll"> Reporte CEP</span>
                            </div>
                              
                          </div>
                        </Grid>   
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} className="contenedorTablaValores">
                      <Grid item xs={6} className="tituloTablasValores centrado ">
                        <Grid item xs={4}>
                            <div>
                                <span className=""></span>
                            </div>
                        </Grid>   
                        <Grid item xs={4}>
                          <div className="conteinerDetails-playroll">
                            <div>
                              <img className={styles.pc_iconoFlechaAmarilla} src='/assets/svg/icono-FlechaAmarilla.png' > 
                              </img>
                            </div>
                            <div className="counteinderText-playroll">
                              <span className="textoTablaDetalle-playroll"> Reporte de STP</span>
                            </div>
                          </div>
                        </Grid>   
                      </Grid>
                    </Grid>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
        
        

      ))}
    </>
  )
}

export default HistoricPayrollTable