import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import InfoPerception from '../ConfigPayroll/Modals/InfoPerceptionModal';
import CrearPerceptionModal from "./Modals/CrearPerceptionModal";
import EditaPerception from "./Modals/EditaPerception";

import './Concepts.css'

import DeduccionState from "../../context/ConfigPayrollContext/DeduccionState";
import DeductionTable from "./DeductionTable";


import PerceptionState from "../../context/ConfigPayrollContext/PerceptionState";
import PerceptionTable from "./PerceptionTable";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const ConceptTab = (props: TabPanelProps) => {
    const [tvalue, setValue] = useState<string>('1');
    const [activo, setActivo] = useState('1')
    const { children, value, index, ...other } = props;
    const params = useParams<any>();
    const [id, setId] = useState<string>('');
    useEffect(() => {
        setId(params.id)
    }, [params]);

    return (
      <>
          <TabsUnstyled defaultValue={0} className="mainConceptsHeader">
          <div className="conceptsHeaders">
            <TabsListUnstyled>
              <TabUnstyled id="botonHeader" className={`configBotonHeader ${activo === '1' ? "activo" : "desactivo"}`} onClick={(e)=> setActivo('1')}>
                  <span className="conceptstextoBotonHeader">Percepciones</span>
              </TabUnstyled>
              <TabUnstyled id="botonHeader" className={`configBotonHeader ${ activo === '2' ? "activo" : "desactivo"}`} onClick={(e)=> setActivo('2')}>
                  <span className="conceptstextoBotonHeader" >Deducciones</span>
              </TabUnstyled>
            </TabsListUnstyled>
            </div>
            <div className="contenedorPrincipal">
            <PerceptionState>  
              <TabPanelUnstyled value={0}><PerceptionTable {...props}  /></TabPanelUnstyled>
              <InfoPerception />
              <CrearPerceptionModal/>
              <EditaPerception/>
            </PerceptionState>
            <DeduccionState>
              <TabPanelUnstyled value={1}><DeductionTable {...props} /></TabPanelUnstyled>
            </DeduccionState>
            </div>
          </TabsUnstyled>
      </>
    )
}

export default ConceptTab;
