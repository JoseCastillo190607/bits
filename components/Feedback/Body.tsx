import { Box } from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import { getFeedback } from "../../services/feedbackService";
import SearcherTable from "../Collaborators/CollaboratorTab/SearcherTable";
import TableBits from "../TableBits/TableBits";
import columns from "./FeedbackColumns";
import FieldFecha from "./Fields/FieldFecha";
import FieldText from "./Fields/FieldText";
import {AdminContext} from '../../context/AdminContext/AdminContext'



const Body = () => {
    const [feedbackList, setFeedbackList] = useState<any>([]);
    const [feedbackListFilter, setFeedbackListFilter] = useState<any>([]);
    const {adminState} = useContext(AdminContext)


    useEffect(() => {
        async function fetchData() {
            const response = await getFeedback();
            let ProyectosAdmin = adminState?.Proyectos.Proyectos
            let ArrayFiltrado = response.filter((r:any) => ProyectosAdmin?.includes(r.Proyecto))
            setFeedbackList(ArrayFiltrado);
            setFeedbackListFilter(ArrayFiltrado);
        }
        fetchData();
    }, []);
    return (
        <Box display="flex" flexDirection="column" p={2}>
            <Box p={1} pb={3} display="flex" flexDirection="row" >
                <Box display="flex" justifyContent="flex-start">
                    <SearcherTable initState={feedbackList} setState={setFeedbackListFilter} />
                </Box>
            </Box>
            <TableBits
                columns={columns}
                rows={feedbackListFilter}
                components={[ FieldFecha, FieldText, null]}
                options={false}
            />
        </Box>
    )
}

export default Body;