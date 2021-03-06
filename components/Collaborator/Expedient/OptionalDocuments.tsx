import { useContext } from "react";
import { Box, Checkbox, FormControlLabel, Grid } from "@material-ui/core"
import CollaboratorContext from "../../../context/CollaboratorContext/CollaboratorContext";
import File from './Fields/File';
import { useEffect } from "react";
import { updateCollaborator, updateData } from "../../../helpers/Collaborator/Collaborator";
import React from "react";
import { postFileAWS, postFileAWS2, putCandidate } from "../../../services/candidateService";
import { SuccessfulAlert } from "../../../alerts/successAlerts";
import { ErrorAlert } from "../../../alerts/errorAlert";

const OptionalDocuments = () => {
    const { state, dispatch } = useContext(CollaboratorContext);
    const [checked, setChecked] = React.useState(true);


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
    
    return (
        <div className={state.sections[1] >= 100 ? `validate__border` : `novalidate__border`}>
            <Grid direction="row" container>
                <Grid xs={6} item>
                    <div className="Expediente">
                        <File label="Aviso de retenci??n" span="(En caso de tener cr??dito de infonavit)" name="AvisoRetencion_PDF" />
                        <FormControlLabel
                control={<Checkbox checked={(state.collaborator.Archivos.AvisoRetencion_PDF?.toString() == 'NA' )} onChange={uploadFileAws}  name="checkedA" color="primary"/>}
                label="Seleccione esta opci??n si no cuenta con el documento"
                />
                    </div>
                </Grid>
                <Grid xs={6} item>
                    <Box ml={1}>
                        <File label="Carta de antig??edad de seguro de gastos m??dicos mayores (PDF)"
                            span="(En caso de contar con alg??n plan de la prestaci??n de SGMM, deber??s entregar dentro del plazo de 30 d??as posterior a fecha de baja)"
                            name="CartaGMM_PDF" />
                            <FormControlLabel
                control={<Checkbox checked={(state.collaborator.Archivos.CartaGMM_PDF?.toString() == 'NA')} onChange={uploadFileAws2}  name="checkedA" color="primary"/>}
                label="Seleccione esta opci??n si no cuenta con el documento"
                />
                    </Box>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default OptionalDocuments;