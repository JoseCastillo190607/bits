import SettlementPayrollState from "../../context/PayrollContext/SettlementPayrollState";

import { NuevoFiniquito } from "./NuevoFiniquito";
import  ActiveSettlementTable  from "./ActiveSettlementTable";

import '../Payroll/Payroll.css'

import { useQuery } from "@apollo/client";
import { GET_ALL_SETTLEMENTPAYROLL } from "../../Querys/querys";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const SettlementPayrollTab = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    const resultSettlement = useQuery(GET_ALL_SETTLEMENTPAYROLL);
    const allSettlement = resultSettlement.data?.GET_ALL_SETTLEMENTPAYROLL;
   
    if(!allSettlement) return(  <SettlementPayrollState>
                                    <NuevoFiniquito {...props}  />
                                </SettlementPayrollState>)

    return (
            <SettlementPayrollState>
                <ActiveSettlementTable  {...props}  />
            </SettlementPayrollState>
    )
}

export default SettlementPayrollTab;
