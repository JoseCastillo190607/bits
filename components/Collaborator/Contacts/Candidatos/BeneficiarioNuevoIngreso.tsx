import { ChangeEvent, useContext, useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  TextField,
  Button,
} from "@material-ui/core";
import CollaboratorContext, {
  Types,
} from "../../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";
import { paisesEstados } from "../../../../helpers/Json/paises-estados";
import {
  getMunicipios,
  getStates,
} from "../../../../helpers/Json/getStatesAndMunicipios";
import moment from "moment";
import { WarningAlert } from "../../../../alerts/WarningAlert";
import { validDate } from "../../../../helpers/validNewDate";
import React from "react";
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

var validateCURP = true;

const BeneficiarioNuevoIngreso = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const [states, setState] = useState<Array<string>>([]);
  const [municipios, setMunicipios] = useState<Array<string>>([]);
  const [estado, setEstado] = useState<string>("");
  const [municipio, setMunicipio] = useState<string>("");
  const [validateCurp, setValidatdCurp] = React.useState(true);
  const { adminState } = useContext(AdminContext);
  const [cpMask, setCPMask] = useState("");

  const [updateColaboradores] = useMutation(UPDATE_USERS);

  const currentDate = moment();
  const validYears = 18;
  const isAdult = (birthday: string) => {
    if (birthday !== "") {
      return currentDate.year() - moment(birthday).year() >= validYears;
    } else {
      return "empty";
    }
  };

  const reCheck = localStorage.getItem("reCheck");

  useEffect(() => {
    console.log("a ver", state.collaborator);
    if (state.collaborator?.benefitiaryCountry) {
      console.log("1");
      setState(getStates(state.collaborator?.benefitiaryCountry));
    }

    if (state.collaborator?.benefitiaryState) {
      console.log("2");
      setMunicipios(getMunicipios(state.collaborator?.benefitiaryState));
    }

    //console.log("check", reCheck);

    if (state.collaborator) {
      if (state.collaborator.benefitiaryMunicipality) {
        setMunicipio(state.collaborator.benefitiaryMunicipality);
      }
      if (state.collaborator.benefitiaryState) {
        console.log("si");
        setEstado(state.collaborator.benefitiaryState);
      }
    }
  }, []);

  const handleChange = async (e: any) => {
    //console.log("a ver 1", state.collaborator)
    await updateData(e, state, dispatch, 0);
  };

  const handleChangeCurp = async (
    e: ChangeEvent<{ name: string; value: unknown }>
  ) => {
    console.log("a ver", state.collaborator);
    await updateData(e, state, dispatch, 0);
    if (state.collaborator?.benefitiaryCURP != undefined) {
      const re =
        /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
      //const validado = state.collaborator?.DatosPersonales?.CURP.toLocaleUpperCase().match(re);
      const validado = re.test(state.collaborator?.benefitiaryCURP);
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

  const validDate = async (e: any) => {
    if (!isAdult(e.target.value)) {
      //state.collaborator.benefitiaryDateOfBirth = undefined;
      return WarningAlert({
        title: "¡Error!",
        text: `¡El beneficiario debe ser mayor a ${validYears} años!`,
      }).then(() => false);
    } else if (isAdult(e.target.value) == "empty") {
      return "" ;
    } else {
      await updateData(e, state, dispatch, 0);
    }
  };

  const onChangeCountry = async (e: any) => {
    setState(getStates(e.target.value));
    await updateData(e, state, dispatch, 0);
  };

  const onChangeState = (e: any) => {
    setMunicipio("");
    let value = e.target.value;
    setEstado(value);
    setMunicipios(getMunicipios(value));
  };

  const UpdateCandidate = async () => {
    // let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "sent" ? 'si' : 'no');
    updateColaboradores({
      variables: {
        updateUsersId: state.collaborator?.id,
        input: {
          benefitiary: state.collaborator?.benefitiary,
          ParentescoB: state.collaborator?.ParentescoB,
          benefitiaryDateOfBirth: state.collaborator?.benefitiaryDateOfBirth,
          benefitiaryCURP: state.collaborator?.benefitiaryCURP,
          benefitiaryZC: state.collaborator?.benefitiaryZC,
          benefitiaryAddress: state.collaborator?.benefitiaryAddress,
          benefitiarySuburb: state.collaborator?.benefitiarySuburb,
          benefitiaryCountry: state.collaborator?.benefitiaryCountry,
          benefitiaryState: state.collaborator?.benefitiaryState,
          benefitiaryMunicipality: state.collaborator?.benefitiaryMunicipality,
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
      benefitiary: state.collaborator?.benefitiary ?? "",
      ParentescoB: state.collaborator?.ParentescoB ?? "",
      benefitiaryDateOfBirth: state.collaborator?.benefitiaryDateOfBirth ?? "",
      benefitiaryCURP: state.collaborator?.benefitiaryCURP ?? "",
      benefitiaryZC: state.collaborator?.benefitiaryZC ?? "",
      benefitiaryAddress: state.collaborator?.benefitiaryAddress ?? "",
      benefitiarySuburb: state.collaborator?.benefitiarySuburb ?? "",
      benefitiaryCountry: state.collaborator?.benefitiaryCountry ?? "",
      benefitiaryState: state.collaborator?.benefitiaryState ?? "",
      benefitiaryMunicipality:
        state.collaborator?.benefitiaryMunicipality ?? "",
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
        //     progress: [100, 100, 33.3, 0],
        //     sections: [100, 100, 100, 33.3],
        //   },
        // });
      });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="novalidate__border">
        <Grid direction="row" container spacing={2}>
          <Grid xs item>
            <TextField
              id="benefitiary"
              name="benefitiary"
              defaultValue={state.collaborator?.benefitiary}
              autoFocus={true}
              label="Nombre del beneficiario del seguro"
              variant="outlined"
              size="small"
              fullWidth={true}
              onBlur={(e) => handleChange(e)}
              onChange={formik.handleChange}
              InputProps={{
                readOnly: false,
              }}
              error={Boolean(formik.errors.benefitiary)}
              helperText={!state.collaborator?.benefitiary && "Obligatorio"}
            />
          </Grid>
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
                name="ParentescoB"
                defaultValue={state.collaborator?.ParentescoB || ""}
                autoFocus={true}
                error={Boolean(formik.errors.ParentescoB)}
                onChange={formik.handleChange}
              >
                <option
                  value={state.collaborator?.ParentescoB || ""}
                  disabled={true}
                >
                  {state.collaborator?.ParentescoB || ""}
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
              </Select>
              <FormHelperText>
                {!state.collaborator?.ParentescoB && "Obligatorio"}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <Box mt={2}>
          <Grid
            direction="row"
            container
            justify="flex-start"
            alignItems="center"
          >
            <Grid xs item>
              <span className="Fecha-de-nacimiento">Fecha de nacimiento</span>
            </Grid>
            <Grid xs item container justify="flex-end" alignItems="center">
              {/* { (reCheck == "true" || reCheck == null) && */}
              <TextField
                type="date"
                defaultValue={
                  moment(state.collaborator?.benefitiaryDateOfBirth).format(
                    "YYYY-MM-DD"
                  ) ?? ""
                }
                name="benefitiaryDateOfBirth"
                variant="outlined"
                size="small"
                onBlur={(e) => validDate(e)}
                //onChange={(e) => validDate(e)}
                InputProps={{
                  readOnly: false,
                  inputProps: {
                    max: moment().format("YYYY-MM-DD"),
                  },
                }}
                error={Boolean(formik.errors.benefitiaryDateOfBirth)}
                helperText={
                  !state.collaborator?.benefitiaryDateOfBirth && "Obligatorio"
                }
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        <Box mt={2}>
          <Grid direction="row" container spacing={2}>
            <Grid xs item>
              <TextField
                name="benefitiaryCURP"
                defaultValue={state.collaborator?.benefitiaryCURP}
                label="CURP"
                variant="outlined"
                size="small"
                fullWidth={true}
                onBlur={(e) => handleChangeCurp(e)}
                InputProps={{
                  readOnly: false,
                }}
                error={Boolean(formik.errors.benefitiaryCURP)}
                helperText={
                  !state.collaborator?.benefitiaryCURP && "Obligatorio"
                  ||
                  formik.errors.benefitiaryCURP ==
                                  "CURP no puede tener más de 18 caracteres" &&
                                "CURP no debe tener más de 18 caracteres"
                  ||
                  formik.errors.benefitiaryCURP ==
                                  "CURP debe contener 18 caracteres" &&
                                "CURP debe contener 18 caracteres"
                }
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid xs item>
              {/* { (reCheck == "true" || reCheck == null) && */}
              <InputMask
                mask="99999"
                defaultValue={state.collaborator?.benefitiaryZC || cpMask}
                onChange={(e) => {
                  setCPMask(e.target.value);
                  handleChange(e);
                }}
                disabled={false}
                onBlur={formik.handleChange}
              >
                {(inputProps: any) => (
                  <TextField
                    {...inputProps}
                    name="benefitiaryZC"
                    label="Código postal"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    error={Boolean(formik.errors.benefitiaryZC)}
                    helperText={
                      !state.collaborator?.benefitiaryZC && "Obligatorio"
                    }
                  />
                )}
              </InputMask>
            </Grid>
          </Grid>
        </Box>

        <Box mt={2} mb={2}>
          {/* { (reCheck == "true" || reCheck == null) && */}
          <TextField
            name="benefitiaryAddress"
            defaultValue={state.collaborator?.benefitiaryAddress}
            autoFocus={true}
            label="Dirección, calle y número"
            variant="outlined"
            size="small"
            fullWidth={true}
            onBlur={(e) => handleChange(e)}
            InputProps={{
              readOnly: false,
            }}
            error={Boolean(formik.errors.benefitiaryAddress)}
            helperText={
              !state.collaborator?.benefitiaryAddress && "Obligatorio"
            }
            onChange={formik.handleChange}
          />
        </Box>

        <Grid direction="row" container spacing={2}>
          <Grid xs item>
            {/* { (reCheck == "true" || reCheck == null) && */}
            <TextField
              name="benefitiarySuburb"
              defaultValue={state.collaborator?.benefitiarySuburb}
              autoFocus={true}
              label="Colonia"
              variant="outlined"
              size="small"
              fullWidth={true}
              onBlur={(e) => handleChange(e)}
              InputProps={{
                readOnly: false,
              }}
              error={Boolean(formik.errors.benefitiarySuburb)}
              helperText={
                !state.collaborator?.benefitiarySuburb && "Obligatorio"
              }
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid xs item>
            {/* { (reCheck == "true" || reCheck == null) && */}
            <FormControl variant="outlined" fullWidth={true} size="small">
              <InputLabel htmlFor="outlined-age-native-simple">País</InputLabel>
              <Select
                native
                onChange={(e) => onChangeCountry(e)}
                label={"País"}
                name="benefitiaryCountry"
                defaultValue={state.collaborator?.benefitiaryCountry || ""}
                autoFocus={true}
                error={Boolean(formik.errors.benefitiaryCountry)}
                onBlur={formik.handleChange}
              >
                <option
                  value={state.collaborator?.benefitiaryCountry || ""}
                  disabled={true}
                >
                  {state.collaborator?.benefitiaryCountry || ""}
                </option>
                {paisesEstados.map(({ country }: any, index: number) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </Select>
              <FormHelperText>
                {!state.collaborator?.benefitiaryCountry && "Obligatorio"}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <Box mt={2}>
          <Grid direction="row" container spacing={2}>
            <Grid xs item>
              {/* { (reCheck == "true" || reCheck == null) && */}
              <FormControl variant="outlined" fullWidth={true} size="small">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Estado
                </InputLabel>
                <Select
                  native
                  onChange={(e) => onChangeState(e)}
                  onBlur={formik.handleChange}
                  label={"Estado"}
                  name="benefitiaryState"
                  // defaultValue={state.collaborator?.benefitiaryState || ''}
                  value={estado}
                  error={Boolean(formik.errors.benefitiaryState)}
                >
                  <option
                    value={state.collaborator?.benefitiaryState || ""}
                    disabled={true}
                  >
                    {state.collaborator?.benefitiaryState || ""}
                  </option>
                  {/* <option value={estado} disabled={true}>{estado}</option> */}
                  {states.map((state: string, index: number) => (
                    <option key={index} value={`${state}`}>
                      {state}
                    </option>
                  ))}
                </Select>
                <FormHelperText>
                  {!state.collaborator?.benefitiaryState && "Obligatorio"}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid xs item>
              {/* { (reCheck == "true" || reCheck == null) && */}
              <FormControl variant="outlined" fullWidth={true} size="small">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Municipio
                </InputLabel>
                <Select
                  native
                  label={"Municipio"}
                  name="benefitiaryMunicipality"
                  defaultValue={
                    state.collaborator?.benefitiaryMunicipality || ""
                  }
                  autoFocus={true}
                  onBlur={(e) => handleChange(e)}
                  error={Boolean(formik.errors.benefitiaryMunicipality)}
                  onChange={formik.handleChange}
                >
                  <option
                    value={state.collaborator?.benefitiaryMunicipality || ""}
                    disabled={true}
                  >
                    {state.collaborator?.benefitiaryMunicipality || ""}
                  </option>
                  {municipios?.map((municipio: any, index: number) => (
                    <option key={index} value={municipio}>
                      {municipio}
                    </option>
                  ))}
                </Select>
                <FormHelperText>
                  {!state.collaborator?.benefitiaryMunicipality &&
                    "Obligatorio"}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        {Math.round(state.sections[0]) < 100 && (
          <span className="spanRequerido">
            Todos los campos son obligatorios
          </span>
        )}
      </div>
      <div>
        {/* <Grid direction="row" container justify="flex-end" alignItems="center">
        <Box mt={0} pt={1}>
        { (adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.SaludEmergencias?.Beneficiario?.Editar === true)?
            <Button type="submit" className="buttonSave"  onChange={UpdateCandidate}>
                Guardar y Continuar&nbsp;<SaveIcon />
            </Button>
            :null
        }
        </Box>
        </Grid> */}
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
    benefitiary: Yup.string().required("Nombre es requerido"),
    ParentescoB: Yup.string().required("Parentesco es requerido"),
    benefitiaryDateOfBirth: Yup.string().required(
      "Fecha de nacimiento es requerida"
    ),
    benefitiaryCURP: Yup.string().required("CURP es requerido").min(18,"CURP debe contener 18 caracteres").max(18,"CURP no puede tener más de 18 caracteres"),
    benefitiaryZC: Yup.string().required("Código postal es requerido"),
    benefitiaryAddress: Yup.string().required("Dirección es requerida"),
    benefitiarySuburb: Yup.string().required("Colonia es requerida"),
    benefitiaryCountry: Yup.string().required("País es requerido"),
    benefitiaryState: Yup.string().required("Estado es requerido"),
    benefitiaryMunicipality: Yup.string().required("Municipio es requerido"),
  };
};

export default BeneficiarioNuevoIngreso;
