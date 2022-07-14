import { useContext, useState } from "react";
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeduccionContext from "../../../context/ConfigPayrollContext/DeduccionContext";
import { openDeduccionModal } from "../../Team/Modals/ModalDeduccionModal";



const MenuListDeduccion = (props: any) =>{
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const { dispatch } = useContext(DeduccionContext);
    
    const abreEditaDeduccion = () => {
        openDeduccionModal({ _id: props._id, 
            SATKey: props.SATKey,
            ConceptName: props.ConceptName, showEdit:true }, dispatch);
        setAnchorEl(null);
    }
    const abreEliminaDeduccion = () => {
        openDeduccionModal({ _id: props._id, showEliminar:true, PolicyName:props.ConceptName }, dispatch);
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
                    <MenuItem divider button onClick={abreEditaDeduccion}>
                        Editar&nbsp;
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-editar.svg`} alt="Reenviar" />
                        </Grid>
                    </MenuItem>
                    <MenuItem divider button onClick={abreEliminaDeduccion}>
                        Eliminar&nbsp;
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-eliminar.svg`} alt="Reenviar" />
                        </Grid>
                    </MenuItem>
            </Menu >
        </>
    )
}

export default MenuListDeduccion