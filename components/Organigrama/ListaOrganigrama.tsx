import { useEffect, useContext, useReducer } from "react";
import AgregaPersonaPuesto from "./Modals/AgregaPersonaPuesto";
import "../Organigrama/Organigrama.css";
import {  Grid } from "@material-ui/core";
import { useToggle } from "../../hooks/useToggle";
import { openOrganigramaModal } from "../Team/Modals/ModalOrganigramaModal";
import OrganigramaContext from "../../context/OrganigramaContext/OrganigramaContext";
import MenuListOrganigrama from "./Modals/MenuListOrganigrama";
import InfoPuesto from "./Modals/InfoPuesto";
import EliminaPuesto from "./Modals/EliminaPuesto";
import EditaPuesto from "./Modals/EditaPuesto";
import { TabPuestoContext } from "../../context/TabPuestosContext/TabPuestosContext";
import CrearPuestoModal from "../../components/Organigrama/Modals/CrearPuestoModal";
import ImagenColaborador from "./ImagenColaborador";
import { tabPuestoReducer } from "../../context/TabPuestosContext/tabPuestoReducer";
import { useQuery } from "@apollo/client";
import { GET_ALL_PUESTOS_USERS } from "../../Querys/querys";
import styles from './Organigrama.module.css'

const ListaOrganigrama = () =>{
    const [PuestoState, PuestoDispatch,] = useReducer(tabPuestoReducer, { loading: true, Puestos: [], PuestosFilter: [] });
    const [inactiveOpen, setInactiveOpen] = useToggle(false);
    const [addPuestoOpen, setAddPuestoOpen] = useToggle(false);
    const {dispatch} = useContext(OrganigramaContext)

    const resultPuestos = useQuery(GET_ALL_PUESTOS_USERS);
    const allPuestos = resultPuestos.data?.GET_ALL_PUESTOS_USERS;


    
    useEffect(()=>{
        obtenerDatos();
    },[])

    const obtenerDatos = async (): Promise<void> => {
    }


    const muestraAdministradores = (_id: string, NombrePuesto: string, AreaProyecto: string, PuestoSuperior: string, Descripcion: string): void =>{
        const showAgregaPersona = true
        openOrganigramaModal({_id, NombrePuesto, AreaProyecto, PuestoSuperior ,Descripcion,showAgregaPersona}, dispatch)
    }

    return(
        <>
         <div className={styles.pp_contenedor}>
            <div className={styles.pp_contenedorBoton}>
            <TabPuestoContext.Provider value={{
                          inactiveOpen,
                          setInactiveOpen,
                          addPuestoOpen,
                          setAddPuestoOpen,
                          PuestoState,
                          PuestoDispatch
                      }}>
                      <button onClick={setAddPuestoOpen} className="botonAgregaPuesto">
                      <div className='alineacionBoton'>
                          <div className="nombrePuesto">
                          <span>Crear puesto</span>
                          </div>
                          <div className="nombrePuesto">
                          <img src='/assets/icons/icono-crear-puesto.svg' />
                          </div>
                      </div>
                      </button>            
                      <CrearPuestoModal getDatos={obtenerDatos}/>
                  </TabPuestoContext.Provider>
            </div>
        </div>   
        <div className={styles.pp_contenedorLista}>
            {allPuestos?.map((lis:any)=>
            lis.users?.map((usr:any)=>
                <li className='Mask' key={lis.idPuesto}>
                    <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <div className="alineacionPuesto">
                        <span className="Puesto">{lis.NombrePuesto}</span>
                      </div>
                    </Grid>
                    {usr.NombreUsuario === null ? (
                      <Grid item xs={3}>
                        <div className="alineacionPuesto">
                          <div>
                            <span className="sinPersona">
                              Sin personas en el puesto
                            </span>
                          </div>
                          <div className="contenedorBoton">
                            <button
                              className="botonAgregarColaborador"
                              onClick={() =>
                                muestraAdministradores(
                                  lis.idPuesto,
                                  lis.NombrePuesto,
                                  lis.AreaProyecto,
                                  lis.PuestoSuperior,
                                  lis.Descripcion
                                )
                              }
                            >
                              Agregar
                            </button>
                          </div>
                        </div>
                      </Grid>
                    ) : (
                      <Grid item xs={3}>
                        <div className="alineacionPuesto">
                          {usr.ImagenUsuario === undefined ? (
                            <ImagenColaborador
                              Nombre={usr.NombreUsuario}
                              Apellido={usr.ApellidoUsuario}
                            />
                          ) : (
                            <img
                              src={usr.ImagenUsuario}
                              alt="img"
                              className="imgCollaborator__BITSss"
                            />
                          )}
                          <div>
                            <div className="nombrePuesto">
                              <span className="textoAreaJefe">
                                {usr.NombreUsuario}
                              </span>
                            </div>
                            <div className="nombrePuesto">
                              <span className="nombreCorreo">
                                {usr.Usuario}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    )}
                    <Grid item xs={3}>
                      <div className="alineacionPuesto">
                        <div>
                          <div className="nombrePuesto">
                            <span className="textoAreaJefe">
                              &Aacute;rea / Proyecto:
                            </span>{" "}
                            <span className="nombreCorreo">
                              {lis.AreaProyecto}
                            </span>
                          </div>
                          <div className="nombrePuesto">
                            <span className="textoAreaJefe">Jefe:</span>
                            <span className="nombreCorreo">
                              {lis.NombrePuestoSuperior}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="alineacionPuesto">
                        <div className="nombrePuesto">
                          <span className="textoAreaJefe">Subordinados:</span>
                          <span className="nombreCorreo">
                            {" " + lis.users.length}
                          </span>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={1}>
                      <div className="alineacionPuesto opciones">
                        <MenuListOrganigrama
                          {...{
                            _id: lis.idPuesto,
                            NombrePuesto: lis.NombrePuesto,
                            AreaProyecto: lis.AreaProyecto,
                            PuestoSuperior: lis.PuestoSuperior,
                            Descripcion: lis.Descripcion,
                            NombrePuestoSuperior: lis.NombrePuestoSuperior,
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </li>
            )
            )
            }
        </div>
            <AgregaPersonaPuesto getDatos={obtenerDatos} />
            <InfoPuesto />
            <EditaPuesto getDatos={obtenerDatos}/>
            <EliminaPuesto getDatos={obtenerDatos}/>
        </>
    )
}

export default ListaOrganigrama