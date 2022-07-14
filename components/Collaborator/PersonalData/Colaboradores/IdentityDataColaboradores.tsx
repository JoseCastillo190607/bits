import { ChangeEvent, Fragment, useContext } from "react";
import { Box, Grid, TextField, Tooltip, Button } from "@material-ui/core";
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";
import { withStyles, Theme } from '@material-ui/core/styles';
import { validData, curpValida } from "../../../../helpers/Collaborator/validateInput";
import React from "react";
import { WarningAlert } from "../../../../alerts/WarningAlert";
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";
import SaveIcon from '@material-ui/icons/Save';
import { useMutation } from "@apollo/client";
import {UPDATE_USERS} from "../../../../Querys/querys";

const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        maxWidth: 1000,
    },
}))(Tooltip);

    var validateCURP = true;
    var validateRFC = true;

const IdentityDataColaboradores = () => {
    const { state, dispatch } = useContext(CollaboratorContext);
    const [validateCurp, setValidatdCurp] = React.useState(true);
    const [validateRfc, setValidatdRfc] = React.useState(true);
    const {adminState} = useContext(AdminContext)

    
    const [updateColaboradores] = useMutation(UPDATE_USERS);

    const reCheck = localStorage.getItem('reCheck');

    const handleChange = async (e: ChangeEvent<{ name: string, value: unknown }>) => {
        await updateData(e, state, dispatch, 0);
    }

    const handleChangeCurp = async (e: ChangeEvent<{ name: string, value: unknown }>) => {
        await updateData(e, state, dispatch, 0);
        if(state.collaborator?.CURP != undefined){
            const re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
            const validado = re.test(state.collaborator?.CURP);
            if (!validado) {setValidatdCurp(false); validateCURP = false; return await WarningAlert({ text: "El formato de tu CURP no es la correcta." }); }
            else  {setValidatdCurp(true); validateCURP = true; }
        }
        
    }

    const handleChangeRfc = async (e: ChangeEvent<{ name: string, value: unknown }>) => {
        await updateData(e, state, dispatch, 0);
        if(state.collaborator?.RFC != undefined){
            const re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
            const validado = state.collaborator?.RFC.toLocaleUpperCase().match(re);
            if (!validado) {setValidatdRfc(false); validateRFC = false; return await WarningAlert({ text: "El formato de tu RFC no es la correcta." });}
            else {setValidatdRfc(true); validateRFC= true;}
        }
    }

    const validateCURPF = async (curp: string) => {
        const re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
        const validado = curp.toLocaleUpperCase().match(re);
    }

    const UpdateCandidate = async () => {
        // let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "sent" ? 'si' : 'no');
        updateColaboradores({
            variables: {
                updateUsersId: state.collaborator?.id,
              input: {
                IMSS: state.collaborator?.IMSS,
                CURP: state.collaborator?.CURP,
                RFC: state.collaborator?.RFC,
                ClaveElectoralPasaporte: state.collaborator?.ClaveElectoralPasaporte,
                workPermission: state.collaborator?.workPermission,
                creditoInfonavit: state.collaborator?.creditoInfonavit
              },
            },
          });
        
          await SuccessfulAlert({ text: "Datos guardados correctamente." });
        
        // if (result === true) {
        //     await SuccessfulAlert({ text: "Datos guardados correctamente." });
        // }
    }

    console.log("date", adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosPersonales?.DatosIdentidad?.Editar )

    return (
        <>
        <div className={Math.round(state.sections[2]) >= 100 ? `validate__border` : `novalidate__border`}>
            <Grid direction="row" container spacing={2}>
                <Grid xs item direction="row" container alignItems="center">
                    <Grid xs={11} item>
                            <TextField
                                name="IMSS" defaultValue={state.collaborator?.IMSS || ''}
                                label="NSS" variant="outlined" size="small" fullWidth={true}  
                                onBlur={(e) => handleChange(e)}
                                InputProps={{
                                    readOnly: false,
                                }}
                                inputProps={{maxlength:11}}
                                helperText={!state.collaborator?.IMSS && 'Obligatorio'}
                            />
                    </Grid>
                    <Grid xs item>
                        <Box ml={1}>
                            <HtmlTooltip
                                title={
                                    <Fragment>
                                       Si no estas asociado, tramita tu número en linea
                                    </Fragment>
                                }
                            >
                                <img src="/assets/icons/PreguntaAzul.png" alt="Question" height="20" />
                            </HtmlTooltip>
                        </Box>
                    </Grid>
                </Grid>
                <Grid xs item>
                        <TextField 
                            name="CURP" defaultValue={state.collaborator?.CURP || ''}
                            label="CURP" variant="outlined" size="small" fullWidth={true}
                            onBlur={(e) => handleChangeCurp(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.CURP && 'Obligatorio'}
                            />
                </Grid>
            </Grid>
            <Grid direction="row" container spacing={2}>
                <Grid xs item>
                        <TextField 
                            name="RFC" defaultValue={state.collaborator?.RFC || ''}
                            label="RFC" variant="outlined" size="small" fullWidth={true}
                            onBlur={(e) => handleChangeRfc(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.RFC && 'Obligatorio'}
                        />     
                </Grid>
                <Grid xs item direction="row" container alignItems="center">
                    <Grid xs={10} item>
                        <TextField
                            name="ClaveElectoralPasaporte" defaultValue={state.collaborator?.ClaveElectoralPasaporte || ''}
                            label="Clave de elector o pasaporte" variant="outlined" size="small" fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                            helperText={!state.collaborator?.ClaveElectoralPasaporte && 'Obligatorio'}
                        />    
                    </Grid>
                    <Grid xs item>
                        <Box ml={2}>
                            <HtmlTooltip
                                title={
                                    <Fragment>
                                        <img src="/assets/INE.png" alt="Question" height="500" />
                                    </Fragment>
                                }
                            >
                                <img src="/assets/icons/PreguntaAzul.png" alt="Question" height="20" />
                            </HtmlTooltip>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Box>
                <Grid direction="row" container spacing={2}>
                    <Grid xs item direction="row" container alignItems="center">
                        <Grid xs={11} item>
                            <TextField
                                type="number"
                                name="workPermission" defaultValue={state.collaborator?.workPermission || ''}
                                label="Permiso de trabajo(extranjeros)" variant="outlined" size="small" fullWidth={true}
                                onBlur={(e) => handleChange(e)}
                                InputProps={{
                                    readOnly: false,
                                }}
                            />
                        </Grid>
                        <Grid xs item>
                            <Box ml={1}>
                                <HtmlTooltip
                                    title={
                                        <Fragment>
                                            <img src="/assets/Permiso_De_Trabajo.png" alt="Question" height="500" />
                                        </Fragment>
                                    }
                                >
                                    <img src="/assets/icons/PreguntaAzul.png" alt="Question" height="20" />
                                </HtmlTooltip>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid xs item>
                        <TextField
                            type="number"
                            name="creditoInfonavit" defaultValue={state.collaborator?.creditoInfonavit || ''}
                            label="Crédito infonavit" variant="outlined" size="small" fullWidth={true}
                            onBlur={(e) => handleChange(e)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
        <div>
        <Grid direction="row" container justify="flex-end" alignItems="center">
        <Box mt={0} pt={1}>
        {(adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosPersonales?.DatosIdentidad?.Editar  === true)?
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

export default IdentityDataColaboradores;