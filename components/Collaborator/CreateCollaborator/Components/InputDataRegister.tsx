import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  TextField,
  Button
} from "@material-ui/core";
import { Form } from "semantic-ui-react";
import CollaboratorContext, {
  Types,
} from "../../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";
import { ISede } from "../../../../interfaces/Sede";
import { IClient } from "../../../../interfaces/Client";
import { IProject } from "../../../../interfaces/Project";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  GET_ALL_CLIENT,
  GET_ALL_SEDE,
  GET_ALL_PROJECT,
} from "../../../../Querys/querys";
import { useQuery } from "@apollo/client";
import moment from "moment";
import SaveIcon from "@material-ui/icons/Save";

var initState = {
  Sede: "",
  client: "",
  Proyecto: "",
  area: "",
};

const InputDataRegister = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const params = useParams<any>();
  const [sedes, setSedes] = useState<Array<ISede>>([]);
  const [clients, setClients] = useState<Array<IClient>>([]);
  const [projects, setProjects] = useState<Array<IProject>>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initState);
  const maxDate = moment().format("YYYY-MM-DD");

  const { data: resultClient } = useQuery(GET_ALL_CLIENT);
  const allClient = resultClient?.GET_ALL_CLIENT;

  const { data: resultSede } = useQuery(GET_ALL_SEDE);
  const allSede = resultSede?.GET_ALL_SEDE;

  const { data: resultProject } = useQuery(GET_ALL_PROJECT);
  const allProject = resultProject?.GET_ALL_PROJECT;

  useEffect(() => {
    if (allClient) {
      setClients(allClient);
    }
    if (allSede) {
      setSedes(allSede);
    }
    if (allProject) {
      setProjects(allProject);
    }
  }, [allClient, allSede, allProject]);

  const handleChange = async (e: any) => {
    await updateData(e, state, dispatch, 0);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      // dispatch({
      //   type: Types.SET_COLLABORATOR,
      //   payload: {
      //     progress: [66.6, 0, 0, 0],
      //     sections: [100, 100, 0, 0],
      //   },
      // });
    },
  });

  // const fetchProjects = async (e: ChangeEvent<{ value: any }>) => {
  //   setValues({
  //     ...initState,
  //     Proyecto: "",
  //   });
  //   // const response = await getProjectByClient(e.target.value);
  //   setProjects(allProject);

  // };

  useEffect(() => {
    //length of formik.errors
    if (Object.keys(formik.errors).length > 0) {
      console.log("errosssssssssssr", formik.errors);

      // dispatch({
      //   type: Types.SET_COLLABORATOR,
      //   payload: {
      //     progress: [33.3, 0, 0, 0],
      //     sections: [100, 0, 0, 0],
      //   },
      // });
    }
  }, [formik.errors]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="novalidate__border">
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
              autoFocus={true}
              name="dateOfAdmission"
              variant="outlined"
              size="small"
              onChange={formik.handleChange}
              error={Boolean(formik.errors.dateOfAdmission)}
              helperText={!state.collaborator?.dateOfAdmission && "Obligatorio"}
              onBlur={(e) => handleChange(e)}
              InputProps={{
                readOnly: false,
                inputProps: {
                  max: { maxDate },
                },
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
              error={Boolean(formik.errors.client)}
              label={"Seleccione un Cliente"}
              name="client"
              defaultValue={""}
              autoFocus={true}
              disabled={disabled}
            >
              <option value={""} disabled={true}>
                {""}
              </option>
              {clients.map(({ clientName }: IClient, index: number) => (
                <option key={index} value={clientName}>
                  {clientName}
                </option>
              ))}
            </Select>
            <FormHelperText error={Boolean(formik.errors.client)}>
              {!state.collaborator?.client && "Obligatorio"}
            </FormHelperText>
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
                defaultValue={""}
                autoFocus={true}
                disabled={disabled}
              >
                <option value={""} disabled={true}>
                  {""}
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
              <FormHelperText error={Boolean(formik.errors.area)}>
                {!state.collaborator?.area && "Obligatorio"}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs item>
            <TextField
              name="Puesto"
              autoFocus={true}
              label="Puesto"
              variant="outlined"
              size="small"
              fullWidth={true}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.Puesto)}
              helperText={!state.collaborator?.Puesto && "Obligatorio"}
              onBlur={(e) => handleChange(e)}
              InputProps={{
                readOnly: false,
              }}
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </div>
      {/* <Grid
        direction="row"
        container
        justify="flex-end"
        alignItems="center"
        style={{ marginTop: "20px" }}
      >
        <Button type="submit" className="buttonSave">
          <SaveIcon />
          &nbsp; Guardar
        </Button>
      </Grid> */}
    </Form>
  );
};

const initialValues = () => {
  return {
    dateOfAdmission: "",
    client: "",
    area: "",
    Puesto: "",
  };
};

const validationSchema = () => {
  return {
    dateOfAdmission: Yup.string().required("La fecha es un campo requerido"),
    client: Yup.string().required("La fecha es un campo requerido"),
    area: Yup.string().required("Seleccione un área de trabajo"),
    Puesto: Yup.string().required("Seleccione un puesto de trabajo"),
  };
};

export default InputDataRegister;
