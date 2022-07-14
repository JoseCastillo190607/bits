import { useContext } from "react";
import { Box, FormControl, Grid, InputLabel, Select, TextField } from "@material-ui/core"
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";


const EmergenciaInactivos = () => {
    const { state, dispatch } = useContext(CollaboratorContext);
    const handleChange = async (e: any) => {
        await updateData(e, state, dispatch, 3);
    }

    const UpdateCandidate = async () => {
        let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "sent" ? 'si' : 'no');
        if (result === true) {
            await SuccessfulAlert({ text: "Datos guardados correctamente." });
        }
    }
    
    return (
        <div className={state.sections[1] >= 100 ? `validate__border` : `novalidate__border`}>
            <Box mt={2} mb={2}>
                    {/* { (reCheck == "true" || reCheck == null) && */}
                        <TextField
                            name="emergencyContact"
                            defaultValue={state.collaborator?.emergencyContact}
                            autoFocus={true}
                            label="Nombre del contacto de emergencia" variant="outlined" size="small"
                            fullWidth={true} onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.emergencyContact && 'Obligatorio'}
                        />
                    {/* }
                    { (reCheck == "false") &&
                        (<TextField error={ state.collaborator?.emergencyContact == '' || state.collaborator?.emergencyContact == undefined}
                            name="emergencyContact"
                            defaultValue={state.collaborator?.emergencyContact}
                            autoFocus={true}
                            label="Nombre del Contacto de Emergencia" variant="outlined" size="small"
                            fullWidth={true} onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.emergencyContact && 'Requerido'}
                        />)
                    } */}
                
            </Box>

            <Box mt={2}>
                <Grid direction="row" container spacing={2}>
                    <Grid xs item>
                    {/* { (reCheck == "true" || reCheck == null) && */}
                        <FormControl variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">Parentesco</InputLabel>
                        <Select
                            native
                            onBlur={(e) => handleChange(e)}
                            label={'Parentesco'}
                            name="ParentescoCE"
                            defaultValue={state.collaborator?.ParentescoCE || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator?.ParentescoCE || ''} disabled={true}>{state.collaborator?.ParentescoCE || ''}</option>
                            <option value="Madre">Madre</option>
                            <option value="Padre">Padre</option>
                            <option value="Hijo(a)">Hijo(a)</option>
                            <option value="Esposo(a)">Esposo(a)</option>
                            <option value="Concubino(a)">Concubino(a)</option>
                            <option value="Hermano(a)">Hermano(a)</option>
                            <option value="Novio">Novio</option>
                            <option value="Novia">Novia</option>
                            <option value="Amigo(a)">Amigo(a)</option>
                            helperText={!state.collaborator?.ParentescoCE && 'Obligatorio'}  
                        </Select> 
                    </FormControl>
                    {/* }
                    { (reCheck == "false") &&
                        (<FormControl error={ state.collaborator?.ParentescoCE == '' || state.collaborator?.ParentescoCE == undefined} variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">Parentesco</InputLabel>
                        <Select
                            native
                            onBlur={(e) => handleChange(e)}
                            label={'Parentesco'}
                            name="ParentescoCE"
                            defaultValue={state.collaborator?.ParentescoCE || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator?.ParentescoCE || ''} disabled={true}>{state.collaborator?.ParentescoCE || ''}</option>
                            <option value="Madre">Madre</option>
                            <option value="Padre">Padre</option>
                            <option value="Hijo(a)">Hijo(a)</option>
                            <option value="Esposo(a)">Esposo(a)</option>
                            <option value="Concubino(a)">Concubino(a)</option>
                            <option value="Hermano(a)">Hermano(a)</option>
                            <option value="Novio">Novio</option>
                            <option value="Novia">Novia</option>
                            <option value="Amigo(a)">Amigo(a)</option>
                        </Select>   
                    </FormControl>)
                    } */}
                        
                    </Grid>
                    <Grid xs item>
                        <TextField
                            type="number"
                            name="phoneCE"
                            defaultValue={state.collaborator?.phoneCE}
                            autoFocus={true}
                            label="Teléfono fijo" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box mt={2}>
                <Grid direction="row" container spacing={2}>
                    <Grid xs item>
                    {/* { (reCheck == "true" || reCheck == null) && */}
                        <TextField
                            type="number"
                            name="cellphoneCE"
                            defaultValue={state.collaborator?.cellphoneCE}
                            autoFocus={true}
                            label="Teléfono móvil" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.cellphoneCE && 'Obligatorio'}
                        />
                    {/* }
                    { (reCheck == "false") &&
                        (<TextField error={ state.collaborator?.cellphoneCE == '' || state.collaborator?.cellphoneCE == undefined}
                            type="number"
                            name="cellphoneCE"
                            defaultValue={state.collaborator?.cellphoneCE}
                            autoFocus={true}
                            label="Teléfono Móvil" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.cellphoneCE && 'Requerido'}
                        />)
                    } */}
                        
                    </Grid>
                    <Grid xs item>
                    {/* { (reCheck == "true" || reCheck == null) && */}
                        <TextField
                            name="suburbCE"
                            defaultValue={state.collaborator?.suburbCE}
                            autoFocus={true}
                            label="Colonia" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.suburbCE && 'Obligatorio'}
                        />
                    {/* }
                    { (reCheck == "false") &&
                        (<TextField error={ state.collaborator?.suburbCE == '' || state.collaborator?.suburbCE == undefined}
                            name="suburbCE"
                            defaultValue={state.collaborator?.suburbCE}
                            autoFocus={true}
                            label="Colonia" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.suburbCE && 'Requerido'}
                        />)
                    } */}
                        
                    </Grid>
                </Grid>
            </Box>

            <Box mt={2}>
                <Grid direction="row" container spacing={2}>
                    <Grid xs item>
                    {/* { (reCheck == "true" || reCheck == null) && */}
                        <TextField
                            name="addressCE"
                            defaultValue={state.collaborator?.addressCE}
                            autoFocus={true}
                            label="Calle y número" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.addressCE && 'Obligatorio'}
                        />
                    {/* }
                    { (reCheck == "false") &&
                        (<TextField error={ state.collaborator?.addressCE == '' || state.collaborator?.addressCE == undefined}
                            name="addressCE"
                            defaultValue={state.collaborator?.addressCE}
                            autoFocus={true}
                            label="Calle y número" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.suburbCE && 'Requerido'}
                        />)
                    } */}
                        
                    </Grid>
                </Grid>
            </Box>
            {/* {Math.round(state.sections[1]) < 100 && (<span className="spanRequerido">Todos los campos son requeridos</span>) } */}

        </div>
    )
}

export default EmergenciaInactivos;