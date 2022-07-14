import { useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";

import PoliticState from "../../context/ConfigPayrollContext/PoliticState";
import IDSETable from "./IDSETable";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const IDSETab = (props: TabPanelProps) => {
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
                <PoliticState>
                    <Route
                        component={() => (
                        <IDSETable {...props} />
                        )}
                    />
                </PoliticState>
            )}
        </div>
    )
}

export default IDSETab;
