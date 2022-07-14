import { Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useEffect, useState } from 'react';

const LinkSideBar = ({ _id, path, name }: any) => {
    const [currentModule, setCurrentModule] = useState<string | null>('')
    useEffect(() => {
        setCurrentModule(localStorage.getItem('currentModule'));
    }, []);
    const handleActiveModule = (name: string) => {
        localStorage.setItem('currentModule', String(name));
    }

    return (
        <Link to={path} onClick={() => handleActiveModule(name)}>
            <li id={_id} className={(currentModule === name) ? "selected" : ''}>
                <Tooltip title={name} placement="right-end" arrow>
                    <img alt={name} />
                </Tooltip>
                <span>{name}</span>
                <ArrowForwardIosIcon className="arrowRigthBlue" style={{ height: "18px", color: "#093c5d" }} />
            </li>
        </Link>
    );
}

export default LinkSideBar;