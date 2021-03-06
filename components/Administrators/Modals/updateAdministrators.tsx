import { useContext, useEffect, useState } from "react";
import { getPermisosAdmin } from "../../../services/auth/authService";
import AdministratrosContext from "../../../context/AdministratorsContext/AdministratorsContext";
import {
  clearAdministratorsModal,
  updateAdminPermisos,
} from "../../../context/AdministratorsContext/Actions";
import { Dialog, DialogContent } from "@material-ui/core";
import Switch from "../Switch";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import LoadingPrueba from "../../Admin/AdministratorPermissions/LoaginPrueba";
import BpCheckbox from "../../Admin/AdministratorPermissions/BpCheckbox";

import styles from "../Administrators.module.css";

export const UpdateAdministrators = () => {
  const { state, dispatch } = useContext(AdministratrosContext);
  const [tablaUno, setTablaUno] = useState(true);
  const [tablaDos, setTablaDos] = useState(true);
  const [tablaTres, setTablaTres] = useState(true);
  const [tablaCuatro, setTablaCuatro] = useState(true);
  const [tablaCinco, setTablaCinco] = useState(true);
  const [tablaSeis, setTablaSeis] = useState(true);
  const [tablaSiete, setTablaSiete] = useState(true);
  const [tablaOcho, setTablaOcho] = useState(true);
  const [tablaNueve, setTablaNueve] = useState(true);
  const [tablaDiez, setTablaDiez] = useState(true);
  const [tablaOnce, setTablaOnce] = useState(true);
  const [tablaDoce, setTablaDoce] = useState(true);
  const [tablaTrece, setTablaTrece] = useState(true);
  const [tablaCatorce, setTablaCatorce] = useState(true);
  const [tablaQuince, setTablaQuince] = useState(true);
  const [tablaDieciseis, setTablaDieciseis] = useState(true);
  const [tablaDiecisiete, setTablaDiecisiete] = useState(true);
  const [tablaDieciocho, setTablaDieciocho] = useState(true);
  const [tablaDiecinueve, setTablaDiecinueve] = useState(true);
  const [tablaVeinte, setTablaVeinte] = useState(true);
  const [tablaVeintiuno, setTablaVeintiuno] = useState(true);
  const [tablaVeintidos, setTablaVeintidos] = useState(true);
  const [tablaVeintitres, setTablaVeintitres] = useState(true);
  const [tablaVeinticuatro, setTablaVeinticuatro] = useState(true);
  const [tablaVeinticinco, setTablaVeinticinco] = useState(true);
  const [tablaVeintiseis, setTablaVeintiseis] = useState(true);
  const [tablaVeintisiete, setTablaVeintisiete] = useState(true);
  const [tablaVeintiocho, setTablaVeintiocho] = useState(true);
  const [tablaVeintinueve, setTablaVeintinueve] = useState(true);
  const [tablaTreinta, setTablaTreinta] = useState(true);

  const handleClick = (name: any) => {
    console.log(name);
  };

  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    clearAdministratorsModal({}, dispatch);
  };

  useEffect(() => {
    async function getData() {
      let result: any = { new: true };
      result = await getPermisosAdmin(state._id);
      await updateAdminPermisos(result, dispatch);
    }
    getData();

    return () => {
      getData();
      setLoading(false);
      updateAdminPermisos({}, dispatch);
    };
  }, [state._id]);

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={state.updateModal}
        fullWidth={false}
        maxWidth={"md"}
      >
        {loading === true ? (
          <DialogContent>
            <LoadingPrueba />
          </DialogContent>
        ) : (
          <DialogContent className={styles.contenedorUpdate}>
            <div className={styles.contenedorSuperior}>
              <div className={styles.columnaSuperiorUno}>
                <div className={styles.contenedorColumnaUnoUpdate}>
                  <div>
                    <img
                      className={styles.iconoUpdate}
                      src={
                        state.Permisos?.img
                          ? state.Permisos?.img
                          : "/assets/svg/user-avatar.svg"
                      }
                      alt="img"
                    />
                  </div>
                  <div className={styles.contenedorDatosUpdate}>
                    <div>
                      <span className={styles.tituloDatosUpdate}>
                        Administrador
                      </span>
                    </div>
                    <div>
                      <span className={styles.tituloNombreUpdate}>
                        {state.Permisos?.Nombre}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.contenedorInputsUpdate}>
                  <fieldset className={styles.fieldsetUpdate}>
                    <legend className={styles.textoFieldsetUpdate}>
                      Nombre
                    </legend>
                    <input
                      type="text"
                      className={styles.inputUpdate}
                      value={state.Permisos?.Nombre}
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className={styles.fieldsetUpdate}>
                    <legend className={styles.textoFieldsetUpdate}>
                      Correo
                    </legend>
                    <input
                      type="text"
                      className={styles.inputUpdate}
                      value={state.Permisos?.Usuario}
                    />
                  </fieldset>
                </div>
              </div>
              <div className={styles.columnaSuperiorDos}>
                <div>
                  <span className={styles.tituloDatosUpdate}>
                    Proyectos que administra
                  </span>
                </div>
                <div>
                  <input type="text" className={styles.selectProyectos} />
                </div>
              </div>
            </div>
            <div className={styles.contenedorPermisos}>
              <div className={`${styles.tablaPermisos} ${styles.centrado}`}>
                <div className={styles.contenedorAcordion}>
                  {/* Inicia acordion estructura de equipo */}
                  <Accordion
                    className={
                      tablaUno === true
                        ? `${styles.acordionBase} `
                        : `${styles.acordionBase}`
                    }
                  >
                    <div className={styles.contenedorTitulosAccordion}>
                      <div>
                        <AccordionSummary
                          onClick={() => setTablaUno(!tablaUno)}
                        >
                          <div className={`${styles.contenedorIconoExpande}`}>
                            {tablaUno === true ? (
                              <img
                                onClick={handleClick}
                                id="prueba"
                                className={`${styles.iconoExpande}`}
                                src={`/assets/svg/icono-expande-arriba.svg`}
                                alt="imagen"
                              />
                            ) : (
                              <img
                                className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                src={`/assets/svg/icono-expande.svg`}
                                alt="imagen"
                              />
                            )}
                          </div>
                        </AccordionSummary>
                      </div>
                      <div className={styles.titulosAccordion}>
                        <span className={styles.tituloAccordion}>
                          Estructura de equipo
                        </span>
                      </div>
                      <div className={styles.contenedorSwitch}>
                        <Switch
                          NombreCampo={"EstructuraEquipo.Ver"}
                          Value={
                            state.Permisos?.Permisos?.Modulos?.EstructuraEquipo
                              ?.Ver
                          }
                          Modulo={"EstructuraEquipo"}
                        />
                      </div>
                    </div>
                    <AccordionDetails
                      style={{
                        padding: "8px 16px 0px",
                      }}
                    >
                      <div
                        className={`${styles.filaChecks} ${styles.nivelDos}`}
                      >
                        <div className={styles.contenedorChecks}>
                          <div className={styles.contenedorPrueba}>
                            <span className={styles.subTituloAccordion}>
                              Sedes
                            </span>
                          </div>
                          <div className={styles.contenedorPrueba}>
                            <BpCheckbox
                              NombreCampo={"EstructuraEquipo.Sedes.Ver"}
                              Value={
                                state.Permisos?.Permisos?.Modulos
                                  ?.EstructuraEquipo?.Sedes?.Ver
                              }
                              Modulo={"Colaboradores"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Ver
                            </span>
                            <BpCheckbox
                              NombreCampo={"EstructuraEquipo.Sedes.Editar"}
                              Value={
                                state.Permisos?.Permisos?.Modulos
                                  ?.EstructuraEquipo?.Sedes?.Editar
                              }
                              Modulo={"Colaboradores"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Editar
                            </span>
                            <BpCheckbox
                              NombreCampo={"EstructuraEquipo.Sedes.Eliminar"}
                              Value={
                                state.Permisos?.Permisos?.Modulos
                                  ?.EstructuraEquipo?.Sedes?.Eliminar
                              }
                              Modulo={"Colaboradores"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Eliminar
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${styles.filaChecks} ${styles.nivelDos}`}
                      >
                        <div className={styles.contenedorChecks}>
                          <div className={styles.contenedorPrueba}>
                            <span className={styles.subTituloAccordion}>
                              Clientes
                            </span>
                          </div>
                          <div className={styles.contenedorPrueba}>
                            <BpCheckbox
                              NombreCampo={"EstructuraEquipo.Clientes.Ver"}
                              Value={
                                state.Permisos?.Permisos?.Modulos
                                  ?.EstructuraEquipo?.Clientes?.Ver
                              }
                              Modulo={"Colaboradores"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Ver
                            </span>
                            <BpCheckbox
                              NombreCampo={"EstructuraEquipo.Clientes.Editar"}
                              Value={
                                state.Permisos?.Permisos?.Modulos
                                  ?.EstructuraEquipo?.Clientes?.Editar
                              }
                              Modulo={"Colaboradores"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Editar
                            </span>
                            <BpCheckbox
                              NombreCampo={"EstructuraEquipo.Clientes.Eliminar"}
                              Value={
                                state.Permisos?.Permisos?.Modulos
                                  ?.EstructuraEquipo?.Clientes?.Eliminar
                              }
                              Modulo={"Colaboradores"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Eliminar
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${styles.filaChecks} ${styles.nivelDos}`}
                      >
                        <div className={styles.contenedorChecks}>
                          <div className={styles.contenedorPrueba}>
                            <span className={styles.subTituloAccordion}>
                              Proyectos
                            </span>
                          </div>
                          <div className={styles.contenedorPrueba}>
                            <BpCheckbox
                              className={styles.BpCheckbox}
                              NombreCampo={"EstructuraEquipo.Proyectos.Ver"}
                              Value={
                                state.Permisos?.Permisos?.Modulos
                                  ?.EstructuraEquipo?.Proyectos?.Ver
                              }
                              Modulo={"Colaboradores"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Ver
                            </span>
                            <BpCheckbox
                              NombreCampo={"EstructuraEquipo.Proyectos.Editar"}
                              Value={
                                state.Permisos?.Permisos?.Modulos
                                  ?.EstructuraEquipo?.Proyectos?.Editar
                              }
                              Modulo={"Colaboradores"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Editar
                            </span>
                            <BpCheckbox
                              NombreCampo={
                                "EstructuraEquipo.Proyectos.Eliminar"
                              }
                              Value={
                                state.Permisos?.Permisos?.Modulos
                                  ?.EstructuraEquipo?.Proyectos?.Eliminar
                              }
                              Modulo={"Colaboradores"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Eliminar
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>

                  {/* Finaliza acordion estructura de equipo */}
                  {/* Inicia Colaboradores General */}
                  <Accordion
                    className={
                      tablaDos === true
                        ? `${styles.acordionBase} `
                        : `${styles.acordionBase}`
                    }
                  >
                    <div className={styles.contenedorTitulosAccordion}>
                      <div>
                        <AccordionSummary
                          onClick={() => setTablaDos(!tablaDos)}
                        >
                          <div className={`${styles.contenedorIconoExpande}`}>
                            {tablaDos === true ? (
                              <img
                                className={`${styles.iconoExpande}`}
                                src={`/assets/svg/icono-expande-arriba.svg`}
                                alt="imagen"
                              />
                            ) : (
                              <img
                                className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                src={`/assets/svg/icono-expande.svg`}
                                alt="imagen"
                              />
                            )}
                          </div>
                        </AccordionSummary>
                      </div>
                      <div className={styles.titulosAccordion}>
                        <span className={styles.tituloAccordion}>
                          Colaboradores
                        </span>
                      </div>
                      <div className={styles.contenedorSwitch}>
                        <Switch
                          NombreCampo={"EstructuraEquipo.Ver"}
                          Value={
                            state.Permisos?.Permisos?.Modulos?.EstructuraEquipo
                              ?.Ver
                          }
                          Modulo={"EstructuraEquipo"}
                        />
                      </div>
                    </div>
                    {/* Inicia acordeon Nuevo ingreso */}
                    <Accordion
                      className={
                        tablaTres === true
                          ? `${styles.acordionBase} $ ${styles.BackgrounNivelDos} `
                          : `${styles.acordionBase} $ ${styles.BackgrounNivelDos}`
                      }
                    >
                      <div
                        className={`${styles.contenedorTitulosAccordion} ${styles.nivelDosMenu}`}
                      >
                        <div>
                          <AccordionSummary
                            onClick={() => setTablaTres(!tablaTres)}
                          >
                            <div className={`${styles.contenedorIconoExpande}`}>
                              {tablaTres === true ? (
                                <img
                                  className={`${styles.iconoExpande}`}
                                  src={`/assets/svg/icono-expande-arriba.svg`}
                                  alt="imagen"
                                />
                              ) : (
                                <img
                                  className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                  src={`/assets/svg/icono-expande.svg`}
                                  alt="imagen"
                                />
                              )}
                            </div>
                          </AccordionSummary>
                        </div>
                        <div className={styles.titulosAccordion}>
                          <span className={styles.tituloAccordion}>
                            Nuevo ingreso
                          </span>
                        </div>
                        <div className={styles.contenedorSwitch}>
                          <Switch
                            NombreCampo={"Colaboradores.NuevoIngreso.Acceso"}
                            Value={
                              state.Permisos?.Permisos?.Modulos?.Colaboradores
                                ?.NuevoIngreso?.Acceso
                            }
                            Modulo={"EstructuraEquipo"}
                          />
                        </div>
                      </div>

                      <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                        <div
                          className={`${styles.filaChecks} ${styles.nivelDos}`}
                        >
                          <div
                            className={`${styles.contenedorChecks}  ${styles.nivelTresChecks}`}
                          >
                            <div className={styles.contenedorPrueba}>
                              <span className={styles.subTituloAccordion}>
                                Acciones
                              </span>
                            </div>
                            <div className={styles.contenedorPrueba}>
                              <BpCheckbox
                                NombreCampo={
                                  "Colaboradores.NuevoIngreso.Agregar"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.NuevoIngreso?.Agregar
                                }
                                Modulo={"Colaboradores"}
                              />
                              <span className={styles.subTituloAccordion}>
                                Agregar
                              </span>
                              <BpCheckbox
                                NombreCampo={
                                  "Colaboradores.NuevoIngreso.Convertir"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.NuevoIngreso?.Convertir
                                }
                                Modulo={"Colaboradores"}
                              />
                              <span className={styles.subTituloAccordion}>
                                Convertir
                              </span>
                              <BpCheckbox
                                NombreCampo={
                                  "Colaboradores.NuevoIngreso.Declinar"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.NuevoIngreso?.Declinar
                                }
                                Modulo={"Colaboradores"}
                              />
                              <span className={styles.subTituloAccordion}>
                                Declinar
                              </span>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                      {/* Inicia acordion Men??s NuevoIngreso */}
                      <Accordion
                        className={
                          tablaCuatro === true
                            ? `${styles.acordionBase} ${styles.BackgrounNivelTres}`
                            : `${styles.acordionBase} ${styles.BackgrounNivelTres}`
                        }
                      >
                        <div
                          className={`${styles.contenedorTitulosAccordion} ${styles.nivelTresMenu}`}
                        >
                          <div>
                            <AccordionSummary
                              onClick={() => setTablaCuatro(!tablaCuatro)}
                            >
                              <div
                                className={`${styles.contenedorIconoExpande}`}
                              >
                                {tablaCuatro === true ? (
                                  <img
                                    className={`${styles.iconoExpande}`}
                                    src={`/assets/svg/icono-expande-arriba.svg`}
                                    alt="imagen"
                                  />
                                ) : (
                                  <img
                                    className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                    src={`/assets/svg/icono-expande.svg`}
                                    alt="imagen"
                                  />
                                )}
                              </div>
                            </AccordionSummary>
                          </div>
                          <div className={styles.titulosAccordion}>
                            <span className={styles.tituloAccordion}>
                              Men??s
                            </span>
                          </div>
                          <div className={styles.contenedorSwitch}>
                            <Switch
                              NombreCampo={"EstructuraEquipo.Ver"}
                              Value={
                                state.Permisos?.Permisos?.Modulos
                                  ?.EstructuraEquipo?.Ver
                              }
                              Modulo={"EstructuraEquipo"}
                            />
                          </div>
                        </div>
                        {/* Inicia  acordion informacion Alta/ menus*/}
                        <Accordion
                          className={
                            tablaCinco === true
                              ? `${styles.acordionBase} `
                              : `${styles.acordionBase}`
                          }
                        >
                          <div
                            className={`${styles.contenedorTitulosAccordion} ${styles.NivelCuatroMenu}`}
                          >
                            <div>
                              <AccordionSummary
                                onClick={() => setTablaCinco(!tablaCinco)}
                              >
                                <div
                                  className={`${styles.contenedorIconoExpande}`}
                                >
                                  {tablaCinco === true ? (
                                    <img
                                      className={`${styles.iconoExpande}`}
                                      src={`/assets/svg/icono-expande-arriba.svg`}
                                      alt="imagen"
                                    />
                                  ) : (
                                    <img
                                      className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                      src={`/assets/svg/icono-expande.svg`}
                                      alt="imagen"
                                    />
                                  )}
                                </div>
                              </AccordionSummary>
                            </div>
                            <div className={styles.titulosAccordion}>
                              <span className={styles.tituloAccordion}>
                                Informaci??n de alta
                              </span>
                            </div>
                            <div className={styles.contenedorSwitch}>
                              <Switch
                                NombreCampo={
                                  "Colaboradores.NuevoIngreso.Ver.InformacionAlta.Acceso"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.NuevoIngreso?.Ver
                                    ?.InformacionAlta?.Acceso
                                }
                                Modulo={"EstructuraEquipo"}
                              />
                            </div>
                          </div>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Informaci??n personal
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.InformacionAlta.InformacionPersonal.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.InformacionAlta?.InformacionPersonal
                                        ?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.InformacionAlta.InformacionPersonal.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.InformacionAlta?.InformacionPersonal
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos de ingreso
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.InformacionAlta.DatosIngreso.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.InformacionAlta?.DatosIngreso?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.InformacionAlta.DatosIngreso.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.InformacionAlta?.DatosIngreso?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos de contrataci??n
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.InformacionAlta.DatosContratacion.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.InformacionAlta?.DatosContratacion
                                        ?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.InformacionAlta.DatosContratacion.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.InformacionAlta?.DatosContratacion
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        {/* Finaliza  acordion informacion Alta/ menus*/}
                        {/* Inicia Acordion  Datos Personales / menus*/}
                        <Accordion
                          className={
                            tablaSeis === true
                              ? `${styles.acordionBase} `
                              : `${styles.acordionBase}`
                          }
                        >
                          <div
                            className={`${styles.contenedorTitulosAccordion} ${styles.NivelCuatroMenu}`}
                          >
                            <div>
                              <AccordionSummary
                                onClick={() => setTablaSeis(!tablaSeis)}
                              >
                                <div
                                  className={`${styles.contenedorIconoExpande}`}
                                >
                                  {tablaSeis === true ? (
                                    <img
                                      className={`${styles.iconoExpande}`}
                                      src={`/assets/svg/icono-expande-arriba.svg`}
                                      alt="imagen"
                                    />
                                  ) : (
                                    <img
                                      className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                      src={`/assets/svg/icono-expande.svg`}
                                      alt="imagen"
                                    />
                                  )}
                                </div>
                              </AccordionSummary>
                            </div>
                            <div className={styles.titulosAccordion}>
                              <span className={styles.tituloAccordion}>
                                Datos personales
                              </span>
                            </div>
                            <div className={styles.contenedorSwitch}>
                              <Switch
                                NombreCampo={
                                  "Colaboradores.NuevoIngreso.Ver.DatosPersonales.Acceso"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.NuevoIngreso?.Ver
                                    ?.DatosPersonales?.Acceso
                                }
                                Modulo={"EstructuraEquipo"}
                              />
                            </div>
                          </div>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos del domicilio
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.DatosPersonales.DatosDomicilio.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.DatosPersonales?.DatosDomicilio?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.DatosPersonales.DatosDomicilio.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.DatosPersonales?.DatosDomicilio
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos personales
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.DatosPersonales.DatosPersonales.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.DatosPersonales?.DatosPersonales?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.DatosPersonales.DatosPersonales.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.DatosPersonales?.DatosPersonales
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos de identidad
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.DatosPersonales.DatosIdentidad.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.DatosPersonales?.DatosIdentidad?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.DatosPersonales.DatosIdentidad.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.DatosPersonales?.DatosIdentidad
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        {/* Finaliza Acordion  Datos Personales / menus*/}
                        {/* Inicia acordion Salud Emergencias / Men?? */}
                        <Accordion
                          className={
                            tablaSiete === true
                              ? `${styles.acordionBase} `
                              : `${styles.acordionBase}`
                          }
                        >
                          <div
                            className={`${styles.contenedorTitulosAccordion} ${styles.NivelCuatroMenu}`}
                          >
                            <div>
                              <AccordionSummary
                                onClick={() => setTablaSiete(!tablaSiete)}
                              >
                                <div
                                  className={`${styles.contenedorIconoExpande}`}
                                >
                                  {tablaSiete === true ? (
                                    <img
                                      className={`${styles.iconoExpande}`}
                                      src={`/assets/svg/icono-expande-arriba.svg`}
                                      alt="imagen"
                                    />
                                  ) : (
                                    <img
                                      className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                      src={`/assets/svg/icono-expande.svg`}
                                      alt="imagen"
                                    />
                                  )}
                                </div>
                              </AccordionSummary>
                            </div>
                            <div className={styles.titulosAccordion}>
                              <span className={styles.tituloAccordion}>
                                Salud y emergencias
                              </span>
                            </div>
                            <div className={styles.contenedorSwitch}>
                              <Switch
                                NombreCampo={
                                  "Colaboradores.NuevoIngreso.Ver.SaludEmergencias.Acceso"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.NuevoIngreso?.Ver
                                    ?.SaludEmergencias?.Acceso
                                }
                                Modulo={"EstructuraEquipo"}
                              />
                            </div>
                          </div>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Beneficiario
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.SaludEmergencias.Beneficiario.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.SaludEmergencias?.Beneficiario?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.SaludEmergencias.Beneficiario.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.SaludEmergencias?.Beneficiario?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Contacto de emergencia
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.SaludEmergencias.ContactoEmergencia.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.SaludEmergencias?.ContactoEmergencia
                                        ?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.SaludEmergencias.ContactoEmergencia.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.SaludEmergencias?.ContactoEmergencia
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Informaci??n m??dica
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.SaludEmergencias.InformacionMedica.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.SaludEmergencias?.InformacionMedica
                                        ?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.SaludEmergencias.InformacionMedica.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.SaludEmergencias?.InformacionMedica
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        {/* Finaliza acordion Salud Emergencias / Men?? */}
                        {/* Inica acordion Datos para pago / Menu */}
                        <Accordion
                          className={
                            tablaOcho === true
                              ? `${styles.acordionBase} `
                              : `${styles.acordionBase}`
                          }
                        >
                          <div
                            className={`${styles.contenedorTitulosAccordion} ${styles.NivelCuatroMenu}`}
                          >
                            <div>
                              <AccordionSummary
                                onClick={() => setTablaOcho(!tablaOcho)}
                              >
                                <div
                                  className={`${styles.contenedorIconoExpande}`}
                                >
                                  {tablaOcho === true ? (
                                    <img
                                      className={`${styles.iconoExpande}`}
                                      src={`/assets/svg/icono-expande-arriba.svg`}
                                      alt="imagen"
                                    />
                                  ) : (
                                    <img
                                      className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                      src={`/assets/svg/icono-expande.svg`}
                                      alt="imagen"
                                    />
                                  )}
                                </div>
                              </AccordionSummary>
                            </div>
                            <div className={styles.titulosAccordion}>
                              <span className={styles.tituloAccordion}>
                                Datos para pago
                              </span>
                            </div>
                            <div className={styles.contenedorSwitch}>
                              <Switch
                                NombreCampo={
                                  "Colaboradores.NuevoIngreso.Ver.DatosParaPago.Acceso"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.NuevoIngreso?.Ver
                                    ?.DatosParaPago?.Acceso
                                }
                                Modulo={"EstructuraEquipo"}
                              />
                            </div>
                          </div>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos bancarios
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.DatosParaPago.DatosBancarios.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.DatosParaPago?.DatosBancarios?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.DatosParaPago.DatosBancarios.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.DatosParaPago?.DatosBancarios?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        {/* Finaliza acordion Datos para pago / Menu */}
                        {/* Inicia el acordion expediente / menu */}
                        <Accordion
                          className={
                            tablaVeintinueve === true
                              ? `${styles.acordionBase} `
                              : `${styles.acordionBase}`
                          }
                        >
                          <div
                            className={`${styles.contenedorTitulosAccordion} ${styles.NivelCuatroMenu}`}
                          >
                            <div>
                              <AccordionSummary
                                onClick={() => setTablaNueve(!tablaNueve)}
                              >
                                <div
                                  className={`${styles.contenedorIconoExpande}`}
                                >
                                  {tablaNueve === true ? (
                                    <img
                                      className={`${styles.iconoExpande}`}
                                      src={`/assets/svg/icono-expande-arriba.svg`}
                                      alt="imagen"
                                    />
                                  ) : (
                                    <img
                                      className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                      src={`/assets/svg/icono-expande.svg`}
                                      alt="imagen"
                                    />
                                  )}
                                </div>
                              </AccordionSummary>
                            </div>
                            <div className={styles.titulosAccordion}>
                              <span className={styles.tituloAccordion}>
                                Expediente
                              </span>
                            </div>
                            <div className={styles.contenedorSwitch}>
                              <Switch
                                NombreCampo={
                                  "Colaboradores.NuevoIngreso.Ver.Expediente.Acceso"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.NuevoIngreso?.Ver
                                    ?.Expediente?.Acceso
                                }
                                Modulo={"EstructuraEquipo"}
                              />
                            </div>
                          </div>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Documentos personales
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.Expediente.DocumentosPersonales.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.Expediente?.DocumentosPersonales?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.Expediente.DocumentosPersonales.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.Expediente?.DocumentosPersonales
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Documentos opcionales
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.InformacionAlta.DatosIngreso.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.Expediente?.DocumentosOpcionales?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.Expediente.DocumentosOpcionales.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.Expediente?.DocumentosOpcionales
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Oferta laboral
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.Expediente.OfertaLaboral.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.Expediente?.OfertaLaboral?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.NuevoIngreso.Ver.Expediente.OfertaLaboral.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.Expediente?.OfertaLaboral?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        {/* Inicia el acordion expediente / menu */}
                      </Accordion>
                      {/* Inicia acordion Men??s NuevoIngreso */}
                    </Accordion>
                    {/* Finaliza acordeon Nuevo ingreso */}
                    {/* Inicia acordeon Colaboradores */}
                    <Accordion
                      className={
                        tablaDiez === true
                          ? `${styles.acordionBase} $ ${styles.BackgrounNivelDos} `
                          : `${styles.acordionBase} $ ${styles.BackgrounNivelDos}`
                      }
                    >
                      <div
                        className={`${styles.contenedorTitulosAccordion} ${styles.nivelDosMenu}`}
                      >
                        <div>
                          <AccordionSummary
                            onClick={() => setTablaDiez(!tablaDiez)}
                          >
                            <div className={`${styles.contenedorIconoExpande}`}>
                              {tablaDiez === true ? (
                                <img
                                  className={`${styles.iconoExpande}`}
                                  src={`/assets/svg/icono-expande-arriba.svg`}
                                  alt="imagen"
                                />
                              ) : (
                                <img
                                  className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                  src={`/assets/svg/icono-expande.svg`}
                                  alt="imagen"
                                />
                              )}
                            </div>
                          </AccordionSummary>
                        </div>
                        <div className={styles.titulosAccordion}>
                          <span className={styles.tituloAccordion}>
                            Colaboradores
                          </span>
                        </div>
                        <div className={styles.contenedorSwitch}>
                          <Switch
                            NombreCampo={"Colaboradores.Colaboradores.Acceso"}
                            Value={
                              state.Permisos?.Permisos?.Modulos?.Colaboradores
                                ?.Colaboradores?.Acceso
                            }
                            Modulo={"EstructuraEquipo"}
                          />
                        </div>
                      </div>
                      <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                        <div
                          className={`${styles.filaChecks} ${styles.nivelDos}`}
                        >
                          <div
                            className={`${styles.contenedorChecks}  ${styles.nivelTresChecks}`}
                          >
                            <div className={styles.contenedorPrueba}>
                              <span className={styles.subTituloAccordion}>
                                Acciones
                              </span>
                            </div>
                            <div className={styles.contenedorPrueba}>
                              <BpCheckbox
                                NombreCampo={
                                  "Colaboradores.Colaboradores.Agregar"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Colaboradores?.Agregar
                                }
                                Modulo={"Colaboradores"}
                              />
                              <span className={styles.subTituloAccordion}>
                                Agregar
                              </span>
                              <BpCheckbox
                                NombreCampo={
                                  "Colaboradores.Colaboradores.Inactivar"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Colaboradores?.Inactivar
                                }
                                Modulo={"Colaboradores"}
                              />
                              <span className={styles.subTituloAccordion}>
                                Inactivar
                              </span>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                      {/* Inicia acordion Men??s  */}
                      <Accordion
                        className={
                          tablaOnce === true
                            ? `${styles.acordionBase} ${styles.BackgrounNivelTres}`
                            : `${styles.acordionBase} ${styles.BackgrounNivelTres}`
                        }
                      >
                        <div
                          className={`${styles.contenedorTitulosAccordion} ${styles.nivelTresMenu}`}
                        >
                          <div>
                            <AccordionSummary
                              onClick={() => setTablaOnce(!tablaOnce)}
                            >
                              <div
                                className={`${styles.contenedorIconoExpande}`}
                              >
                                {tablaOnce === true ? (
                                  <img
                                    className={`${styles.iconoExpande}`}
                                    src={`/assets/svg/icono-expande-arriba.svg`}
                                    alt="imagen"
                                  />
                                ) : (
                                  <img
                                    className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                    src={`/assets/svg/icono-expande.svg`}
                                    alt="imagen"
                                  />
                                )}
                              </div>
                            </AccordionSummary>
                          </div>
                          <div className={styles.titulosAccordion}>
                            <span className={styles.tituloAccordion}>
                              Men??s
                            </span>
                          </div>
                          <div className={styles.contenedorSwitch}>
                            <Switch
                              NombreCampo={
                                "Colaboradores.Colaboradores.Ver.Acceso"
                              }
                              Value={
                                state.Permisos?.Permisos?.Modulos?.Colaboradores
                                  ?.Colaboradores?.Ver?.Acceso
                              }
                              Modulo={"EstructuraEquipo"}
                            />
                          </div>
                        </div>
                        {/* Inicia acordion informacion Alta / menu / colaboradores */}
                        <Accordion
                          className={
                            tablaDoce === true
                              ? `${styles.acordionBase} `
                              : `${styles.acordionBase}`
                          }
                        >
                          <div
                            className={`${styles.contenedorTitulosAccordion} ${styles.NivelCuatroMenu}`}
                          >
                            <div>
                              <AccordionSummary
                                onClick={() => setTablaDoce(!tablaDoce)}
                              >
                                <div
                                  className={`${styles.contenedorIconoExpande}`}
                                >
                                  {tablaDoce === true ? (
                                    <img
                                      className={`${styles.iconoExpande}`}
                                      src={`/assets/svg/icono-expande-arriba.svg`}
                                      alt="imagen"
                                    />
                                  ) : (
                                    <img
                                      className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                      src={`/assets/svg/icono-expande.svg`}
                                      alt="imagen"
                                    />
                                  )}
                                </div>
                              </AccordionSummary>
                            </div>
                            <div className={styles.titulosAccordion}>
                              <span className={styles.tituloAccordion}>
                                Informaci??n de alta
                              </span>
                            </div>
                            <div className={styles.contenedorSwitch}>
                              <Switch
                                NombreCampo={
                                  "Colaboradores.Colaboradores.Ver.InformacionAlta.Acceso"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Colaboradores?.Ver
                                    ?.InformacionAlta?.Acceso
                                }
                                Modulo={"EstructuraEquipo"}
                              />
                            </div>
                          </div>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Informaci??n personal
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.InformacionAlta.InformacionPersonal.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.InformacionAlta?.InformacionPersonal
                                        ?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.InformacionAlta.InformacionPersonal.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.InformacionAlta?.InformacionPersonal
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos de ingreso
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.InformacionAlta.DatosIngreso.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.InformacionAlta?.DatosIngreso?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.InformacionAlta.DatosIngreso.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.InformacionAlta?.DatosIngreso?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos de contrataci??n
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.InformacionAlta.DatosContratacion.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.InformacionAlta?.DatosContratacion
                                        ?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.InformacionAlta.DatosContratacion.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.NuevoIngreso?.Ver
                                        ?.InformacionAlta?.DatosContratacion
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        {/* Finaliza acordion informacion Alta / menu / colaboradores */}
                        {/* Inicia acordion Datos personales / menu / colaboradores */}
                        <Accordion
                          className={
                            tablaTrece === true
                              ? `${styles.acordionBase} `
                              : `${styles.acordionBase}`
                          }
                        >
                          <div
                            className={`${styles.contenedorTitulosAccordion} ${styles.NivelCuatroMenu}`}
                          >
                            <div>
                              <AccordionSummary
                                onClick={() => setTablaTrece(!tablaTrece)}
                              >
                                <div
                                  className={`${styles.contenedorIconoExpande}`}
                                >
                                  {tablaTrece === true ? (
                                    <img
                                      className={`${styles.iconoExpande}`}
                                      src={`/assets/svg/icono-expande-arriba.svg`}
                                      alt="imagen"
                                    />
                                  ) : (
                                    <img
                                      className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                      src={`/assets/svg/icono-expande.svg`}
                                      alt="imagen"
                                    />
                                  )}
                                </div>
                              </AccordionSummary>
                            </div>
                            <div className={styles.titulosAccordion}>
                              <span className={styles.tituloAccordion}>
                                Datos personales
                              </span>
                            </div>
                            <div className={styles.contenedorSwitch}>
                              <Switch
                                NombreCampo={
                                  "Colaboradores.Colaboradores.Ver.DatosPersonales.Acceso"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Colaboradores?.Ver
                                    ?.DatosPersonales?.Acceso
                                }
                                Modulo={"EstructuraEquipo"}
                              />
                            </div>
                          </div>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos del domicilio
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.DatosPersonales.DatosDomicilio.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.DatosPersonales?.DatosDomicilio?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.DatosPersonales.DatosDomicilio.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.DatosPersonales?.DatosDomicilio
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos personales
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.DatosPersonales.DatosPersonales.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.DatosPersonales?.DatosPersonales?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.DatosPersonales.DatosPersonales.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.DatosPersonales?.DatosPersonales
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos de identidad
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.DatosPersonales.DatosIdentidad.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.DatosPersonales?.DatosIdentidad?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.DatosPersonales.DatosIdentidad.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.DatosPersonales?.DatosIdentidad
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        {/* Finaliza acordion Datos personales / menu / colaboradores */}
                        {/* Inicia acordeon Salud Emergencias */}
                        <Accordion
                          className={
                            tablaCatorce === true
                              ? `${styles.acordionBase} `
                              : `${styles.acordionBase}`
                          }
                        >
                          <div
                            className={`${styles.contenedorTitulosAccordion} ${styles.NivelCuatroMenu}`}
                          >
                            <div>
                              <AccordionSummary
                                onClick={() => setTablaCatorce(!tablaCatorce)}
                              >
                                <div
                                  className={`${styles.contenedorIconoExpande}`}
                                >
                                  {tablaCatorce === true ? (
                                    <img
                                      className={`${styles.iconoExpande}`}
                                      src={`/assets/svg/icono-expande-arriba.svg`}
                                      alt="imagen"
                                    />
                                  ) : (
                                    <img
                                      className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                      src={`/assets/svg/icono-expande.svg`}
                                      alt="imagen"
                                    />
                                  )}
                                </div>
                              </AccordionSummary>
                            </div>
                            <div className={styles.titulosAccordion}>
                              <span className={styles.tituloAccordion}>
                                Salud y emergencias
                              </span>
                            </div>
                            <div className={styles.contenedorSwitch}>
                              <Switch
                                NombreCampo={
                                  "Colaboradores.Colaboradores.Ver.SaludEmergencias.Acceso"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Colaboradores?.Ver
                                    ?.SaludEmergencias?.Acceso
                                }
                                Modulo={"EstructuraEquipo"}
                              />
                            </div>
                          </div>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Beneficiarios
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.SaludEmergencias.Beneficiario.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.SaludEmergencias?.Beneficiario?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.SaludEmergencias.Beneficiario.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.SaludEmergencias?.Beneficiario?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Contacto de emergencia
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.SaludEmergencias.ContactoEmergencia.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.SaludEmergencias?.ContactoEmergencia
                                        ?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.SaludEmergencias.ContactoEmergencia.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.SaludEmergencias?.ContactoEmergencia
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Informaci??n medica
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.SaludEmergencias.InformacionMedica.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.SaludEmergencias?.InformacionMedica
                                        ?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.SaludEmergencias.InformacionMedica.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.SaludEmergencias?.InformacionMedica
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        {/* Finaliza acordeon Salud emergencias */}
                        {/* Inicia acordeon datos para pago */}
                        <Accordion
                          className={
                            tablaQuince === true
                              ? `${styles.acordionBase} `
                              : `${styles.acordionBase}`
                          }
                        >
                          <div
                            className={`${styles.contenedorTitulosAccordion} ${styles.NivelCuatroMenu}`}
                          >
                            <div>
                              <AccordionSummary
                                onClick={() => setTablaQuince(!tablaQuince)}
                              >
                                <div
                                  className={`${styles.contenedorIconoExpande}`}
                                >
                                  {tablaQuince === true ? (
                                    <img
                                      className={`${styles.iconoExpande}`}
                                      src={`/assets/svg/icono-expande-arriba.svg`}
                                      alt="imagen"
                                    />
                                  ) : (
                                    <img
                                      className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                      src={`/assets/svg/icono-expande.svg`}
                                      alt="imagen"
                                    />
                                  )}
                                </div>
                              </AccordionSummary>
                            </div>
                            <div className={styles.titulosAccordion}>
                              <span className={styles.tituloAccordion}>
                                Datos para pago
                              </span>
                            </div>
                            <div className={styles.contenedorSwitch}>
                              <Switch
                                NombreCampo={
                                  "Colaboradores.Colaboradores.Ver.DatosParaPago.Acceso"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Colaboradores?.Ver
                                    ?.DatosParaPago?.Acceso
                                }
                                Modulo={"EstructuraEquipo"}
                              />
                            </div>
                          </div>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos bancarios
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.DatosParaPago.DatosBancarios.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.DatosParaPago?.DatosBancarios?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.DatosParaPago.DatosBancarios.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.DatosParaPago?.DatosBancarios?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        {/* Finaliza acordeon datos para pago */}
                        {/* Inicia acordion expediente / menu/ colaboradores */}
                        <Accordion
                          className={
                            tablaDieciseis === true
                              ? `${styles.acordionBase} `
                              : `${styles.acordionBase}`
                          }
                        >
                          <div
                            className={`${styles.contenedorTitulosAccordion} ${styles.NivelCuatroMenu}`}
                          >
                            <div>
                              <AccordionSummary
                                onClick={() =>
                                  setTablaDieciseis(!tablaDieciseis)
                                }
                              >
                                <div
                                  className={`${styles.contenedorIconoExpande}`}
                                >
                                  {tablaDieciseis === true ? (
                                    <img
                                      className={`${styles.iconoExpande}`}
                                      src={`/assets/svg/icono-expande-arriba.svg`}
                                      alt="imagen"
                                    />
                                  ) : (
                                    <img
                                      className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                      src={`/assets/svg/icono-expande.svg`}
                                      alt="imagen"
                                    />
                                  )}
                                </div>
                              </AccordionSummary>
                            </div>
                            <div className={styles.titulosAccordion}>
                              <span className={styles.tituloAccordion}>
                                Expediente
                              </span>
                            </div>
                            <div className={styles.contenedorSwitch}>
                              <Switch
                                NombreCampo={
                                  "Colaboradores.Colaboradores.Ver.Expediente.Acceso"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Colaboradores?.Ver
                                    ?.Expediente?.Acceso
                                }
                                Modulo={"EstructuraEquipo"}
                              />
                            </div>
                          </div>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Documentos personales
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.Expediente.DocumentosPersonales.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.Expediente?.DocumentosPersonales?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.Expediente.DocumentosPersonales.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.Expediente?.DocumentosPersonales
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Documentos opcionales
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.Expediente.DocumentosOpcionales.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.Expediente?.DocumentosOpcionales?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.Expediente.DocumentosOpcionales.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.Expediente?.DocumentosOpcionales
                                        ?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Oferta laboral
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.Expediente.OfertaLaboral.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.Expediente?.OfertaLaboral?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Colaboradores.Ver.Expediente.OfertaLaboral.Editar"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Colaboradores?.Ver
                                        ?.Expediente?.OfertaLaboral?.Editar
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Editar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        {/* Finaliza acordion expediente / menu/ colaboradores */}
                      </Accordion>
                      {/* Finaliza acordion Men??s  */}
                    </Accordion>
                    {/* Finaliza acordeon Colaboradores */}
                    {/* Inicia acordeon Declinados */}
                    <Accordion
                      className={
                        tablaDiecisiete === true
                          ? `${styles.acordionBase} $ ${styles.BackgrounNivelDos} `
                          : `${styles.acordionBase} $ ${styles.BackgrounNivelDos}`
                      }
                    >
                      <div
                        className={`${styles.contenedorTitulosAccordion} ${styles.nivelDosMenu}`}
                      >
                        <div>
                          <AccordionSummary
                            onClick={() => setTablaDiecisiete(!tablaDiecisiete)}
                          >
                            <div className={`${styles.contenedorIconoExpande}`}>
                              {tablaDiecisiete === true ? (
                                <img
                                  className={`${styles.iconoExpande}`}
                                  src={`/assets/svg/icono-expande-arriba.svg`}
                                  alt="imagen"
                                />
                              ) : (
                                <img
                                  className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                  src={`/assets/svg/icono-expande.svg`}
                                  alt="imagen"
                                />
                              )}
                            </div>
                          </AccordionSummary>
                        </div>
                        <div className={styles.titulosAccordion}>
                          <span className={styles.tituloAccordion}>
                            Declinados
                          </span>
                        </div>
                        <div className={styles.contenedorSwitch}>
                          <Switch
                            NombreCampo={"EstructuraEquipo.Ver"}
                            Value={
                              state.Permisos?.Permisos?.Modulos
                                ?.EstructuraEquipo?.Ver
                            }
                            Modulo={"EstructuraEquipo"}
                          />
                        </div>
                      </div>
                    </Accordion>
                    {/* Finaliza acordeon Declinados */}
                    {/* Inica acordeon Inactivos */}
                    <Accordion
                      className={
                        tablaDieciocho === true
                          ? `${styles.acordionBase} $ ${styles.BackgrounNivelDos} `
                          : `${styles.acordionBase} $ ${styles.BackgrounNivelDos}`
                      }
                    >
                      <div
                        className={`${styles.contenedorTitulosAccordion} ${styles.nivelDosMenu}`}
                      >
                        <div>
                          <AccordionSummary
                            onClick={() => setTablaDieciocho(!tablaDieciocho)}
                          >
                            <div className={`${styles.contenedorIconoExpande}`}>
                              {tablaDieciocho === true ? (
                                <img
                                  className={`${styles.iconoExpande}`}
                                  src={`/assets/svg/icono-expande-arriba.svg`}
                                  alt="imagen"
                                />
                              ) : (
                                <img
                                  className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                  src={`/assets/svg/icono-expande.svg`}
                                  alt="imagen"
                                />
                              )}
                            </div>
                          </AccordionSummary>
                        </div>
                        <div className={styles.titulosAccordion}>
                          <span className={styles.tituloAccordion}>
                            Inactivos
                          </span>
                        </div>
                        <div className={styles.contenedorSwitch}>
                          <Switch
                            NombreCampo={"Colaboradores.Inactivos.Acceso"}
                            Value={
                              state.Permisos?.Permisos?.Modulos?.Colaboradores
                                ?.Inactivos?.Acceso
                            }
                            Modulo={"EstructuraEquipo"}
                          />
                        </div>
                      </div>

                      <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                        <div
                          className={`${styles.filaChecks} ${styles.nivelDos}`}
                        >
                          <div
                            className={`${styles.contenedorChecks}  ${styles.nivelTresChecks}`}
                          >
                            <div className={styles.contenedorPrueba}>
                              <span className={styles.subTituloAccordion}>
                                Acciones
                              </span>
                            </div>
                            <div className={styles.contenedorPrueba}>
                              <BpCheckbox
                                NombreCampo={"Colaboradores.Inactivos.Activar"}
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Inactivos?.Activar
                                }
                                Modulo={"Colaboradores"}
                              />
                              <span className={styles.subTituloAccordion}>
                                Activar
                              </span>
                              <BpCheckbox
                                NombreCampo={
                                  "Colaboradores.NuevoIngreso.Ver.InformacionAlta.DatosContratacion.Editar"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.NuevoIngreso?.Ver
                                    ?.InformacionAlta?.DatosContratacion?.Editar
                                }
                                Modulo={"Colaboradores"}
                              />
                              <span className={styles.subTituloAccordion}>
                                Editar
                              </span>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                      {/* Inicia acordeon menu / inactivos */}
                      <Accordion
                        className={
                          tablaDiecinueve === true
                            ? `${styles.acordionBase} ${styles.BackgrounNivelTres}`
                            : `${styles.acordionBase} ${styles.BackgrounNivelTres}`
                        }
                      >
                        <div
                          className={`${styles.contenedorTitulosAccordion} ${styles.nivelTresMenu}`}
                        >
                          <div>
                            <AccordionSummary
                              onClick={() =>
                                setTablaDiecinueve(!tablaDiecinueve)
                              }
                            >
                              <div
                                className={`${styles.contenedorIconoExpande}`}
                              >
                                {tablaDiecinueve === true ? (
                                  <img
                                    className={`${styles.iconoExpande}`}
                                    src={`/assets/svg/icono-expande-arriba.svg`}
                                    alt="imagen"
                                  />
                                ) : (
                                  <img
                                    className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                    src={`/assets/svg/icono-expande.svg`}
                                    alt="imagen"
                                  />
                                )}
                              </div>
                            </AccordionSummary>
                          </div>
                          <div className={styles.titulosAccordion}>
                            <span className={styles.tituloAccordion}>
                              Men??s
                            </span>
                          </div>
                          <div className={styles.contenedorSwitch}>
                            <Switch
                              NombreCampo={"Colaboradores.Inactivos.Ver.Acceso"}
                              Value={
                                state.Permisos?.Permisos?.Modulos?.Colaboradores
                                  ?.Inactivos?.Ver?.Acceso
                              }
                              Modulo={"EstructuraEquipo"}
                            />
                          </div>
                        </div>
                        {/* Inicia acordion Informaci??n Alta / menu/ inactivos */}
                        <Accordion
                          className={
                            tablaVeinte === true
                              ? `${styles.acordionBase} `
                              : `${styles.acordionBase}`
                          }
                        >
                          <div
                            className={`${styles.contenedorTitulosAccordion} ${styles.NivelCuatroMenu}`}
                          >
                            <div>
                              <AccordionSummary
                                onClick={() => setTablaVeinte(!tablaVeinte)}
                              >
                                <div
                                  className={`${styles.contenedorIconoExpande}`}
                                >
                                  {tablaVeinte === true ? (
                                    <img
                                      className={`${styles.iconoExpande}`}
                                      src={`/assets/svg/icono-expande-arriba.svg`}
                                      alt="imagen"
                                    />
                                  ) : (
                                    <img
                                      className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                      src={`/assets/svg/icono-expande.svg`}
                                      alt="imagen"
                                    />
                                  )}
                                </div>
                              </AccordionSummary>
                            </div>
                            <div className={styles.titulosAccordion}>
                              <span className={styles.tituloAccordion}>
                                Informaci??n de alta
                              </span>
                            </div>
                            <div className={styles.contenedorSwitch}>
                              <Switch
                                NombreCampo={
                                  "Colaboradores.Inactivos.Ver.InformacionAlta.Acceso"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Inactivos?.Ver
                                    ?.InformacionAlta?.Acceso
                                }
                                Modulo={"EstructuraEquipo"}
                              />
                            </div>
                          </div>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Informaci??n personal
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Inactivos.Ver.InformacionAlta.InformacionPersonal.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Inactivos?.Ver
                                        ?.InformacionAlta?.InformacionPersonal
                                        ?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos de ingreso
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Inactivos.Ver.InformacionAlta.DatosIngreso.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Inactivos?.Ver
                                        ?.InformacionAlta?.DatosIngreso?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos de contrataci??n
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Inactivos.Ver.InformacionAlta.DatosContratacion.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Inactivos?.Ver
                                        ?.InformacionAlta?.DatosContratacion
                                        ?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        {/* Finaliza acordion Informaci??n Alta / menu/ inactivos */}
                        {/* Inicia acordion Datos Personales / menu / inactivos */}
                        <Accordion
                          className={
                            tablaVeintiuno === true
                              ? `${styles.acordionBase} `
                              : `${styles.acordionBase}`
                          }
                        >
                          <div
                            className={`${styles.contenedorTitulosAccordion} ${styles.NivelCuatroMenu}`}
                          >
                            <div>
                              <AccordionSummary
                                onClick={() =>
                                  setTablaVeintiuno(!tablaVeintiuno)
                                }
                              >
                                <div
                                  className={`${styles.contenedorIconoExpande}`}
                                >
                                  {tablaVeintiuno === true ? (
                                    <img
                                      className={`${styles.iconoExpande}`}
                                      src={`/assets/svg/icono-expande-arriba.svg`}
                                      alt="imagen"
                                    />
                                  ) : (
                                    <img
                                      className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                      src={`/assets/svg/icono-expande.svg`}
                                      alt="imagen"
                                    />
                                  )}
                                </div>
                              </AccordionSummary>
                            </div>
                            <div className={styles.titulosAccordion}>
                              <span className={styles.tituloAccordion}>
                                Datos personales
                              </span>
                            </div>
                            <div className={styles.contenedorSwitch}>
                              <Switch
                                NombreCampo={
                                  "Colaboradores.Inactivos.Ver.DatosPersonales.Acceso"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Inactivos?.Ver
                                    ?.DatosPersonales?.Acceso
                                }
                                Modulo={"EstructuraEquipo"}
                              />
                            </div>
                          </div>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos del domicilio
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Inactivos.Ver.DatosPersonales.DatosDomicilio.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Inactivos?.Ver
                                        ?.DatosPersonales?.DatosDomicilio?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos personales
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Inactivos.Ver.DatosPersonales.DatosPersonales.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Inactivos?.Ver
                                        ?.DatosPersonales?.DatosDomicilio?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos de identidad
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Inactivos.Ver.DatosPersonales.DatosIdentidad.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Inactivos?.Ver
                                        ?.DatosPersonales?.DatosIdentidad?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        {/* Finaliza acordion Datos Personales / menu / inactivos */}
                        {/* Inicia acordion Salud emergencias/ menus / inactivos */}
                        <Accordion
                          className={
                            tablaVeintidos === true
                              ? `${styles.acordionBase} `
                              : `${styles.acordionBase}`
                          }
                        >
                          <div
                            className={`${styles.contenedorTitulosAccordion} ${styles.NivelCuatroMenu}`}
                          >
                            <div>
                              <AccordionSummary
                                onClick={() =>
                                  setTablaVeintidos(!tablaVeintidos)
                                }
                              >
                                <div
                                  className={`${styles.contenedorIconoExpande}`}
                                >
                                  {tablaVeintidos === true ? (
                                    <img
                                      className={`${styles.iconoExpande}`}
                                      src={`/assets/svg/icono-expande-arriba.svg`}
                                      alt="imagen"
                                    />
                                  ) : (
                                    <img
                                      className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                      src={`/assets/svg/icono-expande.svg`}
                                      alt="imagen"
                                    />
                                  )}
                                </div>
                              </AccordionSummary>
                            </div>
                            <div className={styles.titulosAccordion}>
                              <span className={styles.tituloAccordion}>
                                Salud y emergencias
                              </span>
                            </div>
                            <div className={styles.contenedorSwitch}>
                              <Switch
                                NombreCampo={
                                  "Colaboradores.Inactivos.Ver.SaludEmergencias.Acceso"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Inactivos?.Ver
                                    ?.SaludEmergencias?.Acceso
                                }
                                Modulo={"EstructuraEquipo"}
                              />
                            </div>
                          </div>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Beneficiario
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Inactivos.Ver.SaludEmergencias.Beneficiario.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Inactivos?.Ver
                                        ?.SaludEmergencias?.Beneficiario?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Contacto de emergencia
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Inactivos.Ver.SaludEmergencias.ContactoEmergencia.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Inactivos?.Ver
                                        ?.SaludEmergencias?.ContactoEmergencia
                                        ?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Informaci??n m??dica
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Inactivos.Ver.SaludEmergencias.InformacionMedica.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Inactivos?.Ver
                                        ?.SaludEmergencias?.InformacionMedica
                                        ?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        {/* Finaliza acordion Salud emergencias/ menus / inactivos */}
                        {/* Inicia acordeon Datos para Pago / menu / inactivos */}
                        <Accordion
                          className={
                            tablaVeintitres === true
                              ? `${styles.acordionBase} `
                              : `${styles.acordionBase}`
                          }
                        >
                          <div
                            className={`${styles.contenedorTitulosAccordion} ${styles.NivelCuatroMenu}`}
                          >
                            <div>
                              <AccordionSummary
                                onClick={() =>
                                  setTablaVeintitres(!tablaVeintitres)
                                }
                              >
                                <div
                                  className={`${styles.contenedorIconoExpande}`}
                                >
                                  {tablaVeintitres === true ? (
                                    <img
                                      className={`${styles.iconoExpande}`}
                                      src={`/assets/svg/icono-expande-arriba.svg`}
                                      alt="imagen"
                                    />
                                  ) : (
                                    <img
                                      className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                      src={`/assets/svg/icono-expande.svg`}
                                      alt="imagen"
                                    />
                                  )}
                                </div>
                              </AccordionSummary>
                            </div>
                            <div className={styles.titulosAccordion}>
                              <span className={styles.tituloAccordion}>
                                Datos para pago
                              </span>
                            </div>
                            <div className={styles.contenedorSwitch}>
                              <Switch
                                NombreCampo={
                                  "Colaboradores.Inactivos.Ver.DatosParaPago.Acceso"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Inactivos?.Ver
                                    ?.DatosParaPago?.Acceso
                                }
                                Modulo={"EstructuraEquipo"}
                              />
                            </div>
                          </div>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Datos bancarios
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Inactivos.Ver.DatosParaPago.DatosBancarios.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Inactivos?.Ver
                                        ?.DatosParaPago?.DatosBancarios?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        {/* Finaliza acordeon Datos para Pago / menu / inactivos */}
                        {/* Inicia acordeon expediente / menu / inactivos */}
                        <Accordion
                          className={
                            tablaVeinticuatro === true
                              ? `${styles.acordionBase} `
                              : `${styles.acordionBase}`
                          }
                        >
                          <div
                            className={`${styles.contenedorTitulosAccordion} ${styles.NivelCuatroMenu}`}
                          >
                            <div>
                              <AccordionSummary
                                onClick={() =>
                                  setTablaVeinticuatro(!tablaVeinticuatro)
                                }
                              >
                                <div
                                  className={`${styles.contenedorIconoExpande}`}
                                >
                                  {tablaVeinticuatro === true ? (
                                    <img
                                      className={`${styles.iconoExpande}`}
                                      src={`/assets/svg/icono-expande-arriba.svg`}
                                      alt="imagen"
                                    />
                                  ) : (
                                    <img
                                      className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                      src={`/assets/svg/icono-expande.svg`}
                                      alt="imagen"
                                    />
                                  )}
                                </div>
                              </AccordionSummary>
                            </div>
                            <div className={styles.titulosAccordion}>
                              <span className={styles.tituloAccordion}>
                                Expediente
                              </span>
                            </div>
                            <div className={styles.contenedorSwitch}>
                              <Switch
                                NombreCampo={
                                  "Colaboradores.Inactivos.Ver.Expediente.Acceso"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Inactivos?.Ver?.Expediente
                                    ?.Acceso
                                }
                                Modulo={"EstructuraEquipo"}
                              />
                            </div>
                          </div>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Documentos personales
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Inactivos.Ver.Expediente.DocumentosPersonales.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Inactivos?.Ver
                                        ?.Expediente?.DocumentosPersonales?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Documentos opcionales
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Inactivos.Ver.Expediente.DocumentosOpcionales.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Inactivos?.Ver
                                        ?.Expediente?.DocumentosOpcionales?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                          <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                            <div
                              className={`${styles.filaChecks} ${styles.nivelDos}`}
                            >
                              <div
                                className={`${styles.contenedorChecks} ${styles.nivelCuatroChecks}`}
                              >
                                <div className={styles.contenedorPrueba}>
                                  <span className={styles.subTituloAccordion}>
                                    Oferta laboral
                                  </span>
                                </div>
                                <div className={styles.contenedorPrueba}>
                                  <BpCheckbox
                                    NombreCampo={
                                      "Colaboradores.Inactivos.Ver.Expediente.OfertaLaboral.Ver"
                                    }
                                    Value={
                                      state.Permisos?.Permisos?.Modulos
                                        ?.Colaboradores?.Inactivos?.Ver
                                        ?.Expediente?.OfertaLaboral?.Ver
                                    }
                                    Modulo={"Colaboradores"}
                                  />
                                  <span className={styles.subTituloAccordion}>
                                    Ver
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        {/* Finaliza acordeon expediente / menu / inactivos */}
                      </Accordion>
                      {/* Finaliza acordeon menu / inactivos */}
                    </Accordion>
                    {/* Finaliza acordeon Inactivos */}
                    {/* Inicia acordeon Administradores  */}
                    <Accordion
                      className={
                        tablaVeinticinco === true
                          ? `${styles.acordionBase} $ ${styles.BackgrounNivelDos} `
                          : `${styles.acordionBase} $ ${styles.BackgrounNivelDos}`
                      }
                    >
                      <div
                        className={`${styles.contenedorTitulosAccordion} ${styles.nivelDosMenu}`}
                      >
                        <div>
                          <AccordionSummary
                            onClick={() =>
                              setTablaVeinticinco(!tablaVeinticinco)
                            }
                          >
                            <div className={`${styles.contenedorIconoExpande}`}>
                              {tablaVeinticinco === true ? (
                                <img
                                  className={`${styles.iconoExpande}`}
                                  src={`/assets/svg/icono-expande-arriba.svg`}
                                  alt="imagen"
                                />
                              ) : (
                                <img
                                  className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                  src={`/assets/svg/icono-expande.svg`}
                                  alt="imagen"
                                />
                              )}
                            </div>
                          </AccordionSummary>
                        </div>
                        <div className={styles.titulosAccordion}>
                          <span className={styles.tituloAccordion}>
                            Administradores
                          </span>
                        </div>
                        <div className={styles.contenedorSwitch}>
                          <Switch
                            NombreCampo={
                              "Colaboradores.Administradores.Acceder"
                            }
                            Value={
                              state.Permisos?.Permisos?.Modulos?.Colaboradores
                                ?.Administradores?.Acceder
                            }
                            Modulo={"EstructuraEquipo"}
                          />
                        </div>
                      </div>
                      <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                        <div
                          className={`${styles.filaChecks} ${styles.nivelDos}`}
                        >
                          <div
                            className={`${styles.contenedorChecks} ${styles.nivelTresChecks}`}
                          >
                            <div className={styles.contenedorPrueba}>
                              <span className={styles.subTituloAccordion}>
                                Acciones
                              </span>
                            </div>
                            <div className={styles.contenedorPrueba}>
                              <BpCheckbox
                                NombreCampo={
                                  "Colaboradores.Administradores.Agregar"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Administradores?.Agregar
                                }
                                Modulo={"Colaboradores"}
                              />
                              <span className={styles.subTituloAccordion}>
                                Agregar
                              </span>
                              <BpCheckbox
                                NombreCampo={
                                  "Colaboradores.Administradores.Editar"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Administradores?.Editar
                                }
                                Modulo={"Colaboradores"}
                              />
                              <span className={styles.subTituloAccordion}>
                                Editar
                              </span>
                              <BpCheckbox
                                NombreCampo={
                                  "Colaboradores.Administradores.Eliminar"
                                }
                                Value={
                                  state.Permisos?.Permisos?.Modulos
                                    ?.Colaboradores?.Administradores?.Eliminar
                                }
                                Modulo={"Colaboradores"}
                              />
                              <span className={styles.subTituloAccordion}>
                                Eliminar
                              </span>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    {/* Finaliza acordeon Administradores  */}
                  </Accordion>
                  {/* Finaliza colaboradores general */}
                  {/* Inicia acordeon My Mod */}
                  <Accordion
                    className={
                      tablaVeintiseis === true
                        ? `${styles.acordionBase} `
                        : `${styles.acordionBase}`
                    }
                  >
                    <div className={styles.contenedorTitulosAccordion}>
                      <div>
                        <AccordionSummary
                          onClick={() => setTablaVeintiseis(!tablaVeintiseis)}
                        >
                          <div className={`${styles.contenedorIconoExpande}`}>
                            {tablaVeintiseis === true ? (
                              <img
                                className={`${styles.iconoExpande}`}
                                src={`/assets/svg/icono-expande-arriba.svg`}
                                alt="imagen"
                              />
                            ) : (
                              <img
                                className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                src={`/assets/svg/icono-expande.svg`}
                                alt="imagen"
                              />
                            )}
                          </div>
                        </AccordionSummary>
                      </div>
                      <div className={styles.titulosAccordion}>
                        <span className={styles.tituloAccordion}>My Mood</span>
                      </div>
                      <div className={styles.contenedorSwitch}>
                        <Switch
                          NombreCampo={"MyMood.Ver"}
                          Value={state.Permisos?.Permisos?.Modulos?.MyMood?.Ver}
                          Modulo={"MyMood"}
                        />
                      </div>
                    </div>
                    <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                      <div
                        className={`${styles.filaChecks} ${styles.nivelDos}`}
                      >
                        <div className={styles.contenedorChecks}>
                          <div className={styles.contenedorPrueba}>
                            <span className={styles.subTituloAccordion}>
                              Acciones
                            </span>
                          </div>
                          <div className={styles.contenedorPrueba}>
                            <BpCheckbox
                              NombreCampo={"MyMood.Estadisticas"}
                              Value={
                                state.Permisos?.Permisos?.Modulos?.MyMood
                                  ?.Estadisticas
                              }
                              Modulo={"Colaboradores"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Estad??sticas
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  {/* Finaliza acordeon My Mod */}
                  {/* Inicia acordeon Notificaciones */}
                  <Accordion
                    className={
                      tablaVeintisiete === true
                        ? `${styles.acordionBase} `
                        : `${styles.acordionBase}`
                    }
                  >
                    <div className={styles.contenedorTitulosAccordion}>
                      <div>
                        <AccordionSummary
                          onClick={() => setTablaVeintisiete(!tablaVeintisiete)}
                        >
                          <div className={`${styles.contenedorIconoExpande}`}>
                            {tablaVeintisiete === true ? (
                              <img
                                className={`${styles.iconoExpande}`}
                                src={`/assets/svg/icono-expande-arriba.svg`}
                                alt="imagen"
                              />
                            ) : (
                              <img
                                className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                src={`/assets/svg/icono-expande.svg`}
                                alt="imagen"
                              />
                            )}
                          </div>
                        </AccordionSummary>
                      </div>
                      <div className={styles.titulosAccordion}>
                        <span className={styles.tituloAccordion}>
                          Notificaciones
                        </span>
                      </div>
                      <div className={styles.contenedorSwitch}>
                        <Switch
                          NombreCampo={"Notificaciones.Ver"}
                          Value={
                            state.Permisos?.Permisos?.Modulos?.Notificaciones
                              ?.Ver
                          }
                          Modulo={"Notificaciones"}
                        />
                      </div>
                    </div>
                    <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                      <div
                        className={`${styles.filaChecks} ${styles.nivelDos}`}
                      >
                        <div className={styles.contenedorChecks}>
                          <div className={styles.contenedorPrueba}>
                            <span className={styles.subTituloAccordion}>
                              Acciones
                            </span>
                          </div>
                          <div className={styles.contenedorPrueba}>
                            <BpCheckbox
                              NombreCampo={"Notificaciones.Agregar"}
                              Value={
                                state.Permisos?.Permisos?.Modulos
                                  ?.Notificaciones?.Agregar
                              }
                              Modulo={"Colaboradores"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Agregar
                            </span>
                            <BpCheckbox
                              NombreCampo={"Notificaciones.Reenviar"}
                              Value={
                                state.Permisos?.Permisos?.Modulos
                                  ?.Notificaciones?.Reenviar
                              }
                              Modulo={"Notificaciones"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Reenviar
                            </span>
                            <BpCheckbox
                              NombreCampo={"Notificaciones.Eliminar"}
                              Value={
                                state.Permisos?.Permisos?.Modulos
                                  ?.Notificaciones?.Eliminar
                              }
                              Modulo={"Notificaciones"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Eliminar
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  {/* Finaliza acordeon Notificaciones */}
                  {/* Inicia acordeon Noticias */}
                  <Accordion
                    className={
                      tablaVeintiocho === true
                        ? `${styles.acordionBase} `
                        : `${styles.acordionBase}`
                    }
                  >
                    <div className={styles.contenedorTitulosAccordion}>
                      <div>
                        <AccordionSummary
                          onClick={() => setTablaVeintiocho(!tablaVeintiocho)}
                        >
                          <div className={`${styles.contenedorIconoExpande}`}>
                            {tablaVeintiocho === true ? (
                              <img
                                className={`${styles.iconoExpande}`}
                                src={`/assets/svg/icono-expande-arriba.svg`}
                                alt="imagen"
                              />
                            ) : (
                              <img
                                className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                src={`/assets/svg/icono-expande.svg`}
                                alt="imagen"
                              />
                            )}
                          </div>
                        </AccordionSummary>
                      </div>
                      <div className={styles.titulosAccordion}>
                        <span className={styles.tituloAccordion}>Noticias</span>
                      </div>
                      <div className={styles.contenedorSwitch}>
                        <Switch
                          NombreCampo={"Noticias.Ver"}
                          Value={
                            state.Permisos?.Permisos?.Modulos?.Noticias?.Ver
                          }
                          Modulo={"EstructuraEquipo"}
                        />
                      </div>
                    </div>
                    <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                      <div
                        className={`${styles.filaChecks} ${styles.nivelDos}`}
                      >
                        <div className={styles.contenedorChecks}>
                          <div className={styles.contenedorPrueba}>
                            <span className={styles.subTituloAccordion}>
                              Acciones
                            </span>
                          </div>
                          <div className={styles.contenedorPrueba}>
                            <BpCheckbox
                              NombreCampo={"Noticias.Agregar"}
                              Value={
                                state.Permisos?.Permisos?.Modulos?.Noticias
                                  ?.Agregar
                              }
                              Modulo={"Noticias"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Agregar
                            </span>
                            <BpCheckbox
                              NombreCampo={"Noticias.VistaPrevia"}
                              Value={
                                state.Permisos?.Permisos?.Modulos?.Noticias
                                  ?.VistaPrevia
                              }
                              Modulo={"Noticias"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Vista previa
                            </span>
                            <BpCheckbox
                              NombreCampo={"Noticias.Eliminar"}
                              Value={
                                state.Permisos?.Permisos?.Modulos?.Noticias
                                  ?.Eliminar
                              }
                              Modulo={"Noticias"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Eliminar
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  {/* Finaliza acordeon Noticias */}
                  {/* Inicia acordeon Calendario */}

                  <Accordion
                    className={
                      tablaVeintinueve === true
                        ? `${styles.acordionBase} `
                        : `${styles.acordionBase}`
                    }
                  >
                    <div className={styles.contenedorTitulosAccordion}>
                      <div>
                        <AccordionSummary
                          onClick={() => setTablaVeintinueve(!tablaVeintinueve)}
                          // expandIcon={<ExpandMoreIcon />}
                        >
                          <div className={`${styles.contenedorIconoExpande}`}>
                            {tablaVeintinueve === true ? (
                              <img
                                className={`${styles.iconoExpande}`}
                                src={`/assets/svg/icono-expande-arriba.svg`}
                                alt="imagen"
                              />
                            ) : (
                              <img
                                className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                src={`/assets/svg/icono-expande.svg`}
                                alt="imagen"
                              />
                            )}
                          </div>
                        </AccordionSummary>
                      </div>
                      <div className={styles.titulosAccordion}>
                        <span className={styles.tituloAccordion}>
                          Calendario
                        </span>
                      </div>
                      <div className={styles.contenedorSwitch}>
                        <Switch
                          NombreCampo={"Calendario.Ver"}
                          Value={
                            state.Permisos?.Permisos?.Modulos?.Calendario?.Ver
                          }
                          Modulo={"Calendario"}
                        />
                      </div>
                    </div>
                    <AccordionDetails style={{ padding: "8px 16px 0px" }}>
                      <div
                        className={`${styles.filaChecks} ${styles.nivelDos}`}
                      >
                        <div className={styles.contenedorChecks}>
                          <div className={styles.contenedorPrueba}>
                            <span className={styles.subTituloAccordion}>
                              Acciones
                            </span>
                          </div>
                          <div className={styles.contenedorPrueba}>
                            <BpCheckbox
                              NombreCampo={"Calendario.Agregar"}
                              Value={
                                state.Permisos?.Permisos?.Modulos?.Calendario
                                  ?.Agregar
                              }
                              Modulo={"Calendario"}
                            />
                            <span className={styles.subTituloAccordion}>
                              Agregar
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>

                  {/* Finaliza acordeon Calendario */}
                  {/* Inicia acordeon FeedBack */}
                  <Accordion
                    className={
                      tablaTreinta === true
                        ? `${styles.acordionBase} `
                        : `${styles.acordionBase}`
                    }
                  >
                    <div className={styles.contenedorTitulosAccordion}>
                      <div>
                        <AccordionSummary
                          onClick={() => setTablaTreinta(!tablaTreinta)}
                        >
                          <div className={`${styles.contenedorIconoExpande}`}>
                            {tablaTreinta === true ? (
                              <img
                                className={`${styles.iconoExpande}`}
                                src={`/assets/svg/icono-expande-arriba.svg`}
                                alt="imagen"
                              />
                            ) : (
                              <img
                                className={`${styles.iconoExpande} ${styles.iconoAbajo}`}
                                src={`/assets/svg/icono-expande.svg`}
                                alt="imagen"
                              />
                            )}
                          </div>
                        </AccordionSummary>
                      </div>
                      <div className={styles.titulosAccordion}>
                        <span className={styles.tituloAccordion}>Feedback</span>
                      </div>
                      <div className={styles.contenedorSwitch}>
                        <Switch
                          NombreCampo={"FeedBack.Ver"}
                          Value={
                            state.Permisos?.Permisos?.Modulos?.FeedBack?.Ver
                          }
                          Modulo={"Feedback"}
                        />
                      </div>
                    </div>
                  </Accordion>
                  {/* Inicia acordeon FeedBack */}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};
