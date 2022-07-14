import { useContext, useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import TableBits from '../TableBits/TableBits';
import columns from './AdminColumns';
import { openModal, closeModal } from '../Team/Modals/Modal';
import ModalContext from '../../context/ModalContext/ModalContext';
import { TabPanelProps } from '../../interfaces/TabPanelProps';
import AddRegisterModal from '../Team/Modals/AddRegisterModal';
import { WarningAlert } from '../../alerts/WarningAlert';
import { getAllAdmins, deleteAdmin, postAdmin, putAdmin } from '../../services/adminService';
import MenuList from '../Team/MenuList/MenuList';
import UserField from '../TableBits/UserField';
import { DeleteAlert } from '../../alerts/deleteAlerts';
import SearcherTable from '../Collaborators/CollaboratorTab/SearcherTable';
import AddTable from '../Collaborators/CollaboratorTab/AddTable';
import {AdminContext} from '../../context/AdminContext/AdminContext'

const AdminTab = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    const [adminList, setAdminList] = useState([]);
    const [filerAdminList, setFilterAdminList] = useState([]);
    const { state, dispatch } = useContext(ModalContext);
    const {adminState} = useContext(AdminContext)

    const fetchData = async (): Promise<void> => {
        const admins = await getAllAdmins();
        if (admins.data) {
            admins.data.forEach((element: any) => element.onDelete = onDelete);
            admins.data.forEach((element: any) => element.icon = "eliminar-admin");
            admins.data.forEach((element: any) => element.permissions = true);
        }
        setAdminList(admins.data);
        setFilterAdminList(admins.data);
        return admins;
    }

    useEffect(() => {
        fetchData();
        return () => {
            fetchData();
            setAdminList([]);
            setFilterAdminList([]);
        }
    }, []);

    const onDelete = async (_id: string): Promise<void> => {
        const result = await DeleteAlert(`¿Deseas eliminar el Administrador?`);
        if (result) {
            await deleteAdmin(_id);
            await fetchData();
        }
    }

    const addAdmin = async (admin: string): Promise<void> => {
        if (/(@gmail.com|@it-seekers.com)$/.test(admin)) {
            await postAdmin(admin);
            await fetchData();
        } else {
            await closeModal(dispatch);
            await WarningAlert({ text: 'El correo no es válido.' })
        };
    }

    const updateAdmin = async (admin: string): Promise<void> => {
        if (admin) {
            await putAdmin(state._id, admin);
            await fetchData();
        } else await WarningAlert({ text: 'El correo no es válido.' })
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box display="flex" flexDirection="column" p={2}>
                    <Box p={1} pb={3} display="flex" flexDirection="row">
                        <Box display="flex" justifyContent="flex-start">
                            <SearcherTable initState={adminList} setState={setFilterAdminList} fields={["FullName"]} />
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="flex-end"
                            style={{ width: "100%" }}
                        >
                            {(adminState?.PermisosContex?.Modulos?.Colaboradores?.Administradores?.Agregar === true)?
                                <AddTable func={() => openModal({ title: "Agregar Administrador" }, dispatch)} text="Agregar administrador" />
                            :null
                            }
                        </Box>
                    </Box>
                    <TableBits
                        columns={columns}
                        rows={filerAdminList}
                        components={[UserField]}
                        componentOptions={MenuList}
                    />
                </Box>
            )}
            <AddRegisterModal addFunc={addAdmin} updateFunc={updateAdmin} />
        </div>
    )
}

export default AdminTab;