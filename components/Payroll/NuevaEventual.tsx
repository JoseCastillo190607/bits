import {useState, useEffect, useContext, useReducer} from "react";
import '../Payroll/Payroll.css'
import { useToggle } from '../../hooks/useToggle';
import { TabEventualPayrollContext } from '../../context/PayrollContext/TabEventualPayrollContext';
import CrearEventualPayrollsModal from "./Modals/CrearEventualPayrollsModal";
import { tabEventualPayrollReducer } from "../../context/PayrollContext/TabEventualPayrollReducer"

import { clearEventualPayrollProcess, createEventualnominaModal } from "../../context/PayrollProcess/EventualActions";
import EventualPayrollProcessContext from "../../context/PayrollProcess/EventualPayrollProcessContext";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

export const NuevaEventual = (props: TabPanelProps) => {
    const [EventualPayrollState, EventualPayrollDispatch,] = useReducer(tabEventualPayrollReducer, { loading: true, EventualPayrolls: [], EventualPayrollFilter: [] });
    const [inactiveOpen, setInactiveOpen] = useToggle(false);
    const [addEventualPayrollOpen, setAddEventualPayrollOpen] = useToggle(false);

    const {state: payrollState, dispatch: payrollDispatch} = useContext(EventualPayrollProcessContext) 
    useEffect(()=>{
        obtenerDatos();
    },[])


    const obtenerDatos = async () => {
        clearEventualPayrollProcess({}, payrollDispatch);
    }

    const createModal = () =>{
        createEventualnominaModal({createEventual: true}, payrollDispatch)
    }

    return (
    <div className="MsjNuevaPrenomina">
        <div className="Title">
        Comienza a crear tu nómina eventual,
        <p className="continueparagraph">nosotros de ayudamos</p>
        </div>
        <p> Antes de iniciar, crea tus grupos de nómina en las
        <b><a href="https://google.com" className="MsjNuevaPrenominaLink"> Configuraciones</a></b>
        </p>
        <p>
        Si no sabes cómo hacer tu nómina <b><a href="https://google.com" className="MsjNuevaPrenominaLink"> Aprende fácil</a></b>
        </p>
            <TabEventualPayrollContext.Provider value={{
                    inactiveOpen,
                    setInactiveOpen,
                    addEventualPayrollOpen,
                    setAddEventualPayrollOpen,
                    EventualPayrollState,
                    EventualPayrollDispatch
                }}>
                <button onClick={()=> createModal()} className="botonNuevaPrenomina">
            <div className='alineacionBoton'>
            <img src='/assets/icons/add_road_black_24dp.svg' />
                <div className="nombrePuesto">
                <b><span>Nueva Nómina Eventual</span></b>
                </div>
            </div>
            </button>
            <CrearEventualPayrollsModal getDatos={obtenerDatos}/>
            </TabEventualPayrollContext.Provider>
    </div>
    );
    
    }
    




