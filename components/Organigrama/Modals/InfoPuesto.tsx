import  { useState, useEffect, useContext } from "react";
import {
  Grid,
  Dialog,
  DialogContent,
  Box,
  TextField,
} from "@material-ui/core";
import { closeOrganigramaModal } from "../../Team/Modals/ModalOrganigramaModal";
import {
  getUsersDisponiblesPuesto,
  putUserPuestos,
} from "../../../services/auth/userService";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../Organigrama.css";
import OrganigramaContext from "../../../context/OrganigramaContext/OrganigramaContext";
import HistorialPuesto from "../HistorialPuesto";
import ImagenColaborador from "../ImagenColaborador";
import { useQuery } from "@apollo/client";
import { GET_USER_ADMIN } from "../../../Querys/querys";

const InfoPuesto = () => {
  const { state, dispatch } = useContext(OrganigramaContext);
  const [cambio, setCambio] = useState(0);
  const [adminsDisponibles, setUserDisponibles] = useState([]);

  const handleClose = async () => {
    await closeOrganigramaModal(dispatch);
  };

  function UsuariosDisponibles() {
    const agregaUsuario = async (
      idUsuario: any,
      idPuesto: any,
      Puesto: any
    ) => {
      let mensaje = `Usuario agregado a ${state.value}`;
      if (idPuesto === "vacio") {
        let idPuestoActualizado = state._id;
        let PuestoActualizado = state.value;
        const usuarioActualizado = await putUserPuestos(
          idUsuario,
          state._id,
          state.client,
          mensaje
        );
        setCambio(cambio + 1);
      } else {
        let idPuestoActualizado = `${state._id},${idPuesto}`;
        let PuestoActualizado = `${state.value},${Puesto}`;
        const usuarioActualizado = await putUserPuestos(
          idUsuario,
          state._id,
          state.client,
          mensaje
        );
        setCambio(cambio + 1);
      }
    };

    useEffect(() => {
      obtenerDatos();
    }, []);

    const obtenerDatos = async () => {
      let admins = await getUsersDisponiblesPuesto(state._id);
      setUserDisponibles(admins.data);
    };

    const sidebar = (
      <Box className="contenedorUsuarios">
        <ul>
          {adminsDisponibles?.map((lis: any) => (
            <li key={lis._id} className="contenedorLista">
              <Box className="listaAdministradores">
                <Box>
                  <img
                    src={lis.img ? lis.img : "/assets/svg/user-avatar.svg"}
                    alt="img"
                    className="imgCollaborator__BITS"
                  />
                </Box>
                <Box>
                  <p className="textoLista" title={lis.Usuario}>
                    {lis.Nombre}
                  </p>
                </Box>
              </Box>
              <Box>
                <AddCircleIcon
                  className="botonAgregar"
                  onClick={() =>
                    agregaUsuario(lis._id, state._id, state.client)
                  }
                />
              </Box>
            </li>
          ))}
        </ul>
      </Box>
    );
    return <div>{sidebar}</div>;
  }

  function UserAsignadoPuesto() {
    const [userDisponibles, setUserDisponibles] = useState([]);
    const eliminaUsuario = async (
      idUsuario: any,
      idPuesto: any,
      Puesto: any
    ) => {
      let mensaje = `Usuario eliminado de ${state.value}`;
      if (idPuesto === "vacio") {
        let idPuestoActualizado = state._id;
        let PuestoActualizado = state.NombrePuesto;
        const usuarioActualizado = await putUserPuestos(
          idUsuario,
          idPuestoActualizado,
          PuestoActualizado,
          mensaje
        );
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

    const resultPuestosAsignados = useQuery(GET_USER_ADMIN, {
      variables: { puesto: state._id },
    });
    
    const obtenerDatos = async () => {
      let admins = await resultPuestosAsignados.data?.GET_USER_ADMIN;
      setUserDisponibles(admins);
    };

    const sidebar = (
      <Box className="contenedorUsuariosPuestoInfo">
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
              </div>
            </li>
          ))}
        </ul>
      </Box>
    );
    return <div>{sidebar}</div>;
  }

  return (
    <Dialog
      aria-labelledby="costumized-dialog-title"
      open={state.showInformacion}
      fullWidth={true}
      onClose={handleClose}
      maxWidth={"sm"}
    >
      <div className="contenedorTituloModal">
        <p className="titulo">Información del puesto</p>
      </div>
      <DialogContent className="dialogoContent">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="espacioTitulos">
              <span>Nombre del puesto</span>
            </div>
          </Grid>
          <Grid item xs={9}>
            <TextField
              error={false}
              type="text"
              variant="outlined"
              size="small"
              className="inputInfoPuesto"
              disabled
              value={state.NombrePuesto}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="espacioTitulos">
              <span>Área</span>
            </div>
          </Grid>
          <Grid item xs={9}>
            <TextField
              error={false}
              type="text"
              variant="outlined"
              size="small"
              className="inputInfoPuesto"
              disabled
              value={state.AreaProyecto}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="espacioTitulos">
              <span>Puesto superior</span>
            </div>
          </Grid>
          <Grid item xs={9}>
            <TextField
              error={false}
              type="text"
              variant="outlined"
              size="small"
              className="inputInfoPuesto"
              disabled
              value={state.PuestoSuperior}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="espacioTitulos">
              <span>Colaborador</span>
            </div>
          </Grid>
          <Grid item xs={9}>
            <UserAsignadoPuesto />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="espacioTitulos">
              <span>Descripción</span>
            </div>
          </Grid>
          <Grid item xs={9}>
            <TextField
              error={false}
              type="text"
              variant="outlined"
              multiline
              rows={4}
              size="small"
              value={state.Descripcion}
              disabled
              className="espacioTextAreaInfoPuesto"
              placeholder="Escribe lo que se debe realizar en el puesto..."
            />
          </Grid>
        </Grid>

        <HistorialPuesto idPuesto={state._id} />
      </DialogContent>
      <div className="contenedorBotonCerrarInfo">
        <button className="botonCerrarInfo" onClick={handleClose}>
          <div className="alignContenedorBoton">
            <span className="textoBotonCerrar">Cerrar</span>
          </div>
        </button>
      </div>
    </Dialog>
  );
};

export default InfoPuesto;
