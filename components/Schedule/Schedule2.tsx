import "./styles.css"
import Calendar from "./ShowSchedule3";
import CalendarsState from "../../context/NewCalendarContext/CalendarsState";



interface TabCalendar {
  children?: React.ReactNode;
  idCalendar: any;
  nameCalendar: any
};

function App(props: TabCalendar) {
  const { children, idCalendar, nameCalendar } = props;
  //console.log(incidentName)
  //console.log(incidentName)
  //console.log(Array.isArray(incidentName));
  return (
    <CalendarsState>
      <Calendar idCalendar ={idCalendar} nameCalendar={nameCalendar}/>
    </CalendarsState>
    

  )
  
}

export default App;