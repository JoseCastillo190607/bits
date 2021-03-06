import { IconButton, Tooltip, Box, Menu, MenuItem, Grid } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AdminContext } from "../../../context/AdminContext/AdminContext";
import CollaboratorContext, { Types } from "../../../context/CollaboratorContext/CollaboratorContext";

const MenuList = (props: any) => {

    const { dispatch } = useContext(CollaboratorContext);
    const {adminState} = useContext(AdminContext)
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const history = useHistory();

    const openModalDecline = () => {
        dispatch({ type: Types.DECLINE_MODAL, payload: { id: props.id } });
        setAnchorEl(null);
    }

    const openModalConvert = () => {
        dispatch({
            type: Types.CONVERT_MODAL,
            payload: {
                _id: `${props.id}/${props.dateOfAdmission}/${props.bussinesName}`
            }
        });
        setAnchorEl(null);
    }

    return (
        <>
            <Tooltip title="Editar" placement="right">
                <Box className="IconButtonPoints" mr={2}>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <MoreVertIcon style={{ color: "#fabb00" }} />
                    </IconButton>
                </Box>
            </Tooltip>
            <Menu
                className="MoreVerIcon"
                anchorEl={anchorEl}
                open={open}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={() => setAnchorEl(null)}
            >
                {(adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Convertir) === true?
                <MenuItem divider button onClick={openModalConvert} disabled={props.done ? false : true}>
                    Convertir&nbsp;
                    <Grid container item justify="flex-end">
                        <img src={`/assets/svg/icono-convertir.svg`} alt="Convertir" />
                    </Grid>
                </MenuItem>
                :null
                }
                {(adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver.Acceso) === true?
                <MenuItem button divider onClick={() => history.push(`/nuevoingreso/${props.id}/1`)}>
                    Ver&nbsp;
                    <Grid container item justify="flex-end">
                        <img src="/assets/svg/icono-ver.svg" alt="Ver" />
                    </Grid>
                </MenuItem>
                :null
                }
                {(adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Declinar) === true?
                <MenuItem button onClick={openModalDecline}>
                    Declinar&nbsp;
                    <Grid container item justify="flex-end">
                        <img src="/assets/svg/icono-declinar.svg" alt="Declinar" />
                    </Grid>
                </MenuItem>
                :null
                }
            </Menu >
        </>
    )
}

export default MenuList;