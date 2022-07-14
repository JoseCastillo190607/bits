const CommentField = (props: any) => {
    return (
        <div>
            <span>{props.Comentario ? props.Comentario : 'El usuario no dejó ningún comentario.'}</span>
        </div>
    )
}
export default CommentField;