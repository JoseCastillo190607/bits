import { Box } from '@material-ui/core';
import Body from '../components/Calendar/Body';
import '../components/Calendar/calendar.css';
import ModalCalendar from '../components/Calendar/ModalCalendar';
import CalendarState from '../context/CalendarContext/CalendarState';

const CalendarScreen = () => {
    return (
        <CalendarState>
            <Box mt={3} ml={5} className="Title" mb={2}>
                Calendario
            </Box>
            <Box p={1}>
                <div className="calendar__container">
                    <Box display="flex" flexDirection="column" p={2}>
                        <Body />
                    </Box>
                </div>
            </Box>
            <ModalCalendar />
        </CalendarState>
    )
};

export default CalendarScreen;
