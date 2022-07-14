import moment from "moment";

const FormatDate = ({ FechaBaja }: any) => {
    return (
        <span>
            {moment(FechaBaja).format('DD/MM/YYYY')}
        </span>
    )
}

export default FormatDate;