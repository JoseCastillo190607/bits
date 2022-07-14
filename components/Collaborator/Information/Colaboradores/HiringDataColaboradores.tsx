import { useEffect, useState, useContext } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Button,
} from "@material-ui/core";
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import {
  updateData,
  updateFile,
} from "../../../../helpers/Collaborator/Collaborator";
import { Select } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { putCandidate } from "../../../../services/candidateService";
import SaveIcon from "@material-ui/icons/Save";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { useMutation } from "@apollo/client";

import {UPDATE_USERS} from "../../../../Querys/querys";

const HiringDataColaboradores = (props: any) => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [cartaOferta, setCartaOferta] = useState<any>("");
  const { adminState } = useContext(AdminContext);

  
    
const [updateColaboradores] = useMutation(UPDATE_USERS);


  const params = useParams();
  console.log("Props prueba", props);

  useEffect(() => {
    if ("register" in params) setDisabled(true);
  }, [params]);

  const handleChange = async (e: any) => {
    await updateData(e, state, dispatch, 0);
  };

  const handleChangeFile = async (e: any) => {
    setCartaOferta(e.target.files[0].filename);
    await updateFile(e.target.files, state, dispatch);
    e.target.value = null;
  };

  const UpdateCandidate = async () => {
    // let result = await putCandidate(
    //   state.collaborator,
    //   state.collaborator.Estatus === "sent" ? "si" : "no"
    // );

    updateColaboradores({
      variables: {
          updateUsersId: state.collaborator?.id,
        input: {
          contractName: state.collaborator?.contractName,
          netSalary: state.collaborator?.netSalary,
          grossSalary: state.collaborator?.grossSalary,
          DS: state.collaborator?.DS,
          ISD: state.collaborator?.ISD,
          Company: state.collaborator?.Company,
          paymentPeridicity: state.collaborator?.paymentPeridicity,
          journey: state.collaborator?.journey,
          nominesPayroll: state.collaborator?.nominesPayroll
        },
      },
    });

    await SuccessfulAlert({ text: "Datos guardados correctamente." });

    // if (result === true) {
    //   await SuccessfulAlert({ text: "Datos guardados correctamente." });
    // }
  };

  return (
    <>
      <div
        className={
          state.sections[2] >= 100 ? `validate__border` : `novalidate__border`
        }
      >
        <Grid direction="row" container spacing={2}>
          <Grid xs item>
            <FormControl variant="outlined" fullWidth={true} size="small">
              <InputLabel htmlFor="outlined-age-native-simple">
                Tipo de contrato
              </InputLabel>
              <Select
                native
                onBlur={(e) => handleChange(e)}
                label={"Tipo de contrato"}
                name="contractName"
                defaultValue={state.collaborator.contractName || ""}
                autoFocus={true}
                disabled={disabled}
              >
                <option
                  value={state.collaborator.contractName || ""}
                  disabled={true}
                >
                  {state.collaborator.contractName || ""}
                </option>
                <option value={"Determinado"}>Determinado</option>
                <option value={"Indeterminado"}>Indeterminado</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs item>
            <TextField
              type="number"
              name="netSalary"
              defaultValue={state.collaborator.netSalary}
              autoFocus={true}
              label="Sueldo neto"
              variant="outlined"
              size="small"
              fullWidth={true}
              onBlur={(e) => handleChange(e)}
              InputProps={{
                readOnly: false,
              }}
              disabled={disabled}
            />
          </Grid>
        </Grid>
        <Grid direction="row" container spacing={2}>
          <Grid xs item>
            <TextField
              type="number"
              name="grossSalary"
              defaultValue={state.collaborator.grossSalary}
              autoFocus={true}
              label="Sueldo bruto"
              variant="outlined"
              size="small"
              fullWidth={true}
              onBlur={(e) => handleChange(e)}
              InputProps={{
                readOnly: false,
              }}
              disabled={disabled}
            />
          </Grid>
          <Grid xs item>
            <TextField
              type="number"
              name="DS"
              label="Salario Diario"
              variant="outlined"
              defaultValue={state.collaborator.DS}
              size="small"
              fullWidth={true}
              onBlur={(e) => handleChange(e)}
              InputProps={{
                readOnly: false,
              }}
              disabled={disabled}
            />
          </Grid>
        </Grid>
        <Grid direction="row" container spacing={2}>
          <Grid xs item>
            <TextField
              type="number"
              name="ISD"
              defaultValue={state.collaborator.ISD}
              autoFocus={true}
              label="S.D.I"
              variant="outlined"
              size="small"
              fullWidth={true}
              onBlur={(e) => handleChange(e)}
              InputProps={{
                readOnly: false,
              }}
              disabled={disabled}
            />
          </Grid>
          <Grid xs item>
            <FormControl variant="outlined" fullWidth={true} size="small">
              <InputLabel htmlFor="outlined-age-native-simple">
                Razón social
              </InputLabel>
              <Select
                native
                onBlur={(e) => handleChange(e)}
                label={"Razón social"}
                name="Company"
                defaultValue={state.collaborator.Company || ""}
                autoFocus={true}
                disabled={disabled}
              >
                <option
                  value={state.collaborator.Company || ""}
                  disabled={true}
                >
                  {state.collaborator.Company || ""}
                </option>
                <option value={"IT-Seekers"}>IT-Seekers</option>
                <option value={"SISTEMAS EMPRESARIALES ANDARES"}>
                  SISTEMAS EMPRESARIALES ANDARES
                </option>
                <option value={"T&T EXPERTS S.C."}>T&T EXPERTS S.C.</option>
                <option value={"TECHNOLOGIES MRT"}>TECHNOLOGIES MRT</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <Box mt={2}>
        <div
          className={
            state.sections[2] >= 100 ? `validate__border` : `novalidate__border`
          }
        >
          <Grid direction="row" container spacing={2}>
            <Grid xs item>
              <FormControl variant="outlined" fullWidth={true} size="small">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Periodicidad de pago
                </InputLabel>
                <Select
                  native
                  onBlur={(e) => handleChange(e)}
                  label={"Periodicidad de pago"}
                  name="paymentPeridicity"
                  defaultValue={state.collaborator.paymentPeridicity || ""}
                  autoFocus={true}
                  disabled={disabled}
                >
                  <option
                    value={state.collaborator.paymentPeridicity || ""}
                    disabled={true}
                  >
                    {state.collaborator.paymentPeridicity || ""}
                  </option>
                  <option value={"Semanal"}>Semanal</option>
                  <option value={"Quincenal"}>Quincenal</option>
                  <option value={"Mensual"}>Mensual</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs item>
              <FormControl variant="outlined" fullWidth={true} size="small">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Jornada
                </InputLabel>
                <Select
                  native
                  onBlur={(e) => handleChange(e)}
                  label={"Jornada"}
                  name="journey"
                  defaultValue={state.collaborator.journey || ""}
                  autoFocus={true}
                  disabled={disabled}
                >
                  <option
                    value={state.collaborator.journey || ""}
                    disabled={true}
                  >
                    {state.collaborator.journey || ""}
                  </option>
                  <option value={"Part Time"}>Part Time</option>
                  <option value={"Full Time"}>Full Time</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid direction="row" container spacing={2}>
            <Grid xs item>
              <FormControl variant="outlined" fullWidth={true} size="small">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Esquema de nómina
                </InputLabel>
                <Select
                  native
                  onBlur={(e) => handleChange(e)}
                  label={"Esquema de nómina"}
                  name="nominesPayroll"
                  defaultValue={state.collaborator.nominesPayroll || ""}
                  onChange={(e) => handleChange(e)}
                  disabled={disabled}
                >
                  <option
                    value={state.collaborator.nominesPayroll || ""}
                    disabled={true}
                  >
                    {state.collaborator.nominesPayroll || ""}
                  </option>
                  <option value={"Nominal"}>Nominal</option>
                  <option value={"Sindical"}>Sindical</option>
                  <option value={"Mixto"}>Mixto</option>
                </Select>
              </FormControl>
            </Grid>
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
                  {!state.collaborator.new ? (
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
          {Math.round(state.sections[2]) < 100 && (
            <span className="spanRequerido">
              Todos los campos son obligatorios
            </span>
          )}
        </div>
      </Box>
      <div>
        <Grid direction="row" container justify="flex-end" alignItems="center">
          <Box mt={0} pt={1}>
            {adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores
              ?.Ver?.InformacionAlta?.InformacionPersonal.Editar === true ? (
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
        </Grid>
      </div>
    </>
  );
};

export default HiringDataColaboradores;
