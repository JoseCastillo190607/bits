import {useState, useEffect, useContext, useReducer} from "react";
import '../Payroll/Payroll.css'
import { useToggle } from '../../hooks/useToggle';
import { TabSettlementPayrollContext } from '../../context/PayrollContext/TabSettlementPayrollContext';
import { tabSettlementPayrollReducer } from "../../context/PayrollContext/TabSettlementPayrollReducer"
import { clearSettlementProcess, createSettlementModal } from "../../context/PayrollProcess/SettlementActions";
import CrearSettlementModal from "./Modals/CrearSettlementModal";
import SettlementPayrollProcessContext from "../../context/PayrollProcess/SettlementPayrollProcessContext";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

export const NuevoFiniquito = (props: TabPanelProps) => {
    const [SettlementPayrollState, SettlementPayrollDispatch,] = useReducer(tabSettlementPayrollReducer, { loading: true, SettlementPayrolls: [], SettlementPayrollFilter: [] });
    const [inactiveOpen, setInactiveOpen] = useToggle(false);
    const [addSettlementPayrollOpen, setAddSettlementPayrollOpen] = useToggle(false);

    const {state: payrollState, dispatch: payrollDispatch} = useContext(SettlementPayrollProcessContext) 

    useEffect(()=>{
        obtenerDatos();
    },[])

    const obtenerDatos = async () => {
        clearSettlementProcess({}, payrollDispatch);
    }

    const createModal = () =>{
        createSettlementModal({createSettlement: true}, payrollDispatch)
    }
    

    return (
    <div className="MsjNuevaPrenomina">
        <div className="Title">
        Comienza a crear tu Finiquito/Liquidación,
        <p className="continueparagraph">nosotros de ayudamos</p>
        </div>
        <p>
        Si no sabes cómo hacer tu Finiquito/Liquidación <b><a href="https://google.com" className="MsjNuevaPrenominaLink"> Aprende fácil</a></b>
        </p>
            <TabSettlementPayrollContext.Provider value={{
                    inactiveOpen,
                    setInactiveOpen,
                    addSettlementPayrollOpen,
                    setAddSettlementPayrollOpen,
                    SettlementPayrollState,
                    SettlementPayrollDispatch
                }}>
                <button onClick={()=> createModal()} className="botonNuevaPrenomina">
            <div className='alineacionBoton'>
            <img src='/assets/icons/add_road_black_24dp.svg' />
                <div className="nombrePuesto">
                <b><span>Solicitud de baja</span></b>
                </div>
            </div>
            </button>
            <CrearSettlementModal getDatos={obtenerDatos}/>
            </TabSettlementPayrollContext.Provider>
    </div>
    );
    
    }
    




