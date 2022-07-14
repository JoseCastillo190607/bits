import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Box, Grid, TextField } from "@material-ui/core";
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";
import { useParams } from "react-router-dom";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import SaveIcon from "@material-ui/icons/Save";
import { Card, Step, StepLabel, Stepper } from "@material-ui/core";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "semantic-ui-react";

const PersonalDataNuevoIngreso = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const { adminState } = useContext(AdminContext);

  const [disabled, setDisabled] = useState<boolean>(false);
  const params = useParams();

  useEffect(() => {
    if ("register" in params) setDisabled(true);
  }, [params]);

  const handleChange = async (
    e: ChangeEvent<{ name: string; value: unknown }>
  ) => {
    await updateData(e, state, dispatch, 0);
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
            Math.round(state.sections[0]) >= 100
              ? `validate__border`
              : `novalidate__border`
          }
        >
          <Box mb={2}>
            <TextField
              type="text"
              name="name"
              defaultValue={state.collaborator.name}
              label="Nombre(s)"
              variant="outlined"
              size="small"
              fullWidth={true}
              onChange={formik.handleChange}
              //   onBlur={(e) => handleChange(e)}
              InputProps={{
                readOnly: false,
              }}
              disabled={disabled}
              helperText={!state.collaborator?.name && "Obligatorio"}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
          </Box>
          <Grid direction="row" container spacing={2}>
            <Grid xs item>
              <TextField
                name="firstName"
                defaultValue={state.collaborator?.firstName || ""}
                label="Primer apellido"
                variant="outlined"
                size="small"
                fullWidth={true}
                onChange={formik.handleChange}
                // onBlur={(e) => handleChange(e)}
                InputProps={{
                  readOnly: false,
                }}
                disabled={disabled}
                helperText={
                  !state.collaborator?.firstName && "Obligatorio"
                }
                error={
                  formik.touched.firstName &&
                  Boolean(formik.errors.firstName)
                }
              />
            </Grid>
            <Grid xs item>
              <TextField
                name="lastName"
                defaultValue={state.collaborator?.lastName || ""}
                label="Segundo apellido"
                variant="outlined"
                size="small"
                fullWidth={true}
                onChange={formik.handleChange}
                // onBlur={(e) => handleChange(e)}
                InputProps={{
                  readOnly: false,
                }}
                disabled={disabled}
                // error={formik.touched.ApellidoMaterno && Boolean(formik.errors.ApellidoMaterno)}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <TextField
              type="email"
              name="email"
              defaultValue={state.collaborator?.email || ""}
              label="Email"
              variant="outlined"
              size="small"
              fullWidth={true}
              onChange={formik.handleChange}
              //   onBlur={(e) => handleChange(e)}
              InputProps={{
                readOnly: false,
              }}
              disabled={disabled}
              helperText={!state.collaborator?.email && "Obligatorio"}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
          </Box>
          <Box mt={2}>
            <TextField
              type="number"
              name="cellphone"
              defaultValue={state.collaborator?.cellphone || ""}
              label="Teléfono celular profesional"
              variant="outlined"
              size="small"
              fullWidth={true}
              onChange={formik.handleChange}
              //   onBlur={(e) => handleChange(e)}
              InputProps={{
                readOnly: false,
              }}
              disabled={disabled}
              helperText={!state.collaborator?.cellphone && "Obligatorio"}
              error={formik.touched.cellphone && Boolean(formik.errors.cellphone)}
            />
          </Box>
          {/* {Math.round(state.sections[0]) < 100 && (<span className="spanRequerido">Todos los campos son requeridos</span>) } */}
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
                ?.Ver?.InformacionAlta?.InformacionPersonal.Editar === true ? (
                <Button
                  //   type="submit"
                  className="buttonSave"
                  //   onClick={UpdateCandidate}
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
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    cellphone: "",
  };
};

const validationSchema = () => {
  return {
    name: Yup.string().required("El campo de Nombre es requerido"),
    firstName: Yup.string().required(
      "El campo de Apellido Paterno es requerido"
    ),
    // ApellidoMaterno: Yup.string().required(
    //   "El campo de Apellido Materno es requerido"
    // ),
    email: Yup.string().required("El campo de Usuario es requerido"),
    cellphone: Yup.number().min(10).required("El campo de Celular es requerido"),
  };
};

export default PersonalDataNuevoIngreso;
