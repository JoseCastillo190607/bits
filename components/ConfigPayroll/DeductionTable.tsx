import react, {useState, useEffect, useContext, useReducer} from "react";
import { getDeducciones } from '../../services/DeduccionService';
import '../ConfigPayroll/PayrollGroup.css'
import { Box, Button, Grid } from "@material-ui/core";
import { useToggle } from '../../hooks/useToggle';
import MenuListDeduccion from "./Modals/MenuListDeduccion";
import EliminaDeduccion from "./Modals/EliminaDeduccion";
import EditaDeduccion from "./Modals/EditaDeduccion";
import { TabDeduccionContext } from '../../context/ConfigPayrollContext/TabDeduccionContext';
import CrearDeduccionModal from "./Modals/CreateDeduccionModal";
import { TabDeduccionReducer } from "../../context/ConfigPayrollContext/TabDeduccionReducer";
import DeduccionContext from "../../context/ConfigPayrollContext/DeduccionContext"
import { useQuery } from "@apollo/client";
import { GET_ALL_DEDUCTIONS } from "../../Querys/querys";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const DeduccionTable = (props: TabPanelProps) =>{

  const resultDeductions = useQuery(GET_ALL_DEDUCTIONS);
  const allDeductions = resultDeductions.data?.GET_ALL_DEDUCTIONS;

    const [DeduccionState, DeduccionDispatch,] = useReducer(TabDeduccionReducer, { loading: true, Deducciones: [], DeduccionesFilter: [] });
    const [inactiveOpen, setInactiveOpen] = useToggle(false);
    const [addDeduccionOpen, setAddDeduccionOpen] = useToggle(false);
    const [Deduccion, setDeduccion] = useState([])
    const { state, dispatch } = useContext(DeduccionContext);




    useEffect(()=>{
        obtenerDatos();
    },[])

    const obtenerDatos = async () =>{
        let Deduccion = await getDeducciones();
        setDeduccion(Deduccion)
    }

    return(
      <>
        <div className="contenedorHeader">
            <div>
              <span className="tituloHeader">Deducciones</span>
            </div>
              <div>
                  <TabDeduccionContext.Provider value={{
                          inactiveOpen,
                          setInactiveOpen,
                          addDeduccionOpen,
                          setAddDeduccionOpen,
                          DeduccionState,
                          DeduccionDispatch
                      }}>
                  <button onClick={setAddDeduccionOpen} className="botonHeader">
                    <div className='contenedorBotonHeader'>
                      <div className="textoBotonHeader">
                        <span>+ Nueva deducci??n</span>
                      </div>
                    </div>
                  </button> 
                  <CrearDeduccionModal getDatos={obtenerDatos}/>
                </TabDeduccionContext.Provider>               
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
              {allDeductions?.map((lis:any) =>
                <li className="listaTabla">
                  <Grid container spacing={1}>
                    <Grid item xs={6} className="tituloTabla">
                      <div className="tablaColumnaFlex">
                        <span className="textoTabla">{lis.concept_type}</span>
                      </div>
                    </Grid>
                    <Grid item xs={5} className="tituloTabla">
                      <div className="tablaColumnaFlex">
                        <span className="textoTabla">{lis.SATKey}</span>
                      </div>
                    </Grid>
                    <Grid item xs={1} className="tituloTabla">
                      <div className="tablaColumnaFlex">
                        <MenuListDeduccion  {...{ 
                          _id:lis.id, 
                          ConceptName: lis.concept_type, 
                          SATKey: lis.SATKey} }/>
                      </div>
                    </Grid>
                  </Grid>
                  <EditaDeduccion getDatos={obtenerDatos}/>
                  <EliminaDeduccion getDatos={obtenerDatos}/>
                </li>
              )}
            </ul>
          </div>
      </>
    )
}

export default DeduccionTable