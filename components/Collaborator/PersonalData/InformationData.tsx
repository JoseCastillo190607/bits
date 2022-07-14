import { ChangeEvent, useContext } from "react";
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
import CollaboratorContext, {
  Types,
} from "../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../helpers/Collaborator/Collaborator";
import { paisesEstados } from "../../../helpers/Json/paises-estados";
import moment from "moment";
import { WarningAlert } from "../../../alerts/WarningAlert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { Form } from "semantic-ui-react";
import { UPDATE_USERS } from "../../../Querys/querys";
import { SuccessfulAlert } from "../../../alerts/successAlerts";
import SaveIcon from "@material-ui/icons/Save";

const InformationData = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const [updateColaboradores] = useMutation(UPDATE_USERS);

  const validYears = 18;

  const isAdult = (date: any) => {
    debugger;
    if (date.length > 0) {
      let birthday = moment(date);
      let today = moment();
      let years = today.diff(birthday, "years");
      if (years >= validYears) {
        return true;
      }
      return false;
    } else {
      return "empty";
    }
  };

  const reCheck = localStorage.getItem("reCheck");

  const handleChange = async (
    e: ChangeEvent<{ name: string; value: unknown }>
  ) => {
    await updateData(e, state, dispatch, 1);
  };

  const handleChangeDate = async (
    e: ChangeEvent<{ name: string; value: string }>
  ) => {
    if (isAdult(e.target.value) === "empty") return true;

    if (!isAdult(e.target.value)) {
      return WarningAlert({
        title: "¡Error!",
        text: `¡El colaborador debe ser mayor a ${validYears} años!`,
      }).then(() => false);
    } else {
      await updateData(e, state, dispatch, 1);
    }
  };

  const initialValues = () => {
    return {
      educationalLevel: state.collaborator?.educationalLevel ?? "",
      dateOfBirth: state.collaborator?.dateOfBirth ?? "",
      placeOfBirth: state.collaborator?.placeOfBirth ?? "",
      gender: state.collaborator?.gender ?? "",
      civilStatus: state.collaborator?.civilStatus ?? "",
    };
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),

    onSubmit: async (formData) => {
      updateColaboradores({
        variables: {
          updateUsersId: state.collaborator?.id,
          input: formData,
        },
      }).then((res) => {
        SuccessfulAlert({ text: "Se actualizó correctamente" });
        // dispatch({
        //   type: Types.SET_COLLABORATOR,
        //   payload: {
        //     progress: [100, 33.3, 0, 0],
        //     sections: [100, 100, 0, 0],
        //   },
        // });
      });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="novalidate__border">
        <Box mb={2}>
          <FormControl variant="outlined" fullWidth={true} size="small">
            <InputLabel htmlFor="outlined-age-native-simple">
              Nivel de estudios
            </InputLabel>
            <Select
              native
              onBlur={(e) => handleChange(e)}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.educationalLevel)}
              label={"NivelEstudios"}
              name="educationalLevel"
              defaultValue={state.collaborator?.educationalLevel || ""}
              autoFocus={true}
            >
              <option
                value={state.collaborator?.educationalLevel || ""}
                disabled={true}
              >
                {state.collaborator?.educationalLevel || ""}
              </option>
              <option value={"SECUNDARIA"}>SECUNDARIA</option>
              <option value={"PREPARATORIA"}>PREPARATORIA</option>
              <option value={"LICENCIATURA"}>LICENCIATURA</option>
              <option value={"POSGRADO"}>POSGRADO</option>
            </Select>
            <FormHelperText>
              {!state.collaborator?.educationalLevel && "Obligatorio"}
            </FormHelperText>
          </FormControl>
        </Box>
        <Grid direction="row" container spacing={2}>
          <Grid xs item container justify="flex-start" alignItems="center">
            <span className="Fecha-de-nacimiento">Fecha de nacimiento</span>
          </Grid>
          <Grid
            xs
            item
            direction="row"
            container
            justify="flex-end"
            alignItems="center"
          >
            <TextField
              type="date"
              name="dateOfBirth"
              defaultValue={
                moment(state.collaborator?.dateOfBirth).format("YYYY-MM-DD") ??
                ""
              }
              onChange={formik.handleChange}
              error={Boolean(formik.errors.dateOfBirth)}
              variant="outlined"
              size="small"
              onBlur={(e) => handleChangeDate(e)}
              helperText={!state.collaborator?.dateOfBirth && "Obligatorio"}
              //onChange={(e) => validDate(e)}
              InputProps={{
                readOnly: false,
                inputProps: {
                  max: moment().format("YYYY-MM-DD"),
                },
              }}
              autoFocus={true}
            />
          </Grid>
        </Grid>

        <Box mt={2} mb={2}>
          <FormControl variant="outlined" fullWidth={true} size="small">
            <InputLabel htmlFor="outlined-age-native-simple">
              Lugar de nacimiento
            </InputLabel>
            <Select
              native
              onBlur={(e) => handleChange(e)}
              label={"LugarNacimiento"}
              name="placeOfBirth"
              defaultValue={state.collaborator?.placeOfBirth || ""}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.placeOfBirth)}
            >
              <option
                value={state.collaborator?.placeOfBirth || ""}
                disabled={true}
              >
                {state.collaborator?.placeOfBirth || ""}
              </option>
              {paisesEstados.map((country: any, index: number) => (
                <option key={index} value={country.country}>
                  {country.country}
                </option>
              ))}
            </Select>
            <FormHelperText>
              {!state.collaborator?.placeOfBirth && "Obligatorio"}
            </FormHelperText>
          </FormControl>
        </Box>

        <Grid direction="row" container spacing={2}>
          <Grid xs item>
            <FormControl variant="outlined" fullWidth={true} size="small">
              <InputLabel htmlFor="outlined-age-native-simple">
                Género
              </InputLabel>
              <Select
                native
                onBlur={(e) => handleChange(e)}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.gender)}
                label={"Género"}
                name="gender"
                defaultValue={state.collaborator?.gender || ""}
                autoFocus={true}
              >
                <option
                  value={state.collaborator?.gender || ""}
                  disabled={true}
                >
                  {state.collaborator?.gender || ""}
                </option>
                <option value={"Masculino"}>Masculino</option>
                <option value={"Femenino"}>Femenino</option>
              </Select>
              <FormHelperText>
                {!state.collaborator?.gender && "Obligatorio"}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs item>
            <FormControl variant="outlined" fullWidth={true} size="small">
              <InputLabel htmlFor="outlined-age-native-simple">
                Estado civil
              </InputLabel>
              <Select
                native
                onBlur={(e) => handleChange(e)}
                label={"EstadoCivil"}
                name="civilStatus"
                defaultValue={state.collaborator?.civilStatus || ""}
                autoFocus={true}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.civilStatus)}
              >
                <option
                  value={state.collaborator?.civilStatus || ""}
                  disabled={true}
                >
                  {state.collaborator?.civilStatus || ""}
                </option>
                <option value={"Soltero(a)"}>Soltero(a)</option>
                <option value={"Casado(a)"}>Casado(a)</option>
                <option value={"Unión Libre"}>Unión Libre</option>
              </Select>
              <FormHelperText>
                {!state.collaborator?.civilStatus && "Obligatorio"}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs item>
            <FormControl variant="outlined" fullWidth={true} size="small">
              <TextField
                type="number"
                name="children"
                defaultValue={
                  state.collaborator?.children
                    ? state.collaborator?.children
                    : 0
                }
                autoFocus={true}
                label="Hijos"
                variant="outlined"
                size="small"
                fullWidth={true}
                onBlur={(e) => handleChange(e)}
                InputProps={{
                  readOnly: false,
                }}
              />
            </FormControl>
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
    educationalLevel: Yup.string().required(
      "El nivel de estudios es requerido"
    ),
    dateOfBirth: Yup.string().required("La fecha de nacimiento es requerida"),
    placeOfBirth: Yup.string().required("El lugar de nacimiento es requerido"),
    gender: Yup.string().required("El genero es requerido"),
    civilStatus: Yup.string().required("El estado civil es requerido"),
  };
};

export default InformationData;
