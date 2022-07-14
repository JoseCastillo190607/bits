import {useState, useEffect} from "react";
import { getSubsidySemanal,getSubsidyCatorcenal,getSubsidyQuincenal,getSubsidyMensual } from '../../services/TableSubsidyService';
import TableBits from "../TableBits/TableBits";
import columns from "./TablesSubsidyColumns";
import '../ConfigPayroll/PayrollGroup.css'
import { Grid } from "@material-ui/core";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import './tableISR.css'

import { useQuery } from "@apollo/client";
import { GET_PERIODICSUBSIDYCATORCENAL, GET_PERIODICSUBSIDYSEMANAL, GET_PERIODICSUBSIDYMENSUAL, GET_PERIODICSUBSIDYQUINCENAL } from "../../Querys/querys";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const TableSubsidioTable = (props: TabPanelProps) =>{

  const resultCatorcenal= useQuery(GET_PERIODICSUBSIDYCATORCENAL);
  const allCatorcenal = resultCatorcenal.data?.GET_PERIODICSUBSIDYCATORCENAL;

  const resultSemanal= useQuery(GET_PERIODICSUBSIDYSEMANAL);
  const allSemanal = resultSemanal.data?.GET_PERIODICSUBSIDYSEMANAL;

  const resultMensual= useQuery(GET_PERIODICSUBSIDYMENSUAL);
  const allMensual = resultMensual.data?.GET_PERIODICSUBSIDYMENSUAL;

  const resultQuincenal= useQuery(GET_PERIODICSUBSIDYQUINCENAL);
  const allQuincenal = resultQuincenal.data?.GET_PERIODICSUBSIDYQUINCENAL;


    const [tableSubsidySemanal, setTableSubsidySemanal] = useState([])
    const [tableSubsidyCatorcenal, setTableSubsidyCatorcenal] = useState([])
    const [tableSubsidyQuincenal, setTableSubsidyQuincenal] = useState([])
    const [tableSubsidyMensual, setTableSubsidyMensual] = useState([])
    const [iconoSemanal, setIconoSemanal] = useState(false)
    const [iconoCatorcenal, setIconoCatorcenal] = useState(false)
    const [iconoQuincenal, setIconoQuincenal] = useState(false)
    const [iconoMensual, setIconoMensual] = useState(false)

    useEffect(()=>{
        obtenerDatos();
    },[])

    const obtenerDatos = async () =>{
        let TableSubsidySemanal = await getSubsidySemanal();
        let TableSubsidyCatorcenal = await getSubsidyCatorcenal();
        let TableSubsidyQuincenal = await getSubsidyQuincenal();
        let TableSubsidyMensual = await getSubsidyMensual();

        setTableSubsidySemanal(TableSubsidySemanal)
        setTableSubsidyCatorcenal(TableSubsidyCatorcenal)
        setTableSubsidyQuincenal(TableSubsidyQuincenal)
        setTableSubsidyMensual(TableSubsidyMensual)
    }


      return(
        <>
          <div className="contenedorHeader">
            <div>
              <span className="tituloHeader">Tablas periódicas de Subsidio</span>
            </div>
          </div>
          <div>
            <Accordion className="prueba"> 
              <div className="contenedorTabla">
                <div className="contenedorTituloTablaValores">
                  <Grid container spacing={1}>
                    <Grid item xs={5} className="tituloTablasValores centrado ">
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
                        <span className="textotituloTabla">Tabla Subsidio semanal</span>
                      </div>
                    </Grid>
                    <Grid item xs={2} className="tituloTablasValores centrado ">
                      <div className="tableValuesPrimerElemento">
                        <span className="textotituloTabla">Para ingresos de</span>
                      </div>
                    </Grid>
                    <Grid item xs={2} className="tituloTablasValores centrado">
                      <div className="tableValuesPrimerElemento">
                        <span className="textotituloTabla">Hasta ingresos de</span>
                      </div>
                    </Grid>
                    <Grid item xs={3} className="tituloTablasValores centrado">
                      <div className="tableValuesPrimerElemento">
                        <span className="textotituloTabla">Cantidad de subsidio para el empleo</span>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <AccordionDetails>
                <div className="filaTablaValoresTop">
                  {allSemanal?.map((lis:any)=>
                    <Grid container spacing={1} className="contenedorTablaValores">
                      <Grid item xs={5} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento">
                        </div>
                      </Grid>  
                      <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento segundoElementoTabla">
                          <span className="textoValoresTabla">{lis.LowerIncome}</span>
                        </div>
                      </Grid>  
                      <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento tercerElementoTabla">
                          <span className="textoValoresTabla">{lis.UpperIncome}</span>
                        </div>
                      </Grid>  
                      <Grid item xs={3} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento cuartoElementoTabla" >
                          <span className="textoValoresTabla">{lis.SubsidyAmount}</span>
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
                    <Grid item xs={5} className="tituloTablasValores centrado ">
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
                        <span className="textotituloTabla">Tabla Subsidio catorcenal</span>
                      </div>
                    </Grid>
                    <Grid item xs={2} className="tituloTablasValores centrado ">
                      <div className="tableValuesPrimerElemento">
                        <span className="textotituloTabla">Para ingresos de</span>
                      </div>
                    </Grid>
                    <Grid item xs={2} className="tituloTablasValores centrado">
                      <div className="tableValuesPrimerElemento">
                        <span className="textotituloTabla">Hasta ingresos de</span>
                      </div>
                    </Grid>
                    <Grid item xs={3} className="tituloTablasValores centrado">
                      <div className="tableValuesPrimerElemento">
                        <span className="textotituloTabla">Cantidad de subsidio para el empleo</span>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <AccordionDetails>
                <div className="filaTablaValoresTop">
                  {allCatorcenal?.map((lis:any)=>
                    <Grid container spacing={1} className="contenedorTablaValores">
                      <Grid item xs={5} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento">
                        </div>
                      </Grid>  
                      <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento segundoElementoTabla">
                          <span className="textoValoresTabla">{lis.LowerIncome}</span>
                        </div>
                      </Grid>  
                      <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento tercerElementoTabla">
                          <span className="textoValoresTabla">{lis.UpperIncome}</span>
                        </div>
                      </Grid>  
                      <Grid item xs={3} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento cuartoElementoTabla" >
                          <span className="textoValoresTabla">{lis.SubsidyAmount}</span>
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
                    <Grid item xs={5} className="tituloTablasValores centrado ">
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
                        <span className="textotituloTabla">Tabla Subsidio quincenal</span>
                      </div>
                    </Grid>
                    <Grid item xs={2} className="tituloTablasValores centrado ">
                      <div className="tableValuesPrimerElemento">
                        <span className="textotituloTabla">Para ingresos de</span>
                      </div>
                    </Grid>
                    <Grid item xs={2} className="tituloTablasValores centrado">
                      <div className="tableValuesPrimerElemento">
                        <span className="textotituloTabla">Hasta ingresos de</span>
                      </div>
                    </Grid>
                    <Grid item xs={3} className="tituloTablasValores centrado">
                      <div className="tableValuesPrimerElemento">
                        <span className="textotituloTabla">Cantidad de subsidio para el empleo</span>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <AccordionDetails>
                <div className="filaTablaValoresTop">
                  {allQuincenal?.map((lis:any)=>
                    <Grid container spacing={1} className="contenedorTablaValores">
                      <Grid item xs={5} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento">
                        </div>
                      </Grid>  
                      <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento segundoElementoTabla">
                          <span className="textoValoresTabla">{lis.LowerIncome}</span>
                        </div>
                      </Grid>  
                      <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento tercerElementoTabla">
                          <span className="textoValoresTabla">{lis.UpperIncome}</span>
                        </div>
                      </Grid>  
                      <Grid item xs={3} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento cuartoElementoTabla" >
                          <span className="textoValoresTabla">{lis.SubsidyAmount}</span>
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
                    <Grid item xs={5} className="tituloTablasValores centrado ">
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
                        <span className="textotituloTabla">Tabla Subsidio mensual</span>
                      </div>
                    </Grid>
                    <Grid item xs={2} className="tituloTablasValores centrado ">
                      <div className="tableValuesPrimerElemento">
                        <span className="textotituloTabla">Para ingresos de</span>
                      </div>
                    </Grid>
                    <Grid item xs={2} className="tituloTablasValores centrado">
                      <div className="tableValuesPrimerElemento">
                        <span className="textotituloTabla">Hasta ingresos de</span>
                      </div>
                    </Grid>
                    <Grid item xs={3} className="tituloTablasValores centrado">
                      <div className="tableValuesPrimerElemento">
                        <span className="textotituloTabla">Cantidad de subsidio para el empleo</span>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <AccordionDetails>
                <div className="filaTablaValoresTop">
                  {allMensual?.map((lis:any)=>
                    <Grid container spacing={1} className="contenedorTablaValores">
                      <Grid item xs={5} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento">
                        </div>
                      </Grid>  
                      <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento segundoElementoTabla">
                          <span className="textoValoresTabla">{lis.LowerIncome}</span>
                        </div>
                      </Grid>  
                      <Grid item xs={2} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento tercerElementoTabla">
                          <span className="textoValoresTabla">{lis.UpperIncome}</span>
                        </div>
                      </Grid>  
                      <Grid item xs={3} className="filaTablaValores tituloTablasValores">
                        <div className="tableValuesPrimerElemento cuartoElementoTabla" >
                          <span className="textoValoresTabla">{lis.LowerIncome}</span>
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

export default TableSubsidioTable