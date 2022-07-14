import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Box, FormControl, Grid, InputLabel, Select, TextField, Button } from "@material-ui/core";
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";
import { paisesEstados } from "../../../../helpers/Json/paises-estados";
import { getMunicipios, getStates } from "../../../../helpers/Json/getStatesAndMunicipios";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";
import SaveIcon from '@material-ui/icons/Save';

const AddressDataInactivos = () => {
    const { state, dispatch } = useContext(CollaboratorContext);
    const [states, setState] = useState<Array<string>>([]);
    const [municipios, setMunicipios] = useState<Array<string>>([]);
    const [estado, setEstado] = useState<string>('');
    const [municipio, setMunicipio] = useState<string>('');
    const {adminState} = useContext(AdminContext)


    const reCheck = localStorage.getItem('reCheck');

    useEffect(() => {
        if(state.collaborator?.country)
        setState(getStates(state.collaborator?.country));
        if(state.collaborator?.state)
        setMunicipios(getMunicipios(state.collaborator?.state));

        if (state.collaborator) {
            if (state.collaborator?.municipality) {
                setMunicipio(state.collaborator?.municipality);
            }
            if (state.collaborator?.state) {
                setEstado(state.collaborator?.state);
            }
        }

    }, []);

    const handleChange = async (e: ChangeEvent<{ name: string, value: unknown }>) => {
        await updateData(e, state, dispatch, 0);
    }

    const onChangeCountry = async (e: any) => {
        setEstado('');
        setMunicipio('');
        setState(getStates(e.target.value));
        await updateData(e, state, dispatch, 0);
    }

    const onChangeState = async (e: any) => {
        setMunicipio('');
        let value = e.target.value;
        setEstado(value);
        setMunicipios(getMunicipios(value));
    }

    const UpdateCandidate = async () => {
        // let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "sent" ? 'si' : 'no');
        // if (result === true) {
        //     await SuccessfulAlert({ text: "Datos guardados correctamente." });
        // }
    }

    return (
        <>
        <div className={Math.round(state.sections[0]) >= 100 ? `validate__border` : `novalidate__border`}>
            <Box mb={2}>
                    <TextField 
                    type="text" name="address" defaultValue={state.collaborator?.address}
                    label="Calle y número" variant="outlined" size="small" fullWidth={true}
                    onBlur={(e) => handleChange(e)}
                    InputProps={{
                        readOnly: false,
                    }}
                    />
            </Box>
            <Grid direction="row" container spacing={2}>
                <Grid xs item>
                        <TextField
                            name="suburb" defaultValue={state.collaborator?.suburb || ''}
                            label="Colonia" variant="outlined" size="small" fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                </Grid>
                <Grid xs item>
                        <FormControl variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">País</InputLabel>
                        <Select
                            native
                            onChange={(e) => onChangeCountry(e)}
                            label={'Pais'}
                            name="country"
                            defaultValue={state.collaborator?.country || ''}
                        >
                            <option value={state.collaborator?.country || ''} disabled={true}>{state.collaborator?.country || ''}</option>
                            {
                                paisesEstados.map((country: any, index: number) => (
                                    <option key={index} value={country.country}>{country.country}</option>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid direction="row" container spacing={2}>
                <Grid xs item>
                        <FormControl variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">Estado</InputLabel>
                        <Select
                            native
                            onChange={(e) => onChangeState(e)}
                            onBlur={(e) => handleChange(e)}
                            label={'Estado'}
                            name="Estado"
                            value={estado}
                        >
                            <option value={estado} disabled={true}>{estado}</option>
                            {
                                states.map((state: string, index: number) => (
                                    <option key={index} value={`${state}`}>{state}</option>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs item>
                        <FormControl variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">Municipio</InputLabel>
                        <Select
                            native
                            onBlur={(e) => handleChange(e)}
                            onChange={(e: any) => setMunicipio(e.target.value)}
                            label={'Municipio'}
                            name="Municipio"
                            value={municipio}
                        >
                            <option value={municipio} disabled={true}>{municipio}</option>
                            {
                                municipios.map((municipio: any, index: number) => (
                                    <option key={index} value={municipio}>{municipio}</option>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid direction="row" container spacing={2}>
                <Grid xs item>
                        <TextField
                            name="ZC" defaultValue={state.collaborator?.ZC || ''}
                            label="Código postal" variant="outlined" size="small" fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                </Grid>
                <Grid xs item>
                        <TextField
                            name="nacionality" defaultValue={state.collaborator?.nacionality || ''}
                            label="Nacionalidad" variant="outlined" size="small" fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                </Grid>
            </Grid>
            {Math.round(state.sections[0]) < 100 && (<span className="spanRequerido">Todos los campos son obligatorios</span>) }
    
        </div>
        </>
    )
}

export default AddressDataInactivos;