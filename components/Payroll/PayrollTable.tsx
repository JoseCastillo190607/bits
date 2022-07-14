import {useState, useEffect, useContext, useReducer} from "react";

import { Box, Grid } from "@material-ui/core";
import { useToggle } from '../../hooks/useToggle';
import { tabPayrollGroupReducer } from "../../context/ConfigPayrollContext/TabPayrollGroupReducer";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const PayrollTable = (props: TabPanelProps) =>{
 const [PayrollGroupState, PayrollGroupDispatch,] = useReducer(tabPayrollGroupReducer, { loading: true, PayrollGroups: [], PayrollGroupsFilter: [] });  
  const [inactiveOpen, setInactiveOpen] = useToggle(false);
  const [addPayrollGroupOpen, setAddPayrollOpen] = useToggle(false);
  const [payrollGroup, setPayrollGroup] = useState([])

  useEffect(()=>{
    console.log('Desde lista de nominas')
    obtenerDatos();
},[])

const obtenerDatos = async () =>{
    console.log('Datos obtenidos desde lista de nomina')
}
console.log('Grupos de nomina', payrollGroup)


return(
    <>
    <div>
        Prueba
    </div>
    </>
)
}

export default PayrollTable