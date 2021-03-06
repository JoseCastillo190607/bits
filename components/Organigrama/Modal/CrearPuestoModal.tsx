import {
  createStyles,
  Theme,
  Dialog,
  Typography,
  Button,
  withStyles,
  WithStyles,
  Box,
  FormControl,
  Select,
  Grid,
  TextField,
} from "@material-ui/core";
import "../Modal/CrearPuesto.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { OutlinedInput } from "@mui/material";
import { useEffect, useState, useContext, useReducer } from "react";
import { SuccessfulAlert } from "../../../alerts/successAlerts";
import { PuestoModal } from "../../../interfaces/TabPuesto.interfaces";
import { useForm } from "../../../hooks/useForm";
import { TabPuestoContext } from "../../../context/TabPuestosContext/TabPuestosContext";
import { IProject } from "../../../interfaces/Project";
import { IPuestoSuperior } from "../../../interfaces/Puesto";
import { AdminContext } from "../../../context/AdminContext/AdminContext";
import { getAllProjects } from "../../../services/projectService";
import {
  addPuesto,
  getAllPuestosSuperior,
} from "../../../services/PuestoService";
import { addNewPuesto } from "../../../actions/tabPuesto";
import PuestoContext from "../../../context/PuestoContext/PuestoContext";
import SearcherTable from "../../Collaborators/CollaboratorTab/SearcherTable";
import { tabCollaboratorReducer } from "../../../context/TabCollaboratorContext/tabCollaboratorReducer";
import { Collaborator } from "../../../interfaces/TabCollaborator.interfaces";
import { filterCollaborators } from "../../../actions/tabColabortor";
import {
  getUsersDisponiblesPuesto,
  putUserPuestos,
} from "../../../services/auth/userService";
import ImagenColaborador from "../ImagenColaborador";
import SaveIcon from "@material-ui/icons/Save";
import { ErrorAlert } from "../../../alerts/errorAlert";
import "../Organigrama.css";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_USER_PUESTO,
  CREATE_PUESTO,
  GET_ALL_AREA_PROJECT,
  GET_ALL_PUESTOS,
  GET_USER_ADMIN,
  GET_USER_AVAILABLE,
} from "../../../Querys/querys";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

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

const CrearPuestoModal = (props: any) => {
  const { state, dispatch } = useContext(PuestoContext);
  const [cambio, setCambio] = useState(0);
  const [collaboratorState, collaboratorDispatch] = useReducer(
    tabCollaboratorReducer,
    { loading: true, collaborators: [], collaboratorsFilter: [] }
  );

  const startFilter = (collaborators: Collaborator[]) => {
    collaboratorDispatch(filterCollaborators(collaborators));
  };

  const resultAreaProyecto = useQuery(GET_ALL_AREA_PROJECT);
  console.log("resultAreaProyecto",resultAreaProyecto.data?.GET_ALL_PROJECT);
  
  const {
    NombrePuesto,
    AreaProyecto,
    PuestoSuperior,
    Descripcion,
    NombreUsuario,
    idUsuario,
    onChange,
    formulario,
    reset,
    setForm,
  } = useForm<PuestoModal>({
    NombrePuesto: "",
    AreaProyecto: "",
    PuestoSuperior: "",
    Descripcion: "",
    NombreUsuario: "",
    idUsuario: "",
  });

  const [Superior, setPuestoSuperior] = useState<IPuestoSuperior[]>([]);
  const [proyectos, setProyectos] = useState<IProject[]>([]);
  const { addPuestoOpen, setAddPuestoOpen, PuestoDispatch } =
    useContext(TabPuestoContext);
  const { adminState } = useContext(AdminContext);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const projectsFetch = resultAreaProyecto.data?.GET_ALL_PROJECT;
    const puestoSuperiorFetch = await getAllPuestosSuperior();
    console.log("resultAreaProyecto",resultAreaProyecto.data?.GET_ALL_PROJECT);
  
    setPuestoSuperior(puestoSuperiorFetch);
    setProyectos(projectsFetch);
  };

  const handleClose = () => {
    // Clean modal
    reset();
    // Close modal
    setAddPuestoOpen();
  };

  const onChange2 = (e: any) => {
    let seleccionado = e.nativeEvent.target;
    console.log("onChange2" , seleccionado);
    console.log("onChange2", seleccionado.text);
    
    const datos = [e.target.value, seleccionado.text]
    onChange(e.target.value as string, "PuestoSuperior");
  };

  const [createPuesto] = useMutation(CREATE_PUESTO, {
    refetchQueries: [{ query: GET_ALL_PUESTOS }],
  });

  const handleAdd = async () => {
    if (NombrePuesto !== "" && AreaProyecto !== "") {
      const res = await createPuesto({
        variables: {
          input: {
            NombrePuesto: formulario.NombrePuesto,
            AreaProyecto: formulario.AreaProyecto,
            PuestoSuperior: formulario.PuestoSuperior,
            Descripcion: formulario.Descripcion,
          },
        },
      });

      if (res.data) {
        // Close modal
        setAddPuestoOpen();
        // Dispatch data
        PuestoDispatch(
          addNewPuesto({
            ...formulario,
            _id: res.data._id,
          })
        );
        // Clean Modal
        reset();

        await props.getDatos();
        SuccessfulAlert({
          title: "??Exito!",
          text: "??Se ha a??adido el puesto correctamente!",
        });
      }
      SuccessfulAlert({
        title: "??Exito!",
        text: "??Se ha a??adido el puesto correctamente!",
      });
    } else
      ErrorAlert({ text: "El nombre del puesto y el ??rea son requeridos." });
  };

  const [UserPuestosAdd] = useMutation(ADD_USER_PUESTO, {
    refetchQueries: [
      { query: GET_USER_AVAILABLE, variables: { puesto: state._id } },
      { query: GET_USER_ADMIN, variables: { puesto: state._id } },
    ],
  });

  function UserPuestoLibre() {
    const [adminsDisponibles, setUserDisponibles] = useState([]);
    const agregaUsuario = async (
      idUsuario: any,
      idPuesto: any,
      Puesto: any
    ) => {
      let mensaje = `Usuario agregado a ${state.value}`;
      if (idPuesto === "vacio") {
        let idPuestoActualizado = state._id;
        let PuestoActualizado = state.value;
        const usuarioActualizado = await UserPuestosAdd({
          variables: {
            addUserPuestoId: idUsuario,
            puestoId: state._id,
          },
        });
        setCambio(cambio + 1);
      } else {
        let idPuestoActualizado = `${state._id},${idPuesto}`;
        let PuestoActualizado = `${state.value},${Puesto}`;
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

    const resultPuestosDisponibles = useQuery(GET_USER_AVAILABLE, {
      variables: { puesto: state._id },
    });
    const allPuestosDisponibles =
      resultPuestosDisponibles.data?.GET_USER_AVAILABLE;

    const obtenerDatos = async () => {
      setUserDisponibles(allPuestosDisponibles);
    };

    const sidebar = (
      <Box className="contenedorUsuarios">
        <ul className="ulLista">
          {adminsDisponibles?.map((lis: any) => (
            <li key={lis._id} className="contenedorLista">
              <div className="alineacionPuesto">
                {lis.ImagenUsuario === undefined ? (
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

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={addPuestoOpen}
        fullWidth={true}
        maxWidth={"md"}
      >
        <div className="contenedorTituloModal">
          <p className="titulo">Crear Puesto</p>
        </div>

        <DialogContent className="dialogoContent">
          <Grid item xs={6} className="ColumnaEditarPuesto">
            <Grid className="titulos">
              <span>Informaci??n general del puesto</span>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={3}>
                <div className="espacioTitulos">
                  <span>Nombre del puesto</span>
                </div>
              </Grid>
              <Grid item xs={9}>
                <div>
                  <TextField
                    error={false}
                    type="text"
                    variant="outlined"
                    size="small"
                    className="Mask"
                    value={NombrePuesto}
                    onChange={({ target }) =>
                      onChange(target.value as string, "NombrePuesto")
                    }
                  />
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={3}>
                <div className="espacioTitulos">
                  <span>??rea</span>
                </div>
              </Grid>
              <Grid item xs={9}>
                <div className="">
                  <Select
                    native
                    value={AreaProyecto}
                    onChange={({ target }) =>
                      onChange(target.value as string, "AreaProyecto")
                    }
                    input={<OutlinedInput />}
                    className="inputSelect"
                  >
                    <option value="" className="optionSelect">
                      Selecciona Area/Proyecto
                    </option>
                    {proyectos.map((proyectos) => (
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
              <Grid item xs={3}>
                <div className="espacioTitulos">
                  <span>Puesto superior</span>
                </div>
              </Grid>
              <Grid item xs={9}>
                <div>
                  <Select
                    native
                    value={PuestoSuperior}
                    name={NombrePuesto}
                    id={idUsuario}
                    onChange={(e) => {
                      onChange2(e);
                    }}
                    input={<OutlinedInput />}
                    className="inputSelect"
                  >
                    <option value="" className="optionSelect">
                      Busca o elige un puesto
                    </option>
                    {Superior?.map((Superior) => (
                      <option
                        className="optionSelect"
                        key={Superior?.NombrePuesto}
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
              <Grid item xs={3}>
                <div className="espacioTitulos">
                  <span className="tituloDescripcion">Descripci??n</span>
                </div>
              </Grid>
              <Grid item xs={9}>
                <div className="espacioTitulosTextarea">
                  <TextField
                    error={false}
                    type="text"
                    variant="outlined"
                    multiline
                    rows={4}
                    size="small"
                    value={Descripcion}
                    className="espacioTextArea"
                    placeholder="Escribe lo que se debe realizar en el puesto..."
                    onChange={({ target }) =>
                      onChange(target.value as string, "Descripcion")
                    }
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6} className="ColumnaEditarPuesto">
            <Grid className="titulos">
              <span>??Deseas agregar un colaborador al puesto?</span>
            </Grid>

            <SearcherTable
              initState={collaboratorState.collaborators}
              setState={startFilter}
              label={"Buscar Colaborador"}
              fields={["Usuario", "FullName", "Sede", "Cliente", "Proyecto"]}
            />

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
          <Button autoFocus onClick={handleAdd} className="buttonSave">
            <SaveIcon />
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CrearPuestoModal;
