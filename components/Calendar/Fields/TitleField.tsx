import { Box } from "@material-ui/core";
import { ICalendar } from '../../../interfaces/Calendar.interfaces';
import 'moment/locale/es-mx';
import moment from 'moment';

const TitleField = ({ tittle:titulo }: ICalendar) => {
    moment.locale('es-mx');

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                className="boxData__userField"
            >
                <b>{titulo}</b>
            </Box>

        </Box>
    )
}

export default TitleField;
