import { ElementType, useState, useContext, ChangeEvent } from "react";
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
} from "../../context/CollaboratorContext/CollaboratorContext";
import { IPROPS } from "../../interfaces/Collaborator";
import {
  acceptInformation,
  postCandidate,
  putCandidate,
} from "../../services/candidateService";
import { ErrorAlert } from "../../alerts/errorAlert";
import { LoadingUser } from "../../alerts/loadingAlerts";
import { useEffect } from "react";
import { SuccessfulAlert } from "../../alerts/successAlerts";
import {
  fetchingAllData,
  updateCollaborator,
} from "../../helpers/Collaborator/Collaborator";
import { WarningAlert } from "../../alerts/WarningAlert";
import { AdminContext } from "../../context/AdminContext/AdminContext";
import { validAllData } from "../../helpers/Collaborator/validAllData";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ArrowLeft from "../../assets/svg/blue_arrow_left.svg";
import ArrowRight from "../../assets/svg/blue_arrow_right.svg";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USERS,GET_USERS_BY_ID } from "../../Querys/querys";

// import from
const List = ({
  tab = "Nuevos Ingresos",
  numTab,
  title,
  labels = [],
  components = [],
  back = "/collaborators/id/0",
  progress = 0,
}: IPROPS) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [returnPill, setAReturnPill] = useState<number>(0);
  const [tabText, setTabText] = useState<string>(tab);
  const [tabNumber, setTab] = useState<number>(0);
  const history = useHistory();
  const params = useParams<any>();
  const { state, dispatch } = useContext(CollaboratorContext);
  const { adminState } = useContext(AdminContext);
  const [updateColaboradores] = useMutation(UPDATE_USERS);
  // const { data:resultCollaborator} = useQuery(GET_USERS_BY_ID, {
  //   variables: { getUsersId: params.id },
  // });

  useEffect(() => {
    if (params.id !== "id" && params.id !== "new" && !("register" in params))
      LoadingUser();
    let pill = localStorage.getItem("currentPill");
    if (pill) {
      setAReturnPill(Number(pill));
      if (pill === "1") setTabText("Colaboradores");
      if (pill === "3") setTabText("Inactivos");
    }
    if ("tab" in params) {
      setTab(parseInt(params.tab));
    }
  }, [params]);

  const handleNext = (index: number) => {
    setActiveStep(index);
  };

  useEffect(() => {
    console.log("activeStep", activeStep);
  }, [activeStep]);

  const onBack = () => {
    if (returnPill === 0) localStorage.setItem("currentPill", "0");
    if (returnPill === 1) localStorage.setItem("currentPill", "1");
    if (returnPill === 3) localStorage.setItem("currentPill", "3");
    history.push(back);
  };

  const CreateNewUser = async (): Promise<void> => {
    if (Math.round(state.progress[0]) >= 100) {
      if (!state.collaborator?.Archivos?.CartaOferta) {
        await WarningAlert({ text: "Coloque la carta oferta." });
      } else {
        state.collaborator.Anfitrion = adminState?.Usuario;
        let result = await postCandidate(state.collaborator);
        if (result === true) {
          await SuccessfulAlert({
            text: "El Nuevo ingreso se ha agregado exitosamente.",
          });
          await history.push("/collaborators/id/0");
        } else {
          await updateCollaborator(state.collaborator, dispatch);
          await fetchingAllData(state.collaborator, dispatch, "1");
        }
      }
    } else ErrorAlert({ text: "Ingrese todos los campos." });
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

  const SendCandidate = async () => {
    let result2 = await WarningAlert({
      title: "Aceptar informaci??n ",
      text: "??Estas seguro de finalizar el proceso?",
      showDenyButton: true,
      confirmButtonText: "De Acuerdo",
    });
    if (result2.isConfirmed) {
      let result = await putCandidate(
        state.collaborator,
        state.collaborator.Estatus === "sent" ? "si" : "no"
      );
      if (result === true) {
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
      }
    }
  };

  const AcceptInformation = async () => {
    let result = await WarningAlert({
      title: "Aceptar informaci??n ",
      text: "Estoy de acuerdo que la informaci??n ingresada es correcta",
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
        title: "Aceptar informaci??n ",
        text: "??Estas seguro de finalizar el proceso?",
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

    /*  let result = await validAllData(state);

        if (typeof (result) === "boolean") {
            window.location.hash = "no-back-button";
            window.location.hash = "Again-No-back-button";//esta linea es necesaria para chrome
            window.onhashchange = function () { window.location.hash = `${state.collaborator.Nombre}-${state.collaborator.ApellidoPaterno}`; }
            history.push('/Bienvenido');
        } else return WarningAlert({ text: result }); */
  };

  const handleChange = (e: any, side: string) => {
    e.preventDefault();

    let numtab = parseInt(params.tab);
    if (side === "left") {
      if (numtab > 1) {
        history.push(`${numtab - 1}`);
      }
    }
    if (side === "right") {
      if (numtab < 5) {
        history.push(`${numtab + 1}`);
      }
    }
  };

  const UpdateUser = async () => {
    console.log("state.collaborator", state.collaborator);
    
    let {
      name,
      firstName,
      lastName,
      dateOfBirth,
      email,
      dateOfAdmission,
      userType,
      project,
      campus,
      client,
      password,
      active,
      token,
      linkedAccount,
      cellphone,
      area,
      tittle,
      officePlace,
      bussinesName,
      contractName,
      netSalary,
      grossSalary,
      DS,
      ISD,
      nominesPayroll,
      paymentPeridicity,
      comment,
      userStatus,
      expiredAlta,
      expiredPersonales,
      currentToken,
      host,
      address,
      municipality,
      state:stateName,
      ZC,
      country,
      placeOfBirth,
      nacionality,
      gender,
      civilStatus,
      children,
      educationalLevel,
      ClaveElectoralPasaporte,
      IMSS,
      CURP,
      workPermission,
      creditoInfonavit,
      benefitiary,
      emergencyContact,
      diseases,
      bank,
      accountNumber,
      clabeNum,
      RFC,
      id_payroll_group,
      SDG,
      id_User,
      id_Bank,
      done,
      collaborator,
      drop,
      baja,
      Puesto,
      Company,
      suburb,
      benefitiaryCountry,
      benefitiaryState,
      benefitiaryMunicipality,
      benefitiaryCURP,
      ParentescoB,
      benefitiaryDateOfBirth,
      benefitiaryZC,
      benefitiaryAddress,
      benefitiarySuburb,
      ParentescoCE,
      cellphoneCE,
      phoneCE,
      suburbCE,
      addressCE,
      Alergias,
      PadEnfer,
      Cirugias,
      TraMeRe,
      dropDate,
      dropType,
      dateContractDate,
      recordableSalary,
      notRecordableSalary,
      EmployerRegister,
      totalSalary,
      typeContract,
      typeSalary,
      idEnterprise,
      journey
    } = state.collaborator;

    debugger;


    updateColaboradores({
      variables: {
        updateUsersId: state.collaborator?.id,
        input: {
          name,
          firstName,
          lastName,
          dateOfBirth,
          email,
          dateOfAdmission,
          userType,
          project,
          campus,
          client,
          password,
          active,
          token,
          linkedAccount,
          cellphone,
          area,
          tittle,
          officePlace,
          bussinesName,
          contractName,
          netSalary,
          grossSalary: parseFloat(grossSalary),
          DS,
          ISD,
          nominesPayroll,
          paymentPeridicity,
          journey,
          comment,
          userStatus,
          expiredAlta,
          expiredPersonales,
          currentToken,
          host,
          address,
          municipality,
          state: stateName,
          ZC,
          country,
          placeOfBirth,
          nacionality,
          gender,
          civilStatus,
          children: parseInt(children),
          educationalLevel,
          ClaveElectoralPasaporte,
          IMSS,
          CURP,
          workPermission,
          creditoInfonavit,
          benefitiary,
          emergencyContact,
          diseases,
          bank,
          accountNumber,
          clabeNum,
          RFC,
          id_payroll_group,
          SDG,
          id_User,
          id_Bank,
          done,
          collaborator,
          drop,
          baja,
          Puesto,
          Company,
          suburb,
          benefitiaryCountry,
          benefitiaryState,
          benefitiaryMunicipality,
          benefitiaryCURP,
          ParentescoB,
          benefitiaryDateOfBirth,
          benefitiaryZC,
          benefitiaryAddress,
          benefitiarySuburb,
          ParentescoCE,
          cellphoneCE,
          phoneCE,
          suburbCE,
          addressCE,
          Alergias,
          PadEnfer,
          Cirugias,
          TraMeRe,
          dropDate,
          dropType,
          dateContractDate,
          recordableSalary: parseFloat(recordableSalary),
          notRecordableSalary: parseFloat(notRecordableSalary),
          totalSalary: parseFloat(totalSalary),
          typeContract,
          typeSalary,
          idEnterprise: parseInt(idEnterprise),
          EmployerRegister
        },
      }
    }).then(res => {
      SuccessfulAlert({ text: "Se actualiz?? correctamente" });
    });
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
            {components === undefined || components === null
              ? null
              : components?.map((Component: ElementType, index: number) => (
                  <div key={index} hidden={index === activeStep ? false : true}>
                    {state.collaborator === undefined ||
                    state.collaborator === null ? (
                      // <div style={{ color: "red" }}>Error</div>
                      <> </>
                    ) : (
                      Object?.keys(state?.collaborator).length > 1 &&
                      !state?.collaborator?.new && <Component />
                    )}

                    {state?.collaborator?.new && <Component />}
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
            {/* aqui estoy trabajando */}

            <Box mt={5} pt={1} pr={8}>
              {/* {(tabNumber == 1 && activeStep == 2) ||
              (tabNumber == 2 && activeStep == 2) ||
              (tabNumber == 3 && activeStep == 2) ||
              (tabNumber == 4 && activeStep == 0) ||
              (tabNumber == 5 && activeStep == 2) ? (
                <Button
                  type="button"
                  className={
                    Math.round(state.progress[0]) >= 100
                      ? "buttonSaveCompletes"
                      : "buttonSave"
                  }
                  onClick={UpdateUser}
                >
                  <SaveIcon />
                  &nbsp; Guardar
                </Button>
              ) : (
                <></>
              )} */}
              {/* <Button
                  type="button"
                  className={
                    Math.round(state.progress[0]) >= 100
                      ? "buttonSaveCompletes"
                      : "buttonSave"
                  }
                  onClick={UpdateUser}
                >
                  <SaveIcon />
                  &nbsp; Guardar
                </Button> */}

              <Button
                type="button"
                onClick={(e) => handleChange(e, "left")}
                style={{ color: "#093C5D" }}
                className="button-arrow-tabs"
                disabled={activeStep === 1}
              >
                {/* tag image with src=ArrowLeft */}
                <img
                  src={ArrowLeft}
                  alt="ArrowLeft"
                  style={{ width: "20px", height: "20px" }}
                />
                &nbsp; regresar
              </Button>

              <Button
                type="button"
                onClick={(e) => handleChange(e, "right")}
                style={{ color: "#093C5D" }}
                className="button-arrow-tabs"
                disabled={params.id === "1"}
              >
                {/* tag image with src=ArrowLeft */}
                Siguiente &nbsp;
                <img
                  src={ArrowRight}
                  alt="ArrowRight"
                  style={{ width: "20px", height: "20px" }}
                />
              </Button>
            </Box>

            {/* ------- */}

            <Box mt={0} pt={1}>
              {
                /* Nuevo Ingreso */
                state?.collaborator?.new &&
                activeStep === 2 &&
                params.id === "new" ? (
                  <Button
                    type="button"
                    className={
                      Math.round(state.progress[0]) >= 100
                        ? "buttonSaveCompletes"
                        : "buttonSave"
                    }
                    onClick={CreateNewUser}
                  >
                    Guardar y Enviar&nbsp;
                    <SaveIcon />
                  </Button>
                ) : null
              }
              {
                /*
                                /* Edit User from admin whit Estatus SENT */
                //params.id !== 'new' && !state.band
                //&& params.tab !== '5'
                //&& returnPill !== 3
                // && state.collaborator.Estatus !== "sent" && (
                //   <Button type="submit" className="buttonSave" onClick={UpdateUser}>
                //     Guardar y Continuar&nbsp;<SaveIcon />
                // </Button>
                // )
              }
              {
                /* Edit User from admin */
                params?.id !== "new" &&
                  !state?.band &&
                  params?.tab !== "5" &&
                  returnPill !== 3 &&
                  state?.collaborator?.Estatus === "sent" && (
                    <Button
                      type="submit"
                      className={
                        Math.round(state.progress[0]) >= 100
                          ? "buttonSaveCompletes"
                          : "buttonSave"
                      }
                      onClick={UpdateUser}
                    >
                      Guardar&nbsp;
                      <SaveIcon />
                    </Button>
                  )
              }
              {
                /* Accept Informacion */
                state?.collaborator?.Estatus &&
                  state?.collaborator?.Estatus !== "accepted" &&
                  state?.band &&
                  params?.tab === "1" &&
                  activeStep === 2 && (
                    <div className="AGREE_INFORMATION">
                      <h2>??Confirmas que toda tu informaci??n es correcta?</h2>
                      <div>
                        <Button
                          type="submit"
                          className="buttonCancel"
                          onClick={() => dispatch({ type: Types.REJECT_DATA })}
                        >
                          <span>NO, mi informaci??n no es correcta</span>&nbsp;
                          <NavigateNextIcon style={{ color: "gray" }} />
                        </Button>
                      </div>
                      <div>
                        <Button
                          type="submit"
                          className="buttonSave"
                          onClick={AcceptInformation}
                        >
                          <span>S??, mi informaci??n esta correcta</span>&nbsp;
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
