import moment from "moment";

const DateField = (props: any) => {
    return (
        <div>
            <span>{props.Fecha ? moment(props.Fecha).format('DD/MM/YYYY') : ''}</span>
        </div>
    )
}
export default DateField;