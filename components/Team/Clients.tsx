import { useEffect, useState, useContext } from 'react';
import { Grid, Tooltip, Box, InputAdornment, Input } from '@material-ui/core';
import { getAllClients, postClient, putClient, deleteClient } from '../../services/clientService';
import { ErrorAlert } from '../../alerts/errorAlert';
import { IClient } from '../../interfaces/Client';
import { closeModal, openModal } from './Modals/Modal';
import ModalContext from '../../context/ModalContext/ModalContext';
import AddRegisterModal from './Modals/AddRegisterModal';
import { DeleteAlert } from '../../alerts/deleteAlerts';
import { AdminContext } from '../../context/AdminContext/AdminContext';

import { GET_ALL_CLIENT, CREATE_CLIENT, UPDATE_CLIENT, DELETE_CLIENT } from "../../Querys/querys";
import { useQuery } from "@apollo/client";

import { useMutation } from "@apollo/client";
import { SuccessfulAlert } from '../../alerts/successAlerts';

const Clients = () => {
    const [clients, setClientes] = useState<Array<IClient>>([]);
    const [client, setClient] = useState<string>('');
    const { state, dispatch } = useContext(ModalContext);
    const { adminState, adminDispatch } = useContext(AdminContext);

    const resultClient = useQuery(GET_ALL_CLIENT);
    const allClient = resultClient.data?.GET_ALL_CLIENT;

    const [createNewClient] = useMutation(CREATE_CLIENT, {
        refetchQueries: [{ query: GET_ALL_CLIENT }],
      });

      const [updateClient] = useMutation(UPDATE_CLIENT, {
        refetchQueries: [{ query: GET_ALL_CLIENT }],
    });


    const [deleteClient] = useMutation(DELETE_CLIENT, {
        refetchQueries: [{ query: GET_ALL_CLIENT }],
      });
    



    useEffect(() => {
        getClients();
    }, []);

    const getClients = async (): Promise<void> => {
        // const request = await getAllClients();
        setClientes(allClient);
    };

    const onSubmitClient = async (e: any): Promise<void> => {
        if (client !== '' && client.trim().length > 1) {
            // await postClient(client);
            setClient('');
            // await getClients();

            createNewClient({
                variables: {
                  input: {
                    clientName: client
                  },
                },
              }).then(() => {
                SuccessfulAlert({ text: 'Cliente creado con ??xito' });
            });
        } else ErrorAlert({ text: "Ingrese el Nombre del Cliente." });
    };

    const onDeleteClient = async (_id: string): Promise<void> => {
        const result = await DeleteAlert(`??Deseas eliminar el cliente?`);
        if (result) {
            // await deleteClient(_id);
            // await getClients();

            deleteClient({
                variables: {
                    deleteClientId: _id,
                },
              }).then(() => {
                SuccessfulAlert({ text: 'Cliente eliminado con ??xito' });
            });

        };
    };

    
    const onUpdateClient = async (value: string): Promise<void> => {
        if (value !== '') {
            await closeModal(dispatch);
            // await putClient(state._id, value);
            // await getClients();

            updateClient({
                variables: {
                    updateClientId: state._id,
                  input: {
                    clientName: client,
                  },
                },
              }).then(() => {
                SuccessfulAlert({ text: 'Cliente actualizado con ??xito' });
            });

        } else ErrorAlert({ text: "Ingrese el Nombre del Cliente." });
    };

    return (
        <Box>
            <Box m={3} mb={0} mt={1}>
                <Grid direction="row" container>
                    <Grid xs="auto" item>
                        <h4>Clientes</h4>
                    </Grid>
                    <Grid xs item container justify="flex-end">
                        <Box mt={2}>
                            {(adminState?.PermisosContex?.Modulos?.EstructuraEquipo?.Clientes?.Editar) === true?
                                <Input
                                    placeholder="Nombre de cliente"
                                    value={client}
                                    onChange={(e) => setClient(e.target.value)}
                                    inputProps={{ "data-testid": "newCliente" }}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <Tooltip title="Agregar" placement="right" className="cursorPointer">
                                            <button type="button" className="ButtonWhitOutStyles" onClick={onSubmitClient}>
                                                <img src="/assets/svg/icono-agregar.svg" alt="Agregar" />
                                            </button>
                                        </Tooltip>
                                    </InputAdornment>
                                                        }
                            />:null
                        }

                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <div className="container">
                {
                    clients?.map(({ id, clientName }: IClient, index: number) => (
                        <Box className="rowContainer" key={index} mt={0}>
                            <Grid direction="row" container>
                                <Grid xs={8} item className="SedeText">{clientName}</Grid>
                                <Grid xs item className="inline-block" direction="row" container justify="flex-end">
                                    {(adminState?.PermisosContex?.Modulos?.EstructuraEquipo?.Clientes?.Eliminar) === true?
                                    <Tooltip title="Eliminar" placement="right">
                                        <div className="IconButton" onClick={() => onDeleteClient(id)}>
                                            <img src="/assets/svg/icono-eliminar.svg" alt="Eliminar" />
                                        </div>
                                    </Tooltip>
                                    :null                                   
                                    }
                                    {(adminState?.PermisosContex.Modulos?.EstructuraEquipo?.Clientes?.Editar) === true?
                                    <Tooltip title="Editar" placement="right">
                                        <div className="IconButton" onClick={() => openModal({ id, value: clientName, title: "Editando Cliente" }, dispatch)}>
                                            <img src="/assets/svg/icono-editar.svg" alt="Editar" />
                                        </div>
                                    </Tooltip>
                                    :null                                    
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                    ))
                }
            </div>
            <AddRegisterModal updateFunc={onUpdateClient} />
        </Box>
    );
}

export default Clients;