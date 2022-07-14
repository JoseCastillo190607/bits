import { Dispatch, SetStateAction } from 'react';
import { getCalendar } from '../services/calendarService';


export const startCalendar = async <IStateCalendar> (setState: Dispatch<SetStateAction<IStateCalendar>>) =>{
    const dates = await getCalendar();
    if(dates.data) {
        setState(prevState => ({...prevState, dates: dates.data, datesFilter: dates.data }));
    }
};