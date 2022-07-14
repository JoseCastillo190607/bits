import { ChangeEvent, useContext } from "react";
import { Box, FormControl, Grid, InputLabel, Select, TextField,Button } from "@material-ui/core";
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";
import { paisesEstados } from "../../../../helpers/Json/paises-estados";
import moment from "moment";
import { WarningAlert } from "../../../../alerts/WarningAlert";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";
import SaveIcon from '@material-ui/icons/Save';
import { useMutation } from "@apollo/client";
import {UPDATE_USERS} from "../../../../Querys/querys";

const InformationDataColaboradores = () => {
    const { state, dispatch } = useContext(CollaboratorContext);
    const {adminState} = useContext(AdminContext)

    const [updateColaboradores] = useMutation(UPDATE_USERS);

    const currentDate = moment();
    const validYears = 18;
    const isAdult = (birthday: string) => currentDate.year() - moment(birthday).year() >= validYears;

    const reCheck = localStorage.getItem('reCheck');

    const handleChange = async (e: ChangeEvent<{ name: string, value: unknown }>) => {
        await updateData(e, state, dispatch, 1);
    }

    const handleChangeDate = async (e: ChangeEvent<{ name: string, value: string }>) => {
        if (!isAdult( e.target.value)) {
            return WarningAlert({ title: "¡Error!", text: `¡El colaborador debe ser mayor a ${validYears} años!` }).then(() => false);}
            else {
                await updateData(e, state, dispatch, 1);
            }
    }

    const UpdateCandidate = async () => {
        // let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "sent" ? 'si' : 'no');
        updateColaboradores({
            variables: {
                updateUsersId: state.collaborator?.id,
              input: {
                educationalLevel: state.collaborator?.educationalLevel,
                dateOfBirth: state.collaborator?.dateOfBirth,
                gender: state.collaborator?.gender,
                placeOfBirth: state.collaborator?.placeOfBirth,
                civilStatus: state.collaborator?.civilStatus,
                children: state.collaborator?.children
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
        <div className={Math.round(state.sections[1]) >= 100 ? `validate__border` : `novalidate__border`}>
            <Box mb={2}>
                        <FormControl variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">Nivel de estudios</InputLabel>
                        <Select
                            native
                            onBlur={(e) => handleChange(e)}
                            label={'NivelEstudios'}
                            name="educationalLevel"
                            defaultValue={state.collaborator?.educationalLevel || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator?.educationalLevel || ''} disabled={true}>{state.collaborator?.educationalLevel || ''}</option>
                            <option value={'SECUNDARIA'}>SECUNDARIA</option>
                            <option value={'PREPARATORIA'}>PREPARATORIA</option>
                            <option value={'LICENCIATURA'}>LICENCIATURA</option>
                            <option value={'POSGRADO'}>POSGRADO</option>
                        </Select>
                    </FormControl>
            </Box>
            <Grid direction="row" container spacing={2}>
                <Grid xs item container justify="flex-start" alignItems="center">
                    <span className="Fecha-de-nacimiento">Fecha de nacimiento</span>
                </Grid>
                <Grid xs item direction="row" container justify="flex-end" alignItems="center">
                        <TextField
                            type="date" name="dateOfBirth" defaultValue={state.collaborator?.dateOfBirth || ''}
                            variant="outlined" size="small"
                            onBlur={(e) => handleChangeDate(e)}
                            //onChange={(e) => validDate(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            autoFocus={true}
                        />
                </Grid>
            </Grid>

            <Box mt={2} mb={2}>
                        <FormControl variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">Lugar de nacimiento</InputLabel>
                        <Select
                            native
                            onBlur={(e) => handleChange(e)}
                            label={'LugarNacimiento'}
                            name="placeOfBirth"
                            defaultValue={state.collaborator?.placeOfBirth || ''}
                        >
                            <option value={state.collaborator.placeOfBirth || ''} disabled={true}>{state.collaborator.placeOfBirth || ''}</option>
                            {
                                paisesEstados.map((country: any, index: number) => (
                                    <option key={index} value={country.country}>{country.country}</option>
                                ))
                            }
                        </Select>
                    </FormControl>
            </Box>

            <Grid direction="row" container spacing={2}>
                <Grid xs item>
                        <FormControl variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">Género</InputLabel>
                        <Select
                            native
                            onBlur={(e) => handleChange(e)}
                            label={'Género'}
                            name="gender"
                            defaultValue={state.collaborator?.gender || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator.gender || ''} disabled={true}>{state.collaborator.gender || ''}</option>
                            <option value={'Masculino'}>Masculino</option>
                            <option value={'Femenino'}>Femenino</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs item>
                        <FormControl variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">Estado civil</InputLabel>
                        <Select
                            native
                            onBlur={(e) => handleChange(e)}
                            label={'EstadoCivil'}
                            name="civilStatus"
                            defaultValue={state.collaborator?.civilStatus || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator.civilStatus || ''} disabled={true}>{state.collaborator.civilStatus || ''}</option>
                            <option value={'Soltero(a)'}>Soltero(a)</option>
                            <option value={'Casado(a)'}>Casado(a)</option>
                            <option value={'Unión Libre'}>Unión Libre</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs item>
                    <FormControl variant="outlined" fullWidth={true} size="small">
                        <TextField
                            type='number' name="children"
                            defaultValue={state.collaborator.children ? state.collaborator.children : 0}
                            autoFocus={true} label="Hijos" variant="outlined" size="small"
                            fullWidth={true} onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        /> 
                    </FormControl>
                </Grid>
            </Grid>
            {Math.round(state.sections[1]) < 100 && (<span className="spanRequerido">Todos los campos son obligatorios</span>) }
 

        </div>
        <div>
        <Grid direction="row" container justify="flex-end" alignItems="center">
        <Box mt={0} pt={1}>
        {(adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.DatosPersonales.Editar === true && state.collaborator.Estatus === "sent")?
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

export default InformationDataColaboradores;