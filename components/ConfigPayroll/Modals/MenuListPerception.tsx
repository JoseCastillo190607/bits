import { useContext, useState } from "react";
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PerceptionContext from "../../../context/ConfigPayrollContext/PerceptionContext";
import { openPerceptionModal } from "../../Team/Modals/ModalPerceptionModal";

const MenuListPerception = (props: any) =>{
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const { dispatch } = useContext(PerceptionContext);
    

    const OpenInfoPerception = () => {
        openPerceptionModal({ _id: props._id,
             ConceptName: props.ConceptName,
             SATKey: props.SATKey,
             ConceptType: props.ConceptType,
             AccountingAccount: props.AccountingAccount,
             PayType: props.PayType,
             ISRTax: props.ISRTax,
             ISNTax: props.ISNTax, 
             SocialSecurity: props.SocialSecurity,
             IntegratesIMSS: props.IntegratesIMSS, 
             showInformacion:true 
            }, dispatch);
        setAnchorEl(null);
    }
    const abreEditaPerception = () => {
        
        openPerceptionModal({ _id: props._id,  
            ConceptName: props.ConceptName, 
            SATKey: props.SATKey, 
            ConceptType: props.ConceptType, 
            AccountingAccount: props.AccountingAccount, 
            PayType: props.PayType,
            ISRTax: props.ISRTax, 
            ISNTax: props.ISNTax, 
            SocialSecurity: props.SocialSecurity,
            IntegratesIMSS: props.IntegratesIMSS, 
            showEdit:true
         }, dispatch);
        setAnchorEl(null);
    }
    const abreEliminaPerception = () => {
        openPerceptionModal({ _id: props._id,
            showEliminar:true,
            ConceptName: props.ConceptName}, dispatch);
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
                    <MenuItem divider button onClick={OpenInfoPerception}>
                        Información
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-ver.svg`} alt="Información" />
                        </Grid>
                    </MenuItem>
                    <MenuItem divider button onClick={abreEditaPerception}>
                        Editar&nbsp;
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-editar.svg`} alt="Editar" />
                        </Grid>
                    </MenuItem>
                    <MenuItem divider button onClick={abreEliminaPerception}>
                        Eliminar&nbsp;
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-eliminar.svg`} alt="Eliminar" />
                        </Grid>
                    </MenuItem>
            </Menu >
        </>
    )
}

export default MenuListPerception