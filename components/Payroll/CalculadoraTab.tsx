import CalculadoraTable from './CalculadoraTable'

interface TabPanelProps{
  children?: React.ReactNode;
  index: any;
  value: any;
}

const CalculadoraTab  = (props:TabPanelProps) =>{
  return(
    <CalculadoraTable />
  )
}

export default CalculadoraTab