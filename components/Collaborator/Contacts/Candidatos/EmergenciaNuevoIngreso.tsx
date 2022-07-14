import { useContext, useState } from "react";
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
} from "../../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";
import SaveIcon from "@material-ui/icons/Save";
import { useMutation } from "@apollo/client";
import { UPDATE_USERS } from "../../../../Querys/querys";
import InputMask from "react-input-mask";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "semantic-ui-react";

const EmergenciaNuevoIngreso = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const { adminState } = useContext(AdminContext);
  const [phoneCEMask, setphoneCEMask] = useState("");
  const [phoneMovilMask, setPhoneMovilMask] = useState("");

  const [updateColaboradores] = useMutation(UPDATE_USERS);

  const handleChange = async (e: any) => {
    await updateData(e, state, dispatch, 0);
  };

  const UpdateCandidate = async () => {
    // let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "sent" ? 'si' : 'no');
    updateColaboradores({
      variables: {
        updateUsersId: state.collaborator?.id,
        input: {
          emergencyContact: state.collaborator?.emergencyContact,
          ParentescoCE: state.collaborator?.ParentescoCE,
          phoneCE: state.collaborator?.phoneCE,
          cellphoneCE: state.collaborator?.cellphoneCE,
          suburbCE: state.collaborator?.suburbCE,
          addressCE: state.collaborator?.addressCE,
        },
      },
    });

    await SuccessfulAlert({ text: "Datos guardados correctamente." });

    // if (result === true) {
    //     await SuccessfulAlert({ text: "Datos guardados correctamente." });
    // }
  };

  const initialValues = () => {
    return {
      emergencyContact: state.collaborator?.emergencyContact ?? "",
      ParentescoCE: state.collaborator?.ParentescoCE ?? "",
      phoneCE: state.collaborator?.phoneCE ?? "",
      cellphoneCE: state.collaborator?.cellphoneCE ?? "",
      suburbCE: state.collaborator?.suburbCE ?? "",
      addressCE: state.collaborator?.addressCE ?? "",
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
        //     progress: [100, 100, 66.6, 0],
        //     sections: [100, 100, 100, 66.6],
        //   },
        // });
      });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="novalidate__border">
        <Box mt={2} mb={2}>
          {/* { (reCheck == "true" || reCheck == null) && */}
          <TextField
            name="emergencyContact"
            defaultValue={state.collaborator?.emergencyContact}
            autoFocus={true}
            label="Nombre del contacto de emergencia"
            variant="outlined"
            size="small"
            fullWidth={true}
            onBlur={(e) => handleChange(e)}
            InputProps={{
              readOnly: false,
            }}
            error={Boolean(formik.errors.emergencyContact)}
            helperText={!state.collaborator?.emergencyContact && "Obligatorio"}
            onChange={formik.handleChange}
          />
        </Box>

        <Box mt={2}>
          <Grid direction="row" container spacing={2}>
            <Grid xs item>
              {/* { (reCheck == "true" || reCheck == null) && */}
              <FormControl variant="outlined" fullWidth={true} size="small">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Parentesco
                </InputLabel>
                <Select
                  native
                  onBlur={(e) => handleChange(e)}
                  label={"Parentesco"}
                  name="ParentescoCE"
                  defaultValue={state.collaborator?.ParentescoCE || ""}
                  autoFocus={true}
                  error={Boolean(formik.errors.ParentescoCE)}
                  onChange={formik.handleChange}
                >
                  <option
                    value={state.collaborator?.ParentescoCE || ""}
                    disabled={true}
                  >
                    {state.collaborator?.ParentescoCE || ""}
                  </option>
                  <option value="Madre">Madre</option>
                  <option value="Padre">Padre</option>
                  <option value="Hijo(a)">Hijo(a)</option>
                  <option value="Esposo(a)">Esposo(a)</option>
                  <option value="Concubino(a)">Concubino(a)</option>
                  <option value="Hermano(a)">Hermano(a)</option>
                  <option value="Novio">Novio</option>
                  <option value="Novia">Novia</option>
                  <option value="Amigo(a)">Amigo(a)</option>
                  helperText=
                  {!state.collaborator?.ParentescoCE && "Obligatorio"}
                </Select>
                <FormHelperText>
                  {!state.collaborator?.ParentescoCE && "Obligatorio"}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid xs item>
              <InputMask
                mask="999 999 99 99"
                defaultValue={state.collaborator?.phoneCE || phoneCEMask}
                onChange={(e) => {
                  setphoneCEMask(e.target.value);
                  handleChange(e);
                }}
                disabled={false}
                onBlur={formik.handleChange}
                >
                {(inputProps: any) => (
                  <TextField
                  {...inputProps}
                  name="phoneCE"
                  autoFocus={true}
                  label="Teléfono fijo"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  error={Boolean(formik.errors.phoneCE)}
                  helperText={!state.collaborator?.phoneCE && "Obligatorio"}
                  />
                )}
              </InputMask>
            </Grid>
          </Grid>
        </Box>

        <Box mt={2}>
          <Grid direction="row" container spacing={2}>
            <Grid xs item>
              {/* { (reCheck == "true" || reCheck == null) && */}

              <InputMask
                mask="999 999 99 99"
                defaultValue={state.collaborator?.cellphoneCE || phoneMovilMask}
                onChange={(e) => {
                  setPhoneMovilMask(e.target.value);
                  handleChange(e);
                }}
                disabled={false}
                onBlur={formik.handleChange}
              >
                {(inputProps: any) => (
                  <TextField
                    name="cellphoneCE"
                    autoFocus={true}
                    label="Teléfono móvil"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    helperText={
                      !state.collaborator?.cellphoneCE && "Obligatorio"
                    }
                    error={Boolean(formik.errors.cellphoneCE)}
                  />
                )}
              </InputMask>
            </Grid>
            <Grid xs item>
              {/* { (reCheck == "true" || reCheck == null) && */}
              <TextField
                name="suburbCE"
                defaultValue={state.collaborator?.suburbCE}
                autoFocus={true}
                label="Colonia"
                variant="outlined"
                size="small"
                fullWidth={true}
                onBlur={(e) => handleChange(e)}
                InputProps={{
                  readOnly: false,
                }}
                helperText={!state.collaborator?.suburbCE && "Obligatorio"}
                error={Boolean(formik.errors.suburbCE)}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        <Box mt={2}>
          <Grid direction="row" container spacing={2}>
            <Grid xs item>
              {/* { (reCheck == "true" || reCheck == null) && */}
              <TextField
                name="addressCE"
                defaultValue={state.collaborator?.addressCE}
                autoFocus={true}
                label="Calle y número"
                variant="outlined"
                size="small"
                fullWidth={true}
                onBlur={(e) => handleChange(e)}
                InputProps={{
                  readOnly: false,
                }}
                helperText={!state.collaborator?.addressCE && "Obligatorio"}
                error={Boolean(formik.errors.addressCE)}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
        </Box>
        {/* {Math.round(state.sections[1]) < 100 && (<span className="spanRequerido">Todos los campos son requeridos</span>) } */}
      </div>
      <div>
        {/* <Grid direction="row" container justify="flex-end" alignItems="center">
          <Box mt={0} pt={1}>
            {adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso
              ?.Ver?.SaludEmergencias?.ContactoEmergencia.Editar === true ? (
              <Button
                type="submit"
                className="buttonSave"
                onClick={UpdateCandidate}
              >
                Guardar y Continuar&nbsp;
                <SaveIcon />
              </Button>
            ) : null}
          </Box>
        </Grid> */}
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
    emergencyContact: Yup.string().required("Nombre de contacto es requerido"),
    ParentescoCE: Yup.string().required("Parentesco es requerido"),
    phoneCE: Yup.string().required("Teléfono fijo es requerido"),
    cellphoneCE: Yup.string().required("Teléfono móvil es requerido"),
    suburbCE: Yup.string().required("Colonia es requerido"),
    addressCE: Yup.string().required("Calle y número es requerido"),
  };
};

export default EmergenciaNuevoIngreso;
