import {useState, useEffect, useContext, useReducer} from "react";
import { getTablesValue} from '../../services/TableValueService';
import './TablesValues.css'

import { Box, Grid } from "@material-ui/core";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const TablesValueTable = (props: TabPanelProps) =>{

    const [tableValue, setTableValue] = useState([])

    useEffect(()=>{
        obtenerDatos();
    },[])

    useEffect(()=>{
        obtenerDatos();
    },[])

        const obtenerDatos = async () =>{
            let TablesValue = await getTablesValue();
            setTableValue(TablesValue)
        }

    return(
      <>
        <div className="contenedorHeader">
          <div>
              <span className="tituloHeader">Valores de Referencia</span>
          </div>
        </div>
        <div className="contenedorTabla">
            {tableValue?.map((lis:any)=>
              <div>
                <div className="table-row">
                  <div className="d-flex-grow">
                    <span className="tableValuesTextoPrimerElemento">Salario Mínimo Zona Libre de la frontera:</span>
                  </div>
                  
                  <div style={{ width: "150px" }}>
                      <span className="fw-bold" style={{marginRight: "60px"}}>Valor</span>
                      <span>{lis.MinimumSalaryFrontier}</span>
                  </div>
                </div>

                <div className="table-row">
                  <div className="d-flex-grow">
                    <span className="tableValuesTextoPrimerElemento">Salario Mínimo Área General:</span>
                  </div>
                  <div style={{ width: "150px" }}>
                      <span className="fw-bold" style={{marginRight: "60px"}}>Valor</span>
                      <span>{lis.MinimumSalaryGeneral}</span>  
                  </div>
                </div>

                <div className="table-row">
                  <div className="d-flex-grow">
                    <span className="tableValuesTextoPrimerElemento">UMA:</span>
                  </div>

                  <div style={{ width: "150px" }}>
                      <span className="fw-bold" style={{marginRight: "60px"}}>Valor</span>
                      <span>{lis.UMA}</span>
                  </div>
                </div>

                <div className="table-row">
                  <div className="d-flex-grow">
                    <span className="tableValuesTextoPrimerElemento">Valor de descuento infonavit 2022:</span>
                  </div>

                  <div style={{ width: "150px" }}>
                      <span className="fw-bold" style={{marginRight: "60px"}}>Valor</span>
                      <span>{lis.InfonavitDiscount}</span>
                  </div>
                </div>
              </div>
            )}
        </div>
      </>
    )
}

export default TablesValueTable