import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  Button
} from "@material-ui/core";
import { Form } from "semantic-ui-react";
import CollaboratorContext, { Types } from "../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../helpers/Collaborator/Collaborator";
import { getAllSedes } from "../../../services/sedeService";
import { ISede } from "../../../interfaces/Sede";
import { getAllClients } from "../../../services/clientService";
import { IClient } from "../../../interfaces/Client";
import { getProjectByClient } from "../../../services/projectService";
import { IProject } from "../../../interfaces/Project";
import { useFormik } from "formik";
import * as Yup from "yup";

import { GET_ALL_CLIENT, GET_ALL_SEDE, GET_ALL_PROJECT, UPDATE_USERS } from "../../../Querys/querys";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { SuccessfulAlert } from "../../../alerts/successAlerts";
import SaveIcon from "@material-ui/icons/Save";

var initState = {
  Sede: "",
  client: "",
  Proyecto: "",
  area: "",
};

const InputData = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const params = useParams<any>();
  const [sedes, setSedes] = useState<Array<ISede>>([]);
  const [clients, setClients] = useState<Array<IClient>>([]);
  const [projects, setProjects] = useState<Array<IProject>>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initState);
  const [updateColaboradores] = useMutation(UPDATE_USERS);


  const {data:resultClient} = useQuery(GET_ALL_CLIENT);
  const allClient = resultClient?.GET_ALL_CLIENT;

  const {data:resultSede} = useQuery(GET_ALL_SEDE);
  const allSede = resultSede?.GET_ALL_SEDE;

  const {data:resultProject} = useQuery(GET_ALL_PROJECT);
  const allProject = resultProject?.GET_ALL_PROJECT;

  useEffect(() => {
    if(resultSede)setSedes(allSede);
    if(resultClient)setClients(allClient);
    if(resultProject)setProjects(allProject);
    
    
    if (state.collaborator) {
      initState = {
        Sede: state.collaborator?.campus,
        client: state.collaborator?.client,
        Proyecto: state.collaborator?.proyect,
        area: state.collaborator?.area,
      };
      setValues(initState);
    }
  }, [resultSede, resultClient, resultProject]);

  const handleChange = async (e: any) => {
    await updateData(e, state, dispatch, 0);
  };

  const fetchProjects = async (e: ChangeEvent<{ value: any }>) => {
    setValues({
      ...initState,
      Proyecto: "",
    });
    // const response = await getProjectByClient(e.target.value);
    setProjects(allProject);
  };

  const initialValues = () => {
    return {
      dateOfAdmission: state.collaborator?.dateOfAdmission,
      client: state.collaborator?.client,
      area: state.collaborator?.area,
      Puesto: state.collaborator?.position,
    };
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      updateColaboradores({
        variables: {
          updateUsersId: state.collaborator?.id,
          input: formData
        }
      }).then(() => {
        SuccessfulAlert({ text: "Se actualizó correctamente" });
        // dispatch({
        //   type: Types.SET_COLLABORATOR,
        //   payload: {
        //     progress: [66.6, 0, 0, 0],
        //     sections: [100, 100, 0, 0],
        //   },
        // });
      })
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div
        className={
          state.sections[1] >= 100 ? `validate__border` : `novalidate__border`
        }
      >
        <Grid
          direction="row"
          container
          justify="flex-start"
          alignItems="center"
        >
          <Grid xs item>
            <span className="Fecha-de-nacimiento">Fecha de ingreso</span>
          </Grid>
          <Grid xs item container justify="flex-end" alignItems="center">
            <TextField
              type="date"
              defaultValue={state.collaborator?moment(state.collaborator.dateOfAdmission).format("YYYY-MM-DD"):""}
              autoFocus={true}
              name="dateOfAdmission"
              variant="outlined"
              size="small"
              onChange={formik.handleChange}
              error={Boolean(formik.errors.dateOfAdmission)}
              onBlur={(e) => handleChange(e)}
              InputProps={{
                readOnly: false,
              }}
              disabled={disabled}
            />
          </Grid>
        </Grid>

        <Box mb={2} mt={2}>
          <FormControl variant="outlined" fullWidth={true} size="small">
            <InputLabel htmlFor="outlined-age-native-simple">
              Seleccione un Cliente
            </InputLabel>
            <Select
              native
              onBlur={(e) => handleChange(e)}
              onChange={formik.handleChange}
              label={"Seleccione un Cliente"}
              name="client"
              defaultValue={state.collaborator?.client || ""}
              autoFocus={true}
              disabled={disabled}
              error={Boolean(formik.errors.client)}
            >
              <option value={state.collaborator?.client || ""} disabled={true}>
                {state.collaborator?.client || ""}
              </option>
              {clients.map(({ clientName }: IClient, index: number) => (
                <option key={index} value={clientName}>
                  {clientName}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid direction="row" container spacing={2}>
          <Grid xs item>
            <FormControl variant="outlined" fullWidth={true} size="small">
              <InputLabel htmlFor="outlined-age-native-simple">
                Selecciona área o proyecto
              </InputLabel>
              <Select
                native
                onBlur={(e) => handleChange(e)}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.area)}
                label={"Área"}
                name="area"
                defaultValue={state.collaborator.area || ""}
                autoFocus={true}
                disabled={disabled}
              >
                <option value={state.collaborator.area || ""} disabled={true}>
                  {state.collaborator.area || ""}
                </option>
                <option value="Staffing">Staffing</option>
                <option value="Customer Services">Customer Services</option>
                <option value="Service Management">Service Management</option>
                <option value="Administración y Finanzas">
                  Administración y Finanzas
                </option>
                <option value="Capital Humano">Capital Humano</option>
                <option value="IT">IT</option>
                <option value="Dirección">Dirección</option>
                <option value="Comercial">Comercial</option>
                <option value="Marketing">Marketing</option>
                <option value="Ops Atracción de Talento">
                  Ops Atracción de Talento
                </option>
                <option value="Ops Desarrollo">Ops Desarrollo</option>
                <option value="Ops Staffing">Ops Staffing</option>
                <option value="Ops Service Management">
                  Ops Service Management
                </option>
                <option value="PMO">PMO</option>
                <option value="CMO">CMO</option>
                <option value="Servicios Generales">Servicios Generales</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs item>
            <TextField
              name="Puesto"
              defaultValue={state.collaborator.Puesto}
              autoFocus={true}
              label="Puesto"
              variant="outlined"
              size="small"
              fullWidth={true}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.Puesto)}
              onBlur={(e) => handleChange(e)}
              InputProps={{
                readOnly: false,
              }}
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </div>
      <Grid direction="row" container justify="flex-end" alignItems="center" style={{"marginTop":"20px"}}>
        <Button type="submit" className="buttonSave">
          <SaveIcon />
          &nbsp; Guardar
        </Button>
      </Grid>
    </Form>
  );
};



const validationSchema = () => {
  return {
    dateOfAdmission: Yup.string().required("La fecha es un campo requerido"),
    client: Yup.string().required("La fecha es un campo requerido"),
    area: Yup.string().required("Seleccione un área de trabajo"),
    Puesto: Yup.string().required("Seleccione un puesto de trabajo"),
  };
};

export default InputData;
