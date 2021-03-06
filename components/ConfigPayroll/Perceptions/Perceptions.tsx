import react, {useState, useEffect, useContext, useReducer} from "react";
import { getPerceptions } from '../../../services/payrollServices/PerceptionService';
import '../../ConfigPayroll/PayrollGroup.css'
import { Box, Grid } from "@material-ui/core";
import { useToggle } from '../../../hooks/useToggle';
import MenuPerceptions from "../Modals/MenuPerceptions";
import EliminaPerception from "../Modals/EliminaPerception";
import EditPerception from "../Modals/EditPerception";
import InfoPerception from '../Modals/InfoPerceptionModal';
import { TabPerceptionsContext } from '../../../context/TabNominaContext/TabPerceptionsContext';
import CrearPerceptionModal from '../../../components/ConfigPayroll/Modals/CreatePerceptionModal';
import { tabPerceptionReducer } from "../../../context/TabNominaContext/tabPerceptionsReducer";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const Perceptions = (props: TabPanelProps) => {
    const [PerceptionState, PerceptionDispatch,] = useReducer(tabPerceptionReducer, { loading: true, Perceptions: [], PerceptionsFilter: [] });
    const [inactiveOpen, setInactiveOpen] = useToggle(false);
    const [addPerceptionOpen, setAddPerceptionOpen] = useToggle(false);
    const [perceptions, setPerceptions] = useState([])

    useEffect(()=>{
        obtenerDatos();
    },[])

    const obtenerDatos = async () =>{
        let Perceptions = await getPerceptions();
        setPerceptions(Perceptions)
    }

    return (
        <>
        <div className="ContenedorListaOrganigrama">
            <Grid xs item container justify="flex-end">
                <Box mt={2} className="ContenedorBotonCrearOrganigrama">
                <TabPerceptionsContext.Provider value={{
                        inactiveOpen,
                        setInactiveOpen,
                        addPerceptionOpen,
                        setAddPerceptionOpen,
                        PerceptionState,
                        PerceptionDispatch
                    }}>
                    <button onClick={setAddPerceptionOpen} className="botonAgregaPuesto">
                    <div className='alineacionBoton'>
                        
                        <div className="nombrePuesto">
                        <span>Nueva Percepcion</span>
                        </div>
                        <div className="nombrePuesto">
                        <img src='/assets/icons/icono-crear-puesto.svg' />
                        </div>
                    </div>
                    </button>            
                    <CrearPerceptionModal getDatos={obtenerDatos}/>
                </TabPerceptionsContext.Provider>
                </Box>
            </Grid>        
        <ul className='Lista'>
            {perceptions.map((lis:any)=>
                <li className='Mask' key={lis._id}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <div className='alineacionPuesto'>
                            <span className='Puesto'>{lis.ConceptName}</span>
                        </div>
                    </Grid>       
                    <Grid item xs={3}>
                        <div className='alineacionPuesto'>
                            <div>
                            <div className='nombrePuesto'>
                                <span className='textoAreaJefe'>Tipo de concepto:</span> <span className='nombreCorreo'>{lis.ConceptType}</span>
                            </div>
                            
                            </div>
                        </div>
                    </Grid>
                    {(lis.IntegratesIMSS === 'true')?
                    <Grid item xs={2}>
                        <div className='alineacionPuesto'>
                        <div className='nombrePuesto'>
                                <span className='textoAreaJefe'>Integra IMSS:</span><span className='nombreCorreo'>S??</span>
                            </div>
                        </div>
                    </Grid>:
                    <Grid item xs={2}>
                        <div className='alineacionPuesto'>
                        <div className='nombrePuesto'>
                                <span className='textoAreaJefe'>Integra IMSS:</span><span className='nombreCorreo'>No</span>
                            </div>
                        </div>
                    </Grid>
                    }
                    {(lis.SocialSecurity === 'true')?
                    <Grid item xs={2}>
                        <div className='alineacionPuesto'>
                        <div className='nombrePuesto'>
                                <span className='textoAreaJefe'>Previsi??n social:</span><span className='nombreCorreo'>S??</span>
                            </div>
                        </div>
                    </Grid>:
                    <Grid item xs={2}>
                    <div className='alineacionPuesto'>
                    <div className='nombrePuesto'>
                            <span className='textoAreaJefe'>Previsi??n social:</span><span className='nombreCorreo'>No</span>
                        </div>
                    </div>
                    </Grid>
                    }
                    <Grid item xs={1}>
                    <div className="container">
                    <MenuPerceptions  {...{ _id:lis._id, ConceptName: lis.ConceptName, SATKey: lis.SATKey, ConceptType: lis.ConceptType, AccountingAccount: lis.AccountingAccount, PayType: lis.PayType, ISRTax: lis.ISRTax, ISNTax: lis.ISNTax, SocialSecurity: lis.SocialSecurity,IntegratesIMSS: lis.IntegratesIMSS } }/>
                    </div>
                    </Grid>
                </Grid>
                </li>
            )
            }
        </ul>
            <InfoPerception />
            <EditPerception getDatos={obtenerDatos}/>
            <EliminaPerception getDatos={obtenerDatos}/>
            </div>
        </>
    )
}

export default Perceptions;