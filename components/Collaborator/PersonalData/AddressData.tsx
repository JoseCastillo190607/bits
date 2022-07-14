import { ChangeEvent, useContext, useEffect, useState } from "react";
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
import {
  getMunicipios,
  getStates,
} from "../../../helpers/Json/getStatesAndMunicipios";
import { putCandidate } from "../../../services/candidateService";
import { SuccessfulAlert } from "../../../alerts/successAlerts";
import InputMask from "react-input-mask";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { UPDATE_USERS } from "../../../Querys/querys";
import { Form } from "semantic-ui-react";
import SaveIcon from "@material-ui/icons/Save";

const AddressData = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const [states, setState] = useState<Array<string>>([]);
  const [municipios, setMunicipios] = useState<Array<string>>([]);
  const [estado, setEstado] = useState<string>("");
  const [municipio, setMunicipio] = useState<string>("");
  const [cpMask, setCPMask] = useState("");

  const [updateColaboradores] = useMutation(UPDATE_USERS);

  const reCheck = localStorage.getItem("reCheck");

  useEffect(() => {
    if (state.collaborator?.country)
      setState(getStates(state.collaborator?.country));
    if (state.collaborator?.state)
      setMunicipios(getMunicipios(state.collaborator?.state));

    if (state.collaborator) {
      if (state.collaborator?.municipality) {
        setMunicipio(state.collaborator?.municipality);
      }
      if (state.collaborator?.state) {
        setEstado(state.collaborator?.state);
      }
    }
  }, []);

  const handleChange = async (
    e: ChangeEvent<{ name: string; value: unknown }>
  ) => {
    await updateData(e, state, dispatch, 0);
  };

  const onChangeCountry = async (e: any) => {
    setEstado("");
    setMunicipio("");
    setState(getStates(e.target.value));
    await updateData(e, state, dispatch, 0);
  };

  const onChangeState = async (e: any) => {
    setMunicipio("");
    let value = e.target.value;
    setEstado(value);
    setMunicipios(getMunicipios(value));
  };

  const UpdateCandidate = async () => {
    let result = await putCandidate(
      state.collaborator,
      state.collaborator.Estatus === "sent" ? "si" : "no"
    );
    if (result === true) {
      await SuccessfulAlert({ text: "Datos guardados correctamente." });
    }
  };

  const initialValues = () => {
    return {
      address: state.collaborator?.address ?? "",
      suburb: state.collaborator?.suburb ?? "",
      country: state.collaborator?.country ?? "",
      state: state.collaborator?.state ?? "",
      municipality: state.collaborator?.municipality ?? "",
      ZC: state.collaborator?.ZC ?? "",
      nacionality: state.collaborator?.nacionality ?? "",
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
        //     progress: [33.3, 0, 0, 0],
        //     sections: [100, 0, 0, 0],
        //   },
        // });
      });
    },
  });

  return (
    <Form onSubmit={formik.submitForm}>
    <div className="novalidate__border">
      <Box mb={2}>
        <TextField
          type="text"
          name="address"
          defaultValue={state.collaborator?.address}
          label="Calle y número"
          variant="outlined"
          size="small"
          fullWidth={true}
          error={Boolean(formik.errors.address)}
          onBlur={(e) => handleChange(e)}
          onChange={formik.handleChange}
          helperText={!state.collaborator?.address && "Obligatorio"}
          InputProps={{
            readOnly: false,
          }}
        />
      </Box>
      <Grid direction="row" container spacing={2}>
        <Grid xs item>
          <TextField
            name="suburb"
            defaultValue={state.collaborator?.suburb || ""}
            label="Colonia"
            variant="outlined"
            size="small"
            fullWidth={true}
            onBlur={(e) => handleChange(e)}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.suburb)}
            helperText={!state.collaborator?.suburb && "Obligatorio"}
            InputProps={{
              readOnly: false,
            }}
          />
        </Grid>
        <Grid xs item>
          <FormControl variant="outlined" fullWidth={true} size="small">
            <InputLabel htmlFor="outlined-age-native-simple">País</InputLabel>
            <Select
              native
              onChange={(e) => onChangeCountry(e)}
              onBlur={formik.handleChange}
              error={Boolean(formik.errors.country)}
              label={"Pais"}
              name="country"
              defaultValue={state.collaborator?.country || ""}
            >
              <option value={state.collaborator?.country || ""} disabled={true}>
                {state.collaborator?.country || ""}
              </option>
              {paisesEstados.map((country: any, index: number) => (
                <option key={index} value={country.country}>
                  {country.country}
                </option>
              ))}
            </Select>
            <FormHelperText>
              {!state.collaborator?.country && "Obligatorio"}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid direction="row" container spacing={2}>
        <Grid xs item>
          <FormControl variant="outlined" fullWidth={true} size="small">
            <InputLabel htmlFor="outlined-age-native-simple">Estado</InputLabel>
            <Select
              native
              onChange={(e) => onChangeState(e)}
              onBlur={formik.handleChange}
              error={Boolean(formik.errors.state)}
              label={"Estado"}
              name="state"
              value={estado}
            >
              <option value={estado} disabled={true}>
                {estado}
              </option>
              {states.map((state: string, index: number) => (
                <option key={index} value={`${state}`}>
                  {state}
                </option>
              ))}
            </Select>
            <FormHelperText>{!estado && "Obligatorio"}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs item>
          <FormControl variant="outlined" fullWidth={true} size="small">
            <InputLabel htmlFor="outlined-age-native-simple">
              Municipio
            </InputLabel>
            <Select
              native
              onBlur={formik.handleChange}
              onChange={(e: any) => setMunicipio(e.target.value)}
              error={Boolean(formik.errors.municipality)}
              label={"Municipio"}
              name="municipality"
              value={municipio}
            >
              <option value={municipio} disabled={true}>
                {municipio}
              </option>
              {municipios.map((municipio: any, index: number) => (
                <option key={index} value={municipio}>
                  {municipio}
                </option>
              ))}
            </Select>
            <FormHelperText>{!municipio && "Obligatorio"}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid direction="row" container spacing={2}>
        <Grid xs item>
          <InputMask
            mask="99999"
            defaultValue={state.collaborator?.ZC || cpMask}
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
                name="ZC"
                error={Boolean(formik.errors.ZC)}
                helperText={!state.collaborator?.ZC && "Obligatorio"}
                label="Código postal"
                variant="outlined"
                size="small"
                fullWidth={true}
              />
            )}
          </InputMask>
        </Grid>
        <Grid xs item>
          <TextField
            name="nacionality"
            defaultValue={state.collaborator?.nacionality || ""}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.nacionality)}
            helperText={!state.collaborator?.nacionality && "Obligatorio"}
            label="Nacionalidad"
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
    address: Yup.string().required("El campo es obligatorio"),
    suburb: Yup.string().required("El campo es obligatorio"),
    country: Yup.string().required("El campo es obligatorio"),
    state: Yup.string().required("El campo es obligatorio"),
    municipality: Yup.string().required("El campo es obligatorio"),
    ZC: Yup.string().required("El campo es obligatorio"),
    nacionality: Yup.string().required("El campo es obligatorio"),
  };
};

export default AddressData;
