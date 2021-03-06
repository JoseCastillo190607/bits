import { useEffect, useState } from "react";

import { Route, useParams } from "react-router-dom";
import PayrollGroupState from "../../context/ConfigPayrollContext/PayrollGroupState";
// import PayrollGroupTable from "./PayrollGroupTable";

import '../ConfigPayroll/PayrollGroup.css'

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const PayrollGroupTab = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    const params = useParams<any>();
    const [id, setId] = useState<string>('');
    useEffect(() => {
        setId(params.id)
    }, [params]);
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                {/*  <PayrollGroupState>
                   <Route
                        component={() => (
                        <PayrollGroupTable {...props} />
                        )}
                    /> 
                </PayrollGroupState>*/}
            )}
        </div>
    )
}

export default PayrollGroupTab;
