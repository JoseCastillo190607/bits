import { useContext, Fragment } from "react";
import { Box, TextField, Tooltip, Grid, Button } from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles";
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

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    maxWidth: 1000,
  },
}))(Tooltip);

const EnfermedadNuevoIngreso = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const { adminState } = useContext(AdminContext);

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
          Alergias: state.collaborator?.Alergias,
          PadEnfer: state.collaborator?.PadEnfer,
          Cirugias: state.collaborator?.Cirugias,
          TraMeRe: state.collaborator?.TraMeRe,
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
      Alergias: state.collaborator?.Alergias ?? "",
      PadEnfer: state.collaborator?.PadEnfer ?? "",
      Cirugias: state.collaborator?.Cirugias ?? "",
      TraMeRe: state.collaborator?.TraMeRe ?? "",
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
        <h6 id="form-dialog-title" className="form-dialog-title-class">
          Declaro a continuación mi estado de salud actual…
          <HtmlTooltip
            title={
              <Fragment>En caso de no contar alguno escribe 'Ninguno'</Fragment>
            }
          >
            <img
              src="/assets/icons/PreguntaAzul.png"
              alt="Question"
              height="15"
            />
          </HtmlTooltip>
        </h6>
        <Box mt={2} mb={2}>
          <TextField
            name="Alergias"
            defaultValue={state.collaborator?.Alergias}
            autoFocus={true}
            label="Alergías"
            variant="outlined"
            size="small"
            fullWidth={true}
            onBlur={(e) => handleChange(e)}
            InputProps={{
              readOnly: false,
            }}
            helperText={!state.collaborator?.Alergias && "Obligatorio"}
            error={Boolean(formik.errors.Alergias)}
            onChange={formik.handleChange}
          />
        </Box>

        <Box mt={2} mb={2}>
          <TextField
            name="PadEnfer"
            defaultValue={state.collaborator?.PadEnfer}
            autoFocus={true}
            label="Padecimientos / Enfermedades físicos y mentales"
            variant="outlined"
            size="small"
            fullWidth={true}
            onBlur={(e) => handleChange(e)}
            InputProps={{
              readOnly: false,
            }}
            helperText={!state.collaborator?.PadEnfer && "Obligatorio"}
            error={Boolean(formik.errors.PadEnfer)}
            onChange={formik.handleChange}
          />
        </Box>

        <Box mt={2} mb={2}>
          <TextField
            name="Cirugias"
            defaultValue={state.collaborator?.Cirugias}
            autoFocus={true}
            label="Cirugías"
            variant="outlined"
            size="small"
            fullWidth={true}
            onBlur={(e) => handleChange(e)}
            InputProps={{
              readOnly: false,
            }}
            helperText={!state.collaborator?.Cirugias && "Obligatorio"}
            error={Boolean(formik.errors.Cirugias)}
            onChange={formik.handleChange}
          />
        </Box>

        <Box mt={2} mb={2}>
          <TextField
            name="TraMeRe"
            defaultValue={state.collaborator?.TraMeRe}
            autoFocus={true}
            label="Tratamientos médicos o rehabilitaciones"
            variant="outlined"
            size="small"
            fullWidth={true}
            onBlur={(e) => handleChange(e)}
            InputProps={{
              readOnly: false,
            }}
            helperText={!state.collaborator?.TraMeRe && "Obligatorio"}
            error={Boolean(formik.errors.TraMeRe)}
            onChange={formik.handleChange}
          />
        </Box>
      </div>
      <div>
        {/* <Grid direction="row" container justify="flex-end" alignItems="center">
        <Box mt={0} pt={1}>
        { (adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.SaludEmergencias?.InformacionMedica.Editar === true)?
            <Button type="submit" className="buttonSave"  onClick={UpdateCandidate}>
                Guardar y Continuar&nbsp;<SaveIcon />
            </Button>
            :null
        }
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
    Alergias: Yup.string().required("El campo Alergías es requerido"),
    PadEnfer: Yup.string().required("El campo Padecimientos es requerido"),
    Cirugias: Yup.string().required("El campo Cirugías es requerido"),
    TraMeRe: Yup.string().required("El campo Tratamientos es requerido"),
  };
};

export default EnfermedadNuevoIngreso;
