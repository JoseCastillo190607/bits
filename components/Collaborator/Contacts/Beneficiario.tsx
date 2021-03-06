import { ChangeEvent, useContext, useState, useEffect } from "react";
import { Box, FormControl, Grid, InputLabel, Select, TextField } from "@material-ui/core"
import CollaboratorContext from "../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../helpers/Collaborator/Collaborator";
import { paisesEstados } from "../../../helpers/Json/paises-estados";
import { getMunicipios, getStates } from "../../../helpers/Json/getStatesAndMunicipios";
import moment from "moment";
import { WarningAlert } from "../../../alerts/WarningAlert";
import { validDate } from "../../../helpers/validNewDate";
import React from "react";

var validateCURP = true;

const Beneficiario = () => {
    const { state, dispatch } = useContext(CollaboratorContext);
    const [states, setState] = useState<Array<string>>([]);
    const [municipios, setMunicipios] = useState<Array<string>>([]);
    const [estado, setEstado] = useState<string>('');
    const [municipio, setMunicipio] = useState<string>('');
    const [validateCurp, setValidatdCurp] = React.useState(true);

    const currentDate = moment();
    const validYears = 18;
    const isAdult = (birthday: string) => currentDate.year() - moment(birthday).year() >= validYears;

    const reCheck = localStorage.getItem('reCheck');

    useEffect(() => {
        if(state.collaborator.Contactos.Beneficiario?.PaisB){
            setState(getStates(state.collaborator.Contactos.Beneficiario?.PaisB));
        }
        
        if(state.collaborator.Contactos.Beneficiario?.EstadoB)
        {
            setMunicipios(getMunicipios(state.collaborator.Contactos.Beneficiario?.EstadoB));
        }
        

        if (state.collaborator.Contactos.Beneficiario) {
            if (state.collaborator.Contactos.Beneficiario.Municipio) {
                setMunicipio(state.collaborator.Contactos.Beneficiario.Municipio);
            }
            if (state.collaborator.Contactos.Beneficiario.EstadoB) {
                setEstado(state.collaborator.Contactos.Beneficiario.EstadoB);
            }
        }

    }, []);

    const handleChange = async (e: any) => {
        await updateData(e, state, dispatch, 2);
    }

    const handleChangeCurp = async (e: ChangeEvent<{ name: string, value: unknown }>) => {
        await updateData(e, state, dispatch, 2);
        if(state.collaborator?.Contactos.Beneficiario?.CURPB != undefined){
            const re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
            //const validado = state.collaborator?.DatosPersonales?.CURP.toLocaleUpperCase().match(re);
            const validado = re.test(state.collaborator?.Contactos.Beneficiario?.CURPB);
            if (!validado) {setValidatdCurp(false); validateCURP = false; return await WarningAlert({ text: "El formato de tu CURP no es la correcta." });}
            else  {setValidatdCurp(true); validateCURP = true; }
        }
    }

    const validDate = async (e: any) => {
        if (!isAdult(e.target.value)) {
            //state.collaborator.Contactos.Beneficiario.FechaNacimientoB = undefined;
            return WarningAlert({ title: "??Error!", text: `??El beneficiario debe ser mayor a ${validYears} a??os!` }).then(() => false);}
            else {
                await updateData(e, state, dispatch, 2);
            }
    }

    const onChangeCountry = async (e: any) => {
        setState(getStates(e.target.value));
        await updateData(e, state, dispatch, 2);
    }

    const onChangeState = (e: any) => {
        setMunicipio('')
        let value = e.target.value;
        setEstado(value);
        setMunicipios(getMunicipios(value));
    }
    return (
        <div className={state.sections[0] >= 100 ? `validate__border` : `novalidate__border`}>
            {/* <Box mt={2} mb={2}>
                        <TextField
                            name="NombreBeneficiario"
                            defaultValue={state.collaborator.Contactos.Beneficiario?.NombreBeneficiario}
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
                                name="NombreBeneficiario"
                                defaultValue={state.collaborator.Contactos.Beneficiario?.NombreBeneficiario}
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
                            defaultValue={state.collaborator.Contactos.Beneficiario?.ParentescoB || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator.Contactos.Beneficiario?.ParentescoB || ''} disabled={true}>{state.collaborator.Contactos.Beneficiario?.ParentescoB || ''}</option>
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
                        (<FormControl error={ state.collaborator.Contactos.Beneficiario?.ParentescoB == '' || state.collaborator.Contactos.Beneficiario?.ParentescoB == undefined} variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">Parentesco</InputLabel>
                        <Select
                            native
                            onBlur={(e) => handleChange(e)}
                            label={'Parentesco'}
                            name="ParentescoB"
                            defaultValue={state.collaborator.Contactos.Beneficiario?.ParentescoB || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator.Contactos.Beneficiario?.ParentescoB || ''} disabled={true}>{state.collaborator.Contactos.Beneficiario?.ParentescoB || ''}</option>
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
                                defaultValue={state.collaborator.Contactos.Beneficiario?.FechaNacimientoB}
                                name="FechaNacimientoB" variant="outlined" size="small"
                                onBlur={(e) => validDate(e)}
                                //onChange={(e) => validDate(e)}
                                InputProps={{
                                    readOnly: false,
                                }}
                            />
                        {/* }
                        { (reCheck == "false") &&
                            (<TextField error={ state.collaborator.Contactos.Beneficiario?.FechaNacimientoB == '' || state.collaborator.Contactos.Beneficiario?.FechaNacimientoB == undefined}
                                type="date"
                                defaultValue={state.collaborator.Contactos.Beneficiario?.FechaNacimientoB}
                                autoFocus={true}
                                name="FechaNacimientoB" variant="outlined" size="small"
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
                                name="CURPB"
                                defaultValue={state.collaborator.Contactos.Beneficiario?.CURPB}
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
                                name="CURPB"
                                defaultValue={state.collaborator.Contactos.Beneficiario?.CURPB}
                                
                                label="CURP" variant="outlined" size="small"
                                fullWidth={true} onBlur={(e) => handleChangeCurp(e)}
                                InputProps={{
                                    readOnly: false,
                                }}
                            />
                        {/* }
                        { (reCheck == "false") &&
                            (<TextField error= {!validateCURP}
                                name="CURPB"
                                defaultValue={state.collaborator.Contactos.Beneficiario?.CURPB}
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
                                name="CodigoPostalB"
                                defaultValue={state.collaborator.Contactos.Beneficiario?.CodigoPostalB}
                                autoFocus={true}
                                label="C??digo postal" variant="outlined" size="small"
                                fullWidth={true} onBlur={(e) => handleChange(e)}
                                InputProps={{
                                    readOnly: false,
                                }}
                            />
                        {/* }
                        { (reCheck == "false") &&
                            (<TextField error={ state.collaborator.Contactos.Beneficiario?.CodigoPostalB == '' || state.collaborator.Contactos.Beneficiario?.CodigoPostalB == undefined}
                                type="number"
                                name="CodigoPostalB"
                                defaultValue={state.collaborator.Contactos.Beneficiario?.CodigoPostalB}
                                autoFocus={true}
                                label="C??digo postal" variant="outlined" size="small"
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
                            name="DireccionB"
                            defaultValue={state.collaborator.Contactos.Beneficiario?.DireccionB}
                            autoFocus={true}
                            label="Direcci??n, calle y n??mero" variant="outlined" size="small"
                            fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    {/* }
                    { (reCheck == "false") &&
                        (<TextField error={ state.collaborator.Contactos.Beneficiario?.DireccionB == '' || state.collaborator.Contactos.Beneficiario?.DireccionB == undefined}
                            name="DireccionB"
                            defaultValue={state.collaborator.Contactos.Beneficiario?.DireccionB}
                            autoFocus={true}
                            label="Direcci??n, calle y n??mero" variant="outlined" size="small"
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
                            name="ColoniaB"
                            defaultValue={state.collaborator.Contactos.Beneficiario?.ColoniaB}
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
                        (<TextField error={ state.collaborator.Contactos.Beneficiario?.ColoniaB == '' || state.collaborator.Contactos.Beneficiario?.ColoniaB == undefined}
                            name="ColoniaB"
                            defaultValue={state.collaborator.Contactos.Beneficiario?.ColoniaB}
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
                        <InputLabel htmlFor="outlined-age-native-simple">Pa??s</InputLabel>
                        <Select
                            native
                            onChange={(e) => onChangeCountry(e)}
                            label={'Pa??s'}
                            name="PaisB"
                            defaultValue={state.collaborator.Contactos.Beneficiario?.PaisB || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator.Contactos.Beneficiario?.PaisB || ''} disabled={true}>{state.collaborator.Contactos.Beneficiario?.PaisB || ''}</option>
                            {
                                paisesEstados.map(({ country }: any, index: number) => (
                                    <option key={index} value={country}>{country}</option>
                                ))
                            }
                        </Select>
                    </FormControl>
                    {/* }
                    { (reCheck == "false") &&
                        (<FormControl error={ state.collaborator.Contactos.Beneficiario?.PaisB == '' || state.collaborator.Contactos.Beneficiario?.PaisB == undefined} variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">Pa??s</InputLabel>
                        <Select
                            native
                            onChange={(e) => onChangeCountry(e)}
                            label={'Pa??s'}
                            name="PaisB"
                            defaultValue={state.collaborator.Contactos.Beneficiario?.PaisB || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator.Contactos.Beneficiario?.PaisB || ''} disabled={true}>{state.collaborator.Contactos.Beneficiario?.PaisB || ''}</option>
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
                                name="EstadoB"
                                // defaultValue={state.collaborator.Contactos.Beneficiario?.EstadoB || ''}
                                value={estado}
                                
                            >
                                <option value={state.collaborator.Contactos.Beneficiario?.EstadoB || ''} disabled={true}>{state.collaborator.Contactos.Beneficiario?.EstadoB || ''}</option>
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
                            (<FormControl error={ state.collaborator.Contactos.Beneficiario?.EstadoB == '' || state.collaborator.Contactos.Beneficiario?.EstadoB == undefined} variant="outlined" fullWidth={true} size="small">
                            <InputLabel htmlFor="outlined-age-native-simple">Estado</InputLabel>
                            <Select
                                native
                                onChange={(e) => onChangeState(e)}
                                onBlur={(e) => handleChange(e)}
                                label={'Estado'}
                                name="EstadoB"
                                defaultValue={state.collaborator.Contactos.Beneficiario?.EstadoB || ''}
                                autoFocus={true}
                            >
                                <option value={state.collaborator.Contactos.Beneficiario?.EstadoB || ''} disabled={true}>{state.collaborator.Contactos.Beneficiario?.EstadoB || ''}</option>
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
                                name="MunicipioB"
                                defaultValue={state.collaborator.Contactos.Beneficiario?.MunicipioB || ''}
                                autoFocus={true}
                                onBlur={(e) => handleChange(e)}
                            >
                                <option value={state.collaborator.Contactos.Beneficiario?.MunicipioB || ''} disabled={true}>{state.collaborator.Contactos.Beneficiario?.MunicipioB || ''}</option>
                                {
                                    municipios.map((municipio: any, index: number) => (
                                        <option key={index} value={municipio}>{municipio}</option>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        {/* }
                        { (reCheck == "false") &&
                            (<FormControl error={ state.collaborator.Contactos.Beneficiario?.MunicipioB == '' || state.collaborator.Contactos.Beneficiario?.MunicipioB == undefined} variant="outlined" fullWidth={true} size="small">
                            <InputLabel html    For="outlined-age-native-simple">Municipio</InputLabel>
                            <Select
                                native
                                label={'Municipio'}
                                name="MunicipioB"
                                defaultValue={state.collaborator.Contactos.Beneficiario?.MunicipioB || ''}
                                autoFocus={true}
                                onBlur={(e) => handleChange(e)}
                            >
                                <option value={state.collaborator.Contactos.Beneficiario?.MunicipioB || ''} disabled={true}>{state.collaborator.Contactos.Beneficiario?.MunicipioB || ''}</option>
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

export default Beneficiario;