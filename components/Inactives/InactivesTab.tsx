import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Route } from 'react-router';
import CollaboratorScreen from '../../screens/CollaboratorScreen';
import InactivesTable from './InactivesTable';
import CollaboratorState from '../../context/CollaboratorContext/CollaboratorState';

const InactiveTab = (props: any) => {
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
                        component={() => (
                            (id === "id")
                                ? <InactivesTable {...props} />
                                : <CollaboratorScreen />
                        )}
                    />
                </CollaboratorState>
            )}
        </div>
    )
}
export default InactiveTab;