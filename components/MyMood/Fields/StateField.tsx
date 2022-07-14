const StateField = (props: any) => {
    return (
        <>
            {
                props.estado === 'Motivado' && (
                    <div className="badge-success">
                        <span>{props.estado}</span>
                    </div>
                )
            }
            {
                props.estado === 'Productivo' && (
                    <div className="badge-secondary">
                        <span>{props.estado}</span>
                    </div>
                )
            }
            {
                props.estado === 'Aburrido' && (
                    <div className="badge-info">
                        <span>{props.estado}</span>
                    </div>
                )
            }
            {
                props.estado === 'Presionado' && (
                    <div className="badge-warning">
                        <span>{props.estado}</span>
                    </div>
                )
            }
            {
                props.estado === 'Enfadado' && (
                    <div className="badge-danger">
                        <span>{props.estado}</span>
                    </div>
                )
            }
        </>
    )
}
export default StateField;