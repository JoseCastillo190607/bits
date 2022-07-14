import react, { useState, useEffect, useContext, useReducer } from "react";
import "../ConfigPayroll/Politic.css";
import { Grid } from "@material-ui/core";
import { useToggle } from "../../hooks/useToggle";
import MenuListPolitic from "./Modals/MenuListPolitic";
import EliminaPolitic from "./Modals/EliminaPolitic";
import EditaPolitic from "./Modals/EditaPolitic";
import { TabPoliticContext } from "../../context/ConfigPayrollContext/TabPoliticContext";
import CrearPoliticModal from "./Modals/CrearPoliticModal";
import { tabPoliticReducer } from "../../context/ConfigPayrollContext/TabPoliticReducer";
import PoliticContext from "../../context/ConfigPayrollContext/PoliticContext";

import { useQuery } from "@apollo/client";
import { GET_ALL_POLITIC } from "../../Querys/querys";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const PoliticTable = (props: TabPanelProps) => {
  const resultPolitic = useQuery(GET_ALL_POLITIC);
  const allPolitic = resultPolitic.data?.GET_ALL_POLITIC;

  const [PoliticState, PoliticDispatch] = useReducer(tabPoliticReducer, {
    loading: true,
    Politics: [],
    PoliticsFilter: [],
  });
  const [inactiveOpen, setInactiveOpen] = useToggle(false);
  const [addPoliticOpen, setAddPoliticOpen] = useToggle(false);

  useEffect(() => {
    obtenerDatos();
  }, []);

  useEffect(() => {
    console.log("all politics --------", allPolitic);
  }, [allPolitic]);

  const obtenerDatos = async () => {};

  return (
    <>
      <div className="contenedorPrincipal">
        <div className="contenedorHeader">
          <div>
            <span className="tituloHeader">Políticas</span>
          </div>
          <div>
            <TabPoliticContext.Provider
              value={{
                inactiveOpen,
                setInactiveOpen,
                addPoliticOpen,
                setAddPoliticOpen,
                PoliticState,
                PoliticDispatch,
              }}
            >
              <button onClick={setAddPoliticOpen} className="botonHeader">
                <div className="contenedorBotonHeader">
                  <div className="textoBotonHeader">
                    <span>+ Nueva Política</span>
                  </div>
                </div>
              </button>
              <CrearPoliticModal getDatos={obtenerDatos} />
            </TabPoliticContext.Provider>
          </div>
        </div>
        <div className="contenedorTabla">
          <div className="contenedorTituloTabla">
            <Grid container spacing={1}>
              <Grid item xs={4} className="tituloTabla">
                <span className="textotituloTabla">Nombre de la política</span>
              </Grid>
              <Grid item xs={2} className="tituloTabla">
                <span className="textotituloTabla">Grupo</span>
              </Grid>
              <Grid item xs={2} className="tituloTabla">
                <span className="textotituloTabla">Razón Social</span>
              </Grid>
              <Grid item xs={2} className="tituloTabla">
                <span className="textotituloTabla">Frecuencia</span>
              </Grid>
              <Grid item xs={2} className="tituloTabla">
                <span className="textotituloTabla">Más información</span>
              </Grid>
            </Grid>
          </div>
          <div>
            <ul>
              {allPolitic?.map((lis: any) => (
                <li className="listaTabla">
                  <Grid container spacing={1}>
                    <Grid item xs={4} className="tituloTabla">
                      <div className="tablaColumnaFlex">
                        <span className="textoTabla">{lis.policy_name}</span>
                      </div>
                    </Grid>
                    <Grid item xs={2} className="tituloTabla">
                      <div className="tablaColumnaFlex">
                        <span className="textoTabla">{lis.economic_days}</span>
                      </div>
                    </Grid>
                    <Grid item xs={2} className="tituloTabla">
                      <div className="tablaColumnaFlex">
                        <span className="textoTabla">
                          {lis.pantry_value_cap}
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={2} className="tituloTabla">
                      <div className="tablaColumnaFlex">
                        <span className="textoTabla">
                          {lis.saving_fund_cap}
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={2} className="tituloTabla">
                      <div className="tablaColumnaFlex">
                        <MenuListPolitic
                          {...{
                            _id: lis.id,
                            PolicyName: lis.policy_name,
                            EconomicDays: lis.economic_days,
                            AnniversaryVacationPremium:
                              lis.anniversary_vacation_premium,
                            PantryValueType: lis.pantry_value_type,
                            PantryValueCap: lis.pantry_value_cap,
                            PantryValue: lis.pantry_value,
                            SavingsFundType: lis.saving_fund_type,
                            SavingsFundCap: lis.saving_fund_cap,
                            SavingsFund: lis.saving_fund,
                            RestaurantValue: lis.restaurant_value,
                            RestaurantValueType: lis.restaurant_value_type,
                            RestaurantValueCap: lis.restaurant_value_cap,
                            AbsenceDiscount: lis.absence_discount,
                            DisabilityDiscount: lis.disability_discount,
                            VoucherCost: lis.voucher_cost,
                            DiscountDay: lis.discount_day,
                            SeniorityDate: lis.seniority_date,
                            ContractStartDate: lis.contract_start_date,
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <EditaPolitic getDatos={obtenerDatos} />
        <EliminaPolitic getDatos={obtenerDatos} />
      </div>
    </>
  );
};

export default PoliticTable;
