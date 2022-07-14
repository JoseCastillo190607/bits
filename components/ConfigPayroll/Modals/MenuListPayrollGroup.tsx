import { useContext, useState } from "react";
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PayrollGroupContext from "../../../context/ConfigPayrollContext/PayrollGroupContext";
import { openPayrollGroupModal } from "../../Team/Modals/ModalPayrollGroupModal";



const MenuListPayrollGroup = (props: any) =>{
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const { dispatch } = useContext(PayrollGroupContext);
    
    const abreEditaPayrollGroup = () => {
        openPayrollGroupModal({ _id: props._id,
             GroupName: props.GroupName,
             PaymentScheme: props.PaymentScheme, 
             CompanyName: props.CompanyName, 
             BankAccount: props.BankAccount, 
             PayrollPeriod: props.PayrollPeriod,
             PayrollPeriodDays: props.PayrollPeriodDays, 
             RegulationISR: props.RegulationISR, 
             SubsidyEmployee: props.SubsidyEmployee, 
             showEdit:true }, dispatch);
        setAnchorEl(null);
    }
    const abreEliminaPayrollGroup = () => {
        openPayrollGroupModal({ _id: props._id, showEliminar:true, GroupName:props.GroupName }, dispatch);
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
                    <MenuItem divider button onClick={abreEditaPayrollGroup}>
                        Editar&nbsp;
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-editar.svg`} alt="Reenviar" />
                        </Grid>
                    </MenuItem>
                    <MenuItem divider button onClick={abreEliminaPayrollGroup}>
                        Eliminar&nbsp;
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-eliminar.svg`} alt="Reenviar" />
                        </Grid>
                    </MenuItem>
            </Menu >
        </>
    )
}

export default MenuListPayrollGroup