import { useState, useContext, useEffect } from 'react';
import './SideBar.css';
import LinkSideBar from './LinkSideBar';
import { AdminContext } from '../../context/AdminContext/AdminContext';

const SideBar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {adminState} = useContext(AdminContext)


    const[efecto, setEfecto] = useState(1)
    const[loaging, setLoading] = useState(true)




    const changeMenu = () => {
        if (isOpen) {
            document.documentElement.style.setProperty('--widthMenu', '50px');
            document.documentElement.style.setProperty('--marginLi', '0');
            document.documentElement.style.setProperty('--visibleText', 'hidden');
            document.documentElement.style.setProperty('--heightA', '0px');
            document.documentElement.style.setProperty('--widthLi', '60%');
            document.documentElement.style.setProperty('--marginRightIconMenu', '0');
            document.documentElement.style.setProperty('--locationIconMenu', 'center');
            setIsOpen(false);
        } else {
            document.documentElement.style.setProperty('--widthMenu', 'auto');
            document.documentElement.style.setProperty('--marginLi', '0 6px 9px 0');
            document.documentElement.style.setProperty('--visibleText', 'visible');
            document.documentElement.style.setProperty('--heightA', 'none');
            document.documentElement.style.setProperty('--widthLi', 'none');
            document.documentElement.style.setProperty('--marginRightIconMenu', '-2vh');
            document.documentElement.style.setProperty('--locationIconMenu', 'flex-end');
            setIsOpen(true);
        }
    };

    return (
        <nav>       
        <ul>
            <li id="IconMenu">
                <img alt="Dashbaord" onClick={changeMenu} />
            </li>
            <LinkSideBar _id="dashboardIcon" name="Dashboard" path="/" />
            {(adminState?.PermisosContex?.Modulos?.Colaboradores?.Acceso) === true?
            <LinkSideBar _id="colaboradoresIcon" name="Colaboradores" path="/collaborators/id/0" />
            :null
            }
            {(adminState?.PermisosContex?.Modulos?.MyMood?.Ver) === true?
            <LinkSideBar _id="mymoodIcon" name="My Mood" path="/MyMood" />
            :null
            }
            {(adminState?.PermisosContex?.Modulos?.Notificaciones?.Ver) === true?
            <LinkSideBar _id="notificationsIcon" name="Notificaciones" path="/notifications" />
            :null
            }
            {(adminState?.PermisosContex?.Modulos?.Noticias?.Ver) === true?
            <LinkSideBar _id="noticesIcon" name="Noticias" path="/news" />
            :null
            }
                {(adminState?.PermisosContex?.Modulos?.FeedBack?.Ver) === true?
                <LinkSideBar _id="feedbackIcon" name="Feedback" path="/feedback" />
                :null  
                }
            {(adminState?.PermisosContex?.Modulos?.Calendario?.Ver) === true?
            <LinkSideBar _id="calendarIcon" name="Calendario2" path="/calendarNuevo" />
            :null
            }
            <LinkSideBar _id="organigramaIcon" name="Organigrama" path="/organigrama" />
            <LinkSideBar _id="empresaIcon" name="Mi Empresa" path="/miempresa" />
            <LinkSideBar _id="payrollIcon" name="N??minas" path="/payroll" />
            <LinkSideBar _id="configPayrollIcon" name="Configuracion N??minas" path="/configPayroll" />
            <LinkSideBar _id="configPayrollIcon" name="IDSE" path="/IDSE" />
        </ul>
        </nav>
    )
};

export default SideBar;