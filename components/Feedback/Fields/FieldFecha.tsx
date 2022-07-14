import moment from "moment";

const FieldFecha = (props: any) => {
    return (
        <div>
            {moment(props.Fecha).format('DD/MM/YYYY')}
        </div>
    )
}

export default FieldFecha;