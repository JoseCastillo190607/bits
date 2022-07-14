import { Box } from '@material-ui/core';
import { useState } from 'react';
import './RigthSideBar.css';
import Stadisticts from './Fields/Stadisticts';
import ItsMyBirthday from './Fields/ItsMyBirthday';
import CurrentNews from './Fields/CurrentNews';

const RigthSideBar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleMenuRight = () => {
        if (isOpen) {
            document.documentElement.style.setProperty('--widthMenuRigth', 'auto');
            document.documentElement.style.setProperty('--visibilityRigth', 'visibility');
            setIsOpen(false);
        } else {
            document.documentElement.style.setProperty('--widthMenuRigth', '15px');
            document.documentElement.style.setProperty('--visibilityRigth', 'hidden')
            setIsOpen(true);
        }
    }
    return (
        <nav className="RigthSideBar">
            <Box mr={1} mt={2}>
                <div id="IconMenuRigth">
                    <img alt="Dashbaord" onClick={handleMenuRight} />
                </div>
                <Stadisticts />
            </Box>

            <ItsMyBirthday />

            <CurrentNews />
        </nav>
    );
};

export default RigthSideBar;