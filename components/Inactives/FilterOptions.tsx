import { useState } from "react";
import { FormControl, Grid, Menu, MenuItem, Radio, RadioGroup } from "@material-ui/core";

const FilterOptions = ({ anchorEl, setAnchorEl }: any) => {
    const open = Boolean(anchorEl);
    const [filter, setFilter] = useState<string>('');
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
                <RadioGroup aria-label="gender" name="gender1" value="Inactivos" onChange={(e) => setFilter(e.target.value)}>
                    <MenuItem divider>
                        Por Nombre&nbsp;
                        <Grid container item justify="flex-end">
                            <Radio
                                value="Por Nombre"
                                color="primary"
                                style={{ color: "#fabb00", marginRight: 0 }}
                                checked={filter === "Por Nombre"}
                            />
                        </Grid>
                    </MenuItem>
                    <MenuItem divider>
                        Por Sede&nbsp;
                        <Grid container item justify="flex-end">
                            <Radio
                                value="Por Sede"
                                color="primary"
                                style={{ color: "#fabb00", marginRight: 0 }}
                                checked={filter === "Por Sede"}
                            />
                        </Grid>
                    </MenuItem>
                    <MenuItem divider >
                        Por Cliente&nbsp;
                        <Grid container item justify="flex-end">
                            <Radio
                                value="Por Cliente"
                                color="primary"
                                style={{ color: "#fabb00", marginRight: 0 }}
                                checked={filter === "Por Cliente"}
                            />
                        </Grid>
                    </MenuItem>
                    <MenuItem>
                        Por Proyecto&nbsp;
                        <Grid container item justify="flex-end">
                            <Radio
                                value="Por Proyecto"
                                color="primary"
                                style={{ color: "#fabb00", marginRight: 0 }}
                                checked={filter === "Por Proyecto"}
                            />
                        </Grid>
                    </MenuItem>
                </RadioGroup>
            </FormControl>
        </Menu>
    )
};

export default FilterOptions;