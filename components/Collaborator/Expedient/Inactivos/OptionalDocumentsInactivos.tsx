import { useContext } from "react";
import { Box, Checkbox, FormControlLabel, Grid } from "@material-ui/core"
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import File from '../Fields/File';
import { updateCollaborator, updateData } from "../../../../helpers/Collaborator/Collaborator";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { ErrorAlert } from "../../../../alerts/errorAlert";


const OptionalDocumentsInactivos = () => {
    const { state, dispatch } = useContext(CollaboratorContext);


      const uploadFileAws = async (e: any): Promise<void> => {

        if(state.collaborator.Archivos.AvisoRetencion_PDF) {
            state.collaborator.Archivos.AvisoRetencion_PDF = undefined;}
            else{
                state.collaborator.Archivos.AvisoRetencion_PDF = 'NA';
            }
        let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "rejected" ? 'si' : 'no');
        if (result) {
            await updateData(e, state, dispatch, 6);
            state.collaborator.Archivos[e.target.name] = result;
        } else await ErrorAlert({ text: "Ocurrio un error!" });
    }

    const uploadFileAws2 = async (e: any): Promise<void> => {

        if(state.collaborator.Archivos.CartaGMM_PDF) {
            state.collaborator.Archivos.CartaGMM_PDF = undefined;}
            else{
                state.collaborator.Archivos.CartaGMM_PDF = 'NA';
            }
        let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "rejected" ? 'si' : 'no');
        if (result) {
            await updateData(e, state, dispatch, 6);
            state.collaborator.Archivos[e.target.name] = result;
            await updateCollaborator(state.collaborator, dispatch);
        } else await ErrorAlert({ text: "Ocurrio un error!" });
    }

    const UpdateCandidate = async () => {
        let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "sent" ? 'si' : 'no');
        if (result === true) {
            await SuccessfulAlert({ text: "Datos guardados correctamente." });
        }
    }
    
    return (
        <>
        <div className={state.sections[1] >= 100 ? `validate__border` : `novalidate__border`}>
            <Grid direction="row" container>
                <Grid xs={6} item>
                    <div className="Expediente">
                        <File label="Aviso de retención" span="(En caso de tener crédito de infonavit)" name="AvisoRetencion_PDF" />
                        <FormControlLabel
                control={<Checkbox checked={(state.collaborator.Archivos.AvisoRetencion_PDF?.toString() == 'NA' )} onChange={uploadFileAws}  name="checkedA" color="primary"/>}
                label="Seleccione esta opción si no cuenta con el documento"
                />
                    </div>
                </Grid>
                <Grid xs={6} item>
                    <Box ml={1}>
                        <File label="Carta de antigüedad de seguro de gastos médicos mayores (PDF)"
                            span="(En caso de contar con algún plan de la prestación de SGMM, deberás entregar dentro del plazo de 30 días posterior a fecha de baja)"
                            name="CartaGMM_PDF" />
                            <FormControlLabel
                control={<Checkbox checked={(state.collaborator.Archivos.CartaGMM_PDF?.toString() == 'NA')} onChange={uploadFileAws2}  name="checkedA" color="primary"/>}
                label="Seleccione esta opción si no cuenta con el documento"
                />
                    </Box>
                </Grid>
            </Grid>
        </div>
        </>
    )
}

export default OptionalDocumentsInactivos;