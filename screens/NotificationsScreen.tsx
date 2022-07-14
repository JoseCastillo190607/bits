import { Box, Grid } from "@material-ui/core";
import '../components/Notification/Notifications.css';
import ModalNotification from "../components/Notification/Modals/ModalNotification";
import ModalState from "../context/ModalContext/ModalState";
import Body from "../components/Notification/Body";

const NotificationsScreen = () => {
    return (
        <ModalState>
            <Box mt={3} ml={5} className="Title" mb={2}>
                Notificaciones
            </Box>
            <Box p={1}>
                <Grid style={{ background: 'white' }}>
                    <Body />
                </Grid>
            </Box>
            <ModalNotification />
        </ModalState>
    )
};

export default NotificationsScreen;
