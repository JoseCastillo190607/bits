import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";
import { getAllSedes } from "../../../../services/sedeService";
import { ISede } from "../../../../interfaces/Sede";
import { getAllClients } from "../../../../services/clientService";
import { IClient } from "../../../../interfaces/Client";
import { getProjectByClient } from "../../../../services/projectService";
import { IProject } from "../../../../interfaces/Project";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";
import SaveIcon from "@material-ui/icons/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "semantic-ui-react";

import { GET_ALL_CLIENT, GET_ALL_SEDE, GET_ALL_PROJECT } from "../../../../Querys/querys";
import { useQuery } from "@apollo/client";


var initState = {
  Sede: "",
  Cliente: "",
  Proyecto: "",
  Area: "",
};

const InputDataNuevoIngreso = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const params = useParams<any>();


  const [sedes, setSedes] = useState<Array<ISede>>([]);
  const [clients, setClients] = useState<Array<IClient>>([]);
  const [projects, setProjects] = useState<Array<IProject>>([]);


  const [disabled, setDisabled] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initState);
  const { adminState } = useContext(AdminContext);


  const resultClient = useQuery(GET_ALL_CLIENT);
  const allClient = resultClient.data?.GET_ALL_CLIENT;

  const resultSede = useQuery(GET_ALL_SEDE);
  const allSede = resultSede.data?.GET_ALL_SEDE;

  const resultProject = useQuery(GET_ALL_PROJECT);
  const allProject = resultProject.data?.GET_ALL_PROJECT;


  useEffect(() => {
    if ("register" in params) setDisabled(true);
    async function fetchData() {
      if (!("register" in params)) {
        // const response = await getAllSedes();
        // const responseClients = await getAllClients();
        setSedes(allSede);
        setClients(allClient);
      }
    }
    fetchData();

    if (state.collaborator) {
      initState = {
        Sede: state.collaborator?.campus,
        Cliente: state.collaborator?.client,
        Proyecto: state.collaborator?.proyect,
        Area: state.collaborator?.area,
      };
      setValues(initState);
    }

    return () => {
      fetchData();
      setSedes([]);
      setClients([]);
    };
  }, [params]);

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

  const UpdateCandidate = async (formData: {}) => {
    let result = await putCandidate(
      state.collaborator,
      state.collaborator.status === "sent" ? "si" : "no"
    );
    if (result === true) {
      await SuccessfulAlert({ text: "Datos guardados correctamente." });
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      console.log(formData);
      UpdateCandidate(formData);
    },
  });

  return (
    <>
      <Form handleSubmit={formik.handleSubmit}>
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
                defaultValue={state.collaborator.dateOfAdmission}
                autoFocus={true}
                name="dateOfAdmission"
                variant="outlined"
                size="small"
                // onBlur={(e) => handleChange(e)}
                onChange={formik.handleChange}
                error={formik.touched.dateOfAdmission && Boolean(formik.errors.dateOfAdmission)}
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
                Seleccione una sede
              </InputLabel>
              <Select
                native
                // onBlur={(e) => handleChange(e)}
                onChange={formik.handleChange}
                error={formik.touched.Sede && Boolean(formik.errors.Sede)}
                label={"Seleccione una sede"}
                name="Sede"
                defaultValue={state.collaborator.Sede || ""}
                autoFocus={true}
                disabled={disabled}
              >
                <option value={state.collaborator.Sede || ""} disabled={true}>
                  {state.collaborator.Sede || ""}
                </option>
                {sedes?.map(({ sedeName }: ISede, index: number) => (
                  <option key={index} value={sedeName}>
                    {sedeName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl variant="outlined" fullWidth={true} size="small">
              <InputLabel htmlFor="outlined-age-native-simple">
                Seleccione una Empresa
              </InputLabel>
              <Select
                native
                // onBlur={(e) => handleChange(e)}
                onBlur={(e) => fetchProjects(e)}
                onChange={formik.handleChange}
                error={formik.touched.client && Boolean(formik.errors.client)}
                label={"Seleccione un cliente"}
                name="client"
                defaultValue={state.collaborator.client || ""}
                autoFocus={true}
                disabled={disabled}
              >
                <option
                  value={state.collaborator.client || ""}
                  disabled={true}
                >
                  {state.collaborator.client || ""}
                </option>
                {clients?.map(({ clientName }: IClient, index: number) => (
                  <option key={index} value={clientName}>
                    {clientName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl variant="outlined" fullWidth={true} size="small">
              <InputLabel htmlFor="outlined-age-native-simple">
                Seleccione un proyecto
              </InputLabel>
              <Select
                native
                // onBlur={(e) => handleChange(e)}
                onChange={formik.handleChange}
                error={
                  formik.touched.project && Boolean(formik.errors.project)
                }
                label={"Seleccione un proyecto"}
                name="project"
                defaultValue={state.collaborator.project || ""}
                autoFocus={true}
                disabled={disabled}
              >
                <option
                  value={state.collaborator.project || ""}
                  disabled={true}
                >
                  {state.collaborator.project || ""}
                </option>
                {projects?.map(({ proyectName }: IProject, index: number) => (
                  <option key={index} value={proyectName}>
                    {proyectName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Grid direction="row" container spacing={2}>
            <Grid xs item>
              <FormControl variant="outlined" fullWidth={true} size="small">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Departemento/Area
                </InputLabel>
                <Select
                  native
                  //   onBlur={(e) => handleChange(e)}
                  onChange={formik.handleChange}
                  error={formik.touched.area && Boolean(formik.errors.area)}
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
                  <option value="Servicios Generales">
                    Servicios Generales
                  </option>
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
                // onBlur={(e) => handleChange(e)}
                onChange={formik.handleChange}
                error={formik.touched.Puesto && Boolean(formik.errors.Puesto)}
                InputProps={{
                  readOnly: false,
                }}
                disabled={disabled}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <TextField
              name="officePlace"
              defaultValue={state.collaborator.officePlace}
              autoFocus={true}
              label="Dirección de trabajo"
              variant="outlined"
              size="small"
              fullWidth={true}
              //   onBlur={(e) => handleChange(e)}
              onChange={formik.handleChange}
              error={
                formik.touched.officePlace &&
                Boolean(formik.errors.officePlace)
              }
              InputProps={{
                readOnly: false,
              }}
              disabled={disabled}
            />
          </Box>
          {Math.round(state.sections[1]) < 100 && (
            <span className="spanRequerido">
              Todos los campos son obligatorios
            </span>
          )}
        </div>
        <div>
          <Grid
            direction="row"
            container
            justify="flex-end"
            alignItems="center"
          >
            <Box mt={0} pt={1}>
              {adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso
                ?.Ver?.InformacionAlta?.DatosIngreso.Editar === true ? (
                <Button
                  //   type="submit"
                  className="buttonSave"
                  // onClick={UpdateCandidate}
                >
                  Guardar y Continuar&nbsp;
                  <SaveIcon />
                </Button>
              ) : null}
            </Box>
          </Grid>
        </div>
      </Form>
    </>
  );
};

const initialValues = () => {
  return {
    dateOfAdmission: "",
    Sede: "",
    client: "",
    project: "",
    area: "",
    Puesto: "",
    officePlace: "",
  };
};

const validationSchema = () => {
  return {
    date: Yup.date().required("Selecciona una fecha valida"),
    Sede: Yup.string().required("Selecciona una Sede"),
    Cliente: Yup.string().required("Selecciona una Cliente"),
    Proyecto: Yup.string().required("Selecciona una Proyecto"),
    Area: Yup.string().required("Selecciona una Area"),
    Puesto: Yup.string().required("selecciona un puesto"),
    LugarOficina: Yup.string().required("Este campo es obligatorio"),
  };
};

export default InputDataNuevoIngreso;
