import { useEffect, useState, useContext } from "react";
import { Box, Grid } from "@material-ui/core";
import AddTable from "../Collaborators/CollaboratorTab/AddTable";
import SearcherTable from "../Collaborators/CollaboratorTab/SearcherTable";
import TableBits from "../TableBits/TableBits";
import CommentField from "./Fields/CommentField";
import StateField from "./Fields/StateField";
import { getMyMood } from "../../services/mymoodService";
import UserField from "./Fields/UserField";
import DateField from "./Fields/DateField";
import {AdminContext} from '../../context/AdminContext/AdminContext'



const columns: any = [
    { id: "Fecha", label: 'Fecha', align: 'left' },
    { id: "Autor", label: 'Autor', align: 'left' },
    { id: "estado", label: 'Estado', align: 'center' },
    { id: "Comentario", label: 'Comentario', align: 'left' },
];

const Body = ({ onHandleChange }: any) => {
    const [myMood, setMyMood] = useState<Array<any>>([]);
    const [myMoodFilter, setMyMoodFilter] = useState<Array<any>>([]);
    const {adminState} = useContext(AdminContext)

    useEffect(() => {
        async function fetchData() {
            let result = await getMyMood();
            let ProyectosAdmin = adminState?.Proyectos.Proyectos
            let ArrayFiltrado = result.filter((r:any) => ProyectosAdmin?.includes(r.Proyecto))
            setMyMood(ArrayFiltrado);
            setMyMoodFilter(ArrayFiltrado);
        }

        fetchData();
    }, []);

    return (
        <>
            <Box p={1} pb={3} display="flex" flexDirection="row" >
                <Grid container justify="flex-start">
                    <SearcherTable
                        initState={myMood}
                        setState={setMyMoodFilter}
                        label={"Buscar por Correo / Estado / Comentario / Proyecto"}
                        fields={['idUsuario', 'Comentario', 'estado', 'Proyecto']}
                        width={400}
                    />
                </Grid>
                {(adminState?.PermisosContex?.Modulos?.MyMood?.Estadisticas) === true?
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    style={{ width: "100%" }}
                >
                
                    <AddTable
                    func={onHandleChange}
                    img={"icono-agregar-event.svg"}
                    text={"Estadísticas"}
                />
          
                </Box>
                      : null
                    }
            </Box>

            <TableBits
                columns={columns}
                rows={myMoodFilter}
                components={[DateField, UserField, StateField, CommentField]}
                options={false}
            />
        </>
    )
}

export default Body;