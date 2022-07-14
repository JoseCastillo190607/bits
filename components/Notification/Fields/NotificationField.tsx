import moment from "moment";

const NotificationField = (props: any) => {
    return (
        <div className="Notification__field" key={props.Titulo}>
            <span>{props.Titulo}</span>
         </div>
    )
}

export default NotificationField;