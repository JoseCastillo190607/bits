import { useEffect, useState, useContext } from "react";
import {
  Grid,
  Tooltip,
  Box,
  Input,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  getAllSedes,
  postSede,
  putSede,
  deleteSede,
} from "../../services/sedeService";
import { ErrorAlert } from "../../alerts/errorAlert";
import ModalContext from "../../context/ModalContext/ModalContext";
import AddRegisterModal from "./Modals/AddRegisterModal";
import { ISede } from "../../interfaces/Sede";
import { openModal, closeModal } from "./Modals/Modal";
import { DeleteAlert } from "../../alerts/deleteAlerts";
import { AdminContext } from "../../context/AdminContext/AdminContext";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { GET_ALL_SEDE, CREATE_SEDE, UPDATE_SEDE, DELETE_SEDE } from "../../Querys/querys";
import { useQuery } from "@apollo/client";

import { useMutation } from "@apollo/client";
import { SuccessfulAlert } from "../../alerts/successAlerts";

const Sedes = () => {
  const [sedes, setSedes] = useState<Array<ISede>>([]);
  const [sede, setSede] = useState<string>("");
  const { state, dispatch } = useContext(ModalContext);
  const { adminState, adminDispatch } = useContext(AdminContext);
  const [active, setActive] = useState(false);

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);

  const resultSede = useQuery(GET_ALL_SEDE);
  const allSede = resultSede.data?.GET_ALL_SEDE;

  const [createNewSede] = useMutation(CREATE_SEDE, {
      refetchQueries: [{ query: GET_ALL_SEDE }],
    });

    const [updateSede] = useMutation(UPDATE_SEDE, {
      refetchQueries: [{ query: GET_ALL_SEDE }],
  });


  const [deleteSede] = useMutation(DELETE_SEDE, {
      refetchQueries: [{ query: GET_ALL_SEDE }],
    });
  


  useEffect(() => {
    getSedes();
  }, []);

  const getSedes = async (): Promise<void> => {
    // const request = await getAllSedes();
    setSedes(allSede);
  };

  const onSubmitSede = async (e: any): Promise<void> => {
    e.preventDefault();
    if (sede !== "" && sede.trim().length > 0) {
      // await postSede(sede);
      createNewSede({
        variables: {
          input: {
            sedeName: sede
          },
        },
      }).then(()=>{
        SuccessfulAlert({text:"Sede creada con éxito"})
    });
      await setSede("");
      // await getSedes();
    } else ErrorAlert({ text: "Ingrese el Nombre de la Sede." });
  };

  const onDeleteSede = async (_id: string): Promise<void> => {
    const result = await DeleteAlert(`¿Deseas eliminar la sede?`);
    if (result) {
      // await deleteSede(_id);
      // await getSedes();
      deleteSede({
        variables: {
            deleteSedeId: _id,
        },
      }).then(()=>{
        SuccessfulAlert({text:" Sede eliminada con éxito"})
    });
    }
  };

  const onUpdateSede = async (value: string): Promise<void> => {
    if (value !== "") {
      await closeModal(dispatch);
      // await putSede(state._id, value);
      // await getSedes();
      updateSede({
        variables: {
            updateSedeId: state._id,
          input: {
            sedeName: value,
          },
        },
      }).then(()=>{
        SuccessfulAlert({text:" Sede actualizada con éxito"})
    });
    } else ErrorAlert({ text: "Ingrese el Nombre de la Sede." });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const toggle = () => {
    setActive(!active);
  };

  console.log("Permisos");

  return (
    <Box>
      <Box m={3} mb={0} mt={1}>
        <Grid direction="row" container>
          <Grid xs="auto" item>
            <h4>Sedes</h4>
          </Grid>
          <Grid xs item container justify="flex-end">
            {adminState?.PermisosContex?.Modulos?.EstructuraEquipo?.Sedes
              ?.Editar === true ? (
              <Box mt={2}>
                <Input
                  placeholder="Nombre de sede"
                  value={sede}
                  inputProps={{ "data-testid": "newSede" }}
                  onChange={(e) => setSede(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <Tooltip
                        title="Agregar"
                        placement="right"
                        className="cursorPointer"
                      >
                        <button
                          type="button"
                          className="ButtonWhitOutStyles"
                          onClick={onSubmitSede}
                        >
                          <img
                            src="/assets/svg/icono-agregar.svg"
                            alt="Agregar"
                          />
                        </button>
                      </Tooltip>
                    </InputAdornment>
                  }
                />
              </Box>
            ) : null}
          </Grid>
        </Grid>
      </Box>
      <div className="container">
        {sedes?.map(({ id, sedeName }: ISede, index: number) => (
          <Box className="rowContainer" key={index} mt={0}>
            <Grid direction="row" container>
              <Grid xs={9} item className="SedeText">
                {sedeName}
              </Grid>
              <Grid
                xs
                item
                className="inline-block"
                direction="row"
                container
                justify="flex-end"
              >
                <div>
                  <Tooltip title="Editar / Borrar" placement="right">
                    <div>
                      <IconButton
                        style={{ padding: "0" }}
                        onClick={handleClick}
                      >
                        <MoreVertIcon style={{ color: "#fabb00" }} />
                      </IconButton>
                    </div>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    onClose={() => setAnchorEl(null)}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      divider
                      button
                      onClick={() =>
                        openModal(
                          { id, value: sedeName, title: "Editando Sede" },
                          dispatch
                        )
                      }
                    >
                      Editar&nbsp;
                      <Grid container item justify="flex-end">
                        <EditIcon color="primary" />
                      </Grid>
                    </MenuItem>
                    <MenuItem button onClick={() => onDeleteSede(id)}>
                      Eliminar&nbsp;
                      <Grid container item justify="flex-end">
                        <DeleteIcon sx={{ color: "red" }} />
                      </Grid>
                    </MenuItem>
                  </Menu>
                </div>
                {/* {adminState?.PermisosContex?.Modulos?.EstructuraEquipo?.Sedes
                  ?.Eliminar === true ? (
                  <Tooltip title="Eliminar" placement="right">
                    <div
                      className="IconButton"
                      onClick={() => onDeleteSede(_id)}
                    >
                      <img
                        src="/assets/svg/icono-eliminar.svg"
                        alt="Eliminar"
                      />
                    </div>
                  </Tooltip>
                ) : null}
                {adminState?.PermisosContex?.Modulos?.EstructuraEquipo?.Sedes
                  ?.Editar === true ? (
                  <Tooltip title="Editar" placement="right">
                    <div
                      className="IconButton"
                      onClick={() =>
                        openModal(
                          { _id, value: nombreSede, title: "Editando Sede" },
                          dispatch
                        )
                      }
                    >
                      <img src="/assets/svg/icono-editar.svg" alt="Editar" />
                    </div>
                  </Tooltip>
                ) : null} */}
              </Grid>
            </Grid>
          </Box>
        ))}
      </div>
      <AddRegisterModal updateFunc={onUpdateSede} />
    </Box>
  );
};

export default Sedes;
