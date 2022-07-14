import { Box } from '@material-ui/core'
import { Collaborator } from '../../interfaces/TabCollaborator.interfaces';
import moment from 'moment';

const UserField = ({ bussinesName, email, img, done }: Collaborator) => {
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
                    {
                        done ? <span className="dot-green"></span> : <span className="dot-wait"></span>
                    }
                    {email}
                </label>
            </Box>
        </Box>
    )
}

export default UserField
