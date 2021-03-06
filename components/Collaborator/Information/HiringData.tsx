import { useEffect, useState, useContext } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Grid, TextField, InputLabel, Button } from "@material-ui/core";
import CollaboratorContext, {
  Types,
} from "../../../context/CollaboratorContext/CollaboratorContext";
import InputAdornment from "@mui/material/InputAdornment";
import {
  updateData,
  updateFile,
} from "../../../helpers/Collaborator/Collaborator";
import { Select } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { putCandidate } from "../../../services/candidateService";
import { SuccessfulAlert } from "../../../alerts/successAlerts";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "semantic-ui-react";
import moment from "moment";
import {
  GET_ALL_ENTERPRISE,
  UPDATE_USERS,
  GET_ALL_PAYROLL_GROUP,
} from "../../../Querys/querys";
import { useMutation, useQuery } from "@apollo/client";
import { ICompany } from "../../../interfaces/Company";
import { IEnterprise } from "../../../interfaces/Enterprise";
import SaveIcon from "@material-ui/icons/Save";
import { EventualPayroll } from "../../../interfaces/TabEventualPayroll.interfaces";
import EyeIcon from "../../../assets/svg/eye.svg";
import RemoveFile from "../../../assets/svg/remove_file.svg";
import File_Helper from "../Expedient/Fields/File_Helper";

const HiringData = (props: any) => {
  const { data: resultCompany } = useQuery(GET_ALL_ENTERPRISE);
  const allCompanies = resultCompany?.GET_ALL_ENTERPRISE;
  const [companies, setCompanies] = useState([]);
  const [archives, setArchives] = useState([]);

  const { data: resultPayRollGroup } = useQuery(GET_ALL_PAYROLL_GROUP);
  const allPayRollGroups = resultPayRollGroup?.GET_ALL_PAYROLL_GROUP;
  const [payRollGroups, setPayRollGroups] = useState([]);

  const [tipoContratacion, setTipoContratacion] = useState("Directa");
  const [vigenciaContrato, setVigenciaContrato] = useState("");
  const [totalSalary, setTotalSalary] = useState("");
  const [tipoEsquema, setTipoEsquema] = useState("Nomina");
  const [recordableSalary, setRecordableSalary] = useState("");
  const [notRecordableSalary, setNotRecordableSalary] = useState("");
  const [typeContract, setTypeContract] = useState("indefinida");
  const [typeSalary, setTypeSalary] = useState("Bruto");
  const [employerRegister, setEmployerRegister] = useState("");
  const [idEnterprise, setIdEnterprise] = useState("");
  const [idPayRollGroup, setIdPayRollGroup] = useState("");
  const [journey, setJourney] = useState("");
  const { state, dispatch } = useContext(CollaboratorContext);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [cartaOferta, setCartaOferta] = useState<any>("");

  const [updateColaboradores] = useMutation(UPDATE_USERS);

  const sueldoMinimo = (5186.10).toFixed(2);

  const params = useParams();

  useEffect(() => {
    if (state.collaborator) {
      setTipoContratacion(state.collaborator?.tittle);
      setTipoEsquema(state.collaborator?.nominesPayroll);
      setVigenciaContrato(
        moment(state.collaborator?.dateContractDate).format("YYYY-MM-DD")
      );
      setTypeContract(state.collaborator?.typeContract);
      setTotalSalary(state.collaborator?.totalSalary);
      setRecordableSalary(state.collaborator?.recordableSalary);
      setNotRecordableSalary(state.collaborator?.notRecordableSalary);
      setTypeSalary(state.collaborator?.typeSalary);
      setEmployerRegister(state.collaborator?.EmployerRegister);
      setIdEnterprise(state.collaborator?.idEnterprise);
      setJourney(state.collaborator?.journey);
      setIdPayRollGroup(state.collaborator?.id_payroll_group);
      // setCartaOferta(state.collaborator.cartaOferta);
      if (state.collaborator?.archive) {
        setArchives(state.collaborator.archive);
      }
    }
    if (allCompanies) {
      setCompanies(allCompanies);
    }
    if (allPayRollGroups) {
      setPayRollGroups(allPayRollGroups);
    }
  }, [allCompanies, allPayRollGroups]);

  const handleChange = async (e: any) => {
    await updateData(e, state, dispatch, 0);
  };

  const handleChangeFile = async (e: any) => {
    setCartaOferta(e.target.files[0].filename);
    await updateFile(e.target.files, state, dispatch);
    e.target.value = null;
  };

  const cambioTipoContratacion = async (e: any) => {
    setTipoContratacion(e.target.value);
    await updateData(e, state, dispatch, 0);
  };
  const handleTypeContract = async (e: any) => {
    setTypeContract(e.target.value);
    await updateData(e, state, dispatch, 0);
  };
  const cambioTipoEsquema = async (e: any) => {
    setTipoEsquema(e.target.value);
    await updateData(e, state, dispatch, 0);
  };
  const handleTypeSalary = async (e: any) => {
    setTypeSalary(e.target.value);
    await updateData(e, state, dispatch, 0);
  };
  const handleRecordableSalary = async (e: any) => {
    setRecordableSalary(e.target.value);
    await updateData(e, state, dispatch, 0);
  };
  const handleNotRecordableSalary = async (e: any) => {
    setNotRecordableSalary(e.target.value);
    await updateData(e, state, dispatch, 0);
  };
  const handleDateContractDate = async (e: any) => {
    setVigenciaContrato(e.target.value);
    await updateData(e, state, dispatch, 0);
  };
  const handleEmployerRegister = async (e: any) => {
    setEmployerRegister(e.target.value);
    await updateData(e, state, dispatch, 0);
  };
  const handleJourney = async (e: any) => {
    setJourney(e.target.value);
    await updateData(e, state, dispatch, 0);
  };
  const handleIdEnterprise = async (e: any) => {
    debugger;
    setIdEnterprise(e.target.value);
    await updateData(e, state, dispatch, 0);
  };

  const initialValues = () => {
    return {
      tittle: state.collaborator?.tittle,
      EmployerRegister: state.collaborator?.EmployerRegister,
      journey: state.collaborator?.journey,
      typeContract: state.collaborator?.typeContract,
      dateContractDate: state.collaborator?.dateContractDate,
      nominesPayroll: state.collaborator?.nominesPayroll,
      ingresoBruto: state.collaborator?.ingresoBruto,
      ingresoNeto: state.collaborator?.ingresoNeto,
      grossSalary: state.collaborator?.grossSalary,
      recordableSalary: state.collaborator?.recordableSalary,
      notRecordableSalary: state.collaborator?.notRecordableSalary,
      totalSalary: state.collaborator?.totalSalary,
      periodicidadDePago: state.collaborator?.periodicidadDePago,
      idEnterprise: state.collaborator?.idEnterprise,
      typeSalary: state.collaborator?.typeSalary,
      id_payroll_group: state.collaborator?.id_payroll_group,
    };
  };

  const validationSchema = () => {
    return {
      // dateContractDate: Yup.string().required("es necesario que elija una fecha"),
      grossSalary: Yup.number()
        .moreThan(5185.99)
        .required("el campo es requerido y no puede ser menor a  5186.10"),
      //   recordableSalary: Yup.number()
      //   .when("nominesPayroll", {
      //     is: tipoEsquema === "Mixto",
      //     then: Yup.number().moreThan(5186)
      //     .required("el campo es requerido y no puede ser menor a  5186.10")
      //   }),
      // notRecordableSalary: Yup.number()
      //   .when("nominesPayroll", {
      //     is: tipoEsquema === "Mixto",
      //     then: Yup.number().moreThan(5186)
      //     .required("el campo es requerido y no puede ser menor a  5186.10")
      //   }),
    };
  };

  //useEffect to print in console de formik.erros

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      formData.grossSalary = parseFloat(formData.grossSalary);
      formData.recordableSalary = parseFloat(formData.recordableSalary);
      formData.notRecordableSalary = parseFloat(formData.notRecordableSalary);
      formData.idEnterprise = parseInt(formData.idEnterprise);
      formData.id_payroll_group = parseInt(formData.id_payroll_group);
      debugger;

      console.log("formdata", formData);
      updateColaboradores({
        variables: {
          updateUsersId: state.collaborator?.id,
          input: formData,
        },
      }).then(() => {
        SuccessfulAlert({ text: "Se actualiz?? correctamente" });
        // dispatch({
        //   type: Types.SET_COLLABORATOR,
        //   payload: {
        //     progress: [100, 0, 0, 0],
        //     sections: [100, 100, 100, 0],
        //   },
        // });
      });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="novalidate__border">
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
                defaultValue="Directa"
                name="tittle"
              >
                <FormControlLabel
                  control={<Radio size="small" style={{ color: "#fabb00" }} />}
                  label="Contrataci??n directa"
                  value="Directa"
                  checked={tipoContratacion === "Directa" ? true : false}
                  onChange={cambioTipoContratacion}
                  name="tittle"
                  onBlur={formik.handleChange}
                />
                <FormControlLabel
                  control={<Radio size="small" style={{ color: "#fabb00" }} />}
                  label="Outsource"
                  value="outsource"
                  checked={tipoContratacion === "outsource" ? true : false}
                  onChange={cambioTipoContratacion}
                  name="tittle"
                  onBlur={formik.handleChange}
                />
              </RadioGroup>
            </FormControl>
            {tipoContratacion === "Directa" ? (
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
                    onBlur={formik.handleChange}
                    onChange={formik.handleChange}
                    name="idEnterprise"
                    defaultValue={idEnterprise || ""}
                    autoFocus={true}
                    disabled={disabled}
                    style={{ height: "42px" }}
                    variant="outlined"
                  >
                    {companies.map(({ name, id }: IEnterprise, index: number) => (
                      <>
                        {idEnterprise == id ? (
                          <option key={index} value={id} selected>
                            {name}
                          </option>
                        ) : (
                          <option key={index} value={id}>
                            {name}
                          </option>
                        )}
                      </>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  variant="outlined"
                  fullWidth={true}
                  size="small"
                  style={{ width: "200px" }}
                >
                  {/* <InputLabel>Registro patronal</InputLabel> */}
                  <br></br>
                  <TextField
                    label="Registro patronal"
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    size="small"
                    name="EmployerRegister"
                    onChange={(e) => handleEmployerRegister(e)}
                    onBlur={formik.handleChange}
                    value={employerRegister ?? ""}
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
                      onBlur={formik.handleChange}
                      name="idEnterprise"
                      onChange={formik.handleChange}
                      defaultValue={idEnterprise || ""}
                      autoFocus={true}
                      disabled={disabled}
                      style={{ height: "42px" }}
                      variant="outlined"
                    >
                      {companies.map(
                        ({ name, id }: IEnterprise, index: number) => (
                          <>
                            {idEnterprise == id ? (
                              <option key={index} value={id} selected>
                                {name}
                              </option>
                            ) : (
                              <option key={index} value={id}>
                                {name}
                              </option>
                            )}
                          </>
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
                    onChange={(e) => handleEmployerRegister(e)}
                    onBlur={formik.handleChange}
                    value={employerRegister ?? ""}
                  />
                  <TextField
                    label="Jornada"
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    size="small"
                    name="journey"
                    onChange={(e) => handleJourney(e)}
                    onBlur={formik.handleChange}
                    value={journey ?? ""}
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
                name="typeContract"
              >
                <FormControlLabel
                  control={<Radio size="small" style={{ color: "#fabb00" }} />}
                  onChange={(e) => handleTypeContract(e)}
                  label="Indefinida"
                  value="indefinida"
                  name="typeContract"
                  checked={typeContract === "indefinida" ? true : false}
                  onBlur={formik.handleChange}
                />
                <FormControlLabel
                  control={<Radio size="small" style={{ color: "#fabb00" }} />}
                  label="Temporal"
                  value="temporal"
                  onChange={(e) => handleTypeContract(e)}
                  name="typeContract"
                  checked={typeContract === "temporal" ? true : false}
                  onBlur={formik.handleChange}
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
          defaultValue={
            state.collaborator
              ? moment(state.collaborator.dateContractDate).format("YYYY-MM-DD")
              : ""
          }
          onBlur={handleChange}
          InputProps={{
            inputProps: {
              min: moment().format("YYYY-MM-DD"),
            },
          }}
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
                  onBlur={formik.handleChange}
                />
                <FormControlLabel
                  value="Mixto"
                  control={<Radio size="small" style={{ color: "#fabb00" }} />}
                  label="Mixto"
                  checked={tipoEsquema === "Mixto" ? true : false}
                  onChange={cambioTipoEsquema}
                  name="nominesPayroll"
                  onBlur={formik.handleChange}
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
                onBlur={formik.handleChange}
              >
                <FormControlLabel
                  value="Bruto"
                  control={<Radio size="small" style={{ color: "#fabb00" }} />}
                  label="Ingreso bruto"
                  name="typeSalary"
                  onChange={(e) => handleTypeSalary(e)}
                  checked={typeSalary === "Bruto" ? true : false}
                  onBlur={formik.handleChange}
                />
                <FormControlLabel
                  value="Neto"
                  control={<Radio size="small" style={{ color: "#fabb00" }} />}
                  label="Ingreso neto"
                  name="typeSalary"
                  onChange={(e) => handleTypeSalary(e)}
                  checked={typeSalary === "Neto" ? true : false}
                  onBlur={formik.handleChange}
                />
                <TextField
                  style={{ width: "200px" }}
                  label="Ingreso mensual bruto"
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  size="small"
                  defaultValue={totalSalary ?? sueldoMinimo}
                  name="grossSalary"
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
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    handleChange(e);
                  }}
                  error={Boolean(formik.errors.grossSalary)}
                  helperText={
                    Boolean(formik.errors.grossSalary) &&
                    "el campo es requerido y no puede ser menor a  5186.10"
                  }
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
                  name="grabable"
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
                    onBlur={formik.handleChange}
                    checked={typeSalary === "Bruto" ? true : false}
                    onChange={formik.handleChange}
                  />
                  <FormControlLabel
                    value="Neto"
                    control={
                      <Radio size="small" style={{ color: "#fabb00" }} />
                    }
                    label="Neto"
                    name="typeSalary"
                    onBlur={formik.handleChange}
                    checked={typeSalary === "Neto" ? true : false}
                    onChange={formik.handleChange}
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
                    helperText={
                      formik.errors.recordableSalary &&
                      "el campo es requerido y no puede ser menor a  5186.10"
                    }
                    name="recordableSalary"
                    onBlur={(e) => handleRecordableSalary(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    defaultValue={recordableSalary ?? 0}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
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
                helperText={
                  formik.errors.notRecordableSalary &&
                  "el campo es requerido y no puede ser menor a  5186.10"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                defaultValue={notRecordableSalary ?? 0}
                onBlur={(e) => handleNotRecordableSalary(e)}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
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
                defaultValue={totalSalary ?? sueldoMinimo}
                style={{ background: "#f1f2f5" }}
                name="totalSalary"
                onBlur={formik.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </>
        )}
      </div>
      <div className="novalidate__border">
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
            onBlur={formik.handleChange}
          />

          <Grid xs item>
            <Grid
              direction="row"
              container
              justify="flex-end"
              alignItems="center"
            >
             <label style={{"marginRight":"10px"}}>Carta Oferta</label>
              <br />
              {/*AVISO DE RETENCI??N  */}
              {archives?.map(
                (archive: any, index: number) =>
                  archive?.name === "CartaOferta" && (
                    <div className="flex-container">
                      <div className="flex-child">
                       
                        <span className="span-file">
                          <a
                            className="view-document"
                            target="_blank"
                            href={archive.URL}
                          >
                            <img
                              style={{ height: "10px", marginTop: "5px" }}
                              src={EyeIcon}
                              alt=""
                            />
                            Ver documento
                          </a>
                        </span>
                      </div>

                      <div className="flex-child-2">
                        <File_Helper
                          name="CartaOferta"
                          accept=".pdf"
                          parametrofrom="collaborator"
                          idUsr={state.collaborator?.id}
                          className="image-file"
                          setArchives={setArchives}
                          archives={archives}
                          image={RemoveFile}
                          remove_file={true}
                        />
                      </div>
                    </div>
                  )
              )}
              {!state.collaborator?.CartaOferta && (
                <div className="flex-container">
                

                  <div className="flex-child-2">
                    <File_Helper
                      name="CartaOferta"
                      accept=".pdf"
                      parametrofrom="collaborator"
                      idUsr={state.collaborator?.id}
                      className="image-file"
                      setArchives={setArchives}
                      archives={archives}
                      style={{ marginRight: "15px" }}
                    />
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
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
    // dateContractDate: Yup.string().required("es necesario que elija una fecha"),
    grossSalary: Yup.number()
      .moreThan(5186)
      .required("el campo es requerido y no puede ser menor a  5186.10"),
    //   ingresoNeto: Yup.number()
    //   .when("Mixto", {
    //     is: true,
    //     then: Yup.number().moreThan(5186)
    //     .required("el campo es requerido y no puede ser menor a  5186.10")
    //   }),
    // notRecordableSalary: Yup.number()
    //   .when("Mixto", {
    //     is: (state.collaborator.nomina) => state.collaborator.nomina.length > 0,
    //     then: Yup.number().moreThan(5186)
    //     .required("el campo es requerido y no puede ser menor a  5186.10")
    //   }),
  };
};

export default HiringData;
