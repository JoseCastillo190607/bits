import { useContext, useState } from "react";
import { Box, FormControl, InputLabel, Select, TextField, Grid, Grow, Paper,Button  } from "@material-ui/core"
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";
import bancos from "../../../../helpers/Json/bancos";
import File from '../../Expedient/Fields/File';
import { WarningAlert } from "../../../../alerts/WarningAlert";
import React from "react";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";
import SaveIcon from '@material-ui/icons/Save';

const BankDataInactivos = () => {
    const { state, dispatch } = useContext(CollaboratorContext);
    const [clabe, setClabe] = useState();
    const {adminState} = useContext(AdminContext)


    const reCheck = localStorage.getItem('reCheck');

    const handleChange = async (e: any) => {
        await updateData(e, state, dispatch, 0);
    }

    const handleChange2 = async (e: any) => {
        if(e.target.value.length < 9)
        
         return await WarningAlert({ text: "El formato de tu cuenta no es la correcta." });
         
        await updateData(e, state, dispatch, 0);
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

    const UpdateCandidate = async () => {
        let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "sent" ? 'si' : 'no');
        if (result === true) {
            await SuccessfulAlert({ text: "Datos guardados correctamente." });
        }
    }

    return (
        <>
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
                            defaultValue={state.collaborator?.bank || ''}
                            autoFocus={true}
                        >
                            <option value={state.collaborator?.bank || ''} disabled={true}>{state.collaborator?.bank || ''}</option>
                            {
                                bancos.map(({ marca }: any, index: number) => (
                                    <option key={index} value={marca}>{marca}</option>
                                ))
                            }
                        </Select>
                    </FormControl>
                    {/* }
                    { (reCheck == "false") &&
                        (<FormControl error={ state.collaborator?.bank == '' || state.collaborator?.bank == undefined} variant="outlined" fullWidth={true} size="small">
                        <InputLabel htmlFor="outlined-age-native-simple">bank</InputLabel>
                        <Select
                            native
                            onBlur={(e) => handleChange(e)}
                            onChange={onHandleBank}
                            label={'bank'}
                            name="bank"
                            defaultValue={state.collaborator?.bank || ''}
                            //autoFocus={true}
                        >
                            <option value={state.collaborator?.bank || ''} disabled={true}>{state.collaborator?.bank || ''}</option>
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
                            name="accountNumber"
                            defaultValue={state.collaborator?.accountNumber}
                            //autoFocus={true}
                            label="Número de cuenta bancaria" variant="outlined" size="small"
                            fullWidth={true} onBlur={(e) => handleChange2(e)}
                            onChange={(e) => onHandleCuenta(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    {/* }
                    { (reCheck == "false") &&
                        (<TextField error={ state.collaborator?.accountNumber == '' || state.collaborator?.accountNumber == undefined}
                            type="number"
                            name="accountNumber"
                            defaultValue={state.collaborator?.accountNumber}
                            //autoFocus={true}
                            label="Número de Cuenta Bancaria" variant="outlined" size="small"
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
                            name="clabeNum"
                            defaultValue={state.collaborator?.clabeNum}
                            label="Número de clabe bancaria" variant="outlined" size="small"
                            fullWidth={true} onBlur={(e) => handleChange(e)}
                            onChange={(e) => onHandleClabe(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    {/* }
                    { (reCheck == "false") &&
                        (<TextField error={ state.collaborator?.clabeNum == '' || state.collaborator?.clabeNum == undefined}
                            type="number"
                            name="clabeNum"
                            defaultValue={state.collaborator?.clabeNum}
                            label="Número de Clabe Bancaria" variant="outlined" size="small"
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
                                <File label="Subir documento Oficial del bank" name="CuentaBancaria_PDF" tab={5} />
                            </Box>
                        </Grid>
                    </Grid>
                    {Math.round(state.sections[0]) < 100 && (<span className="spanRequerido">Todos los campos son obligatorios</span>) }
                </div>
                </Paper>
        </Grow>
        </>
    )
}

export default BankDataInactivos;