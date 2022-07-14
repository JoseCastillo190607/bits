import { Box, Grid, Dialog } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useEffect, useState, Dispatch } from 'react';
import RejectInformation from '../components/CandidatesTab/Modals/RejectInformation';
import BodyCandidate from '../components/Collaborator/BodyCandidate';
import '../components/Collaborator/Collaborator.css';
import CollaboratorState from '../context/CollaboratorContext/CollaboratorState';
import AvisoPrivacidad from '../components/CandidatesTab/Modals/AvisoPrivacidad';
import { TypeOfTag } from 'typescript';

const CandidateScreen = () => {
    const params = useParams<any>();
    const [title, setTitle] = useState('INFORMACIÓN DE ALTA ')
    const [acepta, setAcepta] = useState<string>('')

    const UsuarioAcepta = localStorage.getItem('UsuarioAcepta')


    useEffect(() => {
        switch (params?.tab) {
            case '1':
                setTitle('INFORMACIÓN DE ALTA');
                break;
            case '2':
                setTitle('DATOS PERSONALES');
                break;
            case '3':
                setTitle('SALUD Y EMERGENCIAS');
                break;
            case '4':
                setTitle('DATOS BANCARIOS');
                break;
            case '5':
                setTitle('EXPEDIENTE');
                break;
        }
    }, [params]);
    return (
        <Box>
            <Box boxShadow={0} mt={1} ml={2} mr={2}>
                <div className="Header__Candidate">
                    <img src="/assets/svg/logo-bits.svg" height="50" alt="BITS" />
                    <Grid direction="row" container justify="center" alignItems="center">
                        <h1>{title}</h1>
                        { UsuarioAcepta !== 'Acepta'
                        ? (
                        <AvisoPrivacidad />
                        ): null
                        }
                    </Grid>
                </div>
            </Box>
            <Box boxShadow={0} m={2}>
                <CollaboratorState>
                    <BodyCandidate />
                    <RejectInformation/>
                </CollaboratorState>
            </Box>
        </Box>
    );
}

export default CandidateScreen;