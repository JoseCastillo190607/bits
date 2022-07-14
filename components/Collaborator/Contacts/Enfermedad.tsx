import { useContext, Fragment } from "react";
import { Box, TextField, Tooltip } from "@material-ui/core";
import { withStyles, Theme } from '@material-ui/core/styles';
import CollaboratorContext from "../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../helpers/Collaborator/Collaborator";

const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        maxWidth: 1000,
    },
}))(Tooltip);

const Enfermedad = () => {
    const { state, dispatch } = useContext(CollaboratorContext);

    const handleChange = async (e: any) => {
        await updateData(e, state, dispatch, 4);
    }

    return (
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
                    defaultValue={state.collaborator.Contactos?.Enfermedades?.Alergias}
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
                    defaultValue={state.collaborator.Contactos?.Enfermedades?.PadEnfer}
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
                    defaultValue={state.collaborator.Contactos?.Enfermedades?.Cirugias}
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
                    defaultValue={state.collaborator.Contactos?.Enfermedades?.TraMeRe}
                    autoFocus={true}
                    label="Tratamientos médicos o rehabilitaciones" variant="outlined" size="small"
                    fullWidth={true} onBlur={(e) => handleChange(e)}
                    InputProps={{
                        readOnly: false,
                    }}
                />
            </Box>
        </div>
    )
}

export default Enfermedad;