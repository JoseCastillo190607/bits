import { useState, useContext, useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import AddTable from "../Collaborators/CollaboratorTab/AddTable";
import SearcherTable from "../Collaborators/CollaboratorTab/SearcherTable";
import TableBits from "../TableBits/TableBits";
import NewsOptionsField from "./Fields/NewsOptionsField";
import { NewsContext } from "../../context/NewContext/NewContext";
import { getNews } from "../../services/newService";
import ProjectsField from "../Notification/Fields/ProjectsField";
import TitleField from "../Calendar/Fields/TitleField";
import DateField from "./Fields/DateField";
import { AdminContext } from "../../context/AdminContext/AdminContext";
import { useQuery } from "@apollo/client";
import { GET_ALL_NOTICES } from "../../Querys/querys";

const columns: any = [
  { id: "fechaAdd", label: "Fecha", align: "left" },
  { id: "autor", label: "Autor", align: "left" },
  { id: "tittle", label: "Título", align: "left" },
  { id: "projects", label: "Proyectos", align: "left" },
];

const Body = () => {
  const [news, setNews] = useState<Array<any>>([]);
  const [newsFilter, setNewsFilter] = useState<Array<any>>([]);
  const { state, dispatch } = useContext(NewsContext);
  const { adminState } = useContext(AdminContext);

  const { data: resultNews } = useQuery(GET_ALL_NOTICES);
  const resultAllNews = resultNews?.GET_ALL_NOTICES;

  useEffect(() => {
    if (resultAllNews) {
      let ProyectosAdmin = adminState?.Proyectos?.Proyectos;
      let ArrayFiltrado = resultAllNews.filter((r: any) =>
      //if r.projects has commas separted, it will be splitted and compared with ProyectosAdmin
        r.projects.split(",").some((p: any) => {
           return ProyectosAdmin?.includes(p);
        })
            
        // ProyectosAdmin?.includes(r.projects)
      );
      setNews(ArrayFiltrado);
      setNewsFilter(ArrayFiltrado);
    }
  }, [resultAllNews]);

  return (
    <Box display="flex" flexDirection="column" p={2}>
      <Box p={1} pb={3} display="flex" flexDirection="row">
        <Grid container justify="flex-start">
          <SearcherTable
            initState={news}
            setState={setNewsFilter}
            label={"Buscar por Autor / Titulo / Proyecto(s) / Fecha"}
            fields={["Autor", "Titulo", "Proyectos", "customDate"]}
            width={400}
          />
        </Grid>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          style={{ width: "100%" }}
        >
          {adminState?.PermisosContex?.Modulos?.Noticias?.Agregar === true ? (
            <AddTable
              func={() => dispatch({ type: "OPEN_MODAL" })}
              img={"icono-agregar-event.svg"}
              text={"CREAR NUEVA NOTICIA"}
            />
          ) : null}
        </Box>
      </Box>

      <TableBits
        columns={columns}
        rows={newsFilter}
        components={[DateField,null ,TitleField , ProjectsField]}
        componentOptions={NewsOptionsField}
      />
    </Box>
  );
};

export default Body;
