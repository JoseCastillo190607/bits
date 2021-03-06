import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
    Button, Dialog,
    DialogActions, DialogContent,
    FormControl, TextField, Box, Grid
} from "@material-ui/core";
import { getAllProjects } from "../../../services/projectService";
import { IProject } from '../../../interfaces/Project';
import moment from "moment";
import ModalContext from "../../../context/ModalContext/ModalContext";
import { closeModal } from "../../Team/Modals/Modal";
import { getNotification, postNotification } from "../../../services/notificationService";
import { ErrorAlert } from "../../../alerts/errorAlert";
import EventBusyIcon from '@material-ui/icons/EventBusy';
import SendIcon from '@material-ui/icons/Send';
import { GET_ALL_PROJECT } from "../../../Querys/querys";
import { useQuery } from "@apollo/client";

interface IValues {
    Titulo: string;
    desc: string;
    proyectos: string | undefined;
    fecha: string;
    scheduled: boolean;
    scheduledDate: string;
}

let initialState = {
    Titulo: '',
    desc: '',
    proyectos: '',
    fecha: moment().format(),
    scheduled: false,
    scheduledDate: ''
}

const ModalNotification = () => {
    console.log("Mostrar notificacion")
    const { state, dispatch } = useContext(ModalContext);
    const [values, setValues] = useState<IValues>(initialState);
    const [projects, setProjects] = useState<Array<IProject>>([]);
    const [projectName, setProjectName] = useState<string[]>([]);

    const resultProject = useQuery(GET_ALL_PROJECT);
    const allProject = resultProject.data?.GET_ALL_PROJECT;

    useEffect(() => {
        async function fetchData() {
            // const projects = await getAllProjects();
            setProjects(allProject);
            if (state._id !== '') { /* Editing some notification */
                const notification = await getNotification(state._id);
                setProjectName([...notification.projects.split(',')]);
                setValues({
                    Titulo: notification.Titulo,
                    desc: notification.desc,
                    proyectos: notification.projects,
                    fecha: moment().format(),
                    scheduled: false,
                    scheduledDate: ''
                });
            }
        }
        setValues(initialState);
        setProjectName([]);
        fetchData();
        return () => {
            fetchData();
            setProjectName([]);
            setValues(initialState);
        }
    }, [state]);

    const handleProjectsChange = (e: ChangeEvent<{ value: any }>) => {
        let tempArray = [...projectName];
        if (e.target.value === "Todos") {
            let existTodos = projectName.indexOf(e.target.value);
            if (existTodos > -1) tempArray = [];
            else {
                tempArray = projects?.map(({ proyectName }) => proyectName);
                tempArray.push("Todos")
            };
        } else {
            let exist = projectName.indexOf("Todos");
            if (exist > -1) tempArray.splice(exist, 1);
            exist = projectName.indexOf(e.target.value);
            if (exist > -1) tempArray.splice(exist, 1);
            else tempArray.push(e.target.value);
        }
        setProjectName(tempArray);
        setValues({ ...values, proyectos: tempArray.join(',') });
    };

    const newNotification = async () => {
        setValues({ ...values, fecha: moment().format() });
        
        if (values.Titulo && values.Titulo.trim().length > 1 && values.proyectos && values.desc && values.desc.trim().length > 1) {
            if(values.Titulo.replace(/([0-9])/g, '') !== ''){
                if(values.desc.replace(/([0-9])/g, '') !== ''){
                    if (values.scheduled && !values.scheduledDate) return ErrorAlert({ text: "Ingrese la fecha para programar la notificaci??n." });
                    if (values.scheduled && moment(values.scheduledDate).isSameOrBefore(moment())) {
                        return ErrorAlert({ text: "La fecha programada debe de ser mayor a la de este momento." });
                    }
                    await postNotification(values);
                    await closeModal(dispatch);
                }else{
                    return ErrorAlert({ text: "Descripci??n no debe llevar solo numeros." })
                }
            }else{
                return ErrorAlert({ text: "T??tulo no debe llevar solo numeros." })
            }
        } else ErrorAlert({ text: "Ingrese todos los datos." });
        
    }

    const changeValues = (e: ChangeEvent<{ name: string, value: string }>): void => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleScheduleDate = () => {
        setValues({
            ...values,
            scheduled: true,
        });
    }

    return (
        <Dialog
            open={state.open}
            onClose={() => closeModal(dispatch)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth={true}
            maxWidth="md"
        >
            <Grid direction="row" justify="flex-start" alignItems="center" container>
                <Grid xs={11} item>
                    <h1 id="form-dialog-title" className="text-center">Nueva notificaci??n</h1>
                </Grid>
            </Grid>
            <DialogContent>
                <Grid direction="row" container>
                    <Grid xs item>
                        <FormControl fullWidth={true}>
                            <TextField placeholder="T??tulo" required id="standard-required" name="Titulo" value={values.Titulo} onChange={changeValues} inputProps={{ maxLength: 30 }} />
                        </FormControl>
                        <Box mt={3}>
                            <FormControl fullWidth={true}>
                                <span className="Modal__Notification__text">Descripci??n</span>
                                <TextField
                                    id="standard-multiline-static"
                                    multiline
                                    rows={5}
                                    name="desc"
                                    onChange={changeValues}
                                    value={values.desc}
                                    inputProps={{ maxLength: 200 }}
                                />
                            </FormControl>
                        </Box>
                        <Box mt={3}>
                            <Grid direction="row" container>
                                <Grid xs={11} item>
                                    <FormControl fullWidth={true}>
                                        <span className="sheduledDate__Question">??Deseas programar la notificaci??n?</span>
                                        <TextField
                                            id="datetime-local"
                                            placeholder="Seleccione fecha y hora"
                                            type={values.scheduled ? 'datetime-local' : values.scheduledDate !== '' ? 'datetime-local' : 'text'}
                                            value={values.scheduled ? values.scheduledDate !== '' ? values.scheduledDate : '' : ''}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onFocus={handleScheduleDate}
                                            onChange={(e) => setValues({ ...values, scheduledDate: e.target.value })}
                                        />
                                    </FormControl>
                                </Grid>
                                {
                                    values.scheduled ? (
                                        <Grid xs={1} item>
                                            <FormControl fullWidth={true}>
                                                <Box pt={4}>
                                                    <EventBusyIcon fontSize="small" color="error" onClick={() => setValues({ ...values, scheduled: false, scheduledDate: '' })} />
                                                </Box>
                                            </FormControl>
                                        </Grid>
                                    ) : null
                                }
                            </Grid>
                            <span className="warning__date">Si no eliges fecha, la notificaci??n se envir?? al instante*</span>
                        </Box>
                    </Grid>
                    <Grid xs item>
                        <Box>
                            <FormControl fullWidth={true}>
                                <span className="seletion__projects">Seleccione los proyectos a enviar </span>
                                <div className="grid__projects">   
                                  <span className="span-notification">
                                      <input type="checkbox" value="Todos" checked={projectName.indexOf("Todos") === -1 ? false : true} onChange={(e) => handleProjectsChange(e)} />
                                      Todos
                                  </span>
                             
                              {
                                  projects?.map(({ proyectName }: IProject,i) => (
                                          
                                          <span key={i} className="span-notification">
                                              <input type="checkbox"  checked={projectName.indexOf(proyectName) === -1 ? false : true} value={proyectName} onChange={(e) => handleProjectsChange(e)} />
                                              {proyectName}
                                          </span>
                                  ))
                              }
                          </div>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button className="buttonCancel" onClick={() => closeModal(dispatch)}>
                Cerrar
                </Button>
                <Button className="buttonSave" onClick={newNotification}>
                    Enviar <SendIcon fontSize="small"/>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalNotification;