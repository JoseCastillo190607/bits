import { useState } from "react";
import "./infromacionGral.css";
import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Grid,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Modal from "../Portal/Modal";
import { useMutation } from "@apollo/client";
import {
  GET_ALL_ENTERPRISE,
  DELETE_ENTERPRISE,
  GET_ENTERPRISE,
} from "../../Querys/querys";
import ModalEditEmpresa from "./ModalEditEmpresa/ModalEditEmpresa";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "@apollo/client";
import ModalEliminaEmpres from "./ModalEditEmpresa/ModalEliminaEmpresa";

function Enterprise({ name, rfc, cuentaBancaria, id }: any) {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const [deleteEmpresa] = useMutation(DELETE_ENTERPRISE, {
    refetchQueries: [{ query: GET_ALL_ENTERPRISE }],
  });
  const [active, setActive] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggle = () => {
    setActive(!active);
  };

  const result = useQuery(GET_ENTERPRISE, {
    variables: { getEnterpriseId: id },
  });

  const enterprise = result.data?.GET_ENTERPRISE;

  const onDelete = () => {
    deleteEmpresa({
      variables: {
        deleteEnterpriseId: id,
      },
    });
    alert("La empresa ha sido eliminada");
  };
  return (
    <div className="cuadroEmpresa flex">
      <div className="lineaIzquierda"></div>
      <div className="contenedorDatosEmpresa ml-12">
        <div className="flex mt-12">
          <div>
            <span className="tituloContenedorEmpresa">{name}</span>
          </div>
          <div>
            <Modal active={active} toggle={toggle}>
              <ModalEditEmpresa
                id={id}
                toggle={toggle}
                enterprise={enterprise?.name}
                taxRegime={enterprise?.taxRegime}
                adress={enterprise?.address}
                state={enterprise?.state}
                zipCode={enterprise?.zipCode}
              />
            </Modal>
            <Tooltip title="Editar / Borrar" placement="right">
              <div>
                <IconButton style={{ padding: "0" }} onClick={handleClick}>
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
              <MenuItem divider button onClick={toggle}>
                Editar&nbsp;
                <Grid container item justify="flex-end">
                  <EditIcon color="primary" />
                </Grid>
              </MenuItem>
              <MenuItem button onClick={onDelete}>
                Eliminar&nbsp;
                <Grid container item justify="flex-end">
                  <DeleteIcon sx={{ color: "red" }} />
                </Grid>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <Box m={0} p={0}>
          <p className="tituloTarjeta">Razón Social</p>
          <p className="pdata">{name}</p>

          <p className="tituloTarjeta">RFC</p>
          <p className="pdata">{rfc}</p>

          <p className="tituloTarjeta">Cuenta Bancaria</p>
          <p className="pdata">{cuentaBancaria}</p>
        </Box>
      </div>
      <ModalEliminaEmpres />
    </div>

  );
}

export default Enterprise;
