import { Box, Button, Grid, TextField } from "@material-ui/core";
import { ChangeEvent, useState, useEffect, useContext, createRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IPROPS } from "../interfaces/Collaborator";
import { putAdmin } from "../services/adminService";
import CollaboratorContext from "../context/CollaboratorContext/CollaboratorContext";
import { AdminContext } from "../context/AdminContext/AdminContext";
import CustomTabs from "../components/Collaborators/Tab/CustomTabs";
import CustomTab from "../components/Collaborators/Tab/CustomTab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import "../styles/AdministratorPermissions/Styles.css";
import { fetchingData } from "../helpers/Collaborator/Collaborator";
import SaveIcon from "@material-ui/icons/Save";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

const AdministratorPermissions = ({
  tab = "Administradores",
  numTab,
  title,
  labels = [],
  components = [],
  back = "/collaborators/id/0",
  progress = 0,
}: IPROPS) => {
  const text = createRef<any>();
  const { idUser, user } = useParams<any>();
  const [returnPill, setAReturnPill] = useState<number>(0);
  const history = useHistory();
  const [tabs, setTab] = useState(0);
  const { adminState } = useContext(AdminContext);
  console.log("Contexto con permisos", adminState);
  let DatosConvertidos = adminState?.Proyectos.Proyectos.split(",");

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
    localStorage.setItem("currentPill", String(newValue));
  };
  const onBack = () => {
    localStorage.setItem("currentPill", "4");
    history.push(back);
  };

  const updateAdmin = async (admin: string): Promise<void> => {
    if (admin) {
      await putAdmin(idUser, admin);
    } else await alert("Correo no es valido");
  };

  const bloque = document.querySelectorAll(".bloque");
  const h2 = document.querySelectorAll(".h2");

  // Cuando CLICK en h2,
  // QUITAR la clase activo de TODOS los bloque
  // Vamos a añadir la clase activo al BLOQUE con la POSICION del h2

  // Recorrer TODOS los h2
  h2.forEach((cadaH2, i) => {
    // Asignando un CLICK a cada h2
    h2[i].addEventListener("click", () => {
      // Recorrer TODOS los bloque
      bloque.forEach((cadaBloque, i) => {
        // Quitamos la clase activo de TODOS los bloques
        bloque[i].classList.remove("activo");
      });
      // Añadiendo la clase activo al bloque cuya posición sea igual al del h2
      // (Línea número 12)
      bloque[i].classList.add("activo");
    });
  });

  const bloquePermisos = document.querySelectorAll(".bloqueUno");
  const titulosDashboard = document.querySelectorAll(".titulosDashboard");

  titulosDashboard.forEach((cadaBloque, i) => {
    titulosDashboard[i].addEventListener("click", () => {
      console.log("Click en el bloque");
      bloquePermisos.forEach((cadaBloque, i) => {
        bloquePermisos[i].classList.remove("activo");
      });
      bloquePermisos[i].classList.add("activo");
    });
  });

  function SimpleAccordion(adminsState: any) {
    const { adminState } = useContext(AdminContext);
    const [prueba, setPrueba] = useState({});
    console.log("prueba de estado", adminState);
    console.log("datos en prueba", prueba);

    return (
      <div className="contenedor_Permisos">
        <Accordion className="contenedor PrimerNivel">
          <Box className="flex">
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="lista_Permisos flex PrimerNivel"
            >
              <span className="DashBoardElements">
                <Box className="Arrow inline">
                  <span className="svgFlechaUp">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  </span>
                </Box>
                <span className="titulosDashboard">Estructura de equipo</span>
              </span>
            </AccordionSummary>
            <Box className="switch">
              <IOSSwitch
                valor={
                  (adminState?.Permisos.Modulos.EstructuraEquipo.Clientes.Ver,
                  setPrueba)
                }
              />
            </Box>
          </Box>
          <AccordionDetails>
            <Box className="lista_Permisos SegundoNivel flex">
              <Box className="radiosElements">
                <div>
                  <span className="">Sedes</span>
                </div>
              </Box>
              <Box>
                <div>
                  <BpCheckbox />
                  <span className="">Ver</span>
                  <BpCheckbox />
                  <span className="">Editar</span>
                  <BpCheckbox />
                  <span className="">Eliminar</span>
                </div>
              </Box>
            </Box>
            <Box className="lista_Permisos SegundoNivel flex">
              <Box className="radiosElements">
                <div>
                  <span className="">Clientes</span>
                </div>
              </Box>
              <Box>
                <div>
                  <BpCheckbox />
                  <span className="">Ver</span>
                  <BpCheckbox />
                  <span className="">Editar</span>
                  <BpCheckbox />
                  <span className="">Eliminar</span>
                </div>
              </Box>
            </Box>
            <Box className="lista_Permisos SegundoNivel flex">
              <Box className="radiosElements">
                <div>
                  <span className="">Proyectos</span>
                </div>
              </Box>
              <Box>
                <div>
                  <BpCheckbox />
                  <span className="">Ver</span>
                  <BpCheckbox />
                  <span className="">Editar</span>
                  <BpCheckbox />
                  <span className="">Eliminar</span>
                </div>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion className="contenedor PrimerNivel">
          <Box className="flex">
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="lista_Permisos flex PrimerNivel"
            >
              <span className="DashBoardElements">
                <Box className="Arrow inline">
                  <span className="svgFlechaUp">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  </span>
                </Box>
                <span className="titulosDashboard">Colaboradores</span>
              </span>
            </AccordionSummary>
            <Box className="switch">
              <IOSSwitch
                valor={
                  adminState?.Permisos.Modulos.EstructuraEquipo.Clientes.Editar
                }
              />
            </Box>
          </Box>
          <AccordionDetails>
            <Accordion className="contenedor SegundoNivel">
              <Box className="flex">
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="lista_Permisos flex SegundoNivel"
                >
                  <span className="DashBoardElements">
                    <Box className="Arrow inline">
                      <span className="svgFlechaUp">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                        </svg>
                      </span>
                    </Box>
                    <span className="titulosDashboard">Nuevo Ingreso</span>
                  </span>
                </AccordionSummary>
                <Box className="switch">
                  <IOSSwitch />
                </Box>
              </Box>
              <AccordionDetails>
                <Box className=" contenedor lista_Permisos TercerNivel flex">
                  <Box className="radiosElements">
                    <div>
                      <span className="">Acciones</span>
                    </div>
                  </Box>
                  <Box>
                    <div>
                      <BpCheckbox />
                      <span className="">Agregar</span>
                      <BpCheckbox />
                      <span className="">Convertir</span>
                      <BpCheckbox />
                      <span className="">Declinar</span>
                    </div>
                  </Box>
                </Box>
                <Box>
                  <Accordion className="contenedor TercerNivel">
                    <Box className="flex">
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className="lista_Permisos flex TercerNivel"
                      >
                        <span className="DashBoardElements">
                          <Box className="Arrow inline">
                            <span className="svgFlechaUp">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                              </svg>
                            </span>
                          </Box>
                          <span className="titulosDashboard">Menus</span>
                        </span>
                      </AccordionSummary>
                      <Box className="switch">
                        <IOSSwitch />
                      </Box>
                    </Box>
                    <AccordionDetails>
                      <Accordion className="contenedor CuartoNivel">
                        <Box className="flex">
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="lista_Permisos flex CuartoNivel"
                          >
                            <span className="DashBoardElements">
                              <Box className="Arrow inline">
                                <span className="svgFlechaUp">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                  </svg>
                                </span>
                              </Box>
                              <span className="titulosDashboard">
                                Información Alta
                              </span>
                            </span>
                          </AccordionSummary>
                          <Box className="switch">
                            <IOSSwitch />
                          </Box>
                        </Box>
                        <AccordionDetails>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Información Personal</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Ingreso</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Contratación</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="contenedor CuartoNivel">
                        <Box className="flex">
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="lista_Permisos flex CuartoNivel"
                          >
                            <span className="DashBoardElements">
                              <Box className="Arrow inline">
                                <span className="svgFlechaUp">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                  </svg>
                                </span>
                              </Box>
                              <span className="titulosDashboard">
                                Datos Personales
                              </span>
                            </span>
                          </AccordionSummary>
                          <Box className="switch">
                            <IOSSwitch />
                          </Box>
                        </Box>
                        <AccordionDetails>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Domicilio</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Personales</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Identidad</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="contenedor CuartoNivel">
                        <Box className="flex">
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="lista_Permisos flex CuartoNivel"
                          >
                            <span className="DashBoardElements">
                              <Box className="Arrow inline">
                                <span className="svgFlechaUp">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                  </svg>
                                </span>
                              </Box>
                              <span className="titulosDashboard">
                                Salud Emergencias
                              </span>
                            </span>
                          </AccordionSummary>
                          <Box className="switch">
                            <IOSSwitch />
                          </Box>
                        </Box>
                        <AccordionDetails>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Beneficiario</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Contacto Emergencia</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Información Medica</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="contenedor CuartoNivel">
                        <Box className="flex">
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="lista_Permisos flex CuartoNivel"
                          >
                            <span className="DashBoardElements">
                              <Box className="Arrow inline">
                                <span className="svgFlechaUp">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                  </svg>
                                </span>
                              </Box>
                              <span className="titulosDashboard">
                                Datos Para Pago
                              </span>
                            </span>
                          </AccordionSummary>
                          <Box className="switch">
                            <IOSSwitch />
                          </Box>
                        </Box>
                        <AccordionDetails>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Bancarios</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="contenedor CuartoNivel">
                        <Box className="flex">
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="lista_Permisos flex CuartoNivel"
                          >
                            <span className="DashBoardElements">
                              <Box className="Arrow inline">
                                <span className="svgFlechaUp">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                  </svg>
                                </span>
                              </Box>
                              <span className="titulosDashboard">
                                Expediente
                              </span>
                            </span>
                          </AccordionSummary>
                          <Box className="switch">
                            <IOSSwitch />
                          </Box>
                        </Box>
                        <AccordionDetails>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Documentos Personales</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Documentos Opcionales</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Oferta Laboral</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion className="contenedor SegundoNivel">
              <Box className="flex">
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="lista_Permisos flex SegundoNivel"
                >
                  <span className="DashBoardElements">
                    <Box className="Arrow inline">
                      <span className="svgFlechaUp">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                        </svg>
                      </span>
                    </Box>
                    <span className="titulosDashboard">Colaboradores</span>
                  </span>
                </AccordionSummary>
                <Box className="switch">
                  <IOSSwitch />
                </Box>
              </Box>
              <AccordionDetails>
                <Box className=" contenedor lista_Permisos TercerNivel flex">
                  <Box className="radiosElements">
                    <div>
                      <span className="">Acciones</span>
                    </div>
                  </Box>
                  <Box>
                    <div>
                      <BpCheckbox />
                      <span className="">Agregar</span>
                      <BpCheckbox />
                      <span className="">Inactivar</span>
                    </div>
                  </Box>
                </Box>
                <Box>
                  <Accordion className="contenedor TercerNivel">
                    <Box className="flex">
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className="lista_Permisos flex TercerNivel"
                      >
                        <span className="DashBoardElements">
                          <Box className="Arrow inline">
                            <span className="svgFlechaUp">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                              </svg>
                            </span>
                          </Box>
                          <span className="titulosDashboard">Menus</span>
                        </span>
                      </AccordionSummary>
                      <Box className="switch">
                        <IOSSwitch />
                      </Box>
                    </Box>
                    <AccordionDetails>
                      <Accordion className="contenedor CuartoNivel">
                        <Box className="flex">
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="lista_Permisos flex CuartoNivel"
                          >
                            <span className="DashBoardElements">
                              <Box className="Arrow inline">
                                <span className="svgFlechaUp">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                  </svg>
                                </span>
                              </Box>
                              <span className="titulosDashboard">
                                Información Alta
                              </span>
                            </span>
                          </AccordionSummary>
                          <Box className="switch">
                            <IOSSwitch />
                          </Box>
                        </Box>
                        <AccordionDetails>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Información Personal</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Ingreso</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Contratación</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="contenedor CuartoNivel">
                        <Box className="flex">
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="lista_Permisos flex CuartoNivel"
                          >
                            <span className="DashBoardElements">
                              <Box className="Arrow inline">
                                <span className="svgFlechaUp">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                  </svg>
                                </span>
                              </Box>
                              <span className="titulosDashboard">
                                Datos Personales
                              </span>
                            </span>
                          </AccordionSummary>
                          <Box className="switch">
                            <IOSSwitch />
                          </Box>
                        </Box>
                        <AccordionDetails>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Domicilio</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Personales</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Identidad</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="contenedor CuartoNivel">
                        <Box className="flex">
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="lista_Permisos flex CuartoNivel"
                          >
                            <span className="DashBoardElements">
                              <Box className="Arrow inline">
                                <span className="svgFlechaUp">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                  </svg>
                                </span>
                              </Box>
                              <span className="titulosDashboard">
                                Salud Emergencias
                              </span>
                            </span>
                          </AccordionSummary>
                          <Box className="switch">
                            <IOSSwitch />
                          </Box>
                        </Box>
                        <AccordionDetails>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Beneficiario</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Contacto Emergencia</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Información Medica</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="contenedor CuartoNivel">
                        <Box className="flex">
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="lista_Permisos flex CuartoNivel"
                          >
                            <span className="DashBoardElements">
                              <Box className="Arrow inline">
                                <span className="svgFlechaUp">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                  </svg>
                                </span>
                              </Box>
                              <span className="titulosDashboard">
                                Datos Para Pago
                              </span>
                            </span>
                          </AccordionSummary>
                          <Box className="switch">
                            <IOSSwitch />
                          </Box>
                        </Box>
                        <AccordionDetails>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Bancarios</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="contenedor CuartoNivel">
                        <Box className="flex">
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="lista_Permisos flex CuartoNivel"
                          >
                            <span className="DashBoardElements">
                              <Box className="Arrow inline">
                                <span className="svgFlechaUp">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                  </svg>
                                </span>
                              </Box>
                              <span className="titulosDashboard">
                                Expediente
                              </span>
                            </span>
                          </AccordionSummary>
                          <Box className="switch">
                            <IOSSwitch />
                          </Box>
                        </Box>
                        <AccordionDetails>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Documentos Personales</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Documentos Opcionales</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Oferta Laboral</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion className="contenedor SegundoNivel">
              <Box className="flex">
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="lista_Permisos flex SegundoNivel"
                >
                  <span className="DashBoardElements">
                    <Box className="Arrow inline">
                      <span className="svgFlechaUp">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                        </svg>
                      </span>
                    </Box>
                    <span className="titulosDashboard">Declinados</span>
                  </span>
                </AccordionSummary>
                <Box className="switch">
                  <IOSSwitch />
                </Box>
              </Box>
            </Accordion>
            <Accordion className="contenedor SegundoNivel">
              <Box className="flex">
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="lista_Permisos flex SegundoNivel"
                >
                  <span className="DashBoardElements">
                    <Box className="Arrow inline">
                      <span className="svgFlechaUp">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                        </svg>
                      </span>
                    </Box>
                    <span className="titulosDashboard">Inactivos</span>
                  </span>
                </AccordionSummary>
                <Box className="switch">
                  <IOSSwitch />
                </Box>
              </Box>
              <AccordionDetails>
                <Box className=" contenedor lista_Permisos TercerNivel flex">
                  <Box className="radiosElements">
                    <div>
                      <span className="">Acciones</span>
                    </div>
                  </Box>
                  <Box>
                    <div>
                      <BpCheckbox />
                      <span className="">Activar</span>
                    </div>
                  </Box>
                </Box>
                <Box>
                  <Accordion className="contenedor TercerNivel">
                    <Box className="flex">
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className="lista_Permisos flex TercerNivel"
                      >
                        <span className="DashBoardElements">
                          <Box className="Arrow inline">
                            <span className="svgFlechaUp">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                              </svg>
                            </span>
                          </Box>
                          <span className="titulosDashboard">Menus</span>
                        </span>
                      </AccordionSummary>
                      <Box className="switch">
                        <IOSSwitch />
                      </Box>
                    </Box>
                    <AccordionDetails>
                      <Accordion className="contenedor CuartoNivel">
                        <Box className="flex">
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="lista_Permisos flex CuartoNivel"
                          >
                            <span className="DashBoardElements">
                              <Box className="Arrow inline">
                                <span className="svgFlechaUp">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                  </svg>
                                </span>
                              </Box>
                              <span className="titulosDashboard">
                                Información Alta
                              </span>
                            </span>
                          </AccordionSummary>
                          <Box className="switch">
                            <IOSSwitch />
                          </Box>
                        </Box>
                        <AccordionDetails>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Información Personal</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Ingreso</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Contratación</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="contenedor CuartoNivel">
                        <Box className="flex">
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="lista_Permisos flex CuartoNivel"
                          >
                            <span className="DashBoardElements">
                              <Box className="Arrow inline">
                                <span className="svgFlechaUp">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                  </svg>
                                </span>
                              </Box>
                              <span className="titulosDashboard">
                                Datos Personales
                              </span>
                            </span>
                          </AccordionSummary>
                          <Box className="switch">
                            <IOSSwitch />
                          </Box>
                        </Box>
                        <AccordionDetails>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Domicilio</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Personales</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Identidad</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="contenedor CuartoNivel">
                        <Box className="flex">
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="lista_Permisos flex CuartoNivel"
                          >
                            <span className="DashBoardElements">
                              <Box className="Arrow inline">
                                <span className="svgFlechaUp">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                  </svg>
                                </span>
                              </Box>
                              <span className="titulosDashboard">
                                Salud Emergencias
                              </span>
                            </span>
                          </AccordionSummary>
                          <Box className="switch">
                            <IOSSwitch />
                          </Box>
                        </Box>
                        <AccordionDetails>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Beneficiario</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Contacto Emergencia</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Información Medica</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="contenedor CuartoNivel">
                        <Box className="flex">
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="lista_Permisos flex CuartoNivel"
                          >
                            <span className="DashBoardElements">
                              <Box className="Arrow inline">
                                <span className="svgFlechaUp">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                  </svg>
                                </span>
                              </Box>
                              <span className="titulosDashboard">
                                Datos Para Pago
                              </span>
                            </span>
                          </AccordionSummary>
                          <Box className="switch">
                            <IOSSwitch />
                          </Box>
                        </Box>
                        <AccordionDetails>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Datos Bancarios</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="contenedor CuartoNivel">
                        <Box className="flex">
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="lista_Permisos flex CuartoNivel"
                          >
                            <span className="DashBoardElements">
                              <Box className="Arrow inline">
                                <span className="svgFlechaUp">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                  </svg>
                                </span>
                              </Box>
                              <span className="titulosDashboard">
                                Expediente
                              </span>
                            </span>
                          </AccordionSummary>
                          <Box className="switch">
                            <IOSSwitch />
                          </Box>
                        </Box>
                        <AccordionDetails>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Documentos Personales</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Documentos Opcionales</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                          <Box className=" contenedor lista_Permisos QuintoNivel flex">
                            <Box className="radiosElements">
                              <div>
                                <span className="">Oferta Laboral</span>
                              </div>
                            </Box>
                            <Box>
                              <div>
                                <BpCheckbox />
                                <span className="">Ver</span>
                                <BpCheckbox />
                                <span className="">Editar</span>
                                <BpCheckbox />
                                <span className="">Eliminar</span>
                              </div>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
        <Accordion className="contenedor PrimerNivel">
          <Box className="flex">
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="lista_Permisos flex PrimerNivel"
            >
              <span className="DashBoardElements">
                <Box className="Arrow inline">
                  <span className="svgFlechaUp">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  </span>
                </Box>
                <span className="titulosDashboard">My Mood</span>
              </span>
            </AccordionSummary>
            <Box className="switch">
              <IOSSwitch />
            </Box>
          </Box>
          <AccordionDetails>
            <Box className="lista_Permisos SegundoNivel flex">
              <Box className="radiosElements">
                <div>
                  <span className="">Acciones</span>
                </div>
              </Box>
              <Box>
                <div>
                  <BpCheckbox />
                  <span className="">Estadísticas</span>
                </div>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion className="contenedor PrimerNivel">
          <Box className="flex">
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="lista_Permisos flex PrimerNivel"
            >
              <span className="DashBoardElements">
                <Box className="Arrow inline">
                  <span className="svgFlechaUp">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  </span>
                </Box>
                <span className="titulosDashboard">Notificaciones</span>
              </span>
            </AccordionSummary>
            <Box className="switch">
              <IOSSwitch />
            </Box>
          </Box>
          <AccordionDetails>
            <Box className="lista_Permisos SegundoNivel flex">
              <Box className="radiosElements">
                <div>
                  <span className="">Acciones</span>
                </div>
              </Box>
              <Box>
                <div>
                  <BpCheckbox />
                  <span className="">Agregar</span>
                </div>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion className="contenedor PrimerNivel">
          <Box className="flex">
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="lista_Permisos flex PrimerNivel"
            >
              <span className="DashBoardElements">
                <Box className="Arrow inline">
                  <span className="svgFlechaUp">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  </span>
                </Box>
                <span className="titulosDashboard">Noticias</span>
              </span>
            </AccordionSummary>
            <Box className="switch">
              <IOSSwitch />
            </Box>
          </Box>
          <AccordionDetails>
            <Box className="lista_Permisos SegundoNivel flex">
              <Box className="radiosElements">
                <div>
                  <span className="">Acciones</span>
                </div>
              </Box>
              <Box>
                <div>
                  <BpCheckbox />
                  <span className="">Agregar</span>
                  <BpCheckbox />
                  <span className="">Vista Previa</span>
                  <BpCheckbox />
                  <span className="">Editar</span>
                  <BpCheckbox />
                  <span className="">Eliminar</span>
                </div>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion className="contenedor PrimerNivel">
          <Box className="flex">
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="lista_Permisos flex PrimerNivel"
            >
              <span className="DashBoardElements">
                <Box className="Arrow inline">
                  <span className="svgFlechaUp">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  </span>
                </Box>
                <span className="titulosDashboard">Calendario</span>
              </span>
            </AccordionSummary>
            <Box className="switch">
              <IOSSwitch />
            </Box>
          </Box>
          <AccordionDetails>
            <Box className="lista_Permisos SegundoNivel flex">
              <Box className="radiosElements">
                <div>
                  <span className="">Acciones</span>
                </div>
              </Box>
              <Box>
                <div>
                  <BpCheckbox />
                  <span className="">Agregar</span>
                </div>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion className="contenedor PrimerNivel">
          <Box className="flex">
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="lista_Permisos flex PrimerNivel"
            >
              <span className="DashBoardElements">
                <Box className="Arrow inline">
                  <span className="svgFlechaUp">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  </span>
                </Box>
                <span className="titulosDashboard">FeedBack</span>
              </span>
            </AccordionSummary>
            <Box className="switch">
              <IOSSwitch />
            </Box>
          </Box>
        </Accordion>
      </div>
    );
  }

  const IOSSwitch = styled((valor: any) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...valor}
    />
  ))(({ theme }) => ({
    width: 34,
    height: 18,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 14,
      height: 14,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 3,
    width: 14,
    height: 14,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#ffffff",
    backgroundImage:
      theme.palette.mode === "dark"
        ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
        : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    ".Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#fabb00",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 14,
      height: 14,
    },
    "input:hover ~ &": {
      backgroundColor: "#fabb00",
      width: 14,
      height: 14,
    },
  });

  function BpCheckbox(props: any) {
    return (
      <Checkbox
        sx={{
          "&:hover": { bgcolor: "transparent" },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        inputProps={{ "aria-label": "Checkbox demo" }}
        {...props}
      />
    );
  }

  function ListaProyectos({ Proyectos }: any) {
    const List = (
      <ul className="listaProyectos_container">
        {Proyectos.map((Proyecto: any) => (
          <li key={Proyecto} className="lista_Proyectos">
            {Proyecto}
          </li>
        ))}
      </ul>
    );
    return <div>{List}</div>;
  }

  return (
    <div>
      <Box mt={3} ml={5} className="Title">
        Colaboradores
      </Box>
      <Box p={5} pb={3} pt={0}>
        <Grid container justify="flex-start">
          <CustomTabs
            value={tabs}
            onChange={handleChange}
            arial-label="simple tabs example"
          >
            <CustomTab label="Nuevo Ingreso" />
            <CustomTab label="Colaboradores" />
            <CustomTab label="Declinados" />
            <CustomTab label="Inactivos" />
            <CustomTab label="Administradores" />
          </CustomTabs>
        </Grid>
      </Box>
      <Box display="flex" flexDirection="column" p={2}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          className="contenedor_Principal"
        >
          <Grid item xs={5}>
            <Grid xs item>
              <Grid
                direction="row"
                container
                justify="flex-start"
                alignItems="center"
              >
                <Box ml={2} mt={5} pt={1}>
                  <ArrowBackIcon
                    fontSize="small"
                    style={{ color: "#fabb00" }}
                  />
                </Box>
                <span className="Return" onClick={onBack}>
                  Regresar
                </span>
              </Grid>
            </Grid>
            <Grid xs item>
              <Box ml={6}>
                <h3 className="titulo_informacion">Información</h3>
                <p className="correo_label">Correo</p>
                <Box className="correo flex">
                  <TextField
                    className="correo"
                    margin="dense"
                    type="text"
                    placeholder={user}
                    defaultValue={user}
                    required
                    inputRef={text}
                  ></TextField>

                  <Button
                    type="submit"
                    className="buttonSave correoButton"
                    onClick={() => updateAdmin(text.current.value)}
                  >
                    <SaveIcon />
                  </Button>
                </Box>
                <p className="subtitulo_informacion">Proyectos asignados</p>
              </Box>
            </Grid>
            <Grid>
              <Box ml={6}>
                <ListaProyectos Proyectos={DatosConvertidos} />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <Grid xs item className="permisos_Container">
              <Box>
                <p className="">Permisos</p>
                <div className="titulos_tablaPermisos">
                  <p>Dashboard</p>
                  <p>Permisos</p>
                </div>
              </Box>
              <Box>
                <SimpleAccordion adminState={adminState} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default AdministratorPermissions;
