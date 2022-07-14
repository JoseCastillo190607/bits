import {
    Theme,
    Dialog,
    Button,
    withStyles,
    Box,
    Select,
    Grid,
    TextField,
    FormControl
} from '@material-ui/core';

import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { useEffect, useState, useContext, useReducer } from 'react';
import { SuccessfulAlert } from '../../../alerts/successAlerts';

import { useForm } from '../../../hooks/useForm';
import PayrollContext from '../../../context/PayrollContext/PayrollContext';

import { ErrorAlert } from '../../../alerts/errorAlert';

import SaveIcon from '@material-ui/icons/Save';

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const CreaPrenomina = (props:any) => {
    const {state, dispatch} = useContext(PayrollContext)
    const [cambio, setCambio] = useState(0)

  
}