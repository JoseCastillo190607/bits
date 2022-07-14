import { useContext, useEffect, useState } from "react";
import { Grid, Button, Box } from "@material-ui/core";
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";
import SaveIcon from "@material-ui/icons/Save";
import EyeIcon from "../../../../assets/svg/eye.svg";
import RemoveFile from "../../../../assets/svg/remove_file.svg";
import DownloadIcon from "../../../../assets/svg/download_files_arrow.svg";
import File_Helper from "../Fields/File_Helper";
import { WarningAlert } from "../../../../alerts/WarningAlert";
import { server } from "../../../../global/server";
import { useMutation } from "@apollo/client";
import { UPDATE_USERS } from "../../../../Querys/querys";

const OfertaLaboralNuevoIngreso = () => {
  const { state } = useContext(CollaboratorContext);
  const { adminState } = useContext(AdminContext);
  const [archives, setArchives] = useState([]);
  const [CartaOferta, setCartaOferta] = useState<any>({});
  const [updateColaboradores] = useMutation(UPDATE_USERS);

  useEffect(() => {
    if (state.collaborator?.archive) {
      console.log("archive ->", state.collaborator.archive);
      //get archive where name is CartaOferta
      const carta = state.collaborator.archive.find(
        (archive: any) => archive.name == "CartaOferta"
      );
      if (carta) {
        setCartaOferta(carta);
      }
      setArchives(state.collaborator.archive);
    }
  }, []);

  const handleSendAndFinsh = async () => {
    updateColaboradores({
      variables: {
        updateUsersId: state.collaborator?.id,
        input: {
          done: true,
        },
      },
    }).then(() => {
      SuccessfulAlert({ text: "Se actualizó correctamente" }).then(() => {
        window.location.href = "/collaborators/id/0"
      })
    });
  };

  const handleWarningAlert = async () => {
    await WarningAlert({ text: "Aún no se ha subido una carta oferta" });
  };

  return (
    <>
      <div className="novalidate__border">
        <Grid direction="row" container>
          <Grid xs={12} item>
            {/*AVISO DE RETENCIÓN  */}
            {archives?.map(
              (archive: any, index: number) =>
                archive?.name === "CartaOfertaFirmada" && (
                  <div className="flex-container">
                    <div className="flex-child">
                      <label>Carta Oferta Firmada</label>
                      <span className="span-file">(PDF)</span>
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
                      {/* button with image like text */}

                      <a
                        className="view-document"
                        target="_blank"
                        href={CartaOferta?.URL}
                      >
                        <img
                          src={DownloadIcon}
                          style={{ marginRight: "15px" }}
                          className="cursor"
                          alt="DownloadFile"
                        />
                      </a>

                      <File_Helper
                        name="CartaOfertaFirmada"
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

            {!state.collaborator?.CartaOfertaFirmada && (
              <div className="flex-container">
                <div className="flex-child">
                  <label>Carta Oferta Firmada</label>
                  <span className="span-file">(PDF)</span>
                </div>

                <div className="flex-child-2">
                  {state.collaborator.CartaOferta ? (
                    <a
                      className="view-document"
                      target="_blank"
                      href={CartaOferta?.URL}
                    >
                      <img
                        src={DownloadIcon}
                        style={{ marginRight: "15px" }}
                        className="cursor"
                        alt="DownloadFile"
                      />
                    </a>
                  ) : (
                    <a className="view-document" onClick={handleWarningAlert}>
                      <img
                        src={DownloadIcon}
                        style={{ marginRight: "15px" }}
                        className="cursor"
                        alt="DownloadFile"
                      />
                    </a>
                  )}

                  <File_Helper
                    name="CartaOfertaFirmada"
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
        <hr />
        <Grid direction="row" container>
          <Grid xs={12} item>
            {/*DECLARACION DE INFORMACION  */}
            {archives?.map(
              (archive: any, index: number) =>
                archive?.name === "AGREEMENT_PDF" && (
                  <div className="flex-container">
                    <div className="flex-child">
                      <label>Declaración de Información</label>
                      <span className="span-file">(PDF)</span>
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
                      <a
                        className="view-document"
                        target="_blank"
                        href={`${server}/report/pdfCollaborators/${state.collaborator.id}`}
                      >
                        <img
                          src={DownloadIcon}
                          style={{ marginRight: "15px" }}
                          className="cursor"
                          alt="DownloadFile"
                        />
                      </a>

                      <File_Helper
                        name="AGREEMENT_PDF"
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

            {!state.collaborator?.AGREEMENT_PDF && (
              <div className="flex-container">
                <div className="flex-child">
                  <label>Declaración de Información</label>
                  <span className="span-file">(PDF)</span>
                </div>

                <div className="flex-child-2">
                  <a
                    className="view-document"
                    target="_blank"
                    href={`${server}/report/pdfCollaborators/${state.collaborator.id}`}
                  >
                    <img
                      src={DownloadIcon}
                      style={{ marginRight: "15px" }}
                      className="cursor"
                      alt="DownloadFile"
                    />
                  </a>

                  <File_Helper
                    name="AGREEMENT_PDF"
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
      </div>
      <div>
        {state.collaborator?.AGREEMENT_PDF &&
          state.collaborator?.CartaOfertaFirmada && (
            <Grid
              direction="row"
              container
              justify="flex-end"
              alignItems="center"
              style={{ marginTop: "20px" }}
            >
              <Button onClick={handleSendAndFinsh} className="buttonSave">
                <SaveIcon />
                &nbsp; Enviar y terminar el registro
              </Button>
            </Grid>
          )}
      </div>
    </>
  );
};

export default OfertaLaboralNuevoIngreso;
