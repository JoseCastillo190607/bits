import { MouseEvent, useContext, useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import TableBits from '../TableBits/TableBits';
import columns from './Columns';
import ModalContext from '../../context/ModalContext/ModalContext';
import { TabPanelProps } from '../../interfaces/TabPanelProps';
import { getInactiveCollaborators } from '../../services/InactivesService';
import UserField from '../TableBits/UserField';
import FilterOptions from './FilterOptions';
import ReportTable from '../Collaborators/CollaboratorTab/ReportTable';
import SearcherTable from '../Collaborators/CollaboratorTab/SearcherTable';
import ModalReactive from './Modals/ModalReactive';
import FilterTable from '../Collaborators/CollaboratorTab/FilterTable';
import MenuList from './Modals/MenuList';
import FormatDate from './Fields/FormatDate';
import FormatDateIngreso from './Fields/FormatDateIngreso';
import FieldTipoBaja from './Fields/FieldTipoBaja';
import FieldReasonCollaborator from './Fields/FieldReasonCollaborator';
import {AdminContext} from '../../context/AdminContext/AdminContext'

import { useQuery } from "@apollo/client";
import { GET_ALL_USERS_INACTIVOS } from "../../Querys/querys";

const InactivesTable = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    const { state } = useContext(ModalContext);
    const [inactiveList, setInactiveList] = useState([]);
    const [filerInactiveList, setFilterInactiveList] = useState([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {adminState} = useContext(AdminContext)

    const {loading,data:resultCollaborator,error} = useQuery(GET_ALL_USERS_INACTIVOS);
    const allCollaborator = resultCollaborator?.GET_ALL_USERS_INACTIVOS;

    console.log('Inactivos', allCollaborator)
    console.log('Fiilter', filerInactiveList)
    
    useEffect(() => {
        if(resultCollaborator){
            let ProyectosAdmin = adminState?.Proyectos.Proyectos || "";
            let ArrayFiltrado = allCollaborator?.filter((r:any) => ProyectosAdmin?.includes(r.project))
            setInactiveList(ArrayFiltrado);
            setFilterInactiveList(ArrayFiltrado);
        }      
    }, [resultCollaborator]);

    const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);

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
                            <SearcherTable 
                            initState={inactiveList} 
                            setState={setFilterInactiveList} 
                            fields={["fullName","project"]} />
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="flex-end"
                            style={{ width: "100%" }}
                        >
                            {/* <FilterTable onClick={handleOpen} />
                            <FilterOptions anchorEl={anchorEl} setAnchorEl={setAnchorEl} /> */}
                            <ReportTable link={allCollaborator} type="inactive" />
                        </Box>
                    </Box>
                    <TableBits
                        columns={columns}
                        rows={filerInactiveList}
                        components={[UserField, FieldTipoBaja,FieldReasonCollaborator, null, FormatDateIngreso, FormatDate]}
                        componentOptions={MenuList}
                    />
                </Box>
            )}
            <ModalReactive />
        </div>
    )
}

export default InactivesTable;