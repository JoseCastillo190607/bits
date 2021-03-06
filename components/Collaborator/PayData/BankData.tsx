import { useContext, useState } from "react";
import { Box, FormControl, InputLabel, Select, TextField, Grid, Grow, Paper } from "@material-ui/core"
import CollaboratorContext from "../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../helpers/Collaborator/Collaborator";
import bancos from "../../../helpers/Json/bancos";
import File from '../Expedient/Fields/File';
import { WarningAlert } from "../../../alerts/WarningAlert";
import React from "react";

const BankData = () => {
    const { state, dispatch } = useContext(CollaboratorContext);
    const [clabe, setClabe] = useState();

    const reCheck = localStorage.getItem('reCheck');

    const handleChange = async (e: any) => {
        await updateData(e, state, dispatch, 5);
    }

    const handleChange2 = async (e: any) => {
        if(e.target.value.length < 9)
        
         return await WarningAlert({ text: "El formato de tu cuenta no es la correcta." });
         
        await updateData(e, state, dispatch, 5);
    }

    const onHandleBank = async (e: any) => {
        const result = await bancos.filter((object) => e.target.value === object.marca);
        setClabe(result[0].clabe);
    }

    const onHandleClabe = async (e: any) => {
        if (e.target.value.length >= 3 ) {
            //e.target.value = e.target.value.substring(0, e.target.value.length -1 );
            if (e.target.value.substr(0, 3) !== clabe) {
                return await WarningAlert({ text: "El formato de tu clabe no es la correcta." });
            }
        }
    }

    const cuentaRef = React.createRef();

    const onHandleCuenta = async (e: any) => {
        if(e.target.value.length >= 12)
        e.target.value = e.target.value.substring(0, e.target.value.length -1);
        //if()
    }

    return (
        <Grow in={true}>
            <Paper>
                <div className={state.sections[0] >= 100 ? `validate__border` : `novalidate__border`}>
                    <Box mt={2} mb={2}>
                    {/* { (reCheck == "true" || reCheck == null) && */}
                        <FormControl variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">Banco</InputLabel>
                        <Select
                            native
                            onBlur={(e) => handleChange(e)}
                            onChange={onHandleBank}
                            label={'Banco'}
                            name=""
                            defaultValue={state.collaborator.DatosPago?.Banco || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator.DatosPago?.Banco || ''} disabled={true}>{state.collaborator.DatosPago?.Banco || ''}</option>
                            {
                                bancos.map(({ marca }: any, index: number) => (
                                    <option key={index} value={marca}>{marca}</option>
                                ))
                            }
                        </Select>
                    </FormControl>
                    {/* }
                    { (reCheck == "false") &&
                        (<FormControl error={ state.collaborator.DatosPago?.Banco == '' || state.collaborator.DatosPago?.Banco == undefined} variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">Banco</InputLabel>
                        <Select
                            native
                            onBlur={(e) => handleChange(e)}
                            onChange={onHandleBank}
                            label={'Banco'}
                            name="Banco"
                            defaultValue={state.collaborator.DatosPago?.Banco || ''}
                            //autoFocus={true}
                        >
                            <option value={state.collaborator.DatosPago?.Banco || ''} disabled={true}>{state.collaborator.DatosPago?.Banco || ''}</option>
                            {
                                bancos.map(({ marca }: any, index: number) => (
                                    <option key={index} value={marca}>{marca}</option>
                                ))
                            }
                        </Select>
                    </FormControl>)
                    } */}
                        
                    </Box>

                    <Box mt={2} mb={2}>
                    {/* { (reCheck == "true" || reCheck == null) && */}
                        <TextField
                            type="number"
                            name="NumCuenta"
                            defaultValue={state.collaborator.DatosPago?.NumCuenta}
                            //autoFocus={true}
                            label="N??mero de cuenta bancaria" variant="outlined" size="small"
                            fullWidth={true} onBlur={(e) => handleChange2(e)}
                            onChange={(e) => onHandleCuenta(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    {/* }
                    { (reCheck == "false") &&
                        (<TextField error={ state.collaborator.DatosPago?.NumCuenta == '' || state.collaborator.DatosPago?.NumCuenta == undefined}
                            type="number"
                            name="NumCuenta"
                            defaultValue={state.collaborator.DatosPago?.NumCuenta}
                            //autoFocus={true}
                            label="N??mero de Cuenta Bancaria" variant="outlined" size="small"
                            fullWidth={true} onBlur={(e) => handleChange2(e)}
                            onChange={(e) => onHandleCuenta(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />)
                    } */}
                        
                    </Box>

                    <Box mt={2} mb={2}>
                    {/* { (reCheck == "true" || reCheck == null) && */}
                        <TextField
                            type="number"
                            name="NumClabe"
                            defaultValue={state.collaborator.DatosPago?.NumClabe}
                            label="N??mero de clabe bancaria" variant="outlined" size="small"
                            fullWidth={true} onBlur={(e) => handleChange(e)}
                            onChange={(e) => onHandleClabe(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    {/* }
                    { (reCheck == "false") &&
                        (<TextField error={ state.collaborator.DatosPago?.NumClabe == '' || state.collaborator.DatosPago?.NumClabe == undefined}
                            type="number"
                            name="NumClabe"
                            defaultValue={state.collaborator.DatosPago?.NumClabe}
                            label="N??mero de Clabe Bancaria" variant="outlined" size="small"
                            fullWidth={true} onBlur={(e) => handleChange(e)}
                            onChange={(e) => onHandleClabe(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />)
                    } */}
                        
                    </Box>

                    <Grid direction="row" container>
                        <Grid xs item direction="row" container justify="flex-end">
                            <Box ml={1}>
                                <File label="Subir documento Oficial del Banco" name="CuentaBancaria_PDF" tab={5} />
                            </Box>
                        </Grid>
                    </Grid>
                    {Math.round(state.sections[0]) < 100 && (<span className="spanRequerido">Todos los campos son obligatorios</span>) }
                </div>
            </Paper>
        </Grow>
    )
}

export default BankData;