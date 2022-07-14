import moment from "moment";

const DateField = ({customDate}: any) => {
    return (
        <div>
            {moment(customDate).format('DD/MM/YYYY')}
        </div>
    )
}
export default DateField;