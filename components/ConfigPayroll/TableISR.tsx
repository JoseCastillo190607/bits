import {useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import './tableISR.css'
import '../ConfigPayroll/PayrollGroup.css'

import { useQuery } from "@apollo/client";
import { GET_PERIODICISRCATORCENAL, GET_PERIODICISRSEMANAL, GET_PERIODICISRMENSUAL, GET_PERIODICISRQUINCENAL } from "../../Querys/querys";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const TableISRTable = (props: TabPanelProps) =>{

  const resultCatorcenal= useQuery(GET_PERIODICISRCATORCENAL);
  const allCatorcenal = resultCatorcenal.data?.GET_PERIODICISRCATORCENAL;

  const resultSemanal= useQuery(GET_PERIODICISRSEMANAL);
  const allSemanal = resultSemanal.data?.GET_PERIODICISRSEMANAL;

  const resultMensual= useQuery(GET_PERIODICISRMENSUAL);
  const allMensual = resultMensual.data?.GET_PERIODICISRMENSUAL;

  const resultQuincenal= useQuery(GET_PERIODICISRQUINCENAL);
  const allQuincenal = resultQuincenal.data?.GET_PERIODICISRQUINCENAL;


    const [tableISRSemanal, setTableISRSemanal] = useState([])
    const [tableISRCatorcenal, setTableISRCatorcenal] = useState([])
    const [tableISRQuincenal, setTableISRQuincenal] = useState([])
    const [tableISRMensual, setTableISRMensual] = useState([])
    const [iconoSemanal, setIconoSemanal] = useState(false)
    const [iconoCatorcenal, setIconoCatorcenal] = useState(false)
    const [iconoQuincenal, setIconoQuincenal] = useState(false)
    const [iconoMensual, setIconoMensual] = useState(false)

  

    useEffect(()=>{
        obtenerDatos();
    },[])

    const obtenerDatos = async () =>{
    }

    return(
      <>
        <div className="contenedorHeader">
          <div>
            <span className="tituloHeader">Tablas periódicas de ISR</span>
          </div>
        </div>
        <div>
          <Accordion className="prueba"> 
            <div className="contenedorTabla">
              <div className="contenedorTituloTablaValores">
                <Grid container spacing={1}>
                  <Grid item xs={4} className="tituloTablasValores centrado ">
                    <div className="primerElementoTablaValores">
                      <AccordionSummary
                      aria-controls="panel2a-content"
                      id="panel2a-header" 
                      onClick={(e) => setIconoSemanal(!iconoSemanal)}>
                        <div className={`iconoLista  ${iconoSemanal === true ? "iconoListaNoActivo": "iconoListaActivo"} `}>
                          <span className={`${iconoSemanal === true ? "iconoNoActivo": "iconoActivo"}`}>^</span>
                        </div>
                      </AccordionSummary>
                    </div>
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Tabla ISR semanal</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado ">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Límite inferior</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Límite superior</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Cuota fija</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Excedente %</span>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
            <AccordionDetails>
              <div className="filaTablaValoresTop">
                {allSemanal?.map((lis:any)=>
                  <Grid container spacing={1} className="contenedorTablaValores">
                    <Grid item xs={4} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento">
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento segundoElementoTabla">
                        <span className="textoValoresTabla">{lis.LowerLimit}</span>
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento tercerElementoTabla">
                        <span className="textoValoresTabla">{lis.UpperLimit}</span>
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento cuartoElementoTabla" >
                        <span className="textoValoresTabla">{lis.FixedQuota}</span>
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento quintoElementoTabla">
                        <span className="textoValoresTabla">{lis.Excess}</span>
                      </div>
                    </Grid>  
                  </Grid>   
                )}
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion> 
            <div>
              <div className="contenedorTituloTablaValores2">
                <Grid container spacing={1}>
                  <Grid item xs={4} className="tituloTablasValores centrado ">
                    <div className="primerElementoTablaValores">
                      <AccordionSummary
                      aria-controls="panel2a-content"
                      id="panel2a-header" 
                      onClick={(e) => setIconoCatorcenal(!iconoCatorcenal)}>
                        <div className={`iconoLista  ${iconoCatorcenal === true ? "iconoListaNoActivo": "iconoListaActivo"} `}>
                          <span className={`${iconoCatorcenal === true ? "iconoNoActivo": "iconoActivo"}`}>^</span>
                        </div>
                      </AccordionSummary>
                    </div>
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Tabla ISR catorcenal</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado ">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Límite inferior</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Límite superior</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Cuota fija</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Excedente %</span>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
            <AccordionDetails>
              <div className="filaTablaValoresTop">
                {allCatorcenal?.map((lis:any)=>
                  <Grid container spacing={1} className="contenedorTablaValores">
                    <Grid item xs={4} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento">
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento segundoElementoTabla">
                        <span className="textoValoresTabla">{lis.LowerLimit}</span>
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento tercerElementoTabla">
                        <span className="textoValoresTabla">{lis.UpperLimit}</span>
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento cuartoElementoTabla" >
                        <span className="textoValoresTabla">{lis.FixedQuota}</span>
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento quintoElementoTabla">
                        <span className="textoValoresTabla">{lis.Excess}</span>
                      </div>
                    </Grid>  
                  </Grid>   
                )}
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion> 
            <div>
              <div className="contenedorTituloTablaValores2">
                <Grid container spacing={1}>
                  <Grid item xs={4} className="tituloTablasValores centrado ">
                    <div className="primerElementoTablaValores">
                      <AccordionSummary
                      aria-controls="panel2a-content"
                      id="panel2a-header" 
                      onClick={(e) => setIconoQuincenal(!iconoQuincenal)}>
                        <div className={`iconoLista  ${iconoQuincenal === true ? "iconoListaNoActivo": "iconoListaActivo"} `}>
                          <span className={`${iconoQuincenal === true ? "iconoNoActivo": "iconoActivo"}`}>^</span>
                        </div>
                      </AccordionSummary>
                    </div>
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Tabla ISR quincenal</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado ">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Límite inferior</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Límite superior</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Cuota fija</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Excedente %</span>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
            <AccordionDetails>
              <div className="filaTablaValoresTop">
                {allQuincenal?.map((lis:any)=>
                  <Grid container spacing={1} className="contenedorTablaValores">
                    <Grid item xs={4} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento">
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento segundoElementoTabla">
                        <span className="textoValoresTabla">{lis.LowerLimit}</span>
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento tercerElementoTabla">
                        <span className="textoValoresTabla">{lis.UpperLimit}</span>
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento cuartoElementoTabla" >
                        <span className="textoValoresTabla">{lis.FixedQuota}</span>
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento quintoElementoTabla">
                        <span className="textoValoresTabla">{lis.Excess}</span>
                      </div>
                    </Grid>  
                  </Grid>   
                )}
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion> 
            <div>
              <div className="contenedorTituloTablaValores2">
                <Grid container spacing={1}>
                  <Grid item xs={4} className="tituloTablasValores centrado ">
                    <div className="primerElementoTablaValores">
                      <AccordionSummary
                      aria-controls="panel2a-content"
                      id="panel2a-header" 
                      onClick={(e) => setIconoMensual(!iconoMensual)}>
                        <div className={`iconoLista  ${iconoMensual === true ? "iconoListaNoActivo": "iconoListaActivo"} `}>
                          <span className={`${iconoMensual === true ? "iconoNoActivo": "iconoActivo"}`}>^</span>
                        </div>
                      </AccordionSummary>
                    </div>
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Tabla ISR mensual</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado ">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Límite inferior</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Límite superior</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Cuota fija</span>
                    </div>
                  </Grid>
                  <Grid item xs={2} className="tituloTablasValores centrado">
                    <div className="tableValuesPrimerElemento">
                      <span className="textotituloTabla">Excedente %</span>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
            <AccordionDetails>
              <div className="filaTablaValoresTop">
                {allMensual?.map((lis:any)=>
                  <Grid container spacing={1} className="contenedorTablaValores">
                    <Grid item xs={4} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento">
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento segundoElementoTabla">
                        <span className="textoValoresTabla">{lis.LowerLimit}</span>
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento tercerElementoTabla">
                        <span className="textoValoresTabla">{lis.UpperLimit}</span>
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento cuartoElementoTabla" >
                        <span className="textoValoresTabla">{lis.FixedQuota}</span>
                      </div>
                    </Grid>  
                    <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                      <div className="tableValuesPrimerElemento quintoElementoTabla">
                        <span className="textoValoresTabla">{lis.Excess}</span>
                      </div>
                    </Grid>  
                  </Grid>   
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </>
    )
}

export default TableISRTable