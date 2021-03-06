import { ChangeEvent, Fragment, useContext, useState } from "react";
import { Box, Grid, TextField, Tooltip, Button } from "@material-ui/core";
import CollaboratorContext, {
  Types,
} from "../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../helpers/Collaborator/Collaborator";
import { withStyles, Theme } from "@material-ui/core/styles";
import { WarningAlert } from "../../../alerts/WarningAlert";
import InputMask from "react-input-mask";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { Form } from "semantic-ui-react";
import { UPDATE_USERS } from "../../../Querys/querys";
import { SuccessfulAlert } from "../../../alerts/successAlerts";
import SaveIcon from "@material-ui/icons/Save";

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    maxWidth: 1000,
  },
}))(Tooltip);

var validateCURP = true;
var validateRFC = true;

const IdentityData = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const [validateCurp, setValidatdCurp] = useState(true);
  const [validateRfc, setValidatdRfc] = useState(true);
  const [nssMask, setNssMask] = useState("");

  const [updateColaboradores] = useMutation(UPDATE_USERS);

  const reCheck = localStorage.getItem("reCheck");

  const handleChange = async (
    e: ChangeEvent<{ name: string; value: unknown }>
  ) => {
    await updateData(e, state, dispatch, 1);
  };

  const handleChangeCurp = async (
    e: ChangeEvent<{ name: string; value: unknown }>
  ) => {
    await updateData(e, state, dispatch, 1);
    if (state.collaborator?.CURP != undefined) {
      const re =
        /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
      const validado = re.test(state.collaborator?.CURP);
      if (!validado) {
        setValidatdCurp(false);
        validateCURP = false;
        return await WarningAlert({
          text: "El formato de tu CURP no es la correcta.",
        });
      } else {
        setValidatdCurp(true);
        validateCURP = true;
      }
    }
  };

  const handleChangeRfc = async (
    e: ChangeEvent<{ name: string; value: unknown }>
  ) => {
    await updateData(e, state, dispatch, 1);
    if (state.collaborator?.RFC != undefined) {
      const re =
        /^([A-Z??&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
      const validado = state.collaborator?.RFC.toLocaleUpperCase().match(re);
      if (!validado) {
        setValidatdRfc(false);
        validateRFC = false;
        return await WarningAlert({
          text: "El formato de tu RFC no es la correcta.",
        });
      } else {
        setValidatdRfc(true);
        validateRFC = true;
      }
    }
  };

  const validateCURPF = async (curp: string) => {
    const re =
      /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
    const validado = curp.toLocaleUpperCase().match(re);
  };

  const initialValues = () => {
    return {
      IMSS: state.collaborator?.IMSS ?? "",
      CURP: state.collaborator?.CURP ?? "",
      RFC: state.collaborator?.RFC ?? "",
      ClaveElectoralPasaporte:
        state.collaborator?.ClaveElectoralPasaporte ?? "",
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
        SuccessfulAlert({ text: "Se actualiz?? correctamente" });
        // dispatch({
        //   type: Types.SET_COLLABORATOR,
        //   payload: {
        //     progress: [100, 100, 0, 0],
        //     sections: [100, 100, 100, 0],
        //   },
        // });
      });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="novalidate__border">
        <Grid direction="row" container spacing={2}>
          <Grid xs item direction="row" container alignItems="center">
            <Grid xs={11} item>
              <InputMask
                mask="99999999999"
                defaultValue={state.collaborator?.IMSS || nssMask}
                onChange={(e) => {
                  setNssMask(e.target.value);
                  handleChange(e);
                }}
                disabled={false}
                onBlur={formik.handleChange}
              >
                {(inputProps: any) => (
                  <TextField
                    {...inputProps}
                    name="IMSS"
                    label="NSS"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    error={Boolean(formik.errors.IMSS)}
                    helperText={!state.collaborator?.IMSS && "Obligatorio"}
                  />
                )}
              </InputMask>
            </Grid>
            <Grid xs item>
              <Box ml={1}>
                <HtmlTooltip
                  title={
                    <Fragment>
                      Si no estas asociado, tramita tu n??mero en linea
                    </Fragment>
                  }
                >
                  <img
                    src="/assets/icons/PreguntaAzul.png"
                    alt="Question"
                    height="20"
                  />
                </HtmlTooltip>
              </Box>
            </Grid>
          </Grid>
          <Grid xs item>
            <TextField
              name="CURP"
              defaultValue={state.collaborator?.CURP || ""}
              label="CURP"
              variant="outlined"
              size="small"
              fullWidth={true}
              onBlur={(e) => handleChangeCurp(e)}
              InputProps={{
                readOnly: false,
              }}
              error={Boolean(formik.errors.CURP)}
              onChange={formik.handleChange}
              helperText={
                (!state.collaborator?.CURP && "Obligatorio") ||
                (formik.errors.CURP ==
                  "CURP no puede tener m??s de 18 caracteres" &&
                  "CURP no debe tener m??s de 18 caracteres") ||
                (formik.errors.CURP == "CURP debe contener 18 caracteres" &&
                  "CURP debe contener 18 caracteres")
              }
            />
          </Grid>
        </Grid>
        <Grid direction="row" container spacing={2}>
          <Grid xs item>
            <TextField
              name="RFC"
              defaultValue={state.collaborator?.RFC || ""}
              label="RFC"
              variant="outlined"
              size="small"
              fullWidth={true}
              onBlur={(e) => handleChangeRfc(e)}
              InputProps={{
                readOnly: false,
              }}
              error={Boolean(formik.errors.RFC)}
              onChange={formik.handleChange}
              helperText={!state.collaborator?.RFC && "Obligatorio"}
            />
          </Grid>
          <Grid xs item direction="row" container alignItems="center">
            <Grid xs={10} item>
              <TextField
                name="ClaveElectoralPasaporte"
                defaultValue={state.collaborator?.ClaveElectoralPasaporte || ""}
                label="Clave de elector o pasaporte"
                variant="outlined"
                size="small"
                fullWidth={true}
                onBlur={(e) => handleChange(e)}
                InputProps={{
                  readOnly: false,
                }}
                error={Boolean(formik.errors.ClaveElectoralPasaporte)}
                onChange={formik.handleChange}
                helperText={
                  !state.collaborator?.ClaveElectoralPasaporte && "Obligatorio"
                }
              />
            </Grid>
            <Grid xs item>
              <Box ml={2}>
                <HtmlTooltip
                  title={
                    <Fragment>
                      <img src="/assets/INE.png" alt="Question" height="500" />
                    </Fragment>
                  }
                >
                  <img
                    src="/assets/icons/PreguntaAzul.png"
                    alt="Question"
                    height="20"
                  />
                </HtmlTooltip>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Box>
          <Grid direction="row" container spacing={2}>
            <Grid xs item direction="row" container alignItems="center">
              <Grid xs={11} item>
                <TextField
                  type="number"
                  name="workPermission"
                  defaultValue={state.collaborator?.workPermission || ""}
                  label="Permiso de trabajo(extranjeros)"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  onBlur={(e) => handleChange(e)}
                  InputProps={{
                    readOnly: false,
                  }}
                />
              </Grid>
              <Grid xs item>
                <Box ml={1}>
                  <HtmlTooltip
                    title={
                      <Fragment>
                        <img
                          src="/assets/Permiso_De_Trabajo.png"
                          alt="Question"
                          height="500"
                        />
                      </Fragment>
                    }
                  >
                    <img
                      src="/assets/icons/PreguntaAzul.png"
                      alt="Question"
                      height="20"
                    />
                  </HtmlTooltip>
                </Box>
              </Grid>
            </Grid>
            <Grid xs item>
              <TextField
                type="number"
                name="creditoInfonavit"
                defaultValue={state.collaborator?.creditoInfonavit || ""}
                label="Cr??dito infonavit"
                variant="outlined"
                size="small"
                fullWidth={true}
                onBlur={(e) => handleChange(e)}
                InputProps={{
                  readOnly: false,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
      <Grid
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
      </Grid>
    </Form>
  );
};

const validationSchema = () => {
  return {
    IMSS: Yup.string().required("El NSS es obligatorio"),
    CURP: Yup.string()
      .required("El CURP es obligatorio")
      .min(18, "CURP debe contener 18 caracteres")
      .max(18, "CURP no puede tener m??s de 18 caracteres"),
    RFC: Yup.string().required("El RFC es obligatorio"),
    ClaveElectoralPasaporte: Yup.string().required(
      "La clave de elector es obligatoria"
    ),
  };
};

export default IdentityData;
