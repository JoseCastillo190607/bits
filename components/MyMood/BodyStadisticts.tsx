import { useState, MouseEvent, useEffect } from "react";
import { Box } from "@material-ui/core";
import AddTable from "../Collaborators/CollaboratorTab/AddTable";
import { Bar } from 'react-chartjs-2';
import { getMyMoodProjects } from "../../services/mymoodService";
import FilterTable from "../Collaborators/CollaboratorTab/FilterTable";
import FilterOptions from "./Fields/FilterOptions";

const options: any = {
    indexAxis: 'x',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
            display: false
        },
        title: {
            display: true,
            text: 'MY MOOD',
        },
    },
};

const BodyStadisticts = ({ onHandleChange }: any) => {
    const [data, setData] = useState<any>();
    const [projects, setProject] = useState<any>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        async function fetchData() {
            let result = await getMyMoodProjects();

            setData({
                labels: result.data.map(({ _id }: any) => _id),
                datasets: result.finalArrayStates,
            });

            setProject(result.data.map(({ _id }: any) => _id));
        }
        fetchData();
    }, []);

    const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);

    return (
        <div>
            <Box p={1} pb={3} display="flex" flexDirection="row" >
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    style={{ width: "100%" }}
                >
                    <FilterTable onClick={handleOpen} />
                    <FilterOptions anchorEl={anchorEl} setAnchorEl={setAnchorEl} projects={projects} setData={setData} />

                    <AddTable
                        func={onHandleChange}
                        img={"icono-agregar-event.svg"}
                        text={"Regresar"}
                    />
                </Box>
            </Box>
            <Bar type="bar" data={data} options={options} height={100} />
        </div>
    )
}

export default BodyStadisticts;