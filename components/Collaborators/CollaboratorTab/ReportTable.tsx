import { Box, Grid, Link, } from '@material-ui/core';
import { styleCollaboratorTab as style } from './styleSheet';
import {CreateExcelFile} from './ExcelFunctionality';

interface IProps {
    link: any
    type: string
}

const ReportTable =  ({ link, type}: IProps) => {

    const handleExport = () => {
        CreateExcelFile(link, type);
    }


    return (
        <Grid
            item
            style={{ alignSelf: "center" }}
        >
            <Box>
                <Link href="#">
                    <button className="buttonContent" style={{ width: '89%' }} onClick={()=> handleExport()}>
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
                                REPORTE
                            </Grid>
                            <Grid item style={{}} >
                                <img src="/assets/icons/icono-reporte.svg" alt="Descargar Reporte" />
                            </Grid>
                        </Grid>
                    </button>
                </Link>
            </Box>
        </Grid>
    )
}




export default ReportTable;
