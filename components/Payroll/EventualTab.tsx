import PayrollState from "../../context/PayrollContext/PayrollState";

import { NuevaEventual } from "./NuevaEventual";
import EventualTable from "./eventualTable";


import '../Payroll/Payroll.css'

import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTUALPAYROLL } from "../../Querys/querys";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const EventualTab = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    const resultPayroll = useQuery(GET_ALL_EVENTUALPAYROLL);
    const allPayroll = resultPayroll.data?.GET_ALL_EVENTUALPAYROLL;
    
        if(!allPayroll) return( 
            <NuevaEventual {...props}  />
        )

        return (
            <EventualTable  {...props}  />
        )
}

export default EventualTab;
