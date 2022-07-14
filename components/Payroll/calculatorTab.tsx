import PayrollState from "../../context/PayrollContext/PayrollState";
import CalculatorTable from "./calculatorTable";
import '../Payroll/Payroll.css'

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const CalculatorTab = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <PayrollState>
            <CalculatorTable  {...props}  />
         </PayrollState>
    )
}

export default CalculatorTab;
