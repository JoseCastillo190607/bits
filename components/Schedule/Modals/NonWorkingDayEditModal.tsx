import NonWorkingDayState from "../../../context/NonWorkingDay/NonWorkingDayState";
import NonWorkingDayDivModal from "./NonWorkingDayDivModal"
import CalendarsState from "../../../context/NewCalendarContext/CalendarsState";


interface TabMeasures {
    children?: React.ReactNode;
    measures: any;
    idNonWorkingDay: any;
    calendar: any;
    NonWorkingDayName: any
};

function NonWorkingDayEditModal(props: TabMeasures){

    
    const { children, measures, NonWorkingDayName, calendar, idNonWorkingDay } = props;

    return <NonWorkingDayDivModal measures={measures} NonWorkingDayName={NonWorkingDayName} calendar={calendar} idNonWorkingDay={idNonWorkingDay} />
        

}

export default NonWorkingDayEditModal