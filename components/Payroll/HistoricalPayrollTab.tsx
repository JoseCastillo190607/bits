import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

import '../ConfigPayroll/Concepts.css'
import HistoricPayrollTable from "./HistoricPayrollTable";

import PayrollState from "../../context/PayrollContext/PayrollState";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

  const ConceptTab = (props: TabPanelProps) => {
  const [tvalue, setValue] = useState<string>('1');
  const [activo, setActivo] = useState('1')
  const [filtro, setFiltro] = useState('')
  const { children, value, index, ...other } = props;
  const params = useParams<any>();

  const datosFiltrados = (e:any) =>{
        
    if(e !== '') {
      setFiltro(e)
    }
}

    return (
      <>
        <TabsUnstyled defaultValue={0} className="mainConceptsHeader">
          <div className="conceptsHeaders2">
            <div className="concepTitle">
              <p>
                Periódos
              </p>
            </div>
            <div className="concepConteinerYears" >
              <div className="concepYear">
                <TabsListUnstyled>
                  <TabUnstyled id="botonHeader" className={`configBotonHeader2 ${activo === '1' ? "activo" : "desactivo"}`} onClick={(e)=> setActivo('1')}>
                      <b>2021</b>
                  </TabUnstyled>
                  <TabUnstyled id="botonHeader" className={`configBotonHeader2 ${ activo === '2' ? "activo" : "desactivo"}`} onClick={(e)=> setActivo('2')}>
                    <b>2022</b>
                  </TabUnstyled>
                </TabsListUnstyled>
              </div>
                
            </div>
              
            <div className="containderImputs-playroll">
              <div className="containderImputsSearcher-playroll">
                  <input 
                  className="inputSearcher-playroll"
                  placeholder='Buscar al colaborador por nombre o email'
                  onChange={(e: any) => datosFiltrados(e.target.value)}
                  />
                  <div className="buttonSearch">
                    <p>Buscar</p>
                  </div>
              </div>
            </div>
          </div>
          
          <PayrollState>  
            <TabPanelUnstyled value={0}><HistoricPayrollTable {...props} year={'2021'} filtro={filtro} /></TabPanelUnstyled>
            <TabPanelUnstyled value={1}><HistoricPayrollTable {...props} year={'2022'} filtro={filtro} /></TabPanelUnstyled>
          </PayrollState>
        
        </TabsUnstyled>
      </>
    )
}

export default ConceptTab;
