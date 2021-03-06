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
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useForm } from "../../../../hooks/useForm";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import "./inactiveCollaboratorModal.css";
import { validateDataCollaborator } from "../../../../helpers/validData";
import { CollaboratorModal } from "../../../../interfaces/TabCollaborator.interfaces";
import { useEffect, useState, useContext } from "react";
import { getAllSedes } from "../../../../services/sedeService";
import { ISede } from "../../../../interfaces/Sede";
import { getAllClients } from "../../../../services/clientService";
import { IClient } from "../../../../interfaces/Client";
import { IProject } from "../../../../interfaces/Project";
import { getProjectByClient } from "../../../../services/projectService";
import { addCollaborator } from "../../../../services/collaboratorService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { TabCollaboratorContext } from "../../../../context/TabCollaboratorContext/TabCollaboratorContext";
import { addNewCollaborator } from "../../../../actions/tabColabortor";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";

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

const AddCollaboratorModal = () => {
  const {
    Nombre,
    ApellidoPaterno,
    ApellidoMaterno,
    FechaNacimiento,
    FechaIngreso,
    email,
    Sede,
    Cliente,
    Proyecto,
    bussinesName,
    onChange,
    formulario,
    reset,
    setForm,
  } = useForm<CollaboratorModal>({
    Nombre: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    FechaNacimiento: "",
    FechaIngreso: "",
    email: "",
    Sede: "",
    Cliente: "",
    Proyecto: "",
    bussinesName: "",
    terminationDate:"",
  });

  const [sedes, setSedes] = useState<ISede[]>([]);
  const [clientes, setClientes] = useState<IClient[]>([]);
  const [proyectos, setProyectos] = useState<IProject[]>([]);
  const { addCollaboratorOpen, setAddCollaboratorOpen, collaboratorDispatch } =
    useContext(TabCollaboratorContext);
  const { adminState } = useContext(AdminContext);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const sedesFetch = await getAllSedes();
    const clientesFetch = await getAllClients();

    setSedes(sedesFetch);
    setClientes(clientesFetch);
  };

  const handleClient = async (client: string) => {
    const projectsFetch = await getProjectByClient(client);

    if (client === "") {
      setProyectos([]);
      onChange(client, "Cliente");
    } else {
      setProyectos(projectsFetch);
      setForm((prevState) => ({ ...prevState, Proyecto: "", Cliente: client }));
    }
  };

  const handleClose = () => {
    // Clean modal
    reset();
    // Close modal
    setAddCollaboratorOpen();
  };

  const handleAdd = async () => {
    const isValid = await validateDataCollaborator(formulario);

    if (isValid) {
      formulario.Anfitrion = adminState?.Usuario;
      const res = await addCollaborator(formulario);

      if (res.data) {
        // Close modal
        setAddCollaboratorOpen();
        // Dispatch data
        collaboratorDispatch(
          addNewCollaborator({
            ...formulario,
            FullName: `${res.data.Nombre} ${res.data.ApellidoPaterno} ${res.data.ApellidoMaterno}`,
            _id: res.data._id,
          })
        );
        // Clean Modal
        reset();
        SuccessfulAlert({
          title: "??Exito!",
          text: "??Se ha a??adido el colaborador correctamente y se ha enviado un correo!",
        });
      }
    }
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={addCollaboratorOpen}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Nuevo Colaborador.
        </DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column">
            <Box mb={3}>
              <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                  <Grid item xs={4}>
                    <Box mb={1}>
                      <label>
                        Nombre (s): <label className="c-red">*</label>
                      </label>
                    </Box>

                    <TextField
                      error={false}
                      type="text"
                      variant="outlined"
                      size="small"
                      className="fullWidth"
                      value={Nombre}
                      onChange={({ target }) =>
                        onChange(target.value as string, "Nombre")
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Box mb={1}>
                      <label>
                        Apellido Paterno: <label className="c-red">*</label>
                      </label>
                    </Box>

                    <TextField
                      error={false}
                      type="text"
                      size="small"
                      variant="outlined"
                      className="fullWidth"
                      value={ApellidoPaterno}
                      onChange={({ target }) =>
                        onChange(target.value as string, "ApellidoPaterno")
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Box mb={1}>
                      <label>Apellido Materno:</label>
                    </Box>

                    <TextField
                      error={false}
                      type="text"
                      size="small"
                      variant="outlined"
                      className="fullWidth"
                      value={ApellidoMaterno}
                      onChange={({ target }) =>
                        onChange(target.value as string, "ApellidoMaterno")
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            <Box mb={3}>
              <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                  <Grid item xs={4}>
                    <Box mb={1}>
                      <label>
                        Fecha de nacimiento: <label className="c-red">*</label>
                      </label>
                    </Box>
                    <TextField
                      error={false}
                      type="date"
                      variant="outlined"
                      size="small"
                      className="fullWidth"
                      value={FechaNacimiento}
                      onChange={({ target }) =>
                        onChange(target.value as string, "FechaNacimiento")
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Box mb={1}>
                      <label>
                        Correo: <label className="c-red">*</label>
                      </label>
                    </Box>
                    <TextField
                      error={false}
                      type="email"
                      size="small"
                      variant="outlined"
                      placeholder="nombre@ejemplo.com"
                      className="fullWidth"
                      value={email}
                      onChange={({ target }) =>
                        onChange(target.value as string, "email")
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Box mb={1}>
                      <label>
                        Fecha de ingreso: <label className="c-red">*</label>
                      </label>
                    </Box>
                    <TextField
                      error={false}
                      type="date"
                      size="small"
                      variant="outlined"
                      className="fullWidth"
                      value={FechaIngreso}
                      onChange={({ target }) =>
                        onChange(target.value as string, "FechaIngreso")
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            <Box mb={3}>
              <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                  <Grid item xs={4}>
                    <Box mb={1}>
                      <label>
                        Sede: <label className="c-red">*</label>
                      </label>
                    </Box>
                    <FormControl
                      size="small"
                      variant="filled"
                      className="fullWidth"
                    >
                      <Select
                        native
                        value={Sede}
                        onChange={({ target }) =>
                          onChange(target.value as string, "Sede")
                        }
                        input={<OutlinedInput />}
                      >
                        <option value="">Selecciona Sede</option>
                        {sedes.map((sede,i) => (
                          <option key={i} value={sede.sedeName}>
                            {sede.sedeName}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Box mb={1}>
                      <label>
                        Cliente: <label className="c-red">*</label>
                      </label>
                    </Box>
                    <FormControl
                      size="small"
                      variant="filled"
                      className="fullWidth"
                    >
                      <Select
                        native
                        value={Cliente}
                        onChange={({ target }) =>
                          handleClient(target.value as string)
                        }
                        input={<OutlinedInput />}
                      >
                        <option value="">Selecciona Cliente</option>
                        {clientes.map((cliente,i) => (
                          <option
                            key={i}
                            value={cliente.clientName}
                          >
                            {cliente.clientName}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Box mb={1}>
                      <label>
                        Proyecto: <label className="c-red">*</label>
                      </label>
                    </Box>
                    <FormControl
                      size="small"
                      variant="filled"
                      className="fullWidth withoutBorder"
                    >
                      <Select
                        native
                        value={Proyecto}
                        onChange={({ target }) =>
                          onChange(target.value as string, "Proyecto")
                        }
                        input={<OutlinedInput />}
                      >
                        <option value="">Selecciona Proyecto</option>
                        {proyectos.length > 0 && (
                          <>
                            {proyectos.map((proyecto,i) => (
                              <option
                                key={i}
                                value={proyecto.proyectName}
                              >
                                {proyecto.proyectName}
                              </option>
                            ))}
                          </>
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} className="buttonCancel">
            Cerrar
          </Button>
          <Button autoFocus onClick={handleAdd} className="buttonSave">
            A??adir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCollaboratorModal;
