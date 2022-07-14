import { useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";

import PoliticState from "../../context/ConfigPayrollContext/PoliticState";
import SUATable from "./SUATable";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

const SUATab = (props: TabPanelProps) => {
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
                    <Route
                        component={() => (
                        <SUATable {...props} />
                        )}
                    />
            )}
        </div>
    )
}

export default SUATab;
