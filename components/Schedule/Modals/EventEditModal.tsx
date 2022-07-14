import EventDivModal from "./EventDivModal"


interface TabMeasures {
    children?: React.ReactNode;
    measures: any;
    idEvent: any;
    calendar: any;
    EventName: any
};

function EventEditModal(props: TabMeasures){

    
    const { children, measures, EventName, calendar, idEvent } = props;

    return <EventDivModal measures={measures} EventName={EventName} calendar={calendar} idEvent={idEvent} />
        

}

export default EventEditModal