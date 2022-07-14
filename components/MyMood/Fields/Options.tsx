import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState, MouseEvent } from "react";

const Options = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (e: MouseEvent<HTMLElement>): void => {
        setAnchorEl(e.currentTarget);
    };

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
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem divider>
                    Ver&nbsp;
                    <Grid container item justify="flex-end">
                        <img src="assets/svg/icono-ver.svg" alt="Ver" />
                    </Grid>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Options;