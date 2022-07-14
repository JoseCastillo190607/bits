import ReportsPayrollTable from './ReportsPayrollTable'

interface TabPanelProps{
  children?: React.ReactNode;
  index: any;
  value: any;
}

const ReportsPayrollTab  = (props:TabPanelProps) =>{
  return(
    <ReportsPayrollTable />
  )
}

export default ReportsPayrollTab