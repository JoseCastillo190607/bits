import { useContext, useState, useEffect } from "react";
import {
    Box, Dialog, DialogContent, FormControl, Grid,
    Select, OutlinedInput, TextField, Button
} from "@material-ui/core";
import MuiDialogActions from '@material-ui/core/DialogActions';
import { CalendarContext } from "../../context/CalendarContext/CalendarContext";
import { getAllProjects } from "../../services/projectService";
import { addDate, updateDate } from "../../services/calendarService";
import { validDate } from "../../helpers/validNewDate";
import moment from "moment";
import { WarningAlert } from "../../alerts/WarningAlert";
import SaveIcon from '@material-ui/icons/Save';
import IconoBorrarProyecto from "../../assets/svg/icono_borrar_proyecto.svg";

import { Chip } from "@material-ui/core";

const ModalCalendar = () => {
    const [projects, setProjects] = useState([]);
    const [projectsSelected, setProjectsSelected] = useState<Array<any>>([]);
    const [currentProjects, setCurrentProjects] = useState<Array<any>>([]);
    const { state, dispatch } = useContext(CalendarContext);

    useEffect(() => {
        async function fetchData() {
            let result = await getAllProjects();
            setProjects(result);
        }
        if (state._id) {
            setProjectsSelected(state.proyecto.split(','));
            setCurrentProjects(state.proyecto.split(','));
        }
        fetchData();
        return () => {
            fetchData();
            setProjectsSelected([]);
            setProjects([]);
            setCurrentProjects([]);
        }
    }, [state._id, state.proyecto]);

    const onChange = (e: any) => {
        dispatch({
            type: "UPDATE_DATE",
            payload: { key: e.target.name, value: e.target.value }
        });
    }

    const onChangeProjects = (e: any) => {
        if (e.target.value === "All") {
            setProjectsSelected(projects.map(({ NombreProyecto }: any) => NombreProyecto));
        } else if (!projectsSelected.includes(e.target.value)) {
            setProjectsSelected((oldList) => [...oldList, e.target.value]);
        }
    }

    const onDeleteProjects = (project: string) => {
        setProjectsSelected(projectsSelected.filter((NombreProyecto: string) => NombreProyecto !== project));
    }

    const onSubmit = async () => {
        let data = {
            ...state,
            proyecto: projectsSelected.join(',')
        }
        if (await validDate(data)) {
            await addDate(data);
            dispatch({ type: "CLOSE_MENU" });
            setProjectsSelected([]);
        }
    }

    const onUpdate = async () => {
        let data = {
            ...state,
            proyecto: projectsSelected.join(',')
        }
        if (await validDate(data)) {
            if (projectsSelected.length > currentProjects.length) await WarningAlert({ title: "Atenci??n!", text: "??Se enviar?? el evento a los nuevos proyectos!", showDenyButton: true });
            await updateDate(data);
            dispatch({ type: "CLOSE_MENU" });
            setProjectsSelected([]);
        }
    }
    return (
        <div>
            <Dialog aria-labelledby="customized-dialog-title" open={state.isOpen} fullWidth={true}>
                <h2 id="form-dialog-title" className="text-center">{state._id ? `Guardar ${state.tipo}` : `Crear Evento`}</h2>
                <DialogContent>
                    <Grid direction="row" container justify="center" alignItems="center">
                        <Grid item xs={3}>
                            <Grid container justify="flex-end">
                                <Box mr={2} >Tipo de Evento</Box>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <FormControl fullWidth={true} size="small">
                                <Select
                                    native
                                    onChange={(e) => onChange(e)}
                                    value={state.tipo ? state.tipo : "Selecciona una de las categorias"}
                                    input={<OutlinedInput />}
                                    name="tipo"
                                >
                                    <option value="Selecciona una de las categorias" disabled>Selecciona una de las categorias</option>
                                    <option value="Evento">Evento</option>
                                    <option value="Tarea">Tarea</option>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Box mt={2}>
                        <Grid direction="row" container justify="center" alignItems="center">
                            <Grid item xs={3} >
                                <Grid container justify="flex-end">
                                    <Box mr={2}>T??tulo</Box>
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    InputLabelProps={{ shrink: false, }}
                                    onChange={(e) => onChange(e)}
                                    name="titulo"
                                    size="small"
                                    fullWidth={true}
                                    value={state.titulo}
                                    placeholder="T??tulo"
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box mt={2}>
                        <Grid direction="row" container justify="center" alignItems="center">
                            <Grid item xs={3} >
                                <Grid container justify="flex-end">
                                    <Box mr={2}>Descripci??n</Box>
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    InputLabelProps={{ shrink: false, }}
                                    onChange={(e) => onChange(e)}
                                    name="descripcion"
                                    size="small"
                                    fullWidth={true}
                                    value={state.descripcion}
                                    multiline
                                    rows={4}
                                    placeholder="Detalla la descripci??n del evento"
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box mt={2}>
                        <Grid direction="row" container justify="center" alignItems="center">
                            <Grid item xs={3} >
                                <Grid container justify="flex-end">
                                    <Box mr={2}>Fecha Inicio</Box>
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    variant="outlined"
                                    type="datetime-local"
                                    InputLabelProps={{ shrink: false, }}
                                    onChange={(e) => onChange(e)}
                                    name="fechaInicio"
                                    size="small"
                                    fullWidth={true}
                                    value={state._id ? moment(state.fechaInicio).format('yyyy-MM-DDThh:mm') : state.fechaInicio}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box mt={2}>
                        <Grid direction="row" container justify="center" alignItems="center">
                            <Grid item xs={3} >
                                <Grid container justify="flex-end">
                                    <Box mr={2}>Fecha Final</Box>
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    variant="outlined"
                                    type="datetime-local"
                                    InputLabelProps={{ shrink: false, }}
                                    onChange={(e) => onChange(e)}
                                    name="fechaFinal"
                                    size="small"
                                    fullWidth={true}
                                    value={state._id ? moment(state.fechaFinal).format('yyyy-MM-DDThh:mm') : state.fechaFinal}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box mt={2}>
                        <Grid direction="row" container justify="center" alignItems="center">
                            <Grid item xs={3} >
                                <Grid container justify="flex-end">
                                    <Box mr={2}>Proyecto</Box>
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <FormControl fullWidth={true} size="small">
                                    <Select
                                        native
                                        value={""}
                                        onChange={(e) => onChangeProjects(e)}
                                        name="proyecto"
                                    >
                                        <option value=""></option>
                                        <option value={"All"}>Seleccionar todos</option>
                                        {
                                            projects.map(({ NombreProyecto }: any, index: number) => (
                                                <option key={index} value={NombreProyecto}>{NombreProyecto}</option>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mt={2}>
                        {/* <Grid direction="row" container justify="center" alignItems="center">
                            <span className="warning__date">Proyecto(s) al cual se enviara {state.tipo ? state.tipo === "Evento" ? "el evento" : "la tarea" : "el evento"}*</span>
                        </Grid> */}
                        <Grid direction="row" container justify="center" alignItems="center">
                            <ul className="listProjectsSelected">
                                {
                                    projectsSelected.map((item: string, index: number) => (
                                        <Chip key={index} className="chip-proyecto" label={item} deleteIcon={
                                            <img src ={IconoBorrarProyecto} alt="Delete icon"/>
                                        } onDelete={() => onDeleteProjects(item)} />
                                    ))
                                }
                            </ul>
                        </Grid>
                    </Box>
                </DialogContent>

                <MuiDialogActions>
                    <Button className="buttonCancel" onClick={() => dispatch({ type: "CLOSE_MENU" })}>
                        Cerrar
                    </Button>
                    <Button className="buttonSave" onClick={state._id ? onUpdate : onSubmit}>
                        {state._id ? "Guardar" : "Crear"} {state.tipo ? state.tipo === "Evento" ? "evento" : "tarea" : "evento"} <SaveIcon />
                    </Button>
                </MuiDialogActions>
            </Dialog>
        </div >
    )
}

export default ModalCalendar;