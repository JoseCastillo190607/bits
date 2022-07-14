import { useEffect, useState, useContext } from 'react';
import { Box } from '@material-ui/core';
import TableBits from '../TableBits/TableBits';
import columns from './DeclinadoColumns';
import { TabPanelProps } from '../../interfaces/TabPanelProps';
import UserField from '../TableBits/UserField';
import SearcherTable from '../Collaborators/CollaboratorTab/SearcherTable';
import {AdminContext} from '../../context/AdminContext/AdminContext'
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS_DECLINADOS } from "../../Querys/querys";

const DeclinadoTab = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    const [declinedList, setDeclinedList] = useState([]);
    const [filerDeclinedList, setFilterAdminList] = useState([]);
    const {adminState} = useContext(AdminContext)

    const {data:resultCollaborator} = useQuery(GET_ALL_USERS_DECLINADOS);
    const allCollaborator = resultCollaborator?.GET_ALL_USERS_DECLINADOS;
    useEffect(() => {
        if(resultCollaborator){
            // const declined = await getAllDeclinados();
            let ProyectosAdmin = adminState?.Proyectos.Proyectos
            let ArrayFiltrado = allCollaborator?.filter((r:any) => ProyectosAdmin?.includes(r.project))
            setDeclinedList(ArrayFiltrado);
            setFilterAdminList(ArrayFiltrado);
        }
    }, [resultCollaborator]);
        

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
                            <SearcherTable initState={declinedList} setState={setFilterAdminList} fields={["fullName"]} />
                        </Box>
                    </Box>
                    <TableBits
                        columns={columns}
                        rows={filerDeclinedList}
                        components={[UserField]}
                        options={false}
                    />
                </Box>
            )}
        </div>
    )
}

export default DeclinadoTab;