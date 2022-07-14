import { useContext, useState } from "react";
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PoliticContext from "../../../context/ConfigPayrollContext/PoliticContext";
import { openPoliticModal } from "../../Team/Modals/ModalPoliticModal";

const MenuListPolitic = (props: any) =>{
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const { dispatch } = useContext(PoliticContext);
    
    const abreEditaPolitic = () => {
        openPoliticModal({ _id: props._id, 
            PolicyName: props.PolicyName, 
            EconomicDays: props.EconomicDays, 
            AnniversaryVacationPremium: props.AnniversaryVacationPremium, 
            PantryValueType: props.PantryValueType,
            PantryValueCap: props.PantryValueCap,
            PantryValue: props.PantryValue, 
            SavingsFundType: props.SavingsFundType, 
            SavingsFundCap: props.SavingsFundCap, 
            SavingsFund: props.SavingsFund,
            RestaurantValue: props.RestaurantValue,
            RestaurantValueType: props.RestaurantValueType,
            RestaurantValueCap: props.RestaurantValueCap,
            AbsenceDiscount: props.AbsenceDiscount,
            DisabilityDiscount: props.DisabilityDiscount,
            VoucherCost: props.VoucherCost,
            DiscountDay: props.DiscountDay,
            SeniorityDate: props.SeniorityDate,
            ContractStartDate: props.ContractStartDate, showEdit:true }, dispatch);
        setAnchorEl(null);
    }
    const abreEliminaPolitic = () => {
        openPoliticModal({ _id: props._id, showEliminar:true, PolicyName:props.PolicyName }, dispatch);
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
                    <MenuItem divider button onClick={abreEditaPolitic}>
                        Editar&nbsp;
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-editar.svg`} alt="Reenviar" />
                        </Grid>
                    </MenuItem>
                    <MenuItem divider button onClick={abreEliminaPolitic}>
                        Eliminar&nbsp;
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-eliminar.svg`} alt="Reenviar" />
                        </Grid>
                    </MenuItem>
            </Menu >
        </>
    )
}

export default MenuListPolitic