import {useState, useEffect, useContext, useReducer} from "react";
import '../Payroll/Payroll.css'
import { useToggle } from '../../hooks/useToggle';
import { TabPayrollContext } from '../../context/PayrollContext/TabPayrollContext';
import CrearPayrollsModal from "./Modals/CrearPayrollsModal";
import { tabPayrollReducer } from "../../context/PayrollContext/TabPayrollReducer"

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

export const NuevaNomina = (props: TabPanelProps) => {
    const [PayrollState, PayrollDispatch,] = useReducer(tabPayrollReducer, { loading: true, Payrolls: [], PayrollFilter: [] });
    const [inactiveOpen, setInactiveOpen] = useToggle(false);
    const [addPayrollOpen, setAddPayrollOpen] = useToggle(false);

    useEffect(()=>{
        obtenerDatos();
    },[])

    const obtenerDatos = async () => {
    }

    return (
    <div className="MsjNuevaPrenomina">
        <div className="Title">
        Comienza a crear tu nómina,
        <p className="continueparagraph">nosotros de ayudamos</p>
        </div>
        <p> Antes de iniciar, crea tus grupos de nómina en las
        <b><a href="https://google.com" className="MsjNuevaPrenominaLink"> Configuraciones</a></b>
        </p>
        <p>
        Si no sabes cómo hacer tu nómina <b><a href="https://google.com" className="MsjNuevaPrenominaLink"> Aprende fácil</a></b>
        </p>
            <TabPayrollContext.Provider value={{
                    inactiveOpen,
                    setInactiveOpen,
                    addPayrollOpen,
                    setAddPayrollOpen,
                    PayrollState,
                    PayrollDispatch
                }}>
                <button onClick={setAddPayrollOpen} className="botonNuevaPrenomina">
            <div className='alineacionBoton'>
            <img src='/assets/icons/add_road_black_24dp.svg' />
                <div className="nombrePuesto">
                <b><span>Nueva pre-nómina</span></b>
                </div>
            </div>
            </button>
            <CrearPayrollsModal getDatos={obtenerDatos}/>
            </TabPayrollContext.Provider>
    </div>
    );
    
    }
    




