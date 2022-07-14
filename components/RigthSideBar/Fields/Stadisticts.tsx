import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getCollaborators } from "../../../services/collaboratorService";
import { getMyMood, getMyMoodToday } from "../../../services/mymoodService";

var initState = {
    collaborators: 0,
    states: 0,
    statesToday: 0
}

const Stadisticts = () => {
    const [values, setValues] = useState<any>(initState);
    useEffect(() => {
        async function fechData() {
            const collaborators = await getCollaborators();
            const myMood = await getMyMood();
            const statesToday = await getMyMoodToday();
            var initState = {
                collaborators: collaborators.data !== undefined ? collaborators.data?.length : 0,
                states: myMood !== undefined ? myMood.length : 0,
                statesToday: statesToday !== undefined ? statesToday.length : 0
            }
            setValues(initState);
            return 0;
        }
        fechData();

        return () => {
            fechData();
            setValues([]);
        }
    }, []);
    return (
        <Grid direction="row" container item className="Rectangle">
            <Grid xs item className="Stadistics">
                <div className="BorderRight">
                    <span id="text" className="color">Colaboradores</span>
                    <span id="number" className="color">{values.collaborators}</span>
                </div>
            </Grid>
            <Grid xs item className="Stadistics">
                <div className="BorderRight">
                    <span id="text" className="color">Estados Totales</span>
                    <span id="number" className="color">{values.states}</span>
                </div>
            </Grid>
            <Grid xs item className="Stadistics">
                <div>
                    <span id="text" className="color">Estados de Hoy</span>
                    <span id="number" className="color">{values.statesToday}</span>
                </div>
            </Grid>
        </Grid>
    )
}

export default Stadisticts;