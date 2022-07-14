import { Route, Switch } from 'react-router';
import {
    useEffect,
    useState,
    useContext,
    Suspense
} from 'react';
import { Grid } from '@material-ui/core';
import '../components/Header/Header.css';
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import BitsScreen from '../screens/BitsScreen';
import TeamScreen from '../screens/TeamScreen';
import CollaboratorsScreen from '../screens/CollaboratorsScreen';
import NuevoIngresoScreen from '../screens/NuevoIngresoScreen';
import InactivosScreen from '../screens/InactivosScreen';

import CollaboratorsScreenBase from '../screens/CollaboratorsScreenBase';
import MyMoodScreen from '../screens/MyMoodScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import NewsScreen from '../screens/NewsScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import RigthSideBar from '../components/RigthSideBar/RigthSideBar';
import CalendarScreen from '../screens/CalendarScreen';
import CalendarNewScreen from '../screens/CalendarNewScreen';
import OrganigramaScreen from '../screens/OrganigramaScreen'
import { AdminContext } from '../context/AdminContext/AdminContext';
import AdministratorScreen from '../screens/AdministratorScreen';
import MiEmpresaScreen from "../screens/MiEmpresaScreen";
import IdseScreen from '../screens/IdseScreen';
//Payrolls
import payrollScreen from '../screens/PayrollScreenBase'
import configPayrollScreen from '../screens/ConfigPayrollScreenBase'
import ScheduleScreen from '../screens/ScheduleScreen';
import ScheduleScreen2 from '../screens/ScheduleScreen2';
import InitPayroll from '../screens/InitPayroll'
import PayrollTimbrar from "../screens/PayrollTimbrar";
import PayrollDispersar from "../screens/PayrollDispersar";

import InitSettlement from '../screens/InitSettlement'
import SettlementTimbrar from "../screens/SettlementTimbrar";
import SettlementDispersar from "../screens/SettlementDispersar";

import InitEventualPayroll from '../screens/InitEventualPayroll'
import EventualPayrollTimbrar from "../screens/EventualPayrollTimbrar";
import EventualPayrollDispersar from "../screens/EventualPayrollDispersar";

const BitsRouter = () => {
    const [clas, setClas] = useState('BodyContainer');
    const {adminState} = useContext(AdminContext)
    const[loaging, setLoading] = useState(true)

    useEffect(() => {
        if (window.location.pathname !== '/') {
            setClas('BodyContainer BodyContainerWhite');
            document.documentElement.style.setProperty('--color', '#000');
            document.documentElement.style.setProperty('--backGroundRectangle', '#fff');
            document.documentElement.style.setProperty('--lineColor', '#e7e7e7');
        } else {
            document.documentElement.style.setProperty('--color', '#fff');
            document.documentElement.style.setProperty('--backGroundRectangle', '#154565');
            document.documentElement.style.setProperty('--lineColor', '#154565');
        }
    }, []);
    


    return (
        <div>
        <Header />

        <Grid direction="row" container item>
            <Grid xs="auto" item className="RectangleSideBar">
                <SideBar />
            </Grid>
            <Grid xs item className={clas}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={BitsScreen}
                    />

                    <Route
                        exact
                        path="/team"
                        component={TeamScreen}
                    />

                    <Route
                        exact
                        path="/collaborators/:id/:tab"
                        component={CollaboratorsScreenBase}
                    />
                    <Route
                        exact
                        path="/nuevoingreso/:id/:tab"
                        component={NuevoIngresoScreen}
                    />
                    <Route
                        exact
                        path="/colaboradores/:id/:tab"
                        component={CollaboratorsScreen}
                    />
                    <Route
                        exact
                        path="/inactivos/:id/:tab"
                        component={InactivosScreen}
                    />

                    <Route 
                        exact
                        path="/Administrador/:id/:tab"
                        component={AdministratorScreen}
                    />

                    <Route
                        exact
                        path="/mymood"
                        component={MyMoodScreen}
                    />

                    <Route
                        exact
                        path="/notifications"
                        component={NotificationsScreen}
                    />

                    <Route
                        exact
                        path="/news"
                        component={NewsScreen}
                    />

                    <Route
                        exact
                        path="/feedback"
                        component={FeedbackScreen}
                    />

                    <Route
                        exact
                        path="/calendarNuevo"
                        component={CalendarNewScreen}
                    />
                    <Route
                        exact
                        path="/IDSE"
                        component={IdseScreen}
                    />
                    <Route
                        exact
                        path="/IDSE"
                        component={IdseScreen}
                    />
                    <Route
                        exact
                        path="/organigrama"
                        component={OrganigramaScreen}
                    />
                    <Route
                        exact
                        path="/payroll"
                        component={payrollScreen}
                    />
                    <Route
                        exact
                        path="/configPayroll"
                        component={configPayrollScreen}
                    />
                    <Route
                        exact
                        path="/InitPayroll/:id/:tab"
                        component={InitPayroll}
                    />
                    <Route
                        exact
                        path="/InitSettlement/:id/:tab"
                        component={InitSettlement}
                    />
                    <Route
                        exact
                        path="/InitEventualPayroll/:id/:tab"
                        component={InitEventualPayroll}
                    />
                    
                                <Route exact path="/miempresa" component={MiEmpresaScreen} />

                    <Route exact path="/PayrollTimbrar/:id/:tab" component={PayrollTimbrar} />
                    <Route exact path="/PayrollDispersar/:id/:tab" component={PayrollDispersar} />

                    <Route exact path="/SettlementTimbrar/:id/:tab" component={SettlementTimbrar} />
                    <Route exact path="/SettlementDispersar/:id/:tab" component={SettlementDispersar} />

                    <Route exact path="/EventualPayrollTimbrar/:id/:tab" component={EventualPayrollTimbrar} />
                    <Route exact path="/EventualPayrollDispersar/:id/:tab" component={EventualPayrollDispersar} />

                    <Route
                        exact
                        path="/Schedule"
                        component={ScheduleScreen}
                    />
                    <Route
                        exact
                        path="/Schedule2/:id"
                        component={ScheduleScreen2}
                    />
                </Switch>
            </Grid>
            <Grid xs="auto" item className={clas} id="RigthSide">
                <RigthSideBar />
            </Grid>
        </Grid>
        <footer>
            <span>&nbsp;  @Bits</span>
        </footer>
    </div>
        
    )
};

export default BitsRouter;
