import { Grid } from '@material-ui/core';
import { styleCollaboratorTab as style } from './styleSheet';

interface IAddTable {
    func?: any;
    img?: string;
    text?: string;
}
const AddTable = ({ func, img = "icono-agregar-nuevo.svg", text = "AGREGAR" }: IAddTable) => {
    return (
        <button className="buttonContent" onClick={func}>
            <Grid
                container
                direction="row"
                style={{
                    ...style.containerFilter,
                    margin: "0",
                    width: "auto"
                }}
                justify="space-around"
                className="btnY"
            >
                <Grid
                    item
                    style={{
                        alignSelf: "center",
                        fontSize: "14px",
                        margin: "4px 25px 4px 0",
                        color: "#093c5d",
                        fontWeight: "bold",
                        width: "auto"
                    }}
                >
                    {text}
                </Grid>
                <Grid item>
                    <img src={`/assets/icons/${img}`} alt="Descargar Reporte" />
                </Grid>
            </Grid>
        </button>
    )
}

export default AddTable
