import {
    Popper,
    Grow,
    Paper,
    MenuList,
    MenuItem,
    Box
} from '@material-ui/core';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext/AdminContext';
import { startLogout } from '../../actions/auth';

const PopperHeader = ({ open, anchorRef }: any) => {

    const { adminDispatch } = useContext(AdminContext);

    return (
        <Box zIndex="tooltip">
            <Popper data-testid="PopperMenu" open={open} anchorEl={anchorRef.current} transition disablePortal placement='bottom-end'>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onClick={() => startLogout(adminDispatch!)}>
                                <MenuItem>Cerrar Sesión</MenuItem>
                            </MenuList>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Box>
    );
};

export default PopperHeader;