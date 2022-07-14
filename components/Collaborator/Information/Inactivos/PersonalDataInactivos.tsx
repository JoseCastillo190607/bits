import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Box, Grid, TextField } from "@material-ui/core";
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";
import { useParams } from "react-router-dom";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";


const PersonalDataInactivos = () => {
    const { state, dispatch } = useContext(CollaboratorContext);
    const [disabled, setDisabled] = useState<boolean>(false);
    const params = useParams();

    useEffect(() => {
        if ('register' in params) setDisabled(true);
    }, [params]);

    const handleChange = async (e: ChangeEvent<{ name: string, value: unknown }>) => {
        await updateData(e, state, dispatch, 0);
    }

    const UpdateCandidate = async () => {
        let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "sent" ? 'si' : 'no');
        if (result === true) {
            await SuccessfulAlert({ text: "Datos guardados correctamente." });
        }
    }

    return (
        <div className={Math.round(state.sections[0]) >= 100 ? `validate__border` : `novalidate__border`}>
            <Box mb={2}>
                <TextField
                    type="text" name="name" defaultValue={state.collaborator.name}
                    label="Nombre(s)" variant="outlined" size="small" fullWidth={true}
                    onBlur={(e) => handleChange(e)}
                    InputProps={{
                        readOnly: false,
                    }}
                    disabled={disabled}
                    helperText={!state.collaborator?.name && 'Obligatorio'}
                />
            </Box>
            <Grid direction="row" container spacing={2}>
                <Grid xs item>
                    <TextField
                        name="firstName" defaultValue={state.collaborator?.firstName || ''}
                        label="Primer apellido" variant="outlined" size="small" fullWidth={true}
                        onBlur={(e) => handleChange(e)}
                        InputProps={{
                            readOnly: false,
                        }}
                        disabled={disabled}
                        helperText={!state.collaborator?.firstName && 'Obligatorio'}
                    />
                </Grid>
                <Grid xs item>
                    <TextField
                        name="lastName" defaultValue={state.collaborator?.lastName || ''}
                        label="Segundo apellido" variant="outlined" size="small" fullWidth={true}
                        onBlur={(e) => handleChange(e)}
                        InputProps={{
                            readOnly: false,
                        }}
                        disabled={disabled}
                    />
                </Grid>
            </Grid>
            <Box mt={2}>
                <TextField
                    type="email" name="email" defaultValue={state.collaborator?.email || ''}
                    label="Email" variant="outlined" size="small" fullWidth={true}
                    onBlur={(e) => handleChange(e)}
                    InputProps={{
                        readOnly: false,
                    }}
                    disabled={disabled}
                    helperText={!state.collaborator?.email && 'Obligatorio'}
                />
            </Box>
            <Box mt={2}>
                <TextField
                    type="number" name="cellphone" defaultValue={state.collaborator?.cellphone || ''}
                    label="Teléfono celular profesional" variant="outlined" size="small" fullWidth={true}
                    onBlur={(e) => handleChange(e)}
                    InputProps={{
                        readOnly: false,
                    }}
                    disabled={disabled}
                    helperText={!state.collaborator?.cellphone && 'Obligatorio'}
                />
            </Box>
            {/* {Math.round(state.sections[0]) < 100 && (<span className="spanRequerido">Todos los campos son requeridos</span>) } */}

        </div>
    )
}

export default PersonalDataInactivos;