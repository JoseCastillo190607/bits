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
import { useEffect, useState, useContext } from "react";
import { SuccessfulAlert } from "../../../alerts/successAlerts";
import { PuestoModal } from "../../../interfaces/TabPuesto.interfaces";
import { useForm } from "../../../hooks/useForm";
import { TabPuestoContext } from "../../../context/TabPuestosContext/TabPuestosContext";
import { IProject } from "../../../interfaces/Project";
import { IPuestoSuperior } from "../../../interfaces/Puesto";
import PuestoContext from "../../../context/PuestoContext/PuestoContext";
import ImagenColaborador from "../ImagenColaborador";
import { ErrorAlert } from "../../../alerts/errorAlert";
import "../Organigrama.css";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_USER_PUESTO,
  CREATE_PUESTO,
  GET_ALL_PROJECT,
  GET_ALL_PUESTOS_USERS,
  GET_USER_ADMIN,
  GET_USER_AVAILABLE,
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

const CrearPuestoModal = (props: any) => {
  const { state, dispatch } = useContext(PuestoContext);
  const [estadoInicial, setEstadoInicial] = useState<any[]>([]);
  const [seleccionados, setSeleccionados] = useState<any[]>([]);
  const [Superior, setPuestoSuperior] = useState<IPuestoSuperior[]>([]);
  const [proyectos, setProyectos] = useState<IProject[]>([]);
  const { addPuestoOpen, setAddPuestoOpen, PuestoDispatch } =
    useContext(TabPuestoContext);
  const [filtrado, setFiltrado] = useState([])

  useEffect(() => {
    initData();
  }, [TabPuestoContext]);

  const resultAreaProyecto = useQuery(GET_ALL_PROJECT);
  const resultPuestos = useQuery(GET_ALL_PUESTOS_USERS);

  const resultPuestosDisponibles = useQuery(GET_USER_AVAILABLE, {
    variables: { puesto: state._id },
  });
  const disponibles = resultPuestosDisponibles.data?.GET_USER_AVAILABLE;

  const initData = async () => {
    const projectsFetch = resultAreaProyecto.data?.GET_ALL_PROJECT;
    const puestoSuperiorFetch = resultPuestos.data?.GET_ALL_PUESTOS_USERS;
 
    await setFiltrado(disponibles)
    setPuestoSuperior(puestoSuperiorFetch);
    setProyectos(projectsFetch);
  };

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

  const handleClose = () => {
    // Clean modal
    reset();
    // Close modal
    setAddPuestoOpen();
  };

  const [createPuesto] = useMutation(CREATE_PUESTO, {
    refetchQueries: [
      { query: GET_USER_AVAILABLE, variables: { puesto: state._id } },
      { query: GET_USER_ADMIN, variables: { puesto: state._id } },
      { query: GET_ALL_PUESTOS_USERS}
    ],
  });

  const [UserPuestosAdd] = useMutation(ADD_USER_PUESTO, {
    refetchQueries: [
      { query: GET_USER_AVAILABLE, variables: { puesto: state._id } },
      { query: GET_USER_ADMIN, variables: { puesto: state._id } },
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

  const handleAdd = async () => {
    if (NombrePuesto !== "" && AreaProyecto !== "") {
      const res = await createPuesto({
        variables: {
          input: {
            NombrePuesto: formulario.NombrePuesto,
            AreaProyecto: formulario.AreaProyecto,
            PuestoSuperior: formulario.PuestoSuperior,
            Descripcion: formulario.Descripcion,
            NombreUsuarioPuestoSuperior: formulario.NombreUsuario,
            idUsuarioPuestoSuperior: formulario.idUsuario,
          },
        },
      });

      if (res.data) {

        seleccionados?.map((lis: any) => {
          const usuarioActualizado = UserPuestosAdd({
            variables: {
              addUserPuestoId: lis._id,
              puestoId: res.data.CREATE_PUESTO.id,
            },
          });
        });

        setAddPuestoOpen();
        // Dispatch data
        // Clean Modal
        reset();

        await props.getDatos();
        SuccessfulAlert({text: "Registro creado con ??xito"});
      }
    } else ErrorAlert({ text: "Nombre de Puesto y Area son requeridos." });
  };

  const onChange2 = (e: any) => {
   
    var valores = e.target[e.target.selectedIndex].value.split("-");
    formulario.idUsuario = e.target[e.target.selectedIndex].id;
    formulario.NombreUsuario = valores[1].trim();
    formulario.PuestoSuperior = valores[0].trim();
  };

  function UserPuestoLibre() {
    const agregaSeleccionadas = (objeto: any) => {
      setSeleccionados([
        ...seleccionados,
        {
          _id: objeto._id
          ,ImagenUsuario: objeto.ImagenUsuario
          ,NombreUsuario: objeto.NombreUsuario
          ,ApellidoUsuario: objeto.ApellidoUsuario
          ,PrimerNombre: objeto.PrimerNombre
          ,Usuario: objeto.Usuario
        },
      ]);

      const nuevoSeleccionadas = estadoInicial.filter(
        (lis) => lis?._id !== objeto._id
      );
      
      setEstadoInicial(nuevoSeleccionadas);
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
                    agregaSeleccionadas({
                      _id: lis._id,
                      ImagenUsuario: lis.ImagenUsuario,
                      NombreUsuario: lis.NombreUsuario,
                      ApellidoUsuario: lis.ApellidoUsuario,
                      PrimerNombre: lis.PrimerNombre,
                      Usuario: lis.Usuario,
                    })
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

  function UserAsignadoPuesto() {
    const eliminaSeleccionada = (objeto: any) => {
      console.log("info 0", disponibles)
      const agregaSeleccionadas = disponibles.filter(
        (lis: any) => lis?._id === objeto._id
      );
      console.log("info 0", disponibles)
      agregaSeleccionadas.map((lis: any) => {
        setEstadoInicial([...estadoInicial, lis]);
      });
      const eliminaDisponibles = seleccionados.filter(
        (lis: any) => lis?._id !== objeto._id
      );
      setSeleccionados(eliminaDisponibles);
    };

    const sidebar = (
      <Box className="contenedorUsuariosPuesto">
        <ul className="ulLista">
          {seleccionados?.map((lis: any) => (
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
                      eliminaSeleccionada({
                        _id: lis._id,
                      })
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
        open={addPuestoOpen}
        fullWidth={true}
        maxWidth={"md"}
      >
        <div className="contenedorTituloModale">
          <p className="titulo">Crear Puesto</p>
        </div>

        <DialogContent className="dialogoContento">
          <Grid item xs={6} className="ColumnaEditarPuesto">
            <Grid className="titulos">
              <span>Informaci??n general del puesto</span>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={3}>
                <div className="espacioTitulos">
                  <span>Nombre Puesto: </span>
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
                  <span>??rea: </span>
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
                    {proyectos?.map((proyectos: any) => (
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
                  <span>Puesto superior: </span>
                </div>
              </Grid>
              <Grid item xs={9}>
                <div>
                  <Select
                    native
                    input={<OutlinedInput />}
                    className="inputSelect"
                    onChange={(e) => {
                      onChange2(e);
                    }}
                  >
                    <option value="" className="optionSelect">
                      Busca o elige un puesto
                    </option>
                    {Superior?.map((Superior) => (
                      <option
                        className="optionSelect"
                        key={Superior?.idUsuario}
                        id={Superior?.idUsuario}
                        value={
                          Superior?.NombrePuesto +
                          " - " +
                          Superior?.NombreUsuario
                        }
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
                  <span className="tituloDescripcion">Descripci??n:</span>
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

              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <div className="espacioTitulosEdit">
                    <span>Colaborador:</span>
                  </div>
                </Grid>
                <Grid item xs={9}>
                  <UserAsignadoPuesto />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6} className="ColumnaEditarPuesto">
            <Grid className="titulos">
              <span>??Deseas agregar un colaborador al puesto?</span>
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
          <Button autoFocus onClick={handleAdd} className="buttonSave">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CrearPuestoModal;
