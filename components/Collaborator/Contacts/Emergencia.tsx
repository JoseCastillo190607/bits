import { useContext } from "react";
import { Box, FormControl, Grid, InputLabel, Select, TextField } from "@material-ui/core"
import CollaboratorContext from "../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../helpers/Collaborator/Collaborator";

const Emergencia = () => {
    const { state, dispatch } = useContext(CollaboratorContext);

    const reCheck = localStorage.getItem('reCheck');

    const handleChange = async (e: any) => {
        await updateData(e, state, dispatch, 3);
    }

    return (
        <div className={state.sections[1] >= 100 ? `validate__border` : `novalidate__border`}>
            <Box mt={2} mb={2}>
                    {/* { (reCheck == "true" || reCheck == null) && */}
                        <TextField
                            name="NombreContactoEmergencia"
                            defaultValue={state.collaborator.Contactos.ContactoEmergencia?.NombreContactoEmergencia}
                            autoFocus={true}
                            label="Nombre del contacto de emergencia" variant="outlined" size="small"
                            fullWidth={true} onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.Contactos.ContactoEmergencia?.NombreContactoEmergencia && 'Obligatorio'}
                        />
                    {/* }
                    { (reCheck == "false") &&
                        (<TextField error={ state.collaborator.Contactos.ContactoEmergencia?.NombreContactoEmergencia == '' || state.collaborator.Contactos.ContactoEmergencia?.NombreContactoEmergencia == undefined}
                            name="NombreContactoEmergencia"
                            defaultValue={state.collaborator.Contactos.ContactoEmergencia?.NombreContactoEmergencia}
                            autoFocus={true}
                            label="Nombre del Contacto de Emergencia" variant="outlined" size="small"
                            fullWidth={true} onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.Contactos.ContactoEmergencia?.NombreContactoEmergencia && 'Requerido'}
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
                            defaultValue={state.collaborator.Contactos.ContactoEmergencia?.ParentescoCE || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator.Contactos.ContactoEmergencia?.ParentescoCE || ''} disabled={true}>{state.collaborator.Contactos.ContactoEmergencia?.ParentescoCE || ''}</option>
                            <option value="Madre">Madre</option>
                            <option value="Padre">Padre</option>
                            <option value="Hijo(a)">Hijo(a)</option>
                            <option value="Esposo(a)">Esposo(a)</option>
                            <option value="Concubino(a)">Concubino(a)</option>
                            <option value="Hermano(a)">Hermano(a)</option>
                            <option value="Novio">Novio</option>
                            <option value="Novia">Novia</option>
                            <option value="Amigo(a)">Amigo(a)</option>
                            helperText={!state.collaborator?.Contactos.ContactoEmergencia?.ParentescoCE && 'Obligatorio'}  
                        </Select> 
                    </FormControl>
                    {/* }
                    { (reCheck == "false") &&
                        (<FormControl error={ state.collaborator.Contactos.ContactoEmergencia?.ParentescoCE == '' || state.collaborator.Contactos.ContactoEmergencia?.ParentescoCE == undefined} variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">Parentesco</InputLabel>
                        <Select
                            native
                            onBlur={(e) => handleChange(e)}
                            label={'Parentesco'}
                            name="ParentescoCE"
                            defaultValue={state.collaborator.Contactos.ContactoEmergencia?.ParentescoCE || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator.Contactos.ContactoEmergencia?.ParentescoCE || ''} disabled={true}>{state.collaborator.Contactos.ContactoEmergencia?.ParentescoCE || ''}</option>
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
                            name="TelefonoFijoCE"
                            defaultValue={state.collaborator.Contactos.ContactoEmergencia?.TelefonoFijoCE}
                            autoFocus={true}
                            label="Tel??fono fijo" variant="outlined" size="small"
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
                            name="TelefonoMovilCE"
                            defaultValue={state.collaborator.Contactos.ContactoEmergencia?.TelefonoMovilCE}
                            autoFocus={true}
                            label="Tel??fono m??vil" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.Contactos.ContactoEmergencia?.TelefonoMovilCE && 'Obligatorio'}
                        />
                    {/* }
                    { (reCheck == "false") &&
                        (<TextField error={ state.collaborator.Contactos.ContactoEmergencia?.TelefonoMovilCE == '' || state.collaborator.Contactos.ContactoEmergencia?.TelefonoMovilCE == undefined}
                            type="number"
                            name="TelefonoMovilCE"
                            defaultValue={state.collaborator.Contactos.ContactoEmergencia?.TelefonoMovilCE}
                            autoFocus={true}
                            label="Tel??fono M??vil" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.Contactos.ContactoEmergencia?.TelefonoMovilCE && 'Requerido'}
                        />)
                    } */}
                        
                    </Grid>
                    <Grid xs item>
                    {/* { (reCheck == "true" || reCheck == null) && */}
                        <TextField
                            name="ColoniaCE"
                            defaultValue={state.collaborator.Contactos.ContactoEmergencia?.ColoniaCE}
                            autoFocus={true}
                            label="Colonia" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.Contactos.ContactoEmergencia?.ColoniaCE && 'Obligatorio'}
                        />
                    {/* }
                    { (reCheck == "false") &&
                        (<TextField error={ state.collaborator.Contactos.ContactoEmergencia?.ColoniaCE == '' || state.collaborator.Contactos.ContactoEmergencia?.ColoniaCE == undefined}
                            name="ColoniaCE"
                            defaultValue={state.collaborator.Contactos.ContactoEmergencia?.ColoniaCE}
                            autoFocus={true}
                            label="Colonia" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.Contactos.ContactoEmergencia?.ColoniaCE && 'Requerido'}
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
                            name="DireccionCE"
                            defaultValue={state.collaborator.Contactos.ContactoEmergencia?.DireccionCE}
                            autoFocus={true}
                            label="Calle y n??mero" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.Contactos.ContactoEmergencia?.DireccionCE && 'Obligatorio'}
                        />
                    {/* }
                    { (reCheck == "false") &&
                        (<TextField error={ state.collaborator.Contactos.ContactoEmergencia?.DireccionCE == '' || state.collaborator.Contactos.ContactoEmergencia?.DireccionCE == undefined}
                            name="DireccionCE"
                            defaultValue={state.collaborator.Contactos.ContactoEmergencia?.DireccionCE}
                            autoFocus={true}
                            label="Calle y n??mero" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.Contactos.ContactoEmergencia?.ColoniaCE && 'Requerido'}
                        />)
                    } */}
                        
                    </Grid>
                </Grid>
            </Box>
            {/* {Math.round(state.sections[1]) < 100 && (<span className="spanRequerido">Todos los campos son requeridos</span>) } */}
        </div>
    )
}

export default Emergencia;