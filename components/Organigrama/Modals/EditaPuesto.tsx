import {
  Theme,
  Dialog,
  Button,
  withStyles,
  Box,
  Select,
  Grid,
  TextField,
} from "@material-ui/core";
import "../Modal/CrearPuesto.css";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { OutlinedInput } from "@mui/material";
import { useEffect, useState, useContext, useReducer } from "react";
import { SuccessfulAlert } from "../../../alerts/successAlerts";
import { IProject } from "../../../interfaces/Project";
import { IPuestoSuperior } from "../../../interfaces/Puesto";
import { tabCollaboratorReducer } from "../../../context/TabCollaboratorContext/tabCollaboratorReducer";
import { Collaborator } from "../../../interfaces/TabCollaborator.interfaces";
import { filterCollaborators } from "../../../actions/tabColabortor";
import {
  putUserPuestos,
} from "../../../services/auth/userService";
import OrganigramaContext from "../../../context/OrganigramaContext/OrganigramaContext";
import { closeOrganigramaModal } from "../../Team/Modals/ModalOrganigramaModal";
import ImagenColaborador from "../ImagenColaborador";
import { ErrorAlert } from "../../../alerts/errorAlert";
import { updatePuesto } from "../../../helpers/Organigrama/Puestos";
import "../Organigrama.css";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PUESTO, 
  GET_USER_AVAILABLE, 
  GET_USER_ADMIN, 
  DELETE_USER_PUESTO, 
  ADD_USER_PUESTO, 
  GET_ALL_PROJECT, 
  GET_ALL_PUESTOS_USERS,
  GET_ALL_PUESTOS
 } from "../../../Querys/querys";


const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const EditaPuesto = (props: any) => {
  const { state, dispatch } = useContext(OrganigramaContext);
  const [cambio, setCambio] = useState(0);
  const [collaboratorState, collaboratorDispatch] = useReducer(
    tabCollaboratorReducer,
    { loading: true, collaborators: [], collaboratorsFilter: [] }
  );
  const [value, setValue] = useState();

  const startFilter = (collaborators: Collaborator[]) => {
    collaboratorDispatch(filterCollaborators(collaborators));
  };

  const [Superior, setPuestoSuperior] = useState<IPuestoSuperior[]>([]);
  const [proyectos, setProyectos] = useState<IProject[]>([]);
  const [adminsDisponibles, setUserDisponibles] = useState([]);
  const [filtrado, setFiltrado] = useState([])

  const resultPuestosDisponibles = useQuery(GET_USER_AVAILABLE, { variables: { puesto: state._id },});
  const allPuestosDisponibles = resultPuestosDisponibles.data?.GET_USER_AVAILABLE;

  const resultAreaProyecto = useQuery(GET_ALL_PROJECT);
  const resultPuestos = useQuery(GET_ALL_PUESTOS_USERS);

  
  useEffect(() => {
    initData();
   
  }, [OrganigramaContext]);

  const initData = async () => {
    const projectsFetch = resultAreaProyecto.data?.GET_ALL_PROJECT;
    const puestoSuperiorFetch = resultPuestos.data?.GET_ALL_PUESTOS_USERS;

    await setFiltrado(allPuestosDisponibles)
    setUserDisponibles(allPuestosDisponibles);
    setPuestoSuperior(puestoSuperiorFetch);
    setProyectos(projectsFetch);
  
  };

  const onChange = async (e: any) => {
    let nuevoValor = e.target.value;
    setValue(nuevoValor);
    await updatePuesto(e, state, dispatch, e.target.name, nuevoValor);
  };

  const handleClose = async () => {
    await closeOrganigramaModal(dispatch);

    await props.getDatos();
  };

  const [editPuesto] = useMutation(UPDATE_PUESTO, {  
      refetchQueries:[
        {query:GET_USER_AVAILABLE, variables: { puesto: state._id },}, 
        {query:GET_USER_ADMIN, variables: { puesto: state._id },},
        { query: GET_ALL_PUESTOS_USERS }
      ],
  });


  const datosFiltrados = (e:any) =>{
    if(e !== '') {
      let expresion = new RegExp(`${e}.*`, "i")
      const nuevoFiltrado = filtrado.filter((lis:any) => expresion.test(lis.NombreUsuario))

      setFiltrado(nuevoFiltrado)
    }else{
      initData()
    }
  }

  const onSumbit = async () => {
    if (
      state.NombrePuesto !== "" &&
      state.Descripcion !== "" &&
      state.AreaProyecto !== ""
    ) {
      const res = await  
        editPuesto ({
          variables: {                    
              idPuesto: state._id
              , input: {
                NombrePuesto: state.NombrePuesto
                ,AreaProyecto: state.AreaProyecto
                ,PuestoSuperior: state.PuestoSuperior
                ,Descripcion: state.Descripcion
              },
          },
        });
      if (res) {
        SuccessfulAlert({
          title: "¡Exito!",
          text: "¡Se ha actualizado el puesto correctamente!",
        });
        await closeOrganigramaModal(dispatch);
        dispatch({ type: "CLOSE_PERCEPTION_MODAL" });
      }
    } else {
      return ErrorAlert({ text: "Ingresa todos los campos" });
    }
  };

  function UserPuestoLibre() {
  
    const [UserPuestosAdd] = useMutation(ADD_USER_PUESTO , {
      refetchQueries:[{query:GET_USER_AVAILABLE, variables: { puesto: state._id },}, {query:GET_USER_ADMIN, variables: { puesto: state._id },}],
    })
  
    const agregaUsuario = async (
      idUsuario: any,
      idPuesto: any,
      Puesto: any
    ) => {
    
      let mensaje = `Usuario agregado a ${state.NombrePuesto}`;
      if (idPuesto === "vacio") {
        let idPuestoActualizado = state._id;
        let PuestoActualizado = state.NombrePuesto;
        
        const usuarioActualizado = await UserPuestosAdd({
          variables: {
            addUserPuestoId : idUsuario
            ,puestoId: state._id 
          }
        });
        setCambio(cambio + 1);
      } else {
        let idPuestoActualizado = `${state._id},${idPuesto}`;
        let PuestoActualizado = `${state.NombrePuesto},${Puesto}`;
        const usuarioActualizado = await putUserPuestos(
          idUsuario,
          idPuestoActualizado,
          PuestoActualizado,
          mensaje
        );
        setCambio(cambio + 1);
      }
    };

    useEffect(() => {
      obtenerDatos();
    }, []);

    const obtenerDatos = async () => {
      setUserDisponibles(allPuestosDisponibles);
    };

    const sidebar = (
      <Box className="contenedorUsuarios">
        <ul className="ulLista">
          {filtrado?.map((lis: any) => (
            <li key={lis._id} className="contenedorLista">
              <div className="alineacionPuesto">
                {lis.ImagenUsuario === null ? (
                  <ImagenColaborador
                    Nombre={lis.NombreUsuario}
                    Apellido={lis.ApellidoUsuario}
                  />
                ) : (
                  <img
                    src={lis.ImagenUsuario}
                    alt="img"
                    className="imgCollaborator__BITSss"
                  />
                )}
                <div>
                  <div className="nombrePuesto">
                    <span className="textoListaUsuario">
                      {lis.PrimerNombre} {lis.ApellidoUsuario}
                    </span>
                  </div>
                  <div className="nombrePuesto">
                    <span className="correoListaUsuario">{lis.Usuario}</span>
                  </div>
                </div>
              </div>
              <Box>
                <button
                  className="bottonAgregarUsuario"
                  onClick={() =>
                    agregaUsuario(
                      lis._id,
                      lis.Puesto?.idPuesto || "vacio",
                      lis.Puesto?.Puesto || "vacio"
                    )
                  }
                >
                  <div>
                    <span className="textoBotonAgregaUsuario">Agregar +</span>
                  </div>
                </button>
              </Box>
            </li>
          ))}
        </ul>
      </Box>
    );
    return <div>{sidebar}</div>;
  }


  const resultPuestosAsignados = useQuery(GET_USER_ADMIN, {
    variables: { puesto: state._id },
  });

  const [UserPuestosElimina] = useMutation(DELETE_USER_PUESTO , {
    refetchQueries:[{query:GET_USER_AVAILABLE, variables: { puesto: state._id },}, {query:GET_USER_ADMIN, variables: { puesto: state._id },}],
  })
  

  function UserAsignadoPuesto() {
    const [userDisponibles, setUserDisponibles] = useState([]);
    
    const eliminaUsuario = async (
      idUsuario: any,
      idPuesto: any,
      Puesto: any
    ) => {

      let mensaje = `Usuario eliminado de ${state.NombrePuesto}`;
      if (idPuesto === "vacio") {
        let idPuestoActualizado = state._id;
        let PuestoActualizado = state.NombrePuesto;
        const usuarioActualizado = await UserPuestosElimina({
          variables: {
            deleteUserPuestoId : idUsuario
          }
        });


        // const usuarioActualizado = await putUserPuestosElimina(
        //   idUsuario,
        //   idPuestoActualizado,
        //   PuestoActualizado,
        //   mensaje
        // );

        setCambio(cambio + 1);
      } else {
        let idPuestoActualizado = `${state._id},${idPuesto}`;
        let PuestoActualizado = `${state.NombrePuesto},${Puesto}`;
        const usuarioActualizado = await UserPuestosElimina({
          variables: {
            deleteUserPuestoId : idUsuario
          }
        });
        setCambio(cambio + 1);
      }
    };

    useEffect(() => {
      obtenerDatos();
    }, []);

    const obtenerDatos = async () => {
      let admins = await resultPuestosAsignados.data?.GET_USER_ADMIN;
      console.log("GET_USER_ADMIN",  admins )
      setUserDisponibles(admins);
    };

    const sidebar = (
      <Box className="contenedorUsuariosPuesto">
        <ul className="ulLista">
          {userDisponibles?.map((lis: any) => (
            <li key={lis._id} className="contenedorListaUsuariosPuesto">
            
              <div className="alineacionPuestoUsuario">
                <div className="contenedorListaUsuarioBoton">
                  <div>
                    {lis.ImagenUsuario === null ? (
                      <ImagenColaborador
                        Nombre={lis.NombreUsuario}
                        Apellido={lis.ApellidoUsuario}
                      />
                    ) : (
                      <img
                        src={lis.ImagenUsuario}
                        alt="img"
                        className="imgCollaborator__BITSss"
                      />
                    )}
                  </div>
                  <div>
                    <div className="nombrePuesto">
                      <span className="textoListaUsuario">
                        {lis.PrimerNombre} {lis.ApellidoUsuario}
                      </span>
                    </div>
                    <div className="nombrePuesto">
                      <span className="correoListaUsuario">{lis.Usuario}</span>
                    </div>
                  </div>
                </div>
                <Box className="iconoEliminaUsuario">
                  <button
                    onClick={() =>
                      eliminaUsuario(
                        lis._id,
                        lis.Puesto?.idPuesto || "vacio",
                        lis.Puesto?.Puesto || "vacio"
                      )
                    }
                  >
                    <img src="/assets/icons/eliminar-colaborador.svg" />
                  </button>
                </Box>
              </div>
            </li>
          ))}
        </ul>
      </Box>
    );
    return <div>{sidebar}</div>;
  }

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={state.showEdit}
        fullWidth={true}
        maxWidth={"md"}
      >
        <div className="contenedorTituloModale">
          <p className="titulo">Editar Puesto</p>
        </div>

        <DialogContent className="dialogoContento">
          <Grid item xs={6} className="ColumnaEditarPuesto">
            <Grid className="titulos">
            <span>Información general del puesto</span>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div className="espacioTitulosEdit">
                  <span>Nombre del puesto</span>
                </div>
              </Grid>
              <Grid item xs={8}>
                <div>
                  <TextField
                    name="NombrePuesto"
                    error={false}
                    type="text"
                    variant="outlined"
                    size="small"
                    className="Mask"
                    defaultValue={state.NombrePuesto}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div className="espacioTitulosEdit">
                  <span>Área</span>
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="">
                  <Select
                    name="AreaProyecto"
                    native
                    defaultValue={state.AreaProyecto}
                    onChange={(e) => onChange(e)}
                    input={<OutlinedInput />}
                    className="inputSelect"
                  >
                    <option value="" className="optionSelect">
                      Selecciona Area/Proyecto
                    </option>
                    {proyectos?.map((proyectos) => (
                      <option
                        className="optionSelect"
                        key={proyectos.id}
                        value={proyectos.proyectName}
                      >
                        {proyectos.proyectName}
                      </option>
                    ))}
                  </Select>
                </div>
              </Grid>
            </Grid>

            <Grid container className="filaInput" spacing={2}>
              <Grid item xs={4}>
                <div className="espacioTitulosEdit">
                  <span>Puesto superior</span>
                </div>
              </Grid>
              <Grid item xs={8}>
                <div>
                  <Select
                    name="PuestoSuperior"
                    native
                    defaultValue={state.PuestoSuperior}
                    onChange={(e) => onChange(e)}
                    input={<OutlinedInput />}
                    className="inputSelect"
                  >
                    <option value="" className="optionSelect">
                      Busca o elige un puesto
                    </option>
                    {Superior?.map((Superior) => (
                      <option
                        className="optionSelect"
                        value={Superior?.NombrePuesto}
                      >
                        {Superior?.NombrePuesto +
                          " - " +
                          Superior?.NombreUsuario}
                      </option>
                    ))}
                  </Select>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div className="espacioTitulosEdit">
                  <span className="tituloDescripcion">Descripción</span>
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="espacioTitulosTextarea">
                  <TextField
                    name="Descripcion"
                    error={false}
                    type="text"
                    variant="outlined"
                    multiline
                    rows={4}
                    size="small"
                    defaultValue={state.Descripcion}
                    className="espacioTextArea"
                    placeholder="Escribe lo que se debe realizar en el puesto..."
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div className="espacioTitulosEdit">
                  <span>Colaborador</span>
                </div>
              </Grid>
              <Grid item xs={8}>
                <UserAsignadoPuesto />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6} className="ColumnaEditarPuesto">
            <Grid className="titulos">
            <span>
              ¿Deseas agregar un colaborador al puesto?
            </span>
            </Grid>
           
            <Grid className="titulos">
                <input 
                    type="text" 
                    placeholder="Buscar Colaborador"
                    className="pc_inputBuscador"
                    onChange={(e) => datosFiltrados(e.target.value)}
                    >
                </input>
            </Grid>

            <Grid className="titulos">
            <span className="titulos">Colaborador sin puesto asignado</span>
            </Grid>
           
            <UserPuestoLibre />
          </Grid>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} className="buttonCancel">
            Cancelar
          </Button>
          <Button autoFocus onClick={onSumbit} className="buttonSave">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditaPuesto;
