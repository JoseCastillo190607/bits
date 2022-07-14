import {useEffect, useReducer} from "react";
import '../ConfigPayroll/PayrollGroup.css'
import { Grid } from "@material-ui/core";
import { useToggle } from '../../hooks/useToggle';
import MenuListPayrollGroup from "./Modals/MenuListPayrollGroup";
import EliminaPayrollGroup from "./Modals/EliminaPayrollGroups";
import EditaPayrollGroups from "./Modals/EditaPayrollGroups";
import { TabPayrollGroupContext } from '../../context/ConfigPayrollContext/TabPayrollGroupContext';
import CrearPayrollGroupsModal from "./Modals/CrearPayrollGroupsModal";
import { tabPayrollGroupReducer } from "../../context/ConfigPayrollContext/TabPayrollGroupReducer"
import GreenSwitch from './GreenSwitch'
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PAYROLL_GROUP, UPDATE_PAYROLL_GROUP_STATUS } from "../../Querys/querys";
import CreatePayrollGroup from "./Modals/CrearPayrollGroups";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const PayrollGroupTable = (props: TabPanelProps) =>{

    const resultPayrollGroup = useQuery(GET_ALL_PAYROLL_GROUP);
    const allPayrollGroup = resultPayrollGroup.data?.GET_ALL_PAYROLL_GROUP;
    const [PayrollGroupState, PayrollGroupDispatch,] = useReducer(tabPayrollGroupReducer, { loading: true, PayrollGroups: [], PayrollGroupsFilter: [] });
    const [inactiveOpen, setInactiveOpen] = useToggle(false);
    const [addPayrollGroupOpen, setAddPayrollGroupOpen] = useToggle(false);
    const [updateStatus] = useMutation(UPDATE_PAYROLL_GROUP_STATUS,{
      refetchQueries:[{query: GET_ALL_PAYROLL_GROUP}]
    })

    useEffect(()=>{
        obtenerDatos();
    },[])

    const obtenerDatos = async () =>{
    }

    const updatePayrollStatus = (id:any) =>{
      console.log('Si entra')
      updateStatus({
        variables:{
          updatePayrollGroupStatusId: id
        }
      })
    }

    return(
      <>
        <div className="contenedorPrincipal">
          <div className="contenedorHeader">
            <div>
              <span className="tituloHeader">Grupo de nóminas</span>
            </div>
            <div>
              <TabPayrollGroupContext.Provider value={{
                                inactiveOpen,
                                setInactiveOpen,
                                addPayrollGroupOpen,
                                setAddPayrollGroupOpen,
                                PayrollGroupState,
                                PayrollGroupDispatch
                            }}>
                <button onClick={setAddPayrollGroupOpen} className="botonHeader">
                  <div className="contenedorBotonHeader">
                    <div className="textoBotonHeader">
                      <span>+ Nuevo grupo de nomina</span>
                    </div>
                  </div>
                </button>
                <CrearPayrollGroupsModal getDatos={obtenerDatos}/>
              </TabPayrollGroupContext.Provider>
            </div>
          </div>
          <div className="contenedorTabla">
            <div className="contenedorTituloTabla">
              <Grid container spacing={1}>
                <Grid item xs={3} className="tituloTabla">
                  <span className="textotituloTabla">Nombre del grupo</span>
                </Grid>
                <Grid item xs={2} className="tituloTabla"> 
                  <span className="textotituloTabla">Tipo de Grupo</span>
                </Grid>
                <Grid item xs={3} className="tituloTabla">
                  <span className="textotituloTabla">Razón social</span>
                </Grid>
                <Grid item xs={2} className="tituloTabla">
                  <span className="textotituloTabla">Cuenta Bancaria</span>
                </Grid>
                <Grid item xs={1} className="tituloTabla">
                  <span className="textotituloTabla">Estatus</span>
                </Grid>
              </Grid>
            </div>
            <div>
              <ul>
                  {allPayrollGroup?.map((lis:any)=>
                    <li className="listaTabla" key={lis._id}>
                      <Grid container spacing={1}>
                        <Grid item xs={3} className="tituloTabla">
                            <div className="tablaColumnaFlex">
                              <span className="textoTabla">{lis.group_name}</span>
                            </div>
                        </Grid>
                        <Grid item xs={2} className="tituloTabla">
                          <div className="tablaColumnaFlex">
                            <span className="textoTabla">{lis.company_name}</span>
                          </div>
                        </Grid>
                        <Grid item xs={3} className="tituloTabla">
                         <div className="tablaColumnaFlex">
                            <span className="textoTabla">{lis.payment_scheme}</span>
                          </div>
                        </Grid>
                        <Grid item xs={2} className="tituloTabla">
                          <div className="tablaColumnaFlex">
                            <span className="textoTabla">{lis.bank_account}</span>
                          </div>
                        </Grid>
                        <Grid item xs={1} className="tituloTabla">
                          <div className="tablaColumnaFlex">
                            <div className="tablaColumnaFlex">
                              <div className="columnaEstatus">
                                <div>
                                  <span className="textoTabla">{lis.statusPayroll_group}</span>
                                </div>
                                <div>
                                  <GreenSwitch updatePayrollStatus={updatePayrollStatus} id={lis.id} status={lis.statusPayroll_group}/>
                                </div>
                              </div>
                            </div>
                            <div className="menuTabla">
                            <MenuListPayrollGroup  {...{ _id:lis.id, 
                                    GroupName: lis.group_name, 
                                    CompanyName: lis.company_name, 
                                    PaymentScheme: lis.payment_scheme, 
                                    BankAccount: lis.bank_account,
                                    PayrollPeriod: lis.payroll_period,
                                    SocialSecurity: lis.social_security,
                                    MonthlyISR: lis.monthly_ISR,
                                    PayrollPeriodDays: lis.period_days,
                                    SubsidyEmployee: lis.employee_benefit,
                                    RegulationISR: lis.ISR_with_regulation,
                                     }}/>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </li>  
                  )}
              </ul>
            </div>
          </div>
            <EditaPayrollGroups getDatos={obtenerDatos}/>
            <EliminaPayrollGroup getDatos={obtenerDatos}/>
        </div>  
      </>
    )
}

export default PayrollGroupTable