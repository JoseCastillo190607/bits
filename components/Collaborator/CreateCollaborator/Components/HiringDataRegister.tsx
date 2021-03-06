import { useEffect, useState, useContext } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Grid, TextField, InputLabel } from "@material-ui/core";
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import InputAdornment from "@mui/material/InputAdornment";
import {
  updateData,
  updateFile,
} from "../../../../helpers/Collaborator/Collaborator";
import { Select } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "semantic-ui-react";
import { ICompany } from "../../../../interfaces/Company";
import { IEnterprise } from "../../../../interfaces/Enterprise";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_ENTERPRISE,
  GET_ALL_PAYROLL_GROUP,
} from "../../../../Querys/querys";
import { EventualPayroll } from "../../../../interfaces/TabEventualPayroll.interfaces";

const HiringDataRegister = (props: any) => {
  const { data: resultCompany } = useQuery(GET_ALL_ENTERPRISE);
  const allCompanies = resultCompany?.GET_ALL_ENTERPRISE;
  const [companies, setCompanies] = useState([]);

  const { data: resultPayRollGroup } = useQuery(GET_ALL_PAYROLL_GROUP);
  const allPayRollGroups = resultPayRollGroup?.GET_ALL_PAYROLL_GROUP;
  const [payRollGroups, setPayRollGroups] = useState([]);

  const [tipoContratacion, setTipoContratacion] = useState("directa");
  const [vigenciaContrato, setVigenciaContrato] = useState("indefinida");
  const [tipoEsquema, setTipoEsquema] = useState("Nomina");
  const { state, dispatch } = useContext(CollaboratorContext);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [cartaOferta, setCartaOferta] = useState<any>("");
  const [idPayRollGroup, setIdPayRollGroup] = useState("");

  const sueldoMinimo = (5186.11).toFixed(2);

  const params = useParams();

  useEffect(() => {
    if (allCompanies) {
      setCompanies(allCompanies);
    }
    if (allPayRollGroups) {
      setPayRollGroups(allPayRollGroups);
    }
  }, [allCompanies, allPayRollGroups]);

  const handleChangeFile = async (e: any) => {
    setCartaOferta(e.target.files[0].name);
    await updateFile(e.target.files, state, dispatch);
    e.target.value = null;
  };

  const handleChanges = async (e: any) => {
    // let result = await putCandidate(
    //   state.collaborator,
    //   state.collaborator.Estatus === "sent" ? "si" : "no"
    // );
    // if (result === true) {
    //   await SuccessfulAlert({ text: "Datos guardados correctamente." });
    // }
    await updateData(e, state, dispatch, 0);
  };

  const cambioTipoContratacion = async (e: any) => {
    setTipoContratacion(e.target.value);
    await updateData(e, state, dispatch, 0);
  };
  const cambioTipoEsquema = async (e: any) => {
    setTipoEsquema(e.target.value);
    await updateData(e, state, dispatch, 0);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      console.log(formData);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div
        className={
          state.sections[2] >= 100 ? `validate__border` : `novalidate__border`
        }
      >
        <span>Tipo de contrataci??n</span>
        <Grid
          direction="row"
          container
          spacing={1}
          //   style={{ border: "1px solid red" }}
        >
          <Grid xs item>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="directa"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  control={<Radio size="small" style={{ color: "#fabb00" }} />}
                  label="Contrataci??n directa"
                  value="directa"
                  checked={tipoContratacion === "directa" ? true : false}
                  onChange={cambioTipoContratacion}
                  name="tittle"
                  onBlur={(e) => handleChanges(e)}
                />
                <FormControlLabel
                  control={<Radio size="small" style={{ color: "#fabb00" }} />}
                  label="Outsource"
                  value="outsource"
                  checked={tipoContratacion === "outsource" ? true : false}
                  onChange={cambioTipoContratacion}
                  name="tittle"
                  onBlur={(e) => handleChanges(e)}
                />
              </RadioGroup>
            </FormControl>
            {tipoContratacion === "directa" ? (
              <Grid
                spacing={2}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <FormControl
                  fullWidth={true}
                  size="small"
                  style={{ width: "200px" }}
                >
                  <InputLabel>Empresa</InputLabel>
                  <Select
                    native
                    name="idEnterprise"
                    label="empresa"
                    variant="outlined"
                    style={{ height: "42px" }}
                    onChange={formik.handleChange}
                    onBlur={(e) => handleChanges(e)}
                  >
                    <option value="" disabled selected>
                      Seleccione una empresa
                    </option>
                    {companies.map(({ name, id }: IEnterprise, index: number) => (
                      <option key={index} value={id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  variant="outlined"
                  fullWidth={true}
                  size="small"
                  style={{ width: "200px" }}
                >
                  <InputLabel>Registro patronal</InputLabel>
                  <TextField
                    label="Registro patronal"
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    size="small"
                    name="EmployerRegister"
                    onChange={formik.handleChange}
                    onBlur={(e) => handleChanges(e)}
                  />
                </FormControl>
              </Grid>
            ) : (
              <>
                <Grid>
                  <FormControl
                    fullWidth={true}
                    size="small"
                    style={{ width: "100%" }}
                  >
                    <Select
                      native
                      name="idEnterprise"
                      label="empresa"
                      variant="outlined"
                      style={{ height: "42px" }}
                      onChange={formik.handleChange}
                      onBlur={(e) => handleChanges(e)}
                    >
                      <option value="" disabled selected>
                        Seleccione una empresa
                      </option>
                      {companies.map(
                        ({ name, id }: IEnterprise, index: number) => (
                          <option key={index} value={id}>
                            {name}
                          </option>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  spacing={2}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <TextField
                    label="Registro patronal"
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    size="small"
                    name="EmployerRegister"
                    onChange={formik.handleChange}
                    onBlur={(e) => handleChanges(e)}
                  />
                  <TextField
                    label="Jornada"
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    size="small"
                    name="journey"
                    onChange={formik.handleChange}
                    onBlur={(e) => handleChanges(e)}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </div>
      <div
        className={
          state.sections[2] >= 100 ? `validate__border` : `novalidate__border`
        }
      >
        <span>Vigencia del contrato</span>
        <Grid
          direction="row"
          container
          spacing={1}
          //   style={{ border: "1px solid red" }}
        >
          <Grid xs item>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="indefinida"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  control={<Radio size="small" style={{ color: "#fabb00" }} />}
                  label="Indefinida"
                  value="indefinida"
                  name="typeContract"
                  onChange={formik.handleChange}
                  onBlur={(e) => handleChanges(e)}
                />
                <FormControlLabel
                  control={<Radio size="small" style={{ color: "#fabb00" }} />}
                  label="Temporal"
                  value="temporal"
                  name="typeContract"
                  onChange={formik.handleChange}
                  onBlur={(e) => handleChanges(e)}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="date"
          size="small"
          style={{ width: "100%" }}
          name="dateContractDate"
          onChange={formik.handleChange}
          onBlur={(e) => handleChanges(e)}
        />
      </div>
      <div
        className={
          state.sections[2] >= 100 ? `validate__border` : `novalidate__border`
        }
      >
        <span>Grupo de n??minas</span>
        <Grid
          spacing={3}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <FormControl fullWidth={true} size="small" style={{ width: "100%" }}>
            <Select
              native
              onBlur={formik.handleChange}
              name="id_payroll_group"
              onChange={formik.handleChange}
              defaultValue={idPayRollGroup || ""}
              autoFocus={true}
              disabled={disabled}
              style={{ height: "42px" }}
              variant="outlined"
            >
              {payRollGroups.map(
                ({ group_name, id }: EventualPayroll, index: number) => (
                  <>
                    {idPayRollGroup == id ? (
                      <option key={index} value={id} selected>
                        {group_name}
                      </option>
                    ) : (
                      <option key={index} value={id}>
                        {group_name}
                      </option>
                    )}
                  </>
                )
              )}
            </Select>
          </FormControl>
        </Grid>

        <span>Tipo de esquema</span>
        <Grid
          direction="row"
          container
          spacing={1}
          //   style={{ border: "1px solid red" }}
        >
          <Grid xs item>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Nomina"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Nomina"
                  control={<Radio size="small" style={{ color: "#fabb00" }} />}
                  label="100% N??mina"
                  checked={tipoEsquema === "Nomina" ? true : false}
                  onChange={cambioTipoEsquema}
                  name="nominesPayroll"
                  onBlur={(e) => handleChanges(e)}
                />
                <FormControlLabel
                  value="Mixto"
                  control={<Radio size="small" style={{ color: "#fabb00" }} />}
                  label="Mixto"
                  checked={tipoEsquema === "Mixto" ? true : false}
                  onChange={cambioTipoEsquema}
                  name="nominesPayroll"
                  onBlur={(e) => handleChanges(e)}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        {/* 100% nomina */}

        {tipoEsquema === "Nomina" ? (
          <Grid xs item>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Bruto"
                name="typeSalary"
                onChange={formik.handleChange}
                onBlur={(e) => handleChanges(e)}
              >
                <FormControlLabel
                  value="Bruto"
                  control={<Radio size="small" style={{ color: "#fabb00" }} />}
                  label="Ingreso bruto"
                  name="typeSalary"
                  onChange={formik.handleChange}
                  onBlur={(e) => handleChanges(e)}
                />
                <FormControlLabel
                  value="Neto"
                  control={<Radio size="small" style={{ color: "#fabb00" }} />}
                  label="Ingreso neto"
                  name="typeSalary"
                  onChange={formik.handleChange}
                  onBlur={(e) => handleChanges(e)}
                />
                <TextField
                  style={{ width: "200px" }}
                  required
                  label="Ingreso mensual bruto"
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  size="small"
                  defaultValue={`${sueldoMinimo}`}
                  name="ingresoMensualBruto"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.ingresoMensualBruto)}
                  helperText={formik.errors.ingresoMensualBruto}
                  onBlur={(e) => handleChanges(e)}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        ) : (
          // Esquema Mixto
          <>
            <Grid xs item>
              <FormControl
                style={{
                  width: "100%",
                }}
              >
                <FormLabel>Grabable</FormLabel>
                <RadioGroup
                  row
                  defaultValue="Bruto"
                  name="typeSalary"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <FormControlLabel
                    value="Bruto"
                    control={
                      <Radio size="small" style={{ color: "#fabb00" }} />
                    }
                    label="Bruto"
                    name="typeSalary"
                    onChange={formik.handleChange}
                    onBlur={(e) => handleChanges(e)}
                  />
                  <FormControlLabel
                    value="Neto"
                    control={
                      <Radio size="small" style={{ color: "#fabb00" }} />
                    }
                    label="Neto"
                    name="typeSalary"
                    onChange={formik.handleChange}
                    onBlur={(e) => handleChanges(e)}
                  />
                  <TextField
                    style={{ width: "200px" }}
                    required
                    label="Ingreso mensual neto"
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    size="small"
                    onChange={formik.handleChange}
                    error={Boolean(formik.errors.recordableSalary)}
                    helperText={formik.errors.recordableSalary}
                    name="recordableSalary"
                    onBlur={(e) => handleChanges(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <FormLabel>No grabable</FormLabel>
              <TextField
                style={{ width: "200px" }}
                required
                label="Ingreso mensual neto"
                id="outlined-basic"
                variant="outlined"
                type="text"
                size="small"
                name="notRecordableSalary"
                onChange={formik.handleChange}
                error={Boolean(formik.errors.notRecordableSalary)}
                helperText={formik.errors.notRecordableSalary}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                onBlur={(e) => handleChanges(e)}
              />
            </Grid>
            <Grid
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <FormLabel>Ingreso total</FormLabel>
              <TextField
                disabled
                required
                id="outlined-basic"
                variant="outlined"
                type="text"
                size="small"
                defaultValue={`$ ${sueldoMinimo}`}
                style={{ background: "#f1f2f5" }}
                name="totalSalary"
                onChange={formik.handleChange}
                onBlur={(e) => handleChanges(e)}
              />
            </Grid>
          </>
        )}

        <Grid
          spacing={5}
          style={{
            marginTop: "10px",
          }}
          direction="row"
          container
        >
          <Grid item xs={4}>
            <FormControl>
              <TextField
                style={{ width: "200px" }}
                required
                label="Salario diario"
                id="outlined-basic"
                variant="outlined"
                type="text"
                size="small"
                name="DS"
                onChange={formik.handleChange}
                error={Boolean(formik.errors.DS)}
                helperText={formik.errors.DS}
                onBlur={(e) => handleChanges(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}

              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <TextField
                style={{ width: "200px" }}
                required
                label="Salario diario integrado"
                id="outlined-basic"
                variant="outlined"
                type="text"
                size="small"
                name="ISD"
                onChange={formik.handleChange}
                error={Boolean(formik.errors.ISD)}
                helperText={formik.errors.ISD}
                onBlur={(e) => handleChanges(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <TextField
                style={{ width: "200px" }}
                required
                label="Salario diario grabable"
                id="outlined-basic"
                variant="outlined"
                type="text"
                size="small"
                name="SDG"
                onChange={formik.handleChange}
                error={Boolean(formik.errors.SDG)}
                helperText={formik.errors.SDG}
                onBlur={(e) => handleChanges(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <div
        className={
          state.sections[2] >= 100 ? `validate__border` : `novalidate__border`
        }
      >
        <Grid
          direction="row"
          container
          spacing={2}
          style={{
            // border: "1px solid red",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            disabled
            id="outlined-basic"
            variant="outlined"
            type="text"
            size="small"
            label="Periodicidad de pago"
            defaultValue="Quincenal"
            style={{ background: "#f1f2f5" }}
            name="periodicidadDePago"
            onChange={formik.handleChange}
            onBlur={(e) => handleChanges(e)}
          />

          <Grid xs item>
            <Grid
              direction="row"
              container
              justify="flex-end"
              alignItems="center"
            >
              <label className="custom-file-upload-text">
                <label>
                  {disabled ? "Descargar Carta Oferta" : "Subir Carta Oferta"}
                </label>{" "}
                <br />
                {!state.collaborator?.new ? (
                  <a
                    href={state.collaborator?.Archivos?.CartaOferta}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Carta Oferta.pdf
                  </a>
                ) : (
                  ""
                )}
              </label>
              {!disabled && (
                <label className="custom-file-upload">
                  <input
                    type="file"
                    name="CartaOferta"
                    onChange={(e) => handleChangeFile(e)}
                    onClick={() => setCartaOferta("")}
                    accept=".pdf, .PDF"
                  />
                  <img
                    src={
                      state.collaborator?.Archivos?.CartaOferta
                        ? `/assets/svg/icono-archivo-subido.svg`
                        : `/assets/svg/icono-subir-archivo-azul.svg`
                    }
                    alt={cartaOferta}
                  />
                </label>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Form>
  );
};

const initialValues = () => {
  return {
    tittle: "",
    EmployerRegister: "",
    journey: "",
    typeContract: "",
    dateContractDate: "",
    nominesPayroll: "",
    ingresoBruto: "",
    ingresoNeto: "",
    ingresoMensualBruto: "",
    recordableSalary: "",
    notRecordableSalary: "",
    totalSalary: "",
    periodicidadDePago: "",
    idEnterprise: "",
    typeSalary: "",
    DS: 0,
    ISD: 0,
    SDG: 0,
  };
};

const validationSchema = () => {
  return {
    date: Yup.string().required("es necesario que elija una fecha"),
    notRecordableSalary: Yup.number()
      .moreThan(5186)
      .required("el campo es requerido y no puede ser menor a  5186.10"),

    recordableSalary: Yup.number()
      .moreThan(5186)
      .required("el campo es requerido y no puede ser menor a  5186.10"),

    ingresoMensualBruto: Yup.string()
      .required("es necesario que ingrese el ingreso mensual bruto")
      .when("nominesPayroll", (nominesPayroll: any, schema: any) => {
        return nominesPayroll === "Nomina"
          ? schema.required("es necesario que ingrese el ingreso mensual bruto")
          : schema.notRequired();
      }),

    DS: Yup.string().required("es necesario que ingrese el salario diario"),
    ISD: Yup.string().required(
      "es necesario que ingrese el salario diario integrado"
    ),
    SDG: Yup.string().required(
      "es necesario que ingrese el salario diario grabable"
    ),
  };
};

export default HiringDataRegister;
