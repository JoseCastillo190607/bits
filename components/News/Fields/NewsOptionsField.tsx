import { MouseEvent, useContext, useState } from 'react';
import { Tooltip, Box, Menu, MenuItem, Grid, IconButton } from '@material-ui/core';
import { INews } from '../../../interfaces/News.interfaces';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { NewsContext, Types } from '../../../context/NewContext/NewContext';
import { WarningAlert } from '../../../alerts/WarningAlert';
import { deletetNew } from '../../../services/newService';
import { AdminContext } from '../../../context/AdminContext/AdminContext';

const NewsOptionsField = (props: INews) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {adminState} = useContext(AdminContext)
    const { dispatch } = useContext(NewsContext);

    const handleOpen = (e: MouseEvent<HTMLElement>): void => {
        dispatch({ type: "DELETE_NEW" });
        setAnchorEl(e.currentTarget);
    };

    const handleClose = (): void => setAnchorEl(null);

    const deleteNew = async (): Promise<void> => {
        handleClose();
        let response = await WarningAlert({ title: "¿Deseas Eliminar la noticia?", showDenyButton: true, confirmButtonText: "Eliminar" });
        if (response.isConfirmed) {
            await deletetNew(props._id);
            dispatch({ type: Types.CLOSE_MODAL });
        }
    }

    const showNew = (): void => {
        handleClose();
        let values = {
            _id: props._id,
            titulo: props.Titulo,
            BodyHTML: props.BodyHTML,
            ImageUri: props.ImageUri,
            Autor: props.Autor
        }
        dispatch({ type: Types.OPEN_MODAL_SHOW, payload: { values } });
    }

    const resendNew = (): void => {
        handleClose();
        let values = {
            _id: props._id,
            titulo: props.Titulo,
            BodyHTML: props.BodyHTML,
            ImageUri: props.ImageUri,
            Autor: props.Autor,
            projects: props.Proyectos,
            AutorImg: props.AutorImg
        }
        dispatch({ type: Types.OPEN_RESEND, payload: { values } });
    }

    return (
        <div>
            <Box className="IconButtonPoints">
                <Tooltip title="Opciones" placement="right">
                    <IconButton onClick={handleOpen} aria-controls="fade-menu" aria-haspopup="true">
                        <MoreVertIcon style={{ color: "#fabb00" }} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                {(adminState?.PermisosContex?.Modulos?.Noticias?.VistaPrevia) === true?
                    <MenuItem divider onClick={showNew}>
                        Ver&nbsp;
                        <Grid container item justify="flex-end">
                            <img src="assets/svg/icono-ver.svg" alt="Ver" />
                        </Grid>
                    </MenuItem>
                    :null
                }
                {(adminState?.PermisosContex?.Modulos?.Noticias?.Editar) === true?
                    <MenuItem divider onClick={resendNew}>
                        Editar&nbsp;
                        <Grid container item justify="flex-end">
                            <img src="assets/svg/icono-editar.svg" alt="Ver" />
                        </Grid>
                     </MenuItem>
                    :null
                }
                {(adminState?.PermisosContex?.Modulos?.Noticias?.Eliminar) === true?
                    <MenuItem onClick={deleteNew}>
                        Eliminar&nbsp;
                        <Grid container item justify="flex-end">
                            <img src="assets/svg/icono-eliminar.svg" alt="Eliminar" />
                        </Grid>
                    </MenuItem>
                    :null
                }
            </Menu>
        </div>
    )
}

export default NewsOptionsField;
