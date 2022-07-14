import { useEffect, useState, useContext } from "react";
import { Grid, Tooltip, Box } from "@material-ui/core";
import { getAllProjects, deleteProject } from "../../services/projectService";
import ProjectModal from "./Modals/ProjectModal";
import { IProject } from "../../interfaces/Project";
import { openModal } from "./Modals/Modal";
import { openProjectModal } from "./Modals/ModalProjectModal";
import ModalContext from "../../context/ModalContext/ModalContext";
import ProjectContext from "../../context/ProjectsContext/ProjectsContext";
import { AdminContext } from "../../context/AdminContext/AdminContext";
import { DeleteAlert } from "../../alerts/deleteAlerts";
import MenuButton from "./MenuList/MenuListProyectos";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AdministradoresProyectos from "./Modals/AdministradoresProyectos";
import { getAdminEnProyecto } from "../../services/adminService";
import "../../styles/ProjectsStyles/Styles.css";

import { GET_ALL_PROJECT, DELETE_PROJECT } from "../../Querys/querys";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { SuccessfulAlert } from "../../alerts/successAlerts";

const Projects = () => {
  const [projects, setProjects] = useState<Array<IProject>>([]);
  const { dispatch } = useContext(ModalContext);
  const { adminState } = useContext(AdminContext);
  const { dispatch: projectDispatch } = useContext(ProjectContext);

  console.log("AdminState:", adminState);

  useEffect(() => {
    getProjects();
  }, []);

  const resultProject = useQuery(GET_ALL_PROJECT);
  const allProject = resultProject.data?.GET_ALL_PROJECT;

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_ALL_PROJECT }],
  });

  const getProjects = async (): Promise<void> => {
    // const request = await getAllProjects();
    setProjects(allProject);
  };

  const onDeleteProject = async (_id: string): Promise<void> => {
    const result = await DeleteAlert(`¿Deseas eliminar el proyecto?`);
    if (result) {
      // await deleteProject(_id);

      deleteProject({
        variables: {
            deleteProjectId: _id,
        },
      }).then(()=>{
        SuccessfulAlert({text:"Proyecto eliminado con éxito"});
    });

      // await getProjects();
    }
  };

  const muestraAdministradores = (
    _id: string,
    value: string,
    client: string,
    title: string
  ): void => {
    openProjectModal({ _id, value, client, title }, projectDispatch);
  };

  function AdminsEnProyecto({ idProyecto, NombreProyecto, Cliente }: any) {
    const [adminsEnProyecto, setAdminsEnProyecto] = useState([]);
    const [adminsTotales, setAdmisTotales] = useState(0);

    useEffect(() => {
      obtenDatos();
    }, []);

    const obtenDatos = async () => {
      let adminsEnProyecto = await getAdminEnProyecto(idProyecto);
      let adminsSuma = adminsEnProyecto.data.length;

      if (adminsSuma >= 4) {
        setAdminsEnProyecto(adminsEnProyecto.data.slice(0, 3));
        setAdmisTotales(adminsSuma - 3);
      } else {
        setAdminsEnProyecto(adminsEnProyecto.data);
      }
    };

    const Lista = (
      <div>
        <Box className="flex">
          <Box>
            {adminsEnProyecto.map((admin: any) => (
              <img
                src={admin.img ? admin.img : "/assets/svg/user-avatar.svg"}
                alt="img"
                className="imgCollaborator__BITS imagenAdministradores"
              />
            ))}
          </Box>
          <Box>
            {adminsTotales > 0 ? (
              <div
                className="circulo colorBlue"
                onClick={() =>
                  muestraAdministradores(
                    idProyecto,
                    NombreProyecto,
                    Cliente,
                    "Ver"
                  )
                }
              >
                <div>{`+${adminsTotales}`}</div>
              </div>
            ) : null}
          </Box>
        </Box>
      </div>
    );
    return <div>{Lista}</div>;
  }

  return (
    <Box>
      <Box m={3} mb={0} mt={1}>
        <Grid direction="row" container>
          <Grid xs="auto" item>
            <h4>Proyectos</h4>
          </Grid>
          <Grid xs item container justify="flex-end">
            <Box mt={2}>
              {adminState?.PermisosContex?.Modulos?.EstructuraEquipo?.Proyectos
                ?.Editar === true ? (
                <Tooltip
                  title="Agregar"
                  placement="right"
                  className="cursorPointer"
                >
                  <Box id="AddProject">
                    <span>Agregar proyecto</span>
                    <button
                      type="button"
                      className="ButtonWhitOutStyles"
                      onClick={() => openModal({}, dispatch)}
                    >
                      <img src="/assets/svg/icono-agregar.svg" alt="Agregar" />
                    </button>
                  </Box>
                </Tooltip>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className="container" mb={5}>
        {projects?.map(
          ({ id, proyectName, client }: IProject, index: number) => (
            <Box className="rowContainer" key={index} mt={0}>
              <Grid direction="row" container>
                <Grid xs={8} item className="SedeText">
                  {proyectName}
                </Grid>
                <Grid xs={3} item className="SedeText">
                  {client}
                </Grid>
                {/* <Grid xs={3} item className="SedeText">
                  <Box className="flex">
                    <Box>
                      <span>Admins</span>
                    </Box>
                    <Box className="flex imgAdministradores">
                      <Box>
                        <AdminsEnProyecto
                          idProyecto={_id}
                          NombreProyecto={NombreProyecto}
                          Cliente={Cliente}
                        />
                      </Box>
                      <Box>
                        {adminState?.PermisosContex?.Modulos?.EstructuraEquipo
                          ?.Proyectos?.Editar === true ? (
                          <div
                            className="circulo colorYellow"
                            onClick={() =>
                              muestraAdministradores(
                                _id,
                                NombreProyecto,
                                Cliente,
                                "Update"
                              )
                            }
                          >
                            +
                          </div>
                        ) : null}
                      </Box>
                    </Box>
                  </Box>
                </Grid> */}
                <Grid xs item container justify="flex-end">
                  <MenuButton
                    {...{ _id: id, value: proyectName, client: client }}
                    onDelete={onDeleteProject}
                  />
                </Grid>
              </Grid>
            </Box>
          )
        )}
      </Box>
      <ProjectModal getProjects={getProjects} />
      <AdministradoresProyectos />
    </Box>
  );
};

export default Projects;
