import React, { useState } from "react";
import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Grid,
} from "@material-ui/core";
import style from "./TableOutsources.module.css";
import {
  GET_ALL_OUTSOURCERS,
  DELETE_OUTSOURCERS,
  GET_OUTSOURCER,
} from "../../../Querys/querys";
import Modal from "../../Portal/Modal";
import ModalEditOutsourcers from "../ModalEditOutsourcers/ModalEditOutsourcers";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { SuccessfulAlert } from "../../../alerts/successAlerts";

function OutsourcesCard({ id, logo, nombre, razonSocial }: any) {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [active, setActive] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [deleteOutsorce] = useMutation(DELETE_OUTSOURCERS, {
    refetchQueries: [{ query: GET_ALL_OUTSOURCERS }],
  });
  const toggle = () => {
    setActive(!active);
  };

  const onDelete = () => {
    deleteOutsorce({
      variables: {
        deleteOutsourcersId: id,
      },
    }).then(()=>{
      SuccessfulAlert({text:"Outsourcer eliminado con ?xito"});
  });
  };

  const result = useQuery(GET_OUTSOURCER, {
    variables: { getOutsourcersId: id },
  });

  const outsourcer = result.data?.GET_OUTSOURCERS;

  return (
    <Box className={style.boxDataSourcers}>
      <Modal active={active} toggle={toggle}>
        <ModalEditOutsourcers
          toggle={toggle}
          id={outsourcer?.id}
          nombre={outsourcer?.nombre}
          logo={outsourcer?.logo}
          razonSocial={outsourcer?.razonSocial}
          rfc={outsourcer?.rfc}
          numeroDeRepse={outsourcer?.numeroDeRepse}
          sitioWeb={outsourcer?.sitioWeb}
          direccionEmpresa={outsourcer?.direccionEmpresa}
          direccionFiscal={outsourcer?.direccionFiscal}
          nombreDeContacto={outsourcer?.nombreDeContacto}
          correoContacto={outsourcer?.correoContacto}
          telefonoContacto={outsourcer?.telefonoContacto}
          comentariosAdicionales={outsourcer?.comentariosAdicionales}
        />
      </Modal>
      <Box className={style.boxLogoName}>
        <img alt={logo} />
        <Box m={1}>{nombre}</Box>
      </Box>
      <Box className={style.boxRazonSocial}>{razonSocial}</Box>
      <Box className={style.boxTooltip}>
        <Tooltip title="Editar / Borrar" placement="right">
          <Box className="IconButtonPoints" mr={2}>
            <IconButton onClick={handleClick}>
              <MoreVertIcon style={{ color: "#fabb00" }} />
            </IconButton>
          </Box>
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
      </Box>
    </Box>
  );
}

export default OutsourcesCard;
