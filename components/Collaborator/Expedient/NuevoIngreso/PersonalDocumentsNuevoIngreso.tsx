import { Fragment, useContext, useEffect, useState } from "react";
import { Box, Grid, Tooltip } from "@material-ui/core";
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import File from "./../Fields/File";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";
import SaveIcon from "@material-ui/icons/Save";
import File_Helper from "../Fields/File_Helper";
import { withStyles, Theme } from "@material-ui/core/styles";
import EyeIcon from "../../../../assets/svg/eye.svg";
import RemoveFile from "../../../../assets/svg/remove_file.svg";

const PersonalDocumentsNuevoIngreso = () => {
  const { state } = useContext(CollaboratorContext);
  const { adminState } = useContext(AdminContext);
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    if (state.collaborator?.archive) {
      setArchives(state.collaborator.archive);
    }
  }, []);

  useEffect(() => {
    if (archives.length > 0) {
      console.log("archives ->", archives);
    }
  }, [archives]);

  const UpdateCandidate = async () => {
    // let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "sent" ? 'si' : 'no');
    // if (result === true) {
    //     await SuccessfulAlert({ text: "Datos guardados correctamente." });
    // }
  };

  const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 1000,
      border: "1px solid #dadde9",
    },
  }))(Tooltip);

  return (
    <>
      <div className="novalidate__border">
        <Grid direction="row" container>
          <Grid xs={6} item>
            <div className="Expediente">
              {/*ACTA DE NACIMIENTO  */}
              {archives?.map(
                (archive: any, index: number) =>
                  archive?.name === "ActaNacimiento_PDF" && (
                    <div className="flex-container">
                      <div className="flex-child">
                        <label>Acta de nacimiento</label>
                        <span className="span-file">
                          <a
                            className="view-document"
                            target="_blank"
                            href={archive.URL}
                          >
                            <img
                              style={{ height: "10px","marginTop":"5px" }}
                              src={EyeIcon}
                              alt=""
                            />
                            Ver documento
                          </a>
                        </span>
                      </div>

                      <div className="flex-child-2">
                        <File_Helper
                          name="ActaNacimiento_PDF"
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

              {!state.collaborator?.ActaNacimiento_PDF && (
                <div className="flex-container">
                  <div className="flex-child">
                    <label>Acta de nacimiento</label>
                  </div>

                  <div className="flex-child-2">
                    <File_Helper
                      name="ActaNacimiento_PDF"
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

              {/* COMPROBANTE DE ESTUDIOS */}
              {archives?.map(
                (archive: any, index: number) =>
                  archive?.name === "ComprobanteEstudios_PDF" && (
                    <div className="flex-container">
                      <div className="flex-child">
                        <label>Último comprobante de estudios</label>
                        <span className="span-file">
                          (Título, Carta de Pasante o Kardex)
                        </span>
                        <span className="span-file">
                          <a
                            className="view-document"
                            target="_blank"
                            href={archive.URL}
                          >
                            <img
                              style={{ height: "10px","marginTop":"5px" }}
                              src={EyeIcon}
                              alt=""
                            />
                            Ver documento
                          </a>
                        </span>
                      </div>

                      <div className="flex-child-2">
                        <File_Helper
                          name="ComprobanteEstudios_PDF"
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

              {!state.collaborator?.ComprobanteEstudios_PDF && (
                <div className="flex-container">
                  <div className="flex-child">
                    <label>Último comprobante de estudios</label>
                    <span className="span-file">
                      (Título, Carta de Pasante o Kardex)
                    </span>
                  </div>

                  <div className="flex-child-2">
                    <File_Helper
                      name="ComprobanteEstudios_PDF"
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
              {/* COMPROBANTE DE DOMICILIO */}
              {archives?.map(
                (archive: any, index: number) =>
                  archive?.name === "ComprobanteDomicilio_PDF" && (
                    <div className="flex-container">
                      <div className="flex-child">
                        <label>Comprobante de domicilio</label>
                        <span className="span-file">
                          (Fecha no mayor a 2 meses)
                        </span>
                        <span className="span-file">
                          <a
                            className="view-document"
                            target="_blank"
                            href={archive.URL}
                          >
                            <img
                              style={{ height: "10px","marginTop":"5px" }}
                              src={EyeIcon}
                              alt=""
                            />
                            Ver documento
                          </a>
                        </span>
                      </div>

                      <div className="flex-child-2">
                        <File_Helper
                          name="ComprobanteDomicilio_PDF"
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

              {!state.collaborator?.ComprobanteDomicilio_PDF && (
                <div className="flex-container">
                  <div className="flex-child">
                    <label>Comprobante de domicilio</label>
                    <span className="span-file">
                      (Fecha no mayor a 2 meses)
                    </span>
                  </div>

                  <div className="flex-child-2">
                    <File_Helper
                      name="ComprobanteDomicilio_PDF"
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
              {/* IDENTIFICACIÓN OFICIAL */}
              {archives?.map(
                (archive: any, index: number) =>
                  archive?.name === "IdentificacionOficial_PDF" && (
                    <div className="flex-container">
                      <div className="flex-child">
                        <label>Identificación oficial</label>
                        <span className="span-file">(INE, Pasaporte)</span>
                        <span className="span-file">
                          <a
                            className="view-document"
                            target="_blank"
                            href={archive.URL}
                          >
                            <img
                              style={{ height: "10px","marginTop":"5px" }}
                              src={EyeIcon}
                              alt=""
                            />
                            Ver documento
                          </a>
                        </span>
                      </div>

                      <div className="flex-child-2">
                        <File_Helper
                          name="IdentificacionOficial_PDF"
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

              {!state.collaborator?.IdentificacionOficial_PDF && (
                <div className="flex-container">
                  <div className="flex-child">
                    <label>Identificación oficial</label>
                    <span className="span-file">(INE, Pasaporte)</span>
                  </div>

                  <div className="flex-child-2">
                    <File_Helper
                      name="IdentificacionOficial_PDF"
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
              {/* RFC*/}
              {archives?.map(
                (archive: any, index: number) =>
                  archive?.name === "RFC_PDF" && (
                    <div className="flex-container">
                      <div className="flex-child">
                        <label>RFC</label>
                        <span className="span-file">(Emitido por el SAT)</span>
                        <span className="span-file">
                          <a
                            className="view-document"
                            target="_blank"
                            href={archive.URL}
                          >
                            <img
                              style={{ height: "10px","marginTop":"5px" }}
                              src={EyeIcon}
                              alt=""
                            />
                            Ver documento
                          </a>
                        </span>
                      </div>

                      <div className="flex-child-2">
                        <File_Helper
                          name="RFC_PDF"
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

              {!state.collaborator?.RFC_PDF && (
                <div className="flex-container">
                  <div className="flex-child">
                    <label>RFC</label>
                    <span className="span-file">(Emitido por el SAT)</span>
                  </div>

                  <div className="flex-child-2">
                    <File_Helper
                      name="RFC_PDF"
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
            </div>
          </Grid>
          <Grid xs={6} item>
            <Box ml={1}>
              {/* CURP */}
              {archives?.map(
                (archive: any, index: number) =>
                  archive?.name === "CURP_PDF" && (
                    <div className="flex-container">
                      <div className="flex-child">
                        <label>CURP</label>
                        <span className="span-file">
                          <a
                            className="view-document"
                            target="_blank"
                            href={archive.URL}
                          >
                            <img
                              style={{ height: "10px","marginTop":"5px" }}
                              src={EyeIcon}
                              alt=""
                            />
                            Ver documento
                          </a>
                        </span>
                      </div>

                      <div className="flex-child-2">
                        <File_Helper
                          name="CURP_PDF"
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

              {!state.collaborator?.CURP_PDF && (
                <div className="flex-container">
                  <div className="flex-child">
                    <label>CURP</label>
                  </div>

                  <div className="flex-child-2">
                    <File_Helper
                      name="CURP_PDF"
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

              {/* Comprobante oficial de NS*/}
              {archives?.map(
                (archive: any, index: number) =>
                  archive?.name === "ComprobanteNSS_PDF" && (
                    <div className="flex-container">
                      <div className="flex-child">
                        <label>Comprobante oficial de NS</label>
                        <span className="span-file">
                          (Número de Seguro Social)
                        </span>
                        <span className="span-file">
                          <a
                            className="view-document"
                            target="_blank"
                            href={archive.URL}
                          >
                            <img
                              style={{ height: "10px","marginTop":"5px" }}
                              src={EyeIcon}
                              alt=""
                            />
                            Ver documento
                          </a>
                        </span>
                      </div>

                      <div className="flex-child-2">
                        <File_Helper
                          name="ComprobanteNSS_PDF"
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

              {!state.collaborator?.ComprobanteNSS_PDF && (
                <div className="flex-container">
                  <div className="flex-child">
                    <label>Comprobante oficial de NS</label>
                    <span className="span-file">(Número de Seguro Social)</span>
                  </div>

                  <div className="flex-child-2">
                    <File_Helper
                      name="ComprobanteNSS_PDF"
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

              {/* FOTOGRAFÍA */}
              {archives?.map(
                (archive: any, index: number) =>
                  archive?.name === "Foto_IMG" && (
                    <div className="flex-container">
                      <div className="flex-child">
                        <label className="display-flex-important">
                          Subir fotografía
                          <HtmlTooltip
                            title={
                              <Fragment>
                                <img
                                  src="/assets/Foto_Seeker_2021.png"
                                  alt="Question"
                                  height="500"
                                  style={{ marginRight: "350px" }}
                                />
                              </Fragment>
                            }
                          >
                            <img
                              src="/assets/icons/PreguntaAzul.png"
                              alt="Question"
                              height="15"
                            />
                          </HtmlTooltip>
                        </label>
                        <span className="span-file">
                          <a
                            className="view-document"
                            target="_blank"
                            href={archive.URL}
                          >
                            <img
                              style={{ height: "10px","marginTop":"5px" }}
                              src={EyeIcon}
                              alt=""
                            />
                            Ver documento
                          </a>
                        </span>
                      </div>

                      <div className="flex-child-2">
                        <File_Helper
                          name="Foto_IMG"
                          accept=".jpg, .jpeg, .png"
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

              {!state.collaborator?.Foto_IMG && (
                <div className="flex-container">
                  <div className="flex-child">
                    <label className="display-flex-important">
                      Subir fotografía
                      <HtmlTooltip
                        title={
                          <Fragment>
                            <img
                              src="/assets/Foto_Seeker_2021.png"
                              alt="Question"
                              height="500"
                              style={{ marginRight: "350px" }}
                            />
                          </Fragment>
                        }
                      >
                        <img
                          src="/assets/icons/PreguntaAzul.png"
                          alt="Question"
                          height="15"
                        />
                      </HtmlTooltip>
                    </label>
                  </div>

                  <div className="flex-child-2">
                    <File_Helper
                      name="Foto_IMG"
                      accept=".png, .jpg, .jpeg"
                      parametrofrom="collaborator"
                      idUsr={state.collaborator?.id}
                      className="image-file"
                      setArchives={setArchives}
                      archives={archives}
                    />
                  </div>
                </div>
              )}
            </Box>
          </Grid>
        </Grid>
      </div>
      <div></div>
    </>
  );
};

export default PersonalDocumentsNuevoIngreso;
