import PayrollState from "../../context/PayrollContext/PayrollState";

import { NuevaNomina } from "./NuevaNomina";
import  ActivePayrollTable  from "./ActivePayrollTable";

import '../Payroll/Payroll.css'

import { useQuery } from "@apollo/client";
import { GET_ALL_PAYROLL } from "../../Querys/querys";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const PayrollTab = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    const resultPayroll = useQuery(GET_ALL_PAYROLL);
    const allPayroll = resultPayroll.data?.GET_ALL_PAYROLL;

    if(!allPayroll) return(  <PayrollState>
                                <NuevaNomina {...props}  />
                            </PayrollState>)
    return (
           <PayrollState>
               <ActivePayrollTable  {...props}  />
            </PayrollState>
    )
}

export default PayrollTab;
