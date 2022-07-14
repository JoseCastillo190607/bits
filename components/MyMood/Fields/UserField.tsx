import { Box } from "@material-ui/core";

const UserField = (props: any) => {
    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <img
                    src={props.Usuario[0]?.Archivos?.Foto_IMG ? props.Usuario[0]?.Archivos?.Foto_IMG : '/assets/svg/user-avatar.svg'}
                    alt="img"
                    className="imgCollaborator__BITS"
                />
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                className="boxData__userField"
            >
                <label className="name__userField">{props.Usuario[0]?.Nombre ? props.Usuario[0]?.Nombre : props.idUsuario}</label>
            </Box>
        </Box>
    )
}

export default UserField;