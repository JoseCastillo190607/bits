import { Box, Menu, MenuItem, Grid, Fade, Radio } from "@material-ui/core";
import SearcherTable from "./CollaboratorTab/SearcherTable";

import FilterTable from "./CollaboratorTab/FilterTable";
import ReportTable from "./CollaboratorTab/ReportTable";
import AddTable from "./CollaboratorTab/AddTable";

import "./CollaboratorTab/collaboratorTab.css";
import TableBits from "../TableBits/TableBits";
import { TBColumn } from "../../interfaces/TableBits.interfaces";
import UserField from "../TableBits/UserField";
import UserOptionsField from "./CollaboratorTab/UserOptionsField";
import { MouseEvent, useContext, useEffect, useReducer, useState } from "react";
import { tabCollaboratorReducer } from "../../context/TabCollaboratorContext/tabCollaboratorReducer";
import { Collaborator } from "../../interfaces/TabCollaborator.interfaces";
import { TabCollaboratorContext } from "../../context/TabCollaboratorContext/TabCollaboratorContext";
import { useToggle } from "../../hooks/useToggle";
import InactiveCollaboratorModal from "./CollaboratorTab/Modals/InactiveCollaboratorModal";
import AddCollaboratorModal from "./CollaboratorTab/Modals/AddCollaboratorModal";
import MoneyField from "../TableBits/MoneyField";
import FechaIngresoField from "../TableBits/FechaIngresoField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import { AdminContext } from "../../context/AdminContext/AdminContext";

import { GET_ALL_USERS_COLLABORATOR , GET_EXCEL_ACTIVE_USER} from "../../Querys/querys";
import { useQuery } from "@apollo/client";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const columns: TBColumn[] = [
  { id: "bussinesName",label: "Nombre de colaborador", align: "left" },
  { id: "campus", label: "Sede", align: "left" },
  { id: "client", label: "Cliente", align: "left" },
  { id: "project", label: "Proyecto", align: "left" },
  { id: "dateOfAdmission", label: "Fecha de ingreso", align: "left" },
  { id: "tittle", label: "Puesto", align: "left" },
  { id: "netSalary", label: "Sueldo", align: "left" },
];

const CollaboratorTable = (props: TabPanelProps) => {
  const [collaboratorState, collaboratorDispatch] = useReducer(
    tabCollaboratorReducer,
    { loading: true, collaborators: [], collaboratorsFilter: [] }
  );
  const [inactiveOpen, setInactiveOpen] = useToggle(false);
  const [filter, setFilter] = useState("female");
  const [addCollaboratorOpen, setAddCollaboratorOpen] = useToggle(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { adminState } = useContext(AdminContext);
  const [collaboratorList, setCollaboratorList] = useState([]);
  const [collaboratorListFilter, setCollaboratorListFilter] = useState([]);

  const {data:resultCollaborator} = useQuery(GET_ALL_USERS_COLLABORATOR);
  const allCollaborator = resultCollaborator?.GET_ALL_USERS_COLLABORATOR;
  let resultExcel = useQuery(GET_EXCEL_ACTIVE_USER);
  let allExcel = resultExcel.data?.GET_EXCEL_ACTIVE_USER;
  
  
  

    
  useEffect(() => {
    if(resultCollaborator){
      let ProyectosAdmin = adminState?.Proyectos.Proyectos || "";
      let ArrayFiltrado = allCollaborator?.filter((r: any) =>
      ProyectosAdmin?.includes(r.project)
      );
      
      setCollaboratorList(ArrayFiltrado);
      setCollaboratorListFilter(ArrayFiltrado);
    }
  }, [resultCollaborator]);


  const { children, value, index, ...other } = props;

  const handleOpen = (e: MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const FilterOptions = () => {
    return (
      <Menu
        id="menu-list-grow"
        anchorEl={anchorEl}
        elevation={0}
        getContentAnchorEl={null}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={({ target }) => setFilter(target.value)}
          >
            <MenuItem divider>
              Por Nombre&nbsp;
              <Grid container item justify="flex-end">
                <Radio
                  value="Por Nombre"
                  color="primary"
                  style={{ color: "#fabb00", marginRight: 0 }}
                  checked={filter === "Por Nombre"}
                />
              </Grid>
            </MenuItem>
            <MenuItem divider>
              Por Sede&nbsp;
              <Grid container item justify="flex-end">
                <Radio
                  value="Por Sede"
                  color="primary"
                  style={{ color: "#fabb00", marginRight: 0 }}
                  checked={filter === "Por Sede"}
                />
              </Grid>
            </MenuItem>
            <MenuItem divider>
              Por Cliente&nbsp;
              <Grid container item justify="flex-end">
                <Radio
                  value="Por Cliente"
                  color="primary"
                  style={{ color: "#fabb00", marginRight: 0 }}
                  checked={filter === "Por Cliente"}
                />
              </Grid>
            </MenuItem>
            <MenuItem>
              Por Proyecto&nbsp;
              <Grid container item justify="flex-end">
                <Radio
                  value="Por Proyecto"
                  color="primary"
                  style={{ color: "#fabb00", marginRight: 0 }}
                  checked={filter === "Por Proyecto"}
                />
              </Grid>
            </MenuItem>
          </RadioGroup>
        </FormControl>
      </Menu>
    );
  };

  return (
    <TabCollaboratorContext.Provider
      value={{
        inactiveOpen,
        setInactiveOpen,
        addCollaboratorOpen,
        setAddCollaboratorOpen,
        collaboratorState,
        collaboratorDispatch,
      }}
    >
      <div role="tabpanel" hidden={value !== index} {...other}>
        {value === index && (
          <Box display="flex" flexDirection="column" p={2}>
            <Box p={1} pb={3} display="flex" flexDirection="row">
              <Box display="flex" justifyContent="flex-start">
                <SearcherTable
                  initState={collaboratorList}
                  setState={setCollaboratorListFilter}
                  label={"Buscar por nombre / sede / cliente / proyecto"}
                  fields={[
                    "fullName",
                    "campus",
                    "project",
                    "client"
                  ]}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                style={{ width: "100%" }}
              >
                <ReportTable link={allExcel} type="active" />
                {/* <Box>
                  <FilterTable onClick={handleOpen} />
                  <FilterOptions />
                </Box>
                {adminState?.PermisosContex?.Modulos?.Colaboradores
                  ?.Colaboradores?.Agregar === true ? (
                  <AddTable func={setAddCollaboratorOpen} />
                ) : null} */}
              </Box>
            </Box>

            {/* <EnhancedTable /> */}
            <TableBits
              columns={columns}
              rows={collaboratorListFilter}
              components={[
                UserField,
                null,
                null,
                null,
                FechaIngresoField,
                null,
                MoneyField,
              ]}
              componentOptions={UserOptionsField}
            />
          </Box>
        )}
      </div>

      <InactiveCollaboratorModal />

      <AddCollaboratorModal />
    </TabCollaboratorContext.Provider>
  );
};

export default CollaboratorTable;
