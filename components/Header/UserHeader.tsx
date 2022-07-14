import { withStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Badge, Avatar } from '@material-ui/core';
import PropTypes from "prop-types";
import { useContext } from "react";
import { AdminContext } from '../../context/AdminContext/AdminContext';

const styles = () => ({
    badge: {
        backgroundColor: "#6dd400",
        height: 10,
        width: 10
    }
});

const UserHeader = ({ classes }: any) => {
    const { adminState } = useContext(AdminContext);
    const { Nombre, image } = adminState!;
    return (
        <>
            <Badge
                classes={{ badge: classes.badge }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                overlap="circle"
                badgeContent=" "
                variant="dot"
                color="secondary"
            >
                <Avatar alt={Nombre} src={image}/>
            </Badge>
            <span className="nameAdmin">{Nombre}</span>
            <KeyboardArrowDownIcon />
        </>
    )
};

UserHeader.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserHeader);