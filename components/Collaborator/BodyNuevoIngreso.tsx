import { useEffect, useState, ChangeEvent, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grow, Paper, Tab, Tabs } from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import Contacts from "./Contacts/Contacts";
import Expedient from "./Expedient/Expedient";
import Information from "./Information/Information";
import PayData from "./PayData/PayData";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CollaboratorContext, {
  Types,
} from "../../context/CollaboratorContext/CollaboratorContext";
import {
  updateCollaborator,
  fetchingAllData,
} from "../../helpers/Collaborator/Collaborator";
import PersonalData from "./PersonalData/PersonalData";
import { AdminContext } from "../../context/AdminContext/AdminContext";
import { GET_USERS_BY_ID } from "../../Querys/querys";
import { useQuery } from "@apollo/client";

const Body = () => {
  const [value, setValue] = useState<string>("1");
  const params = useParams<any>();
  const history = useHistory();
  const { state, dispatch } = useContext(CollaboratorContext);
  const { adminState } = useContext(AdminContext);

  const handleChange = (event: ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    history.push(`${newValue}`);
  };

  const {data:resultCollaborator} = useQuery(GET_USERS_BY_ID, {
    variables: { getUsersId: params.id },
  });

  useEffect(() => {
    async function fetchData() {
      let result: any;
      if (
        params.id !== "id" &&
        params.id !== "new" &&
        !("register" in params) 
      ) {
        //console.log(typeof resultCollaborator.data?.GET_USERS[0]);
        if(typeof resultCollaborator?.GET_USERS[0] == 'undefined'){
          console.log("error");
        }else{
          result = JSON.parse(JSON.stringify(resultCollaborator?.GET_USERS[0]));
          result.new = true;
        }
        
      }
      if ("register" in params) {
        result = resultCollaborator?.GET_USERS; //await getCandidate(params.id, false, params.token); // From Candidate
        if (result === null) {
          return history.push("/Bienvenido"); // validate if the user completed the register
        }
      }
      
      await updateCollaborator(result, dispatch); //Update collaborator state
      await fetchingAllData(
        resultCollaborator?.GET_USERS,
        dispatch,
        params.tab
      );
    }
    if(resultCollaborator) {
    setValue(params.tab);

    if ("register" in params) {
      dispatch({ type: Types.UPDATE_BAND });
      document.documentElement.style.setProperty("--background", "#093c5d");
    }

    
    fetchData();
    }
  
  }, [dispatch, params, history,resultCollaborator]);

  return (
    <TabContext value={value}>
      <Tabs
        value={value}
        onChange={handleChange}
        className={
          Math.round(state.progress[Number(value) - 1]) >= 100
            ? `collaborator filledAll`
            : `collaborator`
        }
        scrollButtons="auto"
        variant="fullWidth"
      >
        <Tab
          icon={Math.round(state.progress[0]) >= 100 ? <CheckCircleIcon /> : ""}
          label={"Informaci??n de alta"}
          value="1"
          className={
            value === "1"
              ? "Tab__SelectedFirst Tab__Selected"
              : Math.round(state.progress[0]) >= 100
              ? "Tab__SelectedFirst Tab__Selected Tab__background filledAll"
              : "Tab__NoSelected Tab__NoSelectedFirst"
          }
        />
        <Tab
          icon={state.progress[1] >= 100 ? <CheckCircleIcon /> : ""}
          label="Datos Personales"
          value="2"
          className={
            value === "2"
              ? "Tab__Selected"
              : Math.round(state.progress[1]) >= 100
              ? "Tab__Selected Tab__background filledAll"
              : "Tab__NoSelected"
          }
          disabled={
            params.id !== "id" && params.id !== "new"
              ? state.band && state.collaborator?.status === "sent"
                ? true
                : state.collaborator?.status === "sent"
                ? true
                : false
              : true
          }
        />
        <Tab
          icon={state.progress[2] >= 100 ? <CheckCircleIcon /> : ""}
          label="Salud y Emergencias"
          value="3"
          className={
            value === "3"
              ? "Tab__Selected"
              : Math.round(state.progress[2]) >= 100
              ? "Tab__Selected Tab__background filledAll"
              : "Tab__NoSelected"
          }
          disabled={
            params.id !== "id" && params.id !== "new"
              ? state.band && state.collaborator?.status === "sent"
                ? true
                : state.collaborator?.status === "sent"
                ? true
                : false
              : true
          }
        />
        <Tab
          icon={state.progress[3] >= 100 ? <CheckCircleIcon /> : ""}
          label="Datos para el pago"
          value="4"
          className={
            value === "4"
              ? "Tab__Selected"
              : Math.round(state.progress[3]) >= 100
              ? "Tab__Selected Tab__background filledAll"
              : "Tab__NoSelected"
          }
          disabled={
            params.id !== "id" && params.id !== "new"
              ? state.band && state.collaborator?.status === "sent"
                ? true
                : state.collaborator?.status === "sent"
                ? true
                : false
              : true
          }
        />
        <Tab
          icon={state.progress[4] >= 100 ? <CheckCircleIcon /> : ""}
          label="Expediente"
          value="5"
          className={
            value === "5"
              ? "Tab__Selected Tab__Selectedlast"
              : Math.round(state.progress[4]) >= 100
              ? "Tab__Selected Tab__background filledAll Tab__NoSelectedLast"
              : "Tab__NoSelected Tab__NoSelectedLast"
          }
          disabled={
            params.id !== "id" && params.id !== "new"
              ? state.band && state.collaborator?.status === "sent"
                ? true
                : state.collaborator?.status === "sent"
                ? true
                : false
              : true
          }
        />
      </Tabs>
      <div className="collaborator__candidate__container">
        <Grow in={true}>
          <Paper>
            {adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso
              ?.Ver?.InformacionAlta?.Acceso === true ? (
              <TabPanel value="1">{value === "1" && <Information />}</TabPanel>
            ) : null}
            {adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso
              ?.Ver?.DatosPersonales?.Acceso === true ? (
              <TabPanel value="2">{value === "2" && <PersonalData />}</TabPanel>
            ) : null}
            {adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso
              ?.Ver?.SaludEmergencias?.Acceso === true ? (
              <TabPanel value="3">{value === "3" && <Contacts />}</TabPanel>
            ) : null}
            {adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso
              ?.Ver?.DatosParaPago?.Acceso === true ? (
              <TabPanel value="4">{value === "4" && <PayData />}</TabPanel>
            ) : null}
            {adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso
              ?.Ver?.Expediente?.Acceso === true ? (
              <TabPanel value="5">{value === "5" && <Expedient />}</TabPanel>
            ) : null}
          </Paper>
        </Grow>
      </div>
    </TabContext>
  );
};

export default Body;
