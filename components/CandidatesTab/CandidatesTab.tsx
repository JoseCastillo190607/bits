import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Route } from 'react-router';
import CollaboratorScreen from '../../screens/CollaboratorScreen';
import CandidateTable from "./CandidateTable";
import './CandidatesTab.css';
import CollaboratorState from '../../context/CollaboratorContext/CollaboratorState';
import BodyCreateCollaborator from '../Collaborator/CreateCollaborator/BodyCreateCollaborator';

const CandidatesTab = (props: any) => {
    const { children, value, index, ...other } = props;
    const params = useParams<any>();
    const [id, setId] = useState<string>('');
    useEffect(() => {
        setId(params.id)
    }, [params]);
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}

        >
            {value === index && (
                <CollaboratorState>
                    <Route
                        component={(props: any) => (
                            (id === "id")
                                ? <CandidateTable {...props} />
                                : (id === "new") ? 
                                <BodyCreateCollaborator /> 
                                :
                                <CollaboratorScreen />
                        )}
                    />
                </CollaboratorState>
            )}
        </div>
    )
}
export default CandidatesTab;