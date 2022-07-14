import moment from "moment";

const DateField = (props: any) => {
    return (
        <div>
           <span>{moment((props.scheduleDate) ? props.scheduleDate : props.fecha).format('DD/MM/YYYY')}</span>
        </div>
    )
}
export default DateField;