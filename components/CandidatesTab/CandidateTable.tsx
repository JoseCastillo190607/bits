import { Box } from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import CollaboratorContext from "../../context/CollaboratorContext/CollaboratorContext";
import AddTable from "../Collaborators/CollaboratorTab/AddTable";
import SearcherTable from "../Collaborators/CollaboratorTab/SearcherTable";
import MoneyField from "../TableBits/MoneyField";
import TableBits from "../TableBits/TableBits";
import UserField from "./UserField";
import FormatDateIngreso from "./FormatDateIngreso";
import columns from "./CandidatesColumns";
import ConvertModal from "./Modals/ConvertModal";
import DeclineModal from "./Modals/DeclineModal";
import MenuList from "./Modals/MenuList";
import { AdminContext } from "../../context/AdminContext/AdminContext";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS_NUEVOINGRESO } from "../../Querys/querys";

const CandidateTable = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const [candidatesList, setCandidatesList] = useState([]);
  const [candidatesListFilter, setCandidatesListFilter] = useState([]);
  const history = useHistory();
  const { adminState } = useContext(AdminContext);

  const handleComponent = (e: any) => {
    history.push("/nuevoingreso/new/1");
  };

  const {data:resultCollaborator} = useQuery(GET_ALL_USERS_NUEVOINGRESO);
  const allCollaborator = resultCollaborator?.GET_ALL_USERS_NUEVOINGRESO;

  useEffect(() => {
    if(resultCollaborator){
      let ProyectosAdmin = adminState?.Proyectos.Proyectos;
      let ArrayFiltrado = allCollaborator?.filter((r: any) =>
        ProyectosAdmin?.includes(r.project)
      );
      setCandidatesListFilter(ArrayFiltrado);
      setCandidatesList(ArrayFiltrado);
   }
  
  }, [resultCollaborator]);

  return (
    <Box display="flex" flexDirection="column" p={2}>
      <Box p={1} pb={3} display="flex" flexDirection="row">
        <Box display="flex" justifyContent="flex-start">
          <SearcherTable
            label="Buscar por Nombre / Sede / Proyecto / Puesto"
            initState={candidatesList}
            setState={setCandidatesListFilter}
            fields={["fullName","campus", "client", "project", "Puesto"]}
          />
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          style={{ width: "100%" }}
        >
          {adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso
            ?.Agregar === true ? (
            <AddTable func={handleComponent} text="Agregar nuevo ingreso" />
          ) : null}
        </Box>
      </Box>
      <TableBits
        columns={columns}
        rows={candidatesListFilter}
        components={[
          UserField,
          null,
          null,
          null,
          FormatDateIngreso,
          null,
          MoneyField,
        ]}
        componentOptions={MenuList}
      />

      <DeclineModal />
      <ConvertModal />
    </Box>
  );
};

export default CandidateTable;
