import {
    Box,
    Grid,
} from '@material-ui/core';
import { styleCollaboratorTab as style } from './styleSheet';

const FilterTable = ({ onClick }: any) => {
    return (
        <Grid
            item
            style={{ alignSelf: "center" }}
        >
            <Box>
                <button
                    className="buttonContent"
                    style={{ width: '89%' }}
                    onClick={onClick}
                    aria-controls="menu-list-grow"
                    aria-haspopup="true"
                >
                    <Grid
                        container
                        direction="row"
                        style={style.containerFilter}
                        justify="space-around"
                    >
                        <Grid
                            item
                            style={{
                                alignSelf: "center",
                                fontSize: "14px",
                                margin: "0",
                                color: "#222222"
                            }}
                        >
                            Filtrar
                        </Grid>
                        <Grid item style={{ fontSize: "17px" }} >
                            <img src="/assets/icons/icono-filtrar.svg" alt="Filtrar" />
                        </Grid>
                    </Grid>
                </button>
            </Box>
        </Grid>
    )
}

export default FilterTable;
