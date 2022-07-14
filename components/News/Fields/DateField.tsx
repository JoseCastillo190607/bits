import moment from "moment";

const DateField = ({fechaAdd}: any) => {
    return (
        <div>
            {moment(fechaAdd).format('DD/MM/YYYY')}
        </div>
    )
}
export default DateField;