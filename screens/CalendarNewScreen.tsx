import { Box } from '@material-ui/core';
import Body from '../components/Calendar/Body';
import '../components/Calendar/calendar.css';
import ModalCalendar from '../components/Calendar/ModalCalendar';
import CalendarState from '../context/CalendarContext/CalendarState';
import { AllCalendars } from '../components/NewCalendar/AllCalendars';
import CalendarsContext from '../context/NewCalendarContext/CalendarsState';

const CalendarNewScreen = () => {
    return (
    <div>
        <CalendarsContext>
            <AllCalendars/>
        </CalendarsContext>
    </div>
        

    )
};

export default CalendarNewScreen;