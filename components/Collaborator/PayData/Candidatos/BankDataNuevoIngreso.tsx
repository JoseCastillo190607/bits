import { useContext, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Grid,
  Grow,
  Paper,
  FormHelperText,
  Button,
} from "@material-ui/core";
import CollaboratorContext, {
  Types,
} from "../../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";
import bancos from "../../../../helpers/Json/bancos";
import File from "../../Expedient/Fields/File";
import { WarningAlert } from "../../../../alerts/WarningAlert";
import React from "react";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";
import SaveIcon from "@material-ui/icons/Save";
import { useMutation } from "@apollo/client";
import { UPDATE_USERS } from "../../../../Querys/querys";
import InputMask from "react-input-mask";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "semantic-ui-react";
import EyeIcon from "../../../../assets/svg/eye.svg";
import RemoveFile from "../../../../assets/svg/remove_file.svg";
import File_Helper from "../../Expedient/Fields/File_Helper";

const BankDataNuevoIngreso = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const [clabe, setClabe] = useState();
  const { adminState } = useContext(AdminContext);
  const [clabeMask, setClabeMask] = useState("");
  const [accountMask, setAccountMask] = useState("");
  const [archives, setArchives] = useState([]);

  const [updateColaboradores] = useMutation(UPDATE_USERS);

  useEffect(() => {
    if (state.collaborator?.archive) {
      setArchives(state.collaborator.archive);
      debugger
    }
  }, []);

  const reCheck = localStorage.getItem("reCheck");

  const handleChange = async (e: any) => {
    console.log("state", state);
    await updateData(e, state, dispatch, 0);
  };

  const handleChange2 = async (e: any) => {
    if (e.target.value.length < 9)
      return await WarningAlert({
        text: "El formato de tu cuenta no es la correcta.",
      });

    await updateData(e, state, dispatch, 0);
  };

  const onHandleBank = async (e: any) => {
    const result = await bancos.filter(
      (object) => e.target.value === object.marca
    );
    setClabe(result[0].clabe);
  };

  const onHandleClabe = async (e: any) => {
    debugger;
    if (e.target.value.length >= 3) {
      //e.target.value = e.target.value.substring(0, e.target.value.length -1 );
      if (e.target.value.substr(0, 3) !== clabe) {
        return await WarningAlert({
          text: "El formato de tu clabe no es la correcta.",
        });
      }
    }
  };

  const cuentaRef = React.createRef();

  const onHandleCuenta = async (e: any) => {
    if (e.target.value.length >= 12)
      e.target.value = e.target.value.substring(0, e.target.value.length - 1);
    //if()
  };

  const UpdateCandidate = async () => {
    // let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "sent" ? 'si' : 'no');
    updateColaboradores({
      variables: {
        updateUsersId: state.collaborator?.id,
        input: {
          bank: state.collaborator?.bank,
          accountNumber: state.collaborator?.accountNumber,
          clabeNum: state.collaborator?.clabeNum,
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
      bank: state.collaborator?.bank ?? "",
      accountNumber: state.collaborator?.accountNumber ?? "",
      clabeNum: state.collaborator?.clabeNum ?? "",
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
        //     progress: [100, 33.3, 0, 0],
        //     sections: [100, 100, 0, 0],
        //   },
        // });
      });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Grow in={true}>
        <Paper>
          <div className="novalidate__border">
            <Box mt={2} mb={2}>
              {/* { (reCheck == "true" || reCheck == null) && */}
              <FormControl variant="outlined" fullWidth={true} size="small">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Banco
                </InputLabel>
                <Select
                  native
                  onBlur={formik.handleChange}
                  onChange={onHandleBank}
                  label={"Banco"}
                  name="bank"
                  defaultValue={state.collaborator?.bank || ""}
                  autoFocus={true}
                  error={Boolean(formik.errors.bank)}
                >
                  <option
                    value={state.collaborator?.bank || ""}
                    disabled={true}
                  >
                    {state.collaborator?.bank || ""}
                  </option>
                  {bancos.map(({ marca }: any, index: number) => (
                    <option key={index} value={marca}>
                      {marca}
                    </option>
                  ))}
                </Select>
                <FormHelperText>
                  {!state.collaborator?.bank && "Obligatorio"}
                </FormHelperText>
              </FormControl>
            </Box>

            <Box mt={2} mb={2}>
              {/* { (reCheck == "true" || reCheck == null) && */}

              <InputMask
                mask="999999999"
                defaultValue={state.collaborator?.accountNumber || accountMask}
                onChange={(e) => {
                  setAccountMask(e.target.value);
                  handleChange(e);
                }}
                disabled={false}
                onBlur={formik.handleChange}
              >
                {(inputProps: any) => (
                  <TextField
                    {...inputProps}
                    name="accountNumber"
                    label="N??mero de cuenta bancaria"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    error={Boolean(formik.errors.accountNumber)}
                    helperText={
                      !state.collaborator?.accountNumber && "Obligatorio"
                    }
                  />
                )}
              </InputMask>
            </Box>

            <Box mt={2} mb={2}>
              {/* { (reCheck == "true" || reCheck == null) && */}

              <InputMask
                mask="999999999999999999"
                defaultValue={state.collaborator?.clabeNum || clabeMask}
                onChange={(e) => {
                  setClabeMask(e.target.value);
                  handleChange(e);
                }}
                disabled={false}
                onBlur={formik.handleChange}
              >
                {(inputProps: any) => (
                  <TextField
                    {...inputProps}
                    name="clabeNum"
                    label="N??mero de clabe bancaria"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    error={Boolean(formik.errors.clabeNum)}
                    helperText={!state.collaborator?.clabeNum && "Obligatorio"}
                  />
                )}
              </InputMask>
            </Box>

            <Grid direction="row" container>
              <Grid xs item direction="row" container justify="flex-end">
                
                  {/*DOCUMENTO OFICIAL DEL BANCO  */}
                  {archives?.map(
                    (archive: any, index: number) =>
                      archive?.name === "CuentaBancaria_PDF" && (
                        <div className="flex-container">
                          <div className="flex-child">
                            <label>Subir documento Oficial del Banco</label>
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
                              name="CuentaBancaria_PDF"
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

                  {!state.collaborator?.CuentaBancaria_PDF && (
                    <div className="flex-container">
                      <div className="flex-child">
                        <label>Subir documento Oficial del Banco</label>
                      </div>

                      <div className="flex-child-2">
                        <File_Helper
                          name="CuentaBancaria_PDF"
                          accept=".pdf"
                          parametrofrom="collaborator"
                          idUsr={state.collaborator?.id}
                          className="image-file"
                          setArchives={setArchives}
                          archives={archives}
                        />
                      </div>
                    </div>
                  )}
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Grow>
      <div></div>
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
    bank: Yup.string().required("El campo es obligatorio"),
    accountNumber: Yup.number().min(9).required("El campo es obligatorio"),
    clabeNum: Yup.number().min(18).required("El campo es obligatorio"),
  };
};

export default BankDataNuevoIngreso;
