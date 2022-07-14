import { Box } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import ModalContext from "../../context/ModalContext/ModalContext";
import { getNotifications } from "../../services/notificationService";
import TableBits from "../TableBits/TableBits";
import { openModal } from "../Team/Modals/Modal";
import MenuList from "./Modals/MenuList";
import columns from "./NotificationColumns";
import NotificationField from "./Fields/NotificationField";
import ProjectsField from "./Fields/ProjectsField";
import DateField from "./Fields/DateField";
import SearcherTable from "../Collaborators/CollaboratorTab/SearcherTable";
import AddTable from "../Collaborators/CollaboratorTab/AddTable";
import {AdminContext} from '../../context/AdminContext/AdminContext'


const Body = () => {
    const [notificationList, setNotificationList] = useState<any>([]);
    const [notificationListFilter, setNotificationListFilter] = useState<any>([]);
    const { state, dispatch } = useContext(ModalContext);
    const {adminState} = useContext(AdminContext)

    useEffect(() => {
        async function fetchData() {
            const response = await getNotifications();
            let ProyectosAdmin = adminState?.Proyectos.Proyectos
            let ArrayFiltrado = response.filter((r:any) => ProyectosAdmin?.includes(r.projects))
            setNotificationList(response);
            setNotificationListFilter(response);
        }
        fetchData();
        return ()=>{
            fetchData();
            setNotificationList([]);
            setNotificationListFilter([]);
        }
    }, [state]);
    return (
        <Box display="flex" flexDirection="column" p={2}>
            <Box p={1} pb={4} display="flex" flexDirection="row" >
                <Box display="flex" justifyContent="flex-start">
                    <SearcherTable initState={notificationList} setState={setNotificationListFilter} fields={["Titulo"]} />
                </Box>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    style={{ width: "100%", }}
                >

                   {(adminState?.PermisosContex?.Modulos?.Notificaciones?.Agregar) === true?
                        <AddTable func={() => openModal({ title: "Agregar" }, dispatch)} text="Crear nueva notificación" img="icono-notificaciones.svg" />                   
                        :null
                   }
                </Box>
            </Box>
            <TableBits
                columns={columns}
                rows={notificationListFilter}
                components={[DateField, NotificationField, '',ProjectsField]}
                componentOptions={MenuList}
            />
        </Box>
    )
}

export default Body;