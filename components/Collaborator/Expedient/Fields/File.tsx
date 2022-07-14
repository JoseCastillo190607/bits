import { useMutation, useQuery } from "@apollo/client";
import { Grid, Box, Tooltip } from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles";
import { useContext, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { ErrorAlert } from "../../../../alerts/errorAlert";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { WarningAlert } from "../../../../alerts/WarningAlert";
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import { server } from "../../../../global/server";
import {
  updateCollaborator,
  updateData,
  ValidateSection,
} from "../../../../helpers/Collaborator/Collaborator";
import {
  GET_ALL_ARCHIVE,
  CREATE_ARCHIVE,
} from "../../../../Querys/querys";
import {
  deleteFileAWS,
  postFileAWS,
} from "../../../../services/candidateService";

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 1000,
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const File = ({
  label,
  span = "",
  name,
  accept = ".pdf",
  withDownload = false,
  tab = 6,
  icon = false,
  required = false,
  parametrofrom = "",
}: any) => {
  const [createArchive] = useMutation(CREATE_ARCHIVE, {
    refetchQueries: [{ query: GET_ALL_ARCHIVE }],
  });

  const { state, dispatch } = useContext(CollaboratorContext);
  
  const uploadFileAws = async (e: any): Promise<void> => {
    let result = await postFileAWS(e, state.collaborator.id, parametrofrom);
    if (result) {
      console.log("result", result);
      await SuccessfulAlert({ text: "Archivo actualizado exitosamente!" });
      await updateData(e, state, dispatch, tab);
      //state.collaborator.Archivos[e.target.name] = result;
      await updateCollaborator(state.collaborator, dispatch);
      if (e.target.name == "CuentaBancaria_PDF") {
        console.log("Cuenta bancaria:", e.target.name);
        await updateData(e, state, dispatch, 5);
      }

      createArchive({
        variables: {
          input: {
            usersId: state.collaborator.id,
            URL: result,
            fromto: parametrofrom,
            name: name,
          },
        },
      });
    } else await ErrorAlert({ text: "Archivo no agregado!" });
  };

  const deleteFile = async (name: any): Promise<void> => {
    let result = await WarningAlert({
      text: "¿Seguro que deseas eliminar el archivo?",
      showDenyButton: true,
    });
    if (result.isConfirmed) {
      let mymeType = state.collaborator["Archivos"][name];
      await deleteFileAWS(state.collaborator._id, mymeType.split("/")[4]);
      if (result) {
        state.collaborator["Archivos"][name] = undefined;
        await updateCollaborator(state.collaborator, dispatch);
        if (name == "CuentaBancaria_PDF")
          await ValidateSection(state, 5, dispatch);
        await ValidateSection(state, 6, dispatch);
        await SuccessfulAlert({ text: "Archivo eliminado exitosamente!" });
      } else await ErrorAlert({ text: "Archivo no eliminado!" });
    }
  };
 //.find(name))
  return (
    <Box mt={2}>
      <Grid direction="row" container justify="flex-start" alignItems="center">
        <Grid xs={!withDownload ? 9 : 6} item>
          <div className="labels__files">
            <label>
              {label}
              {required &&
                !state.collaborator?.archive?.find((archivo: { name: any; }) => archivo.name=== name) &&
                state.collaborator?.archive?.find((archivo: { name: any; }) => archivo.name=== name) === undefined && (
                  <>
                    &nbsp;
                    <label className="c-red">*</label>
                  </>
                )}
              &nbsp;
              {icon && (
                <HtmlTooltip
                  title={
                    <Fragment>
                      <img
                        src="/assets/Foto_Seeker_2021.png"
                        alt="Question"
                        height="500"
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
              )}
            </label>
            <span>{span}</span>
            {state.collaborator?.archive?.find((archivo: { name: any; }) => archivo.name=== name) &&
            state.collaborator?.archive?.find((archivo: { name: any; }) => archivo.name=== name) !== undefined &&
            state.collaborator?.archive?.find((archivo: { name: any; }) => archivo.name=== name) !== "NA" ? (
              <a
                href=""
                rel="noreferrer"
                //onClick={() => GetUrl()}
              >
                <img src="/assets/svg/icono-ver.svg" height="12" alt={name} />
                &nbsp;Ver Documento
              </a>
            ) : null}
          </div>
        </Grid>
        <Grid
          xs
          item
          direction="row"
          container
          justify="flex-end"
          alignItems="center"
          className="file__tags"
        >
          {withDownload && (
            <label className="custom-file-upload-expediente">
              <a
                href={
                  name === "CartaOfertaFirmada"
                    ? state.collaborator.archive["CartaOferta"]
                    : `${server}/report/pdfCollaborators/${state.collaborator.id}`
                }
              >
                {" "}
                <img src={`/assets/svg/icono-descargar.svg`} alt={name} />
              </a>
            </label>
          )}
          <label
            className={`
                            custom-file-upload-expediente
                                ${
                                  state.collaborator?.archive?.find((archivo: { name: any; }) => archivo.name=== name) &&
                                  state.collaborator?.archive?.find((archivo: { name: any; }) => archivo.name=== name) !== undefined &&
                                  state.collaborator?.archive?.find((archivo: { name: any; }) => archivo.name=== name) !== "NA" &&
                                  "border__green"
                                }
                        `}
          >
            <input
              type="file"
              name={name}
              accept={accept}
              onChange={(e) => uploadFileAws(e)}
            />
            <img
              src={`/assets/svg/icono-${
                state.collaborator?.archive?.find((archivo: { name: any; }) => archivo.name=== name) &&
                state.collaborator?.archive?.find((archivo: { name: any; }) => archivo.name=== name) !== undefined &&
                state.collaborator?.archive?.find((archivo: { name: any; }) => archivo.name=== name) !== "NA"
                  ? "archivo-subido"
                  : "subir-archivo-azul"
              }.svg`}
              alt={name}
            />
          </label>
          {
          state.collaborator?.archive?.find((archivo: { name: any; }) => archivo.name=== name) &&
          state.collaborator?.archive?.find((archivo: { name: any; }) => archivo.name=== name) !== undefined &&
          state.collaborator?.archive?.find((archivo: { name: any; }) => archivo.name=== name) !== "NA" ? (
            <span
              className="text-cancel-file-expediente"
              onClick={() => deleteFile(name)}
            >
              -
            </span>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default File;
