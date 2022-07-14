import { useContext, useState } from "react";
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import OrganigramaContext from "../../../context/OrganigramaContext/OrganigramaContext"
import { openOrganigramaModal } from "../../Team/Modals/ModalOrganigramaModal";



const MenuListOrganigrama = (props: any) =>{
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const { dispatch } = useContext(OrganigramaContext);

    const abreInfoPuesto = () => {
        console.log("MenuListOrganigrama", props);
        openOrganigramaModal({ _id: props._id, NombrePuesto: props.NombrePuesto, AreaProyecto: props.AreaProyecto, PuestoSuperior: props.PuestoSuperior, Descripcion: props.Descripcion, showInformacion:true }, dispatch);
        setAnchorEl(null);
    }
    const abreEditaPuesto = () => {
        openOrganigramaModal({ _id: props._id, NombrePuesto: props.NombrePuesto, AreaProyecto: props.AreaProyecto, PuestoSuperior: props.PuestoSuperior, Descripcion: props.Descripcion, showEdit:true }, dispatch);
        setAnchorEl(null);
    }
    const abreEliminaPuesto = () => {
        openOrganigramaModal({ _id: props._id, showEliminar:true, NombrePuesto:props.NombrePuesto }, dispatch);
        setAnchorEl(null);
    }

    return(
        <>
            <Tooltip title="Editar" placement="right">
                <Box className="IconButtonPoints" mr={2}>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <MoreVertIcon style={{ color: "#fabb00" }} />
                    </IconButton>
                </Box>
            </Tooltip>
            <Menu
                className="MoreVerIcon"
                anchorEl={anchorEl}
                open={open}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={() => setAnchorEl(null)}
            >
                    <MenuItem divider button onClick={abreInfoPuesto}>
                        Información&nbsp;
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-ver.svg`} alt="Reenviar" />
                        </Grid>
                    </MenuItem>
                    <MenuItem divider button onClick={abreEditaPuesto}>
                        Editar&nbsp;
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-editar.svg`} alt="Reenviar" />
                        </Grid>
                    </MenuItem>
                    <MenuItem divider button onClick={abreEliminaPuesto}>
                        Eliminar Puesto&nbsp;
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-eliminar.svg`} alt="Reenviar" />
                        </Grid>
                    </MenuItem>
            </Menu >
        </>
    )
}

export default MenuListOrganigrama