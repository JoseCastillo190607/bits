import { useContext, useState } from "react";
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PerceptionsContext from "../../../context/ConfigPayrollContext/PerceptionContext"
import { openPerceptionsModal } from "../../ConfigPayroll/Modals/ModalPerceptionsModal";
 


const MenuPerceptions = (props: any) =>{
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const { dispatch } = useContext(PerceptionsContext);

    const OpenInfoPerception = () => {
        openPerceptionsModal({ _id: props._id,  ConceptName: props.ConceptName, SATKey: props.SATKey, ConceptType: props.ConceptType, AccountingAccount: props.AccountingAccount, PayType: props.PayType, ISRTax: props.ISRTax, ISNTax: props.ISNTax, SocialSecurity: props.SocialSecurity,IntegratesIMSS: props.IntegratesIMSS, showInformacion:true }, dispatch);
        setAnchorEl(null);
    }
    const OpenEditPerception = () => {
        openPerceptionsModal({ _id: props._id,  ConceptName: props.ConceptName, SATKey: props.SATKey, ConceptType: props.ConceptType, AccountingAccount: props.AccountingAccount, PayType: props.PayType, ISRTax: props.ISRTax, ISNTax: props.ISNTax, SocialSecurity: props.SocialSecurity,IntegratesIMSS: props.IntegratesIMSS, showEdit:true }, dispatch);
        setAnchorEl(null);
    }
    const OpenDeletePerception = () => {
        openPerceptionsModal({ _id: props._id, showEliminar:true }, dispatch);
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
                        Informaci??n&nbsp;
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-ver.svg`} alt="Informaci??n" />
                        </Grid>
                    </MenuItem>
                    <MenuItem divider button onClick={OpenEditPerception}>
                        Editar&nbsp;
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-editar.svg`} alt="Editar" />
                        </Grid>
                    </MenuItem>
                    <MenuItem divider button onClick={OpenDeletePerception}>
                        Eliminar&nbsp;
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-eliminar.svg`} alt="Eliminar" />
                        </Grid>
                    </MenuItem>
                    
            </Menu >
        </>
    )
}

export default MenuPerceptions