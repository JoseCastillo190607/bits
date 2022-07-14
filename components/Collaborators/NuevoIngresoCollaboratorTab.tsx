import { useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";
import CollaboratorState from "../../context/CollaboratorContext/CollaboratorState";
import CollaboratorScreen from "../../screens/CollaboratorScreen";
import NuevoIngresoCollaboratorScreen from "../../screens/NuevoIngresoCollaboratorScreen";
import BodyCreateCollaborator from "../Collaborator/CreateCollaborator/BodyCreateCollaborator";

import CollaboratorTable from "./Body";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const NuevoIngresoCollaboratorTab = (props: TabPanelProps) => {
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
                                ? <CollaboratorTable {...props} />
                                : (id === "new") ? 
                                <BodyCreateCollaborator /> 
                                : <NuevoIngresoCollaboratorScreen />
                        )}
                    />
                </CollaboratorState>
            )}
        </div>
    )
}

export default NuevoIngresoCollaboratorTab;
