import { Badge } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';

const NotificationHeader = () => {
    return (
        <Badge badgeContent={1} color="secondary" className="colum">
            <NotificationsIcon id="IconNotification" />
        </Badge>
    )
}

export default NotificationHeader;