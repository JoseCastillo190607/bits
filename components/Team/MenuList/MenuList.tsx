import { useContext, useState } from "react";
import { Box, Tooltip, IconButton, Menu, MenuItem, Grid } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { openModal } from '../Modals/Modal';
import ModalContext from "../../../context/ModalContext/ModalContext";
import { useHistory } from "react-router-dom";
import { AdminContext } from '../../../context/AdminContext/AdminContext';


interface Item {
    _id: string;
    value: string;
    client?: string;
    onDelete: (_id: string) => void;
    icon?: string | null;
    permissions?: boolean | null;
    Usuario?:string| null;
}

const MenuButton = (props: Item) => {
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const { dispatch } = useContext(ModalContext);
    const { adminState, adminDispatch } = useContext(AdminContext);
    const history = useHistory();
    const open = Boolean(anchorEl);
    const openMenu = (e: any): void => {
        setAnchorEl(e.currentTarget);
    };

    const editModal = (): void => {
        setAnchorEl(null);
        openModal({ ...props, title: "Editar Administrador" }, dispatch);
    };
    
    const onDelete = (): void => {
        setAnchorEl(null);
        props.onDelete(props._id);
    }
    return (
        <>
            <Tooltip title="Editar" placement="right" >
                <Box className="IconButtonPoints" mr={2}>
                    <IconButton onClick={openMenu}>
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
                {(adminState?.PermisosContex?.Modulos?.Colaboradores?.Administradores?.Eliminar === true)?
                <MenuItem divider button onClick={onDelete}>
                    Eliminar&nbsp;
                    <Grid container item justify="flex-end">
                        <img src={`/assets/svg/icono-${(props.icon) ? props.icon : "eliminar"}.svg`} alt="Eliminar" />
                    </Grid>
                </MenuItem>
                :null
                }

                {(adminState?.PermisosContex?.Modulos?.Colaboradores?.Administradores?.Editar === true)?
                    <MenuItem button divider onClick={() => history.push(`/Administrador/${props.Usuario}/${props._id}`)}>
                        Editar&nbsp;
                        <Grid container item justify="flex-end">
                            <img src="/assets/svg/icono-editar.svg" alt="Editar" />
                        </Grid>
                        </MenuItem> : null
                }
            </Menu >
        </>
    )
}

export default MenuButton;