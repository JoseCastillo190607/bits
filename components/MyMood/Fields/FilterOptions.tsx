import { useState } from "react";
import { Checkbox, FormControl, Grid, Menu, MenuItem } from "@material-ui/core";
import { getMyMoodProjects } from "../../../services/mymoodService";

const FilterOptions = ({ anchorEl, setAnchorEl, projects, setData }: any) => {
    const open = Boolean(anchorEl);
    const [filter, setFilter] = useState<any>(['all']);

    const onChange = async (e: any) => {
        let temp: any = [...filter];
        if (temp.includes(e.target.value)) {
            let index = temp.indexOf(e.target.value);
            temp.splice(index, 1);
        } else temp.push(e.target.value);

        if (temp.indexOf('all') !== -1) temp.splice(temp.indexOf('all'), 1);

        setFilter(temp);
        let result = await getMyMoodProjects(temp.join(','));
        setData({
            labels: result.data.map(({ _id }: any) => _id),
            datasets: result.finalArrayStates,
        })
        setAnchorEl(null);
    }

    const onChangeAll = async (e: any) => {
        let temp: any = ['all'];
        setFilter(temp);
        let result = await getMyMoodProjects(projects.join(','));
        setData({
            labels: result.data.map(({ _id }: any) => _id),
            datasets: result.finalArrayStates,
        })
        setAnchorEl(null);
    }

    return (
        <Menu
            id="menu-list-grow"
            anchorEl={anchorEl}
            elevation={0}
            getContentAnchorEl={null}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
            keepMounted
            open={open}
            onClose={() => setAnchorEl(null)}
        >
            <FormControl component="fieldset">
                <MenuItem divider>
                    Todos&nbsp;
                    <Grid container item justify="flex-end">
                        <Checkbox
                            value={"all"}
                            color="primary"
                            style={{ color: "#fabb00", marginRight: 0 }}
                            checked={filter.includes("all")}
                            onClick={onChangeAll}
                        />
                    </Grid>
                </MenuItem>
                {
                    projects?.map((project: string) => (
                        <MenuItem divider key={project}>
                            {project}&nbsp;
                            <Grid container item justify="flex-end">
                                <Checkbox
                                    value={project}
                                    color="primary"
                                    style={{ color: "#fabb00", marginRight: 0 }}
                                    checked={filter.includes(project)}
                                    onClick={(e) => onChange(e)}
                                />
                            </Grid>
                        </MenuItem>
                    ))
                }
            </FormControl>
        </Menu>
    )
};

export default FilterOptions;