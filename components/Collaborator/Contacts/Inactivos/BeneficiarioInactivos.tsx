import { ChangeEvent, useContext, useState, useEffect } from "react";
import { Box, FormControl, Grid, InputLabel, Select, TextField } from "@material-ui/core"
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";
import { paisesEstados } from "../../../../helpers/Json/paises-estados";
import { getMunicipios, getStates } from "../../../../helpers/Json/getStatesAndMunicipios";
import moment from "moment";
import { WarningAlert } from "../../../../alerts/WarningAlert";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import React from "react";

var validateCURP = true;

const BeneficiarioInactivos = () => {
    const { state, dispatch } = useContext(CollaboratorContext);
    const [states, setState] = useState<Array<string>>([]);
    const [municipios, setMunicipios] = useState<Array<string>>([]);
    const [estado, setEstado] = useState<string>('');
    const [municipio, setMunicipio] = useState<string>('');
    const [validateCurp, setValidatdCurp] = React.useState(true);

    const currentDate = moment();
    const validYears = 18;
    const isAdult = (birthday: string) => currentDate.year() - moment(birthday).year() >= validYears;


    useEffect(() => {
        console.log("a ver", state.collaborator)
        if(state.collaborator?.benefitiaryCountry){
            console.log("1")
            setState(getStates(state.collaborator?.benefitiaryCountry));
        }
        
        if(state.collaborator?.benefitiaryState)
        {
            console.log("2")
            setMunicipios(getMunicipios(state.collaborator?.benefitiaryState));
        }
        
        //console.log("check", reCheck);

        if (state.collaborator) {
            if (state.collaborator.benefitiaryMunicipality) {
                setMunicipio(state.collaborator.benefitiaryMunicipality);
            }
            if (state.collaborator.benefitiaryState) {
                console.log("si")
                setEstado(state.collaborator.benefitiaryState);
            }
        }

    }, []);


    const handleChange = async (e: any) => {
        await updateData(e, state, dispatch, 0);
    }

    const handleChangeCurp = async (e: ChangeEvent<{ name: string, value: unknown }>) => {
        await updateData(e, state, dispatch, 0);
        if(state.collaborator?.benefitiaryCURP != undefined){
            const re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
            const validado = re.test(state.collaborator?.benefitiaryCURP);
            if (!validado) {setValidatdCurp(false); validateCURP = false; return await WarningAlert({ text: "El formato de tu CURP no es la correcta." });}
            else  {setValidatdCurp(true); validateCURP = true; }
        }
    }

    const validDate = async (e: any) => {
        if (!isAdult(e.target.value)) {
            return WarningAlert({ title: "¡Error!", text: `¡El beneficiario debe ser mayor a ${validYears} años!` }).then(() => false);}
            else {
                await updateData(e, state, dispatch, 0);
            }
    }

    const onChangeCountry = async (e: any) => {
        setState(getStates(e.target.value));
        await updateData(e, state, dispatch, 0);
    }

    const onChangeState = (e: any) => {
        setMunicipio('')
        let value = e.target.value;
        setEstado(value);
        setMunicipios(getMunicipios(value));
    }

    const UpdateCandidate = async () => {
        let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "sent" ? 'si' : 'no');
        if (result === true) {
            await SuccessfulAlert({ text: "Datos guardados correctamente." });
        }
    }

    return (
        <div className={state.sections[0] >= 100 ? `validate__border` : `novalidate__border`}>
            {/* <Box mt={2} mb={2}>
                        <TextField
                            name="benefitiary"
                            defaultValue={state.collaborator?.benefitiary}
                            autoFocus={true}
                            label="Nombre del beneficiario del seguro" variant="outlined" size="small"
                            fullWidth={true} onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />                                 
            </Box> */}

            <Grid direction="row" container spacing={2}>
                <Grid xs item>
                    <TextField
                                name="benefitiary"
                                defaultValue={state.collaborator?.benefitiary}
                                autoFocus={true}
                                label="Nombre del beneficiario del seguro" variant="outlined" size="small"
                                fullWidth={true} onBlur={(e) => handleChange(e)}
                                InputProps={{
                                    readOnly: false,
                                }}
                            />
                </Grid>
                <Grid xs item>
                    {/* { (reCheck == "true" || reCheck == null) && */}
                        <FormControl variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">Parentesco</InputLabel>
                        <Select
                            native
                            onBlur={(e) => handleChange(e)}
                            label={'Parentesco'}
                            name="ParentescoB"
                            defaultValue={state.collaborator?.ParentescoB || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator?.ParentescoB || ''} disabled={true}>{state.collaborator?.ParentescoB || ''}</option>
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
                    </FormControl>
                    {/* }
                    { (reCheck == "false") &&
                        (<FormControl error={ state.collaborator?.ParentescoB == '' || state.collaborator?.ParentescoB == undefined} variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">Parentesco</InputLabel>
                        <Select
                            native
                            onBlur={(e) => handleChange(e)}
                            label={'Parentesco'}
                            name="ParentescoB"
                            defaultValue={state.collaborator?.ParentescoB || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator?.ParentescoB || ''} disabled={true}>{state.collaborator?.ParentescoB || ''}</option>
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
            </Grid>

            <Box mt={2}>
                <Grid direction="row" container justify="flex-start" alignItems="center">
                    <Grid xs item>
                        <span className="Fecha-de-nacimiento">Fecha de nacimiento</span>
                    </Grid>
                    <Grid xs item container justify="flex-end" alignItems="center">
                        {/* { (reCheck == "true" || reCheck == null) && */}
                            <TextField
                                type="date"
                                defaultValue={state.collaborator?.benefitiaryDateOfBirth}
                                name="benefitiaryDateOfBirth" variant="outlined" size="small"
                                onBlur={(e) => validDate(e)}
                                //onChange={(e) => validDate(e)}
                                InputProps={{
                                    readOnly: false,
                                }}
                            />
                        {/* }
                        { (reCheck == "false") &&
                            (<TextField error={ state.collaborator?.benefitiaryDateOfBirth == '' || state.collaborator?.benefitiaryDateOfBirth == undefined}
                                type="date"
                                defaultValue={state.collaborator?.benefitiaryDateOfBirth}
                                autoFocus={true}
                                name="benefitiaryDateOfBirth" variant="outlined" size="small"
                                onBlur={(e) => handleChange(e)}
                                onChange={(e) => validDate(e)}
                                InputProps={{
                                    readOnly: false,
                                }}
                            />)
                        } */}
                        
                    </Grid>
                </Grid>
            </Box>

            <Box mt={2}>
                <Grid direction="row" container spacing={2}>
                    <Grid xs item>
                             {/* (<TextField error= {!validateCURP}
                                name="benefitiaryCURP"
                                defaultValue={state.collaborator?.benefitiaryCURP}
                                autoFocus={true}
                                label="CURP" variant="outlined" size="small"
                                fullWidth={true}
                                onChange={(e) => handleChangeCurp(e)}
                                InputProps={{
                                    readOnly: false,
                                }}
                            /> */}
                            {/* { (reCheck == "true" || reCheck == null) && */}
                            <TextField
                                name="benefitiaryCURP"
                                defaultValue={state.collaborator?.benefitiaryCURP}
                                
                                label="CURP" variant="outlined" size="small"
                                fullWidth={true} onBlur={(e) => handleChangeCurp(e)}
                                InputProps={{
                                    readOnly: false,
                                }}
                            />
                        {/* }
                        { (reCheck == "false") &&
                            (<TextField error= {!validateCURP}
                                name="benefitiaryCURP"
                                defaultValue={state.collaborator?.benefitiaryCURP}
                                autoFocus={true}
                                label="CURP" variant="outlined" size="small"
                                fullWidth={true}
                                onChange={(e) => handleChangeCurp(e)}
                                InputProps={{
                                    readOnly: false,
                                }}
                            />)
                        } */}
                        
                    </Grid>
                    <Grid xs item>
                        {/* { (reCheck == "true" || reCheck == null) && */}
                            <TextField
                                type="number"
                                name="benefitiaryZC"
                                defaultValue={state.collaborator?.benefitiaryZC}
                                autoFocus={true}
                                label="Código postal" variant="outlined" size="small"
                                fullWidth={true} onBlur={(e) => handleChange(e)}
                                InputProps={{
                                    readOnly: false,
                                }}
                            />
                        {/* }
                        { (reCheck == "false") &&
                            (<TextField error={ state.collaborator?.benefitiaryZC == '' || state.collaborator?.benefitiaryZC == undefined}
                                type="number"
                                name="benefitiaryZC"
                                defaultValue={state.collaborator?.benefitiaryZC}
                                autoFocus={true}
                                label="Código postal" variant="outlined" size="small"
                                fullWidth={true} onBlur={(e) => handleChange(e)}
                                InputProps={{
                                    readOnly: false,
                                }}
                            />)
                        } */}
                        
                    </Grid>
                </Grid>
            </Box>

            <Box mt={2} mb={2}>
                    {/* { (reCheck == "true" || reCheck == null) && */}
                        <TextField
                            name="benefitiaryAddress"
                            defaultValue={state.collaborator?.benefitiaryAddress}
                            autoFocus={true}
                            label="Dirección, calle y número" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    {/* }
                    { (reCheck == "false") &&
                        (<TextField error={ state.collaborator?.benefitiaryAddress == '' || state.collaborator?.benefitiaryAddress == undefined}
                            name="benefitiaryAddress"
                            defaultValue={state.collaborator?.benefitiaryAddress}
                            autoFocus={true}
                            label="Dirección, calle y número" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />)
                    } */}
                
            </Box>

            <Grid direction="row" container spacing={2}>
                <Grid xs item>
                    {/* { (reCheck == "true" || reCheck == null) && */}
                        <TextField
                            name="benefitiarySuburb"
                            defaultValue={state.collaborator?.benefitiarySuburb}
                            autoFocus={true}
                            label="Colonia" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    {/* }
                    { (reCheck == "false") &&
                        (<TextField error={ state.collaborator?.benefitiarySuburb == '' || state.collaborator?.benefitiarySuburb == undefined}
                            name="benefitiarySuburb"
                            defaultValue={state.collaborator?.benefitiarySuburb}
                            autoFocus={true}
                            label="Colonia" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />)
                    } */}
                    
                </Grid>
                <Grid xs item>
                    {/* { (reCheck == "true" || reCheck == null) && */}
                        <FormControl variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">País</InputLabel>
                        <Select
                            native
                            onChange={(e) => onChangeCountry(e)}
                            label={'País'}
                            name="benefitiaryCountry"
                            defaultValue={state.collaborator?.benefitiaryCountry || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator?.benefitiaryCountry || ''} disabled={true}>{state.collaborator?.benefitiaryCountry || ''}</option>
                            {
                                paisesEstados.map(({ country }: any, index: number) => (
                                    <option key={index} value={country}>{country}</option>
                                ))
                            }
                        </Select>
                    </FormControl>
                    {/* }
                    { (reCheck == "false") &&
                        (<FormControl error={ state.collaborator?.benefitiaryCountry == '' || state.collaborator?.benefitiaryCountry == undefined} variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">País</InputLabel>
                        <Select
                            native
                            onChange={(e) => onChangeCountry(e)}
                            label={'País'}
                            name="benefitiaryCountry"
                            defaultValue={state.collaborator?.benefitiaryCountry || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator?.benefitiaryCountry || ''} disabled={true}>{state.collaborator?.benefitiaryCountry || ''}</option>
                            {
                                paisesEstados.map(({ country }: any, index: number) => (
                                    <option key={index} value={country}>{country}</option>
                                ))
                            }
                        </Select>
                    </FormControl>)
                    } */}
                    
                </Grid>
            </Grid>

            <Box mt={2}>
                <Grid direction="row" container spacing={2}>
                    <Grid xs item>
                        {/* { (reCheck == "true" || reCheck == null) && */}
                            <FormControl variant="outlined" fullWidth={true} size="small">
                            <InputLabel htmlFor="outlined-age-native-simple">Estado</InputLabel>
                            <Select
                                native
                                onChange={(e) => onChangeState(e)}
                                onBlur={(e) => handleChange(e)}
                                label={'Estado'}
                                name="benefitiaryState"
                                // defaultValue={state.collaborator?.benefitiaryState || ''}
                                value={estado}
                                
                            >
                                <option value={state.collaborator?.benefitiaryState || ''} disabled={true}>{state.collaborator?.benefitiaryState || ''}</option>
                                {/* <option value={estado} disabled={true}>{estado}</option> */}
                                {
                                    states.map((state: string, index: number) => (
                                        <option key={index} value={`${state}`}>{state}</option>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        {/* }
                        { (reCheck == "false") &&
                            (<FormControl error={ state.collaborator?.benefitiaryState == '' || state.collaborator?.benefitiaryState == undefined} variant="outlined" fullWidth={true} size="small">
                            <InputLabel htmlFor="outlined-age-native-simple">Estado</InputLabel>
                            <Select
                                native
                                onChange={(e) => onChangeState(e)}
                                onBlur={(e) => handleChange(e)}
                                label={'Estado'}
                                name="benefitiaryState"
                                defaultValue={state.collaborator?.benefitiaryState || ''}
                                autoFocus={true}
                            >
                                <option value={state.collaborator?.benefitiaryState || ''} disabled={true}>{state.collaborator?.benefitiaryState || ''}</option>
                                {
                                    states.map((state: string, index: number) => (
                                        <option key={index} value={`${state}`}>{state}</option>
                                    ))
                                }
                            </Select>
                        </FormControl>)
                        } */}
                        
                    </Grid>
                    <Grid xs item>
                        {/* { (reCheck == "true" || reCheck == null) && */}
                            <FormControl variant="outlined" fullWidth={true} size="small">
                            <InputLabel htmlFor="outlined-age-native-simple">Municipio</InputLabel>
                            <Select
                                native
                                label={'Municipio'}
                                name="benefitiaryMunicipality"
                                defaultValue={state.collaborator?.benefitiaryMunicipality || ''}
                                autoFocus={true}
                                onBlur={(e) => handleChange(e)}
                            >
                                <option value={state.collaborator?.benefitiaryMunicipality || ''} disabled={true}>{state.collaborator?.benefitiaryMunicipality || ''}</option>
                                {
                                    municipios.map((municipio: any, index: number) => (
                                        <option key={index} value={municipio}>{municipio}</option>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        {/* }
                        { (reCheck == "false") &&
                            (<FormControl error={ state.collaborator?.benefitiaryMunicipality == '' || state.collaborator?.benefitiaryMunicipality == undefined} variant="outlined" fullWidth={true} size="small">
                            <InputLabel html    For="outlined-age-native-simple">Municipio</InputLabel>
                            <Select
                                native
                                label={'Municipio'}
                                name="benefitiaryMunicipality"
                                defaultValue={state.collaborator?.benefitiaryMunicipality || ''}
                                autoFocus={true}
                                onBlur={(e) => handleChange(e)}
                            >
                                <option value={state.collaborator?.benefitiaryMunicipality || ''} disabled={true}>{state.collaborator?.benefitiaryMunicipality || ''}</option>
                                {
                                    municipios.map((municipio: any, index: number) => (
                                        <option key={index} value={municipio}>{municipio}</option>
                                    ))
                                }
                            </Select>
                        </FormControl>)
                        } */}
                        
                    </Grid>
                </Grid>
            </Box>
            {Math.round(state.sections[0]) < 100 && (<span className="spanRequerido">Todos los campos son obligatorios</span>) }

        </div>
    )
}

export default BeneficiarioInactivos;