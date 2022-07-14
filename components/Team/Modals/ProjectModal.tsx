import { Button, Dialog, DialogContent, TextField, DialogActions, Select, FormControl, InputLabel } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { ErrorAlert } from '../../../alerts/errorAlert';
import ModalContext from '../../../context/ModalContext/ModalContext';
import { IClient } from '../../../interfaces/Client';
import { getAllClients } from '../../../services/clientService';
import { putProject, postProject } from '../../../services/projectService';
import { closeModal } from './Modal';
import SaveIcon from '@material-ui/icons/Save';

import { GET_ALL_PROJECT, CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, GET_ALL_CLIENT } from "../../../Querys/querys";
import { useQuery } from "@apollo/client";

import { useMutation } from "@apollo/client";
import { SuccessfulAlert } from '../../../alerts/successAlerts';


const ProjectModal = (props: any) => {
    const [text, setText] = useState<string>('');
    const [client, setClient] = useState<any>('');
    const { state, dispatch } = useContext(ModalContext);
    const [clients, setClients] = useState<any>([]);

    const resultClient = useQuery(GET_ALL_CLIENT);
    const allClient = resultClient.data?.GET_ALL_CLIENT;


    const resultProject = useQuery(GET_ALL_PROJECT);
    const allProject = resultProject.data?.GET_ALL_PROJECT;

    const [createNewProject] = useMutation(CREATE_PROJECT, {
        refetchQueries: [{ query: GET_ALL_PROJECT }],
      });

      const [updateProject] = useMutation(UPDATE_PROJECT, {
        refetchQueries: [{ query: GET_ALL_PROJECT }],
    });


    const [deleteProject] = useMutation(DELETE_PROJECT, {
        refetchQueries: [{ query: GET_ALL_PROJECT }],
      });


    useEffect(() => {
        setText(state.value);
        setClient(state.client);
        getClients();
    }, [state]);

    const getClients = async (): Promise<void> => {
        // let clients = await getAllClients();
        setClients(allClient);
    };

    const onSubmitProject = async (): Promise<void> => {
        if (text !== '' && client !== '') {
            await closeModal(dispatch);
            // await postProject(text, client);
            createNewProject({
                variables: {
                  input: {
                    proyectName: text,
                    client: client
                  },
                },
              }).then(()=>{
                SuccessfulAlert({text:"Proyecto creado con éxito"});
            });
            await props.getProjects();
        } else ErrorAlert({ text: "Ingrese todos los datos." });
    };

    const onUpdateProject = async (): Promise<void> => {
        if (text !== '' && client !== '') {
            await closeModal(dispatch);
            // await putProject(state._id, text, client);
            updateProject({
                variables: {
                    updateProjectId: state._id,
                  input: {
                    proyectName: text,
                    client: client
                  },
                },
              }).then(()=>{
                SuccessfulAlert({text:"Proyecto actualizado con éxito"});
            });
            await props.getProjects();
        } else ErrorAlert({ text: "Ingrese todos los datos." });
    };

    return (
        <Dialog open={state.open} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth={true}>
            <h2 id="form-dialog-title">{state._id ? 'Editando' : 'Nuevo'} Proyecto</h2>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    placeholder="Proyecto"
                    defaultValue={text}
                    required
                    onChange={(e) => setText(e.target.value)}
                />
            </DialogContent>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel>Cliente</InputLabel>
                    <Select
                        native
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                    >
                        <option aria-label="None" value="" />
                        {
                            clients?.map(({ clientName }: IClient, index: number) =>
                                <option key={index} value={clientName}>{clientName}</option>
                            )
                        }
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button className="buttonCancel" onClick={() => closeModal(dispatch)}>
                Cerrar
                </Button>
                <Button className="buttonSave" onClick={state._id ? onUpdateProject : onSubmitProject}>
                    {state._id ? 'Actualizar' : 'Agregar'} <SaveIcon />
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectModal;