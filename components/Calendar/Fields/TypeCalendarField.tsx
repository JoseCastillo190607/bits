import { Box, Fade } from '@material-ui/core'
import { ICalendar } from '../../../interfaces/Calendar.interfaces';
import Tooltip from '@material-ui/core/Tooltip';

const TypeCalendarField = ({ tipo }: ICalendar) => {

    const dictionary = {
        "Aniversario": "/assets/svg/icono-aniversario.svg",
        "Cumpleaños": "/assets/svg/icono-cumpleanos.svg",
        "Evento": "/assets/svg/icono-evento.svg",
        "Tarea": "/assets/svg/icono-tarea.svg",
    }

    const getKeyValue: { [unit: string]: any } = dictionary;

    return (
        <Box>
            <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title={tipo}
                arrow
            >
                <img
                    src={getKeyValue[tipo]}
                    alt="Tipo"
                />
            </Tooltip>
        </Box>
    )
}

export default TypeCalendarField;
