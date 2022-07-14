import { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
//import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Schedule.css"

moment.locale('es-MX');
// const localizer = momentLocalizer(moment)
// console.log(localizer);



export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events)
  return (
    
    <div className="App">
      {/* <Calendar
        views={["month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)} */}
        
      {/* /> */}
    </div>
  );
}