import { Box } from '@material-ui/core'
import { Collaborator } from '../../interfaces/TabCollaborator.interfaces';
import moment from 'moment';

const UserField = ({ bussinesName, email, img, FechaBaja, baja }: Collaborator) => {
    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            className={`${FechaBaja && 'border-red'}`}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <img
                    src={img ? img : '/assets/svg/user-avatar.svg'}
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
                <label className="name__userField">{bussinesName}</label>
                <label className="email__userField">
                    {email}
                </label>
                {
                    bussinesName && baja &&
                    <label className="email__userField text-red">
                        <span className="dot-red"></span>
                        Baja Programada:
                        <label className="dateInactive__userField">&nbsp;{moment(FechaBaja).format('DD/MM/YYYY')}</label>
                    </label>
                }
            </Box>
        </Box>
    )
}

export default UserField
