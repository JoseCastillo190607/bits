import { useContext, useEffect, useState } from 'react';
import { Dialog, DialogContent, Box, Grid, FormControl, Select, TextField, Button } from '@material-ui/core';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { getAllProjects } from '../../../services/projectService';
import { NewsContext } from '../../../context/NewContext/NewContext';
import { AdminContext } from '../../../context/AdminContext/AdminContext';
import moment from 'moment';
import { postNew, resendNew } from '../../../services/newService';
import { ErrorAlert } from '../../../alerts/errorAlert';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Chip from '@mui/material/Chip';
import IconoBorrarProyecto from '../../../assets/svg/icono_borrar_proyecto.svg';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_NOTICES, GET_ALL_NOTICES, GET_ALL_PROJECT } from '../../../Querys/querys';
import { postFileNoticeAWS } from '../../../services/candidateService';
import { SuccessfulAlert } from '../../../alerts/successAlerts';

const AddNewsModal = () => {
    const [projects, setProjects] = useState([]);
    const [projectsSelected, setProjectsSelected] = useState<Array<any>>([]);
    const { state, dispatch } = useContext(NewsContext);
    const { adminState } = useContext(AdminContext);

    const { data: resultProjects } = useQuery(GET_ALL_PROJECT);
    const resultAllProjects= resultProjects?.GET_ALL_PROJECT;

    const [createNotice] = useMutation(CREATE_NOTICES, {
        refetchQueries: [{ query: GET_ALL_NOTICES }],
    });
       


    useEffect(() => {
        if (resultAllProjects) {
            debugger
            setProjects(resultAllProjects);
        }
        if (state._id && state.projects) {
            setProjectsSelected(state.projects.split(','));
        }
     
    }, [resultAllProjects]);

    const onChange = (e: any) => {
        dispatch({ type: "UPDATE_NEW", payload: { key: e.target.name, value: e.target.value } });
    };

    const onSumbit = async () => {
        let myData = {
            ...state,
            projects: projectsSelected.join(','),
            AutorImg: adminState?.image,
            Fecha: moment().format()
        }
        debugger
        if (myData.titulo === '') return ErrorAlert({ text: "Ingrese un título." });
        if (myData.BodyHTML.replace(/<(.|\n)*?>/g, '').trim().length === 0) return ErrorAlert({ text: "Ingrese descripción." });
        if (myData.projects === '') return ErrorAlert({ text: "Ingrese al menos un proyecto." });
        if (myData.File === '') return ErrorAlert({ text: "Ingrese imagen." });
        if (myData.scheduleDate === '' && myData.scheduled) return ErrorAlert({ text: "Ingrese fecha programada." });
        if (myData.scheduleDate !== '' && myData.scheduled && moment(myData.scheduleDate).isBefore(moment())) return ErrorAlert({ text: "Ingrese fecha mayor a la actual." });



        // if (state._id) await resendNew(myData);
        // else await postNew(myData);
        
        let variables = {
            autor:adminState?.Nombre,
            tittle: myData.titulo,
            bodyhtml: myData.BodyHTML,
            fecha: myData.Fecha,
            projects: myData.projects,
            visible: myData.isOpen
        }

       let {data}= await createNotice({
            variables: {
              input: variables
            }
        });

        await postFileNoticeAWS(myData.File, data.CREATE_NOTICES.id, "IMG_NOTICE","IMG_NOTICE",false);
        await SuccessfulAlert({ text: "Noticia creada correctamente." });

        setProjectsSelected([]);
        dispatch({ type: "CLOSE_MODAL" });
    }

    const onChangeProjects = (e: any) => {
        if (e.target.value === "All") {
            setProjectsSelected(projects.map(({ NombreProyecto }: any) => NombreProyecto))
        } else {
            if (!projectsSelected.includes(e.target.value)) {
                setProjectsSelected((oldList) => [...oldList, e.target.value]);
            }
        }
    }

    const onChangeImageClose = (e: any) => {
        let bikeImage = document.getElementById("imgNoticia") as HTMLImageElement;
        bikeImage.src = "../assets/svg/icono-cargar-imagen-noticia.svg";
        dispatch({ type: "DELETE_FILE" });
    }

    const onDeleteProject = (project: any) => {
        let index = projectsSelected.indexOf(project);
        let temp = [...projectsSelected];
        temp.splice(index, 1);
        setProjectsSelected(temp);
    }
    
    const onChangeImage = (e: any) => {
        let bikeImage = document.getElementById("imgNoticia") as HTMLImageElement;
        bikeImage.src = "../assets/svg/icono-imagen-noticia-cargada.svg";
        dispatch({ type: "UPDATE_FILE", payload: { value: e.target.files[0] } });
    }

    const closeModal = () => {
        setProjectsSelected([]);
        dispatch({ type: "CLOSE_MODAL" });
    }

    return (
        <Dialog aria-labelledby="customized-dialog-title" open={state.isOpen} fullWidth={true} maxWidth="md">
            <h2 id="form-dialog-title" className="text-center">{!state._id ? "Crear nueva" : "Editar"} noticia</h2>

            <DialogContent>
                <Box display="flex" flexDirection="column">
                    <Grid direction="row" container justify="center" spacing={2}>
                        <Grid xs item>
                            <Grid direction="row" container justify="center" alignItems="center">
                                <Grid item xs>
                                    <TextField
                                        name="titulo"
                                        type="text"
                                        InputLabelProps={{ shrink: false, }}
                                        fullWidth={true}
                                        size="small"
                                        onChange={(e) => onChange(e)}
                                        placeholder="Título"
                                        value={state.titulo}
                                    />
                                </Grid>
                            </Grid>

                            <Box mt={2}>
                                <Grid direction="row" container justify="center" alignItems="center">
                                    <Grid item xs>
                                        <FormControl fullWidth={true}>
                                            <ReactQuill
                                                value={state.BodyHTML}
                                                placeholder="Ingresa tu noticia seeker!"
                                                onChange={(value) => dispatch({ type: "UPDATE_NEW", payload: { key: "BodyHTML", value } })}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box mt={5} mb={5}>
                                <Grid direction="row" container justify="flex-end" alignItems="center">
                                    <Grid xs container item justify="center" alignItems="center">
                                        Subir imagen de la noticia
                                    </Grid>
                                    <Grid> 
                                        <label className="custom-file-upload-image">
                                            <input type="file" name="Image" disabled={state.File ? true : false} onChange={(e) => onChangeImage(e)} accept=".png,.jpg,.jpeg,.svg" />
                                            <img id="imgNoticia" src="assets/svg/icono-cargar-imagen-noticia.svg" alt="Notica" height="100" />
                                            {
                                                state.File ? <span onClick={() => dispatch({ type: "DELETE_FILE" })}></span> : null
                                            }
                                        </label>
                                        {
                                            state.File ? <span className="text-cancel-file" onClick={(e) => onChangeImageClose(e)}>x</span> : null
                                        }
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        <Grid xs item>
                            <Box>
                                <Grid direction="row" container>
                                    <Grid xs item>
                                        <FormControl fullWidth={true}>
                                            <span className="sheduledDate__Question">¿Programar la fecha de publicación?</span>
                                            <TextField
                                                id="datetime-local"
                                                name=""
                                                placeholder="Seleccione fecha y hora"
                                                type={state.scheduled ? 'datetime-local' : state.scheduleDate !== '' ? 'datetime-local' : 'text'}
                                                value={state.scheduled ? state.scheduleDate !== '' ? state.scheduleDate : '' : ''}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onFocus={(e) => dispatch({ type: "UPDATE_SCHEDULEDATE", payload: { value: e.target.value } })}
                                                onChange={(e) => dispatch({ type: "UPDATE_SCHEDULEDATE", payload: { value: e.target.value } })}
                                                disabled={state._id ? true : false}
                                            />
                                        </FormControl>
                                    </Grid>
                                    {
                                        state.scheduled ? (
                                            <Grid xs={1} item>
                                                <FormControl fullWidth={true}>
                                                    <Box pt={4}>
                                                        <EventBusyIcon fontSize="small" color="error" onClick={() => dispatch({ type: "DELETE_SCHEDULEDATE" })} />
                                                    </Box>
                                                </FormControl>
                                            </Grid>
                                        ) : null
                                    }
                                </Grid>
                                <span className="warning__date">Si no eliges fecha, la noticia se envirá al instante*</span>
                            </Box>

                            <Box mt={5}>
                                <FormControl fullWidth={true} size="small">
                                    <span className="sheduledDate__Question">Proyectos</span>
                                    <Select
                                        native
                                        value={""}
                                        onChange={(e) => onChangeProjects(e)}
                                        name="proyecto"
                                    >
                                        <option value={""}></option>
                                        <option value={"All"}>Seleccionar todos</option>
                                        {
                                            projects.map(({ proyectName }: any, index: number) => (
                                                <option key={index} value={proyectName}>{proyectName}</option>
                                            ))
                                        }
                                    </Select>
                                    <span className="warning__date">Proyecto(s) al cual se enviara la noticia*</span>
                                    <ul className="listProjectsSelected">
                                        {
                                            projectsSelected.map((item: string) => (
                                                <Chip key={item} className="chip-proyecto" color="warning" label={item} deleteIcon={
                                                    <img src ={IconoBorrarProyecto} alt="Delete icon"/>
                                                } onDelete={() => onDeleteProject(item)} />
                                            ))
                                        }
                                    </ul>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <MuiDialogActions>
                <Button className="buttonCancel" onClick={closeModal}>
                Cerrar
                </Button>
                <Button className="buttonSave" onClick={onSumbit}>
                    {!state._id ? "Crear" : "Editar"} Noticia
                    <img src="/assets/svg/icono-noticia.svg" alt="Noticia" />
                </Button>
            </MuiDialogActions>
        </Dialog>
    )
}

export default AddNewsModal
