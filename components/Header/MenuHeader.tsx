import { useRef, useState } from 'react';
// import NotificationHeader from './NotificationHeader';
import { Button } from '@material-ui/core';
import UserHeader from './UserHeader';
import PopperHeader from './PopperHeader';

const BodyHeader = () => {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };
    return (
        <>
            {/* <NotificationHeader /> */}

            <Button className="UserButton" data-testid="userButton" ref={anchorRef} onClick={handleToggle}>
                <UserHeader />
            </Button>

            <PopperHeader anchorRef={anchorRef} open={open} />
        </>
    );
};



export default BodyHeader;