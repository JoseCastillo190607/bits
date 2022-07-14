import { useContext, Fragment } from "react";
import { Box, TextField, Tooltip, Grid, Button } from "@material-ui/core";
import { withStyles, Theme } from '@material-ui/core/styles';
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";
import SaveIcon from '@material-ui/icons/Save';
import { useMutation } from "@apollo/client";
import {UPDATE_USERS} from "../../../../Querys/querys";


const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        maxWidth: 1000,
    },
}))(Tooltip);

const EnfermedadNuevoIngreso = () => {
    const { state, dispatch } = useContext(CollaboratorContext);
    const {adminState} = useContext(AdminContext)

    const [updateColaboradores] = useMutation(UPDATE_USERS);

    const handleChange = async (e: any) => {
        await updateData(e, state, dispatch, 0);
    }

    const UpdateCandidate = async () => {
        // let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "sent" ? 'si' : 'no');
        updateColaboradores({
            variables: {
                updateUsersId: state.collaborator?.id,
              input: {
                Alergias: state.collaborator?.Alergias,
                PadEnfer: state.collaborator?.PadEnfer,
                Cirugias: state.collaborator?.Cirugias,
                TraMeRe: state.collaborator?.TraMeRe
              },
            },
          });
       
          await SuccessfulAlert({ text: "Datos guardados correctamente." });
    
       
       
        // if (result === true) {
        //     await SuccessfulAlert({ text: "Datos guardados correctamente." });
        // }
    }

    return (
        <>
        <div className={state.sections[2] >= 100 ? `validate__border` : `novalidate__border`}>
            <h6 id="form-dialog-title" className="form-dialog-title-class">
                Declaro a continuación mi estado de salud actual…
                <HtmlTooltip
                    title={
                        <Fragment>
                            En caso de no contar alguno escribe 'Ninguno'
                        </Fragment>
                    }
                >
                    <img src="/assets/icons/PreguntaAzul.png" alt="Question" height="15" />
                </HtmlTooltip>
            </h6>
            <Box mt={2} mb={2}>
                <TextField
                    name="Alergias"
                    defaultValue={state.collaborator?.Alergias}
                    autoFocus={true}
                    label="Alergías" variant="outlined" size="small"
                    fullWidth={true} onBlur={(e) => handleChange(e)}
                    InputProps={{
                        readOnly: false,
                    }}
                />
            </Box>

            <Box mt={2} mb={2}>
                <TextField
                    name="PadEnfer"
                    defaultValue={state.collaborator?.PadEnfer}
                    autoFocus={true}
                    label="Padecimientos / Enfermedades físicos y mentales" variant="outlined" size="small"
                    fullWidth={true} onBlur={(e) => handleChange(e)}
                    InputProps={{
                        readOnly: false,
                    }}
                />
            </Box>

            <Box mt={2} mb={2}>
                <TextField
                    name="Cirugias"
                    defaultValue={state.collaborator?.Cirugias}
                    autoFocus={true}
                    label="Cirugías" variant="outlined" size="small"
                    fullWidth={true} onBlur={(e) => handleChange(e)}
                    InputProps={{
                        readOnly: false,
                    }}
                />
            </Box>

            <Box mt={2} mb={2}>
                <TextField
                    name="TraMeRe"
                    defaultValue={state.collaborator?.TraMeRe}
                    autoFocus={true}
                    label="Tratamientos médicos o rehabilitaciones" variant="outlined" size="small"
                    fullWidth={true} onBlur={(e) => handleChange(e)}
                    InputProps={{
                        readOnly: false,
                    }}
                />
            </Box>
        </div>
        <div>
        <Grid direction="row" container justify="flex-end" alignItems="center">
        <Box mt={0} pt={1}>
        {(adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.SaludEmergencias?.InformacionMedica.Editar === true)?
            <Button type="submit" className="buttonSave"  onClick={UpdateCandidate}>
                Guardar y Continuar&nbsp;<SaveIcon />
            </Button>
            :null
        }
        </Box>
        </Grid>
        </div>
        </>
    )
}

export default EnfermedadNuevoIngreso;