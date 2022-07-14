import { ElementType, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Box,
  Button,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CollaboratorContext, {
  Types,
} from "../../../context/CollaboratorContext/CollaboratorContext";
import { IPROPS } from "../../../interfaces/Collaborator";
import {
  acceptInformation,
  postCandidate,
  putCandidate,
} from "../../../services/candidateService";
import { ErrorAlert } from "../../../alerts/errorAlert";
import { LoadingUser } from "../../../alerts/loadingAlerts";
import { useEffect } from "react";
import { SuccessfulAlert } from "../../../alerts/successAlerts";
import {
  fetchingAllData,
  updateCollaborator,
} from "../../../helpers/Collaborator/Collaborator";
import { WarningAlert } from "../../../alerts/WarningAlert";
import { AdminContext } from "../../../context/AdminContext/AdminContext";
import { validAllData } from "../../../helpers/Collaborator/validAllData";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useMutation } from "@apollo/client";
import {
  CREATE_USERS,
  GET_ALL_USERS_NUEVOINGRESO,
} from "../../../Querys/querys";

const List = ({
  tab = "Nuevos Ingresos",
  numTab,
  title,
  labels = [],
  components = [],
  back = "/collaborators/id/0",
  progress = 0,
}: IPROPS) => {
  const [createUserMutation] = useMutation(CREATE_USERS, {
    refetchQueries: [{ query: GET_ALL_USERS_NUEVOINGRESO}],
  });
  const [activeStep, setActiveStep] = useState<number>(0);
  const [returnPill, setAReturnPill] = useState<number>(0);
  const [tabText, setTabText] = useState<string>(tab);
  const history = useHistory();
  const params = useParams<any>();
  const { state, dispatch } = useContext(CollaboratorContext);
  const { adminState } = useContext(AdminContext);

  useEffect(() => {
    console.log("activeStep", activeStep);
  }, [activeStep]);
  useEffect(() => {
    console.log('sectionsss', state.sections);
    console.log('progress', state.progress);
    
  }, [state]);
    

  const handleNext = (index: number) => {
    setActiveStep(index);
  };

  const onBack = () => {
    if (returnPill === 0) localStorage.setItem("currentPill", "0");
    if (returnPill === 1) localStorage.setItem("currentPill", "1");
    if (returnPill === 3) localStorage.setItem("currentPill", "3");
    history.push(back);
  };

  const CreateNewUser = async (): Promise<void> => {
    if (!state.collaborator?.Archivos?.CartaOferta) {
      await WarningAlert({ text: "Coloque la carta oferta." });
    } else {
      state.collaborator.host = adminState?.Usuario;
      // let result = await postCandidate(state.collaborator);
      let {
        Puesto,
        area,
        cellphone,
        client,
        dateOfAdmission,
        email,
        firstName,
        ingresoMensualBruto,
        lastName,
        name,
        journey,
        dateContractDate,
        typeContract,
        idEnterprise,
        EmployerRegister,
        typeSalary,
        recordableSalary,
        notRecordableSalary,
        nominesPayroll
      } = state.collaborator;

      let { data } = await createUserMutation({
        variables: {
          input: {
            name,
            firstName,
            lastName,
            email,
            cellphone,
            client,
            Puesto,
            area,
            dateOfAdmission,
            netSalary: parseFloat(ingresoMensualBruto),
            grossSalary: parseFloat(ingresoMensualBruto),
            journey,
            dateContractDate,
            typeContract,
            idEnterprise: parseInt(idEnterprise),
            EmployerRegister,
            typeSalary,
            recordableSalary: parseFloat(recordableSalary),
            notRecordableSalary: parseFloat(notRecordableSalary),
            nominesPayroll
          },
        },
      });
      if (data) {
        await SuccessfulAlert({
          text: "El Nuevo ingreso se ha agregado exitosamente, continúa llenando su información.",
        });
        console.log("result", data.CREATE_USERS);
        await history.push(`/collaborators/${data.CREATE_USERS.id}/2`);
      } else {
        console.log(data);
        //   await updateCollaborator(state.collaborator, dispatch);
        //   await fetchingAllData(state.collaborator, dispatch, "1");
      }
    }
  };

  // const UpdateUser = async () => {
  //   let result = await putCandidate(
  //     state.collaborator,
  //     state.collaborator.Estatus === "rejected" ? "si" : "no"
  //   );
  //   if (result === true) {
  //     await SuccessfulAlert({
  //       text: "El Nuevo ingreso se ha actualizado exitosamente.",
  //     });
  //     if (state.collaborator.Estatus !== "sent") {
  //       await history.push(`/collaborators/${params.id}/${numTab}`);
  //     }
  //   }
  // };

  const UpdateCandidate = async () => {
    let result = await putCandidate(
      state.collaborator,
      state.collaborator.Estatus === "sent" ? "si" : "no"
    );
    if (result === true) {
      await SuccessfulAlert({ text: "Datos guardados correctamente." });
    }
  };

  // const SendCandidate = async () => {
  //   let result2 = await WarningAlert({
  //     title: "Aceptar información ",
  //     text: "¿Estas seguro de finalizar el proceso?",
  //     showDenyButton: true,
  //     confirmButtonText: "De Acuerdo",
  //   });
  //   if (result2.isConfirmed) {
  //     let result = await putCandidate(
  //       state.collaborator,
  //       state.collaborator.Estatus === "sent" ? "si" : "no"
  //     );
  //     if (result === true) {
  //       await SuccessfulAlert({ text: "Datos enviados correctamente." });
  //       let materno;
  //       if (state.collaborator.ApellidoMaterno == undefined) {
  //         materno = "";
  //       } else {
  //         materno = state.collaborator.ApellidoMaterno;
  //       }
  //       let userName =
  //         state.collaborator.Nombre +
  //         " " +
  //         state.collaborator.ApellidoPaterno +
  //         " " +
  //         materno;
  //       localStorage.setItem("user", userName);
  //     }
  //   }
  // };

  const AcceptInformation = async () => {
    let result = await WarningAlert({
      title: "Aceptar información ",
      text: "Estoy de acuerdo que la información ingresada es correcta",
      showDenyButton: true,
      confirmButtonText: "De Acuerdo",
    });
    if (result.isConfirmed) {
      await acceptInformation(params.token);
      state.collaborator.IAAccepted = true;
      await updateCollaborator(state.collaborator, dispatch);
      history.push(`/candidate/register/${params.token}/2`);
    }
  };

  const FinishingRegister = async () => {
    let result = await validAllData(state);

    if (typeof result === "boolean") {
      let result2 = await WarningAlert({
        title: "Aceptar información ",
        text: "¿Estas seguro de finalizar el proceso?",
        showDenyButton: true,
        confirmButtonText: "De Acuerdo",
      });

      if (result2.isConfirmed) {
        state.collaborator.done = true;
        let result3 = await putCandidate(
          state.collaborator,
          state.collaborator.Estatus === "sent" ? "si" : "no"
        );
        if (result3 === true) {
          await SuccessfulAlert({ text: "Datos enviados correctamente." });
          let materno;
          if (state.collaborator.ApellidoMaterno == undefined) {
            materno = "";
          } else {
            materno = state.collaborator.ApellidoMaterno;
          }
          let userName =
            state.collaborator.Nombre +
            " " +
            state.collaborator.ApellidoPaterno +
            " " +
            materno;
          localStorage.setItem("user", userName);
          localStorage.setItem("reCheck", "true");
          window.location.hash = "no-back-button";
          window.location.hash = "Again-No-back-button"; //esta linea es necesaria para chrome
          window.onhashchange = function () {
            window.location.hash = `${state.collaborator.Nombre}-${state.collaborator.ApellidoPaterno}`;
          };
          history.push("/Bienvenido");
        }
      }
    } else {
      localStorage.setItem("reCheck", "false");
      return WarningAlert({ text: result });
    }
  };

  return (
    <Box>
      <Grid direction="row" container justify="flex-end">
        <Grid xs={4} item>
          <Card>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step key="asd">
                <StepLabel
                  icon={
                    <CircularProgress
                      variant="determinate"
                      value={
                        state.progress[progress] === 0
                          ? 100
                          : Number(state.progress[progress])
                      }
                      size={25}
                      style={{
                        color: `${
                          state.progress[progress] === 0 ? "#dfdfdf" : "#0bc763"
                        }`,
                      }}
                    />
                  }
                >
                  <span className="title__list">{title}</span>
                </StepLabel>
              </Step>
              {labels.map((label: string, index: number) => (
                <Step key={label}>
                  <StepLabel
                    onClick={() => handleNext(index)}
                    icon={
                      Number(state.sections[index]) >= 100 ? (
                        <CheckIcon style={{ color: "#0bc763" }} />
                      ) : (
                        <FiberManualRecordIcon
                          style={{
                            color: index === activeStep ? "#fabb00" : "#dfdfdf",
                            fontSize: "25px",
                          }}
                        />
                      )
                    }
                  >
                    <Grid direction="row" container>
                      <Grid xs={11} item>
                        <span
                          className={
                            index === activeStep
                              ? "selected__label"
                              : "noselected__label"
                          }
                        >
                          {label}
                        </span>
                      </Grid>
                      {index === activeStep ? (
                        <Grid xs item>
                          <Box pt={0}>
                            <ArrowForwardIosIcon
                              style={{ fontSize: "14px", color: "#093c5d" }}
                            />
                          </Box>
                        </Grid>
                      ) : null}
                    </Grid>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Card>
        </Grid>
        <Grid xs item>
          <Grid
            xs={12}
            item
            direction="row"
            container
            justify="flex-end"
            alignItems="center"
          >
            {components?.map((Component: ElementType, index: number) => (
              <div key={index} hidden={index === activeStep ? false : true}>
                <Component />
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid direction="row" container>
        <Grid xs item>
          <Grid
            direction="row"
            container
            justify="flex-start"
            alignItems="center"
          >
            {!state?.band && (
              <>
                <Box mt={5} pt={1}>
                  <ArrowBackIcon
                    fontSize="small"
                    style={{ color: "#fabb00" }}
                  />
                </Box>
                <span className="Return" onClick={onBack}>
                  Regresar a "{tabText}"
                </span>
              </>
            )}
          </Grid>
        </Grid>
        <Grid xs item>
          <Grid
            direction="row"
            container
            justify="flex-end"
            alignItems="center"
          >
            <Box mt={0} pt={1}>
             
              {
                /* Accept Informacion */
                state?.collaborator?.Estatus &&
                  state?.collaborator?.Estatus !== "accepted" &&
                  state?.band &&
                  params?.tab === "1" &&
                  activeStep === 2 && (
                    <div className="AGREE_INFORMATION">
                      <h2>¿Confirmas que toda tu información es correcta?</h2>
                      <div>
                        <Button
                          type="submit"
                          className="buttonCancel"
                          onClick={() => dispatch({ type: Types.REJECT_DATA })}
                        >
                          <span>NO, mi información no es correcta</span>&nbsp;
                          <NavigateNextIcon style={{ color: "gray" }} />
                        </Button>
                      </div>
                      <div>
                        <Button
                          type="submit"
                          className="buttonSave"
                          onClick={AcceptInformation}
                        >
                          <span>SÍ, mi información esta correcta</span>&nbsp;
                          <NavigateNextIcon style={{ color: "#fff" }} />
                        </Button>
                      </div>
                    </div>
                  )
              }
              {
                /* Edit User from candidade */
                "register" in params &&
                  state.band &&
                  params.tab !== "1" &&
                  params.tab !== "5" && (
                    <Button
                      type="submit"
                      className={
                        Math.round(state.progress[Number(params.tab) - 1]) >=
                        100
                          ? "buttonSaveCompletes"
                          : "buttonSave"
                      }
                      onClick={UpdateCandidate}
                    >
                      Guardar&nbsp;
                      <SaveIcon />
                    </Button>
                  )
              }
              {
                /* Finish the process */
                "register" in params && state.band && params.tab === "5" ? (
                  state.collaborator?.Archivos ? (
                    state.collaborator?.Archivos.CartaOfertaFirmada &&
                    state.collaborator?.Archivos.AGREEMENT_PDF ? (
                      <>
                        &nbsp;
                        <Button
                          type="submit"
                          className="buttonFinishRegister"
                          onClick={FinishingRegister}
                        >
                          Enviar&nbsp;
                          <CheckIcon style={{ color: "#fff" }} />
                        </Button>
                      </>
                    ) : null
                  ) : null
                ) : null
              }
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default List;
