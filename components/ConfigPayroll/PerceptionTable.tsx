import {useState, useEffect, useContext, useReducer} from "react";
import { getPerceptions } from '../../services/PerceptionService';
import '../ConfigPayroll/PayrollGroup.css'
import { Grid } from "@material-ui/core";
import { useToggle } from '../../hooks/useToggle';
import MenuListPerception from "./Modals/MenuListPerception";
import InfoPerception from '../ConfigPayroll/Modals/InfoPerceptionModal';
import EliminaPerception from "./Modals/EliminaPerception";
import EditaPerception from "./Modals/EditaPerception";
import { TabPerceptionContext } from '../../context/ConfigPayrollContext/TabPerceptionContext';
import CrearPerceptionModal from "./Modals/CrearPerceptionModal";
import { TabPerceptionReducer } from "../../context/ConfigPayrollContext/TabPerceptionReducer";
import PerceptionContext from "../../context/ConfigPayrollContext/PerceptionContext"
import { useQuery } from "@apollo/client";
import { GET_ALL_PERCEPTIONS } from "../../Querys/querys";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const PerceptionTable = (props: TabPanelProps) =>{
  const resultPerceptions = useQuery(GET_ALL_PERCEPTIONS);
  const allPerceptions = resultPerceptions.data?.GET_ALL_PERCEPTIONS;

    const [PerceptionState, PerceptionDispatch,] = useReducer(TabPerceptionReducer, { loading: true, Perceptions: [], PerceptionsFilter: [] });
    const [inactiveOpen, setInactiveOpen] = useToggle(false);
    const [addPerceptionOpen, setAddPerceptionOpen] = useToggle(false);
    const [Perception, setPerception] = useState([])

    const [perceptionListFilter, setPerceptionListFilter] = useState<any>([]);
    

    const { state, dispatch } = useContext(PerceptionContext);



    useEffect(() => {
        obtenerDatos();
    }, [state]);

    const obtenerDatos = async () =>{

        async function fetchData() {
            const Perception = await getPerceptions();
            setPerception(Perception);
            setPerceptionListFilter(Perception);
        }
        fetchData();
        return ()=>{
            fetchData();
            setPerception([]);
            setPerceptionListFilter([]);
        }
    }

    return(
      <>
        <div className="contenedorHeader">
            <div>
              <span className="tituloHeader">Percepciones</span>
            </div>
            <div>
            <TabPerceptionContext.Provider value={{
                        inactiveOpen,
                        setInactiveOpen,
                        addPerceptionOpen,
                        setAddPerceptionOpen,
                        PerceptionState,
                        PerceptionDispatch
                    }}>
              <button onClick={setAddPerceptionOpen} className="botonHeader">
                <div className='contenedorBotonHeader'>
                  <div className="textoBotonHeader">
                    <span>+ Nueva Percepci??n</span>
                  </div>
                </div>
              </button>   
              <CrearPerceptionModal getDatos={obtenerDatos}/>
                </TabPerceptionContext.Provider>             
            </div>
          </div>
          <div className="contenedorTabla">
            <div className="contenedorTituloTabla">
            <Grid container spacing={1}>
                <Grid item xs={6} className="tituloTabla">
                  <span className="textotituloTabla">Nombre</span>
                </Grid>
                <Grid item xs={5} className="tituloTabla">
                  <span className="textotituloTabla">Clave SAT</span>
                </Grid>
                <Grid item xs={1} className="tituloTabla">
                  <span className="textotituloTabla">M??s informaci??n</span>
                </Grid>
              </Grid>
            </div>
          </div>
          <div>
            <ul>
              {allPerceptions?.map((lis:any) =>
                <li className="listaTabla">
                  <Grid container spacing={1}>
                    <Grid item xs={6} className="tituloTabla">
                      <div className="tablaColumnaFlex">
                        <span className="textoTabla">{lis.ConceptName}</span>
                      </div>
                    </Grid>
                    <Grid item xs={5} className="tituloTabla">
                      <div className="tablaColumnaFlex">
                        <span className="textoTabla">{lis.SATKey}</span>
                      </div>
                    </Grid>
                    <Grid item xs={1} className="tituloTabla">
                      <div className="tablaColumnaFlex">
                      <MenuListPerception  {...{ _id:lis.id, ConceptName: lis.ConceptName, SATKey: lis.SATKey, ConceptType: lis.Concept_Type, AccountingAccount: lis.AccuntingAccount, PayType: lis.PayType, ISRTax: lis.ISRTax, ISNTax: lis.ISNTax, SocialSecurity: lis.SocialSecurity,IntegratesIMSS: lis.IntegratesIMSS } }/>
                      </div>
                    </Grid>
                  </Grid>
                </li>
            )
            }
        </ul>
            <InfoPerception />
            <EditaPerception getDatos={obtenerDatos}/>
            <EliminaPerception getDatos={obtenerDatos}/>
            </div>
        </>
    )
}
 
export default PerceptionTable