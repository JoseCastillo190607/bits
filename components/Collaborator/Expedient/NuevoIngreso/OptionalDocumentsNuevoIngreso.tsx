import { useContext, useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
} from "@material-ui/core";
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";
import EyeIcon from "../../../../assets/svg/eye.svg";
import RemoveFile from "../../../../assets/svg/remove_file.svg";
import File_Helper from "../Fields/File_Helper";
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { UPDATE_USERS } from "../../../../Querys/querys";
import SaveIcon from "@material-ui/icons/Save";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";

const OptionalDocumentsNuevoIngreso = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const [checked, setChecked] = useState(true);
  const { adminState } = useContext(AdminContext);
  const [archives, setArchives] = useState([]);
  const [updateColaboradores] = useMutation(UPDATE_USERS);
  const [isAvisoRetencion, setIsAvisoRetencion] = useState(false);
  const [isCartaGMM, setIsCartaGMM] = useState(false);

  useEffect(() => {
    if (state.collaborator) {
      setIsAvisoRetencion(state.collaborator.isAvisoRetencion);
      setIsCartaGMM(state.collaborator.isCartaGMM);
      if (state.collaborator?.archive) {
        setArchives(state.collaborator.archive);
      }
    }
  }, []);

  const initialValues = () => {
    return {
      isAvisoRetencion: state.collaborator?.isAvisoRetencion ?? "",
      isCartaGMM: state.collaborator?.isCartaGMM ?? "",
    };
  };
  const validationSchema = () => {
    return {};
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      if (formData.isAvisoRetencion === true) {
        formData.isAvisoRetencion = true;
      } else {
        formData.isAvisoRetencion = false;
      }
      if (formData.isCartaGMM === true) {
        formData.isCartaGMM = true;
      } else {
        formData.isCartaGMM = false;
      }
      debugger;
      console.log("formdata", formData);
      updateColaboradores({
        variables: {
          updateUsersId: state.collaborator?.id,
          input: formData,
        },
      }).then(() => {
        SuccessfulAlert({ text: "Se actualizó correctamente" });
      });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="novalidate__border">
        <Grid direction="row" container>
          <Grid xs={6} item className="aviso-retencion">
            {/*AVISO DE RETENCIÓN  */}
            {archives?.map(
              (archive: any, index: number) =>
                archive?.name === "AvisoRetencion_PDF" && (
                  <div className="flex-container">
                    <div className="flex-child">
                      <label>Aviso de retención</label>
                      <span className="span-file">
                        (En caso de tener crédito de Infonavit)
                      </span>
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
                        name="AvisoRetencion_PDF"
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

            {!state.collaborator?.AvisoRetencion_PDF && (
              <div className="flex-container">
                <div className="flex-child">
                  <label>Aviso de retención</label>
                  <span className="span-file">
                    (En caso de tener crédito de Infonavit)
                  </span>
                </div>

                <div className="flex-child-2">
                  <File_Helper
                    name="AvisoRetencion_PDF"
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
            <br />
            <div className="">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAvisoRetencion}
                    value={isAvisoRetencion}
                    onChange={() => setIsAvisoRetencion(!isAvisoRetencion)}
                    onBlur={formik.handleChange}
                    name="isAvisoRetencion"
                    color="primary"
                  />
                }
                label="Seleccione esta opción si no cuenta con el documento"
              />
            </div>
          </Grid>
          <Grid xs={6} item className="aviso-retencion">
            <Box ml={1}>
              {archives?.map(
                (archive: any, index: number) =>
                  archive?.name === "CartaGMM_PDF" && (
                    <div className="flex-container">
                      <div className="flex-child">
                        <label>
                          Carta de Antigüedad de Seguro de Gastos Médicos
                          Mayores
                        </label>
                        <span className="span-file">
                          En caso de contar con algún plan de la prestación de
                          SGMM, deberás entregar dentro del plazo de 30 días
                          posterior a fecha de baja)
                        </span>
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
                          name="CartaGMM_PDF"
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

              {!state.collaborator?.CartaGMM_PDF && (
                <div className="flex-container">
                  <div className="flex-child">
                    <label>
                      Carta de Antigüedad de Seguro de Gastos Médicos Mayores
                    </label>
                    <span className="span-file">
                      En caso de contar con algún plan de la prestación de SGMM,
                      deberás entregar dentro del plazo de 30 días posterior a
                      fecha de baja)
                    </span>
                  </div>

                  <div className="flex-child-2">
                    <File_Helper
                      name="CartaGMM_PDF"
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
              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    //checked={(state.collaborator.Archivos.CartaGMM_PDF?.toString() == 'NA')}
                    checked={isCartaGMM}
                    value={isCartaGMM}
                    onChange={() => setIsCartaGMM(!isCartaGMM)}
                    onBlur={formik.handleChange}
                    name="isCartaGMM"
                    color="primary"
                  />
                }
                label="Seleccione esta opción si no cuenta con el documento"
              />
            </Box>
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

export default OptionalDocumentsNuevoIngreso;
