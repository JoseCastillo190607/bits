import {useState, useEffect, useContext, useReducer} from "react";
import { getDeducciones } from '../../../services/payrollServices/DeduccionService'
import '../../ConfigPayroll/PayrollGroup.css'
import { Box, Grid } from "@material-ui/core";
import { useToggle } from '../../../hooks/useToggle';
import MenuDeduccion from "../Modals/MenuDeduccion";
import EliminaDeduccion from "../Modals/EliminaDeduccion";
import EditDeduccion from "../Modals/EditDeduccion";
import { TabDeduccionContext } from '../../../context/TabNominaContext/TabDeduccionContext';
import CrearDeduccionModal from '../../../components/ConfigPayroll/Modals/CreateDeduccionModal';
import { tabDeduccionReducer } from "../../../context/TabNominaContext/tabDeduccionReducer";

const Deduccion = ()  => {
    const [DeduccionState, DeduccionDispatch,] = useReducer(tabDeduccionReducer, { loading: true, Deducciones: [], DeduccionesFilter: [] });
    const [inactiveOpen, setInactiveOpen] = useToggle(false);
    const [addDeduccionOpen, setAddDeduccionOpen] = useToggle(false);
    const [deduccion, setDeduccion] = useState([])

    useEffect(()=>{
        obtenerDatos();
    },[])

    const obtenerDatos = async () =>{
        let Deduccion = await getDeducciones();
        setDeduccion(Deduccion)
    }

    return (
        <>
        <div className="ContenedorListaOrganigrama">
            <Grid xs item container justify="flex-end">
                <Box mt={2} className="ContenedorBotonCrearOrganigrama">
                <TabDeduccionContext.Provider value={{
                        inactiveOpen,
                        setInactiveOpen,
                        addDeduccionOpen,
                        setAddDeduccionOpen,
                        DeduccionState,
                        DeduccionDispatch
                    }}>
                    <button onClick={setAddDeduccionOpen} className="botonAgregaPuesto">
                    <div className='alineacionBoton'>
                        
                        <div className="nombrePuesto">
                        <span>Nueva Deduccion</span>
                        </div>
                        <div className="nombrePuesto">
                        <img src='/assets/icons/icono-crear-puesto.svg' />
                        </div>
                    </div>
                    </button>            
                    <CrearDeduccionModal getDatos={obtenerDatos}/>
                </TabDeduccionContext.Provider>
                </Box>
            </Grid>        
        <ul className='Lista'>
            {deduccion.map((lis:any)=>
                <li className='Mask' key={lis._id}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <div className='alineacionPuesto'>
                            <span className='Puesto'>{lis.ConceptType}</span>
                        </div>
                    </Grid>       
                    <Grid item xs={3}>
                        <div className='alineacionPuesto'>
                            <div>
                            <div className='nombrePuesto'>
                                <span className='textoAreaJefe'>Clave SAT:</span> <span className='nombreCorreo'>{lis.SATKey}</span>
                            </div>
                            
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                    <div className="container">
                    <MenuDeduccion  {...{ _id:lis._id, ConceptName: lis.ConceptType, SATKey: lis.SATKey} }/>
                    </div>
                    </Grid>
                </Grid>
                </li>
            )
            }
        </ul>
            <EditDeduccion getDatos={obtenerDatos}/>
            <EliminaDeduccion getDatos={obtenerDatos}/>
            </div>
        </>
    )
}

export default Deduccion;