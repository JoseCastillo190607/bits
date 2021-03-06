import { useMutation, useQuery } from "@apollo/client";
import { Grid, Box, Tooltip } from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles";
import { useContext, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { ErrorAlert } from "../../../../alerts/errorAlert";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { WarningAlert } from "../../../../alerts/WarningAlert";
import { server } from "../../../../global/server";
import {
  CREATE_ARCHIVE,
  GET_ARCHIVE,
  DELETE_ARCHIVE
} from "../../../../Querys/querys";
import {
  deleteFileAWS,
  postFileAWS,
  postFileIncidentAWS,
} from "../../../../services/candidateService";
import DefaultImage from "../../../../assets/svg/icono-subir-archivo-azul.svg";
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import './styles/styles.css'

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 1000,
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const File_Helper_Incident = ({
  label,
  span = "",
  name,
  accept = ".pdf",
  withDownload = false,
  tab = 6,
  icon = false,
  required = false,
  parametrofrom = "",
  idUsr = "",
  idIncident = "",
  idArchive = "",
  image = DefaultImage,
  remove_file = false,
  setArchives,
  archives = [],
  style = ""
}: any) => {
  const { state } = useContext(CollaboratorContext);

  const [deleteArchive] = useMutation(DELETE_ARCHIVE, {
    refetchQueries: [{ query: GET_ARCHIVE }],
  });


  const uploadFileAws = async (e: any): Promise<void> => {
    debugger;
    let result = await postFileAWS(e, idUsr, parametrofrom,name,remove_file);
    console.log("archivo", e, idUsr, parametrofrom);
    console.log("archivo", result);
    //if result is a string
    debugger;
    if ("URL" in result) {
      state.collaborator[result.name] = result.id;
      //comparate archives with result and if exist update it
      let archive = archives.find(
        (archive: any) => archive.name == result.name
      );
      if (archive) {
        //delete index where archives name is the same as result name
        let index = archives.indexOf(archive);
        archives.splice(index, 1);
        //add result to archives
        archives.push(result);
        //update state
        setArchives(archives);
      }
      //if not exist add it
      else {
        setArchives([...archives, result]);
      }
      
      await SuccessfulAlert({ text: "Archivo actualizado exitosamente!" });
    } else await ErrorAlert({ text: "Archivo no agregado!" });
  };

  const uploadFileIncidentAws = async (e: any): Promise<void> => {

    if(e){
        setArchives(e)
        await SuccessfulAlert({ text: "Archivo cargado exitosamente!" });
    }
    
    /*

    let result = await postFileIncidentAWS(e, idIncident, parametrofrom,name,remove_file);
    console.log("archivo", e, idIncident, parametrofrom);
    console.log("archivo", result);
    if (result) {

        setArchives(result)
        
        await SuccessfulAlert({ text: "Archivo actualizado exitosamente!" });
    } else await ErrorAlert({ text: "Archivo no agregado!" });
    */

  };

  const deleteFile = async (name: any): Promise<void> => {
    let result = await WarningAlert({
      text: "??Seguro que deseas eliminar el archivo?",
      showDenyButton: true,
    });
    if (result.isConfirmed) {
      if (!result.isDismissed) {
        await SuccessfulAlert({ text: "Archivo eliminado exitosamente!" });
      } else await ErrorAlert({ text: "Archivo no eliminado!" });
    }
  };

  const deleteFile_2 = async (): Promise<void> => {
    let result = await WarningAlert({
      text: "??Seguro que deseas eliminar el archivo?",
      showDenyButton: true,
    });
    if (result.isConfirmed) {
      if (result) {
        deleteArchive({
          variables: {
            idArchive: idArchive,
          },
        });

        await SuccessfulAlert({ text: "Archivo eliminado exitosamente!" });
      } else await ErrorAlert({ text: "Archivo no eliminado!" });
    }
  };

  return (
    <Grid>
      {idArchive === "" ? (
    
        style === "CambiarArchivo" ? (
          <label className="">
            
            <div className="botonsubirArchivosLlaves">
              <div className="iconoSubirArchivos"></div>
              <div>
                <input type="file" name={name} accept={accept} onChange={(e) => uploadFileIncidentAws(e)} />
                Cambiar archivo
              </div>
            </div>
          </label>
        ):
        (
          style === "SeleccionarArchivo" ? (
            <label className="">
              
              <div className="botonSeleccionarArchivo">
                <div className="iconoSubirArchivos"></div>
                <div>
                  <input type="file" name={name} accept={accept} onChange={(e) => uploadFileIncidentAws(e)} />
                  Seleccionar archivo
                </div>
              </div>
            </label>
          ):(
            <label className="">
              <input type="file" name={name} accept={accept} onChange={(e) => uploadFileIncidentAws(e)} />
              <img src={image} className="image-file" />
            </label>
          )
        )
      ) : (
        <>
          <span
            className="text-cancel-file-expediente"
            onClick={() => deleteFile_2()}
          >
            -
          </span>
        </>
      )}
    </Grid>
  );
};

export default File_Helper_Incident;
