import { MouseEvent, useContext, useState } from 'react'
import { Box, Menu, MenuItem, Grid } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ICalendar } from '../../../interfaces/Calendar.interfaces';
import { deleteDate } from '../../../services/calendarService';
import { CalendarContext } from '../../../context/CalendarContext/CalendarContext';

const CalendarOptionsField = (props: ICalendar) => {
    const { dispatch } = useContext(CalendarContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (e: MouseEvent<HTMLElement>) => {
        dispatch({ type: "OPEN_MODAL" });
        setAnchorEl(e.currentTarget);
    };

    const handleDate = async () => {
        await deleteDate(props._id);
        await dispatch({ type: "CLOSE_MENU" });
        setAnchorEl(null);
    }

    const putDate = () => {
        dispatch({ type: "OPEN_MODAL_EDIT", payload: { data: props } });
        setAnchorEl(null);
    }
    return (
        <div>
            {
                props.tipo !== "Aniversario" &&
                props.tipo !== "Cumpleaños" &&
                <>
                    <Box>
                        <Tooltip title="Opciones" placement="right">
                            <Box className="IconButtonPoints">
                                <IconButton onClick={handleOpen} aria-controls="fade-menu" aria-haspopup="true">
                                    <MoreVertIcon style={{ color: "#fabb00" }} />
                                </IconButton>
                            </Box>
                        </Tooltip>
                    </Box>
                    <Menu
                        id="fade-menu"
                        anchorEl={anchorEl}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        keepMounted
                        open={open}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem divider onClick={putDate}>
                            Editar&nbsp;
                            <Grid container item justify="flex-end">
                                <img src="/assets/svg/icono-editar.svg" alt="Editar" />
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={handleDate}>
                            Eliminar&nbsp;
                            <Grid container item justify="flex-end">
                                <img src="/assets/svg/icono-eliminar.svg" alt="Eliminar" />
                            </Grid>
                        </MenuItem>
                    </Menu>
                </>
            }
        </div>
    )
}

export default CalendarOptionsField
