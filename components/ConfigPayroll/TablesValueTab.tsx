import { useEffect, useState, ChangeEvent, useContext } from "react";
import { Route, useParams } from "react-router-dom";
import { TabContext, TabPanel } from "@material-ui/lab";
import { Grow, Paper, Tab, Tabs } from "@material-ui/core";
import TablesValueTable from "./TablesValueTable";
import TableISR from "./TableISR";
import TableSubsidy from "./TableSubsidy";
import TableISN from "./TableISN";
import TablesValueState from "../../context/ConfigPayrollContext/TablesValueState";
import TableISRState from "../../context/ConfigPayrollContext/TableISRState";
import TableSubsidyState from "../../context/ConfigPayrollContext/TableSubsidyState";
import TableISNState from "../../context/ConfigPayrollContext/TableISNState";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import './TablesValues.css'


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const TablesValueTab = (props: TabPanelProps) => {
    
    const [activo, setActivo] = useState('1')
    const [tvalue, setValue] = useState<string>('1');
    const { children, value, index, ...other } = props;
    const params = useParams<any>();
    const [id, setId] = useState<string>('');
    useEffect(() => {
        setId(params.id)
    }, [params]);
    const handleChange = (event: ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };
    return (
      <>
        <TabsUnstyled defaultValue={0} className="mainConceptsHeader">
        <div className="tablesValuesHeader">
          <TabsListUnstyled>
            <TabUnstyled  className={`tableValuesBotonHeader1 ${activo === '1' ? "activo" : "desactivo"}`} onClick={(e)=> setActivo('1')}>
              <span className="conceptstextoBotonHeader">Valores de referencia</span>
            </TabUnstyled>
            <TabUnstyled className={`tableValuesBotonHeader2 ${ activo === '2' ? "activo" : "desactivo"}`} onClick={(e)=> setActivo('2')}>
              <span className="conceptstextoBotonHeader" >Tablas peri??dicas de ISR</span>
            </TabUnstyled>
            <TabUnstyled  className={`tableValuesBotonHeader3 ${ activo === '3' ? "activo" : "desactivo"}`} onClick={(e)=> setActivo('3')}>
              <span className="conceptstextoBotonHeader" >Tablas peri??dicas de subsidio</span>
            </TabUnstyled>
            <TabUnstyled className={`tableValuesBotonHeader4 ${ activo === '4' ? "activo" : "desactivo"}`} onClick={(e)=> setActivo('4')}>
              <span className="conceptstextoBotonHeader" >Tablas de impuestos sobre n??mina</span>
            </TabUnstyled>
          </TabsListUnstyled>
          </div>
          <div className="contenedorPrincipal">
            <TabPanelUnstyled value={0}><TablesValueTable {...props}  /></TabPanelUnstyled>
            <TabPanelUnstyled value={1}>< TableISR {...props}  /></TabPanelUnstyled>
            <TabPanelUnstyled value={2}>< TableSubsidy {...props}  /></TabPanelUnstyled>
            <TabPanelUnstyled value={3}>< TableISN {...props}  /></TabPanelUnstyled>

          </div>
        </TabsUnstyled>
      </>
    )
}

export default TablesValueTab;
