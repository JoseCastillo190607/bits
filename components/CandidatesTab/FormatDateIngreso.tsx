import moment from "moment";

const FormatDate = ({ dateOfAdmission }: any) => {
    return (
        <span>
            {moment(dateOfAdmission).format('DD/MM/YYYY')}
        </span>
    )
}

export default FormatDate;