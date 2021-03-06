import { useState, useContext, useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import AddTable from "../Collaborators/CollaboratorTab/AddTable";
import SearcherTable from "../Collaborators/CollaboratorTab/SearcherTable";
import TableBits from "../TableBits/TableBits";
import columns from "./Colums";
import CalendarOptionsField from "./Fields/CalendarOptionsField";
import TitleField from "./Fields/TitleField";
import { getCalendar } from "../../services/calendarService";
import ProjectsField from "../Notification/Fields/ProjectsField";
import { CalendarContext } from "../../context/CalendarContext/CalendarContext";
import TypeCalendarField from "./Fields/TypeCalendarField";
import DateField from "./Fields/DateField";
import {AdminContext} from '../../context/AdminContext/AdminContext'


const Body = () => {
    const [list, setList] = useState<Array<any>>([]);
    const [listFilter, setListFilter] = useState<Array<any>>([]);
    const { state, dispatch } = useContext(CalendarContext);
    const {adminState} = useContext(AdminContext)


    useEffect(() => {
        async function fetchData() {
            let result = await getCalendar();
            let ProyectosAdmin = adminState?.Proyectos.Proyectos
            let ArrayFiltrado = result.filter((r:any) => ProyectosAdmin?.includes(r.projects))
            setList(ArrayFiltrado);
            setListFilter(ArrayFiltrado);
        }
        fetchData();
    }, [state.sent]);
    
    return (
        <div>
            <Box p={1} pb={3} display="flex" flexDirection="row" >
                <Grid container justify="flex-start">
                    <SearcherTable
                        initState={list}
                        setState={setListFilter}
                        label={"Buscar por palabra clave / fechas o datos relevantes"}
                        fields={['titulo', 'customDate', 'tipo', 'descripcion', 'proyecto']}
                        width={400}
                    />
                </Grid>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    style={{ width: "100%" }}
                >
                    {(adminState?.PermisosContex?.Modulos?.Calendario?.Agregar === true)?
                        <AddTable
                            func={() => dispatch({ type: "OPEN_MENU" })}
                            img={"icono-agregar-event.svg"}
                            text={"AGREGAR EVENTO"}
                        />
                        :null
                    }
                </Box>
            </Box>
            <TableBits
                columns={columns}
                rows={listFilter}
                components={[DateField, TitleField, TypeCalendarField, null, ProjectsField, null]}
                componentOptions={CalendarOptionsField}
            />
        </div>
    )
}

export default Body;