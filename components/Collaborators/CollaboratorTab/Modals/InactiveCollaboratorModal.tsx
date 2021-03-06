import { useContext, useEffect,  useState } from 'react';
import { TabCollaboratorContext } from '../../../../context/TabCollaboratorContext/TabCollaboratorContext';
import {
    createStyles,
    Theme,
    Dialog,
    Typography,
    withStyles,
    WithStyles,
    makeStyles,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useForm } from '../../../../hooks/useForm';
import { SuccessfulAlert } from '../../../../alerts/successAlerts';
import { cleanCollaborator } from '../../../../actions/tabColabortor';


import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { ErrorAlert } from "../../../../alerts/errorAlert";

import { SettlementPayrollModal } from "../../../../interfaces/TabSettlementPayroll.interfaces";
import DeduccionContext from "../../../../context/ConfigPayrollContext/DeduccionContext";
import SaveIcon from "@material-ui/icons/Save";
import SettlementPayrollProcessContext from "../../../../context/PayrollProcess/SettlementPayrollProcessContext";
import { clearSettlementProcess } from "../../../../context/PayrollProcess/SettlementActions";

import style from "../../../Payroll/Modals/CrearIncidenciasModal/CrearIncidencias.module.css";
import {
    CREATE_SETTLEMENTPAYROLL,
    GET_ALL_SETTLEMENTPAYROLL,
    GET_ALL_USERS_COLLABORATOR,
    GET_ALL_DEDUCTIONS,
    DEACTIVATE_USERS,
    GET_ALL_USERS_INACTIVOS
  } from "../../../../Querys/querys";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '100%',
        },
        formControl: {
            margin: theme.spacing(1),
            // minWidth: 120,
            width: "100%"
        },
        customWidth: {
            paddingTop: "8px",
            maxWidth: "565px",
        },
    }),
);

interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

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

const InactiveCollaboratorModal = () => {

    const classes = useStyles();

    const { inactiveOpen, setInactiveOpen, collaboratorState, collaboratorDispatch, } = useContext(TabCollaboratorContext);
    const { collaborator } = collaboratorState;

    const { id, tab } = useParams<any>();
    const {state: SettlementPayrollState, dispatch: SettlementPayrollDispatch} = useContext(SettlementPayrollProcessContext)
    const [seleccionados, setSeleccionados] = useState<any[]>([]);
    const [estadoInicial, setEstadoInicial] = useState<any[]>([]);
    const [estadoFiltrado, setEstadoFiltrado] = useState<any[]>([]);
    const { state, dispatch } = useContext(DeduccionContext);
    const [seleccionadosConcepto, setSeleccionadosConcepto] = useState<any[]>([]);
    const [estadoInicialConcepto, setEstadoInicialConcepto] = useState<any[]>([]);
    const [seleccionadosFecha, setSeleccionadosFecha] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    const [showCF, setShowFechas] = useState(false);

    const resultPayrollCollaborator = useQuery(GET_ALL_USERS_COLLABORATOR);
    const allPayrollCollaborator = resultPayrollCollaborator.data?.GET_ALL_USERS_COLLABORATOR;

    const resultDeductions = useQuery(GET_ALL_DEDUCTIONS);
    const resultallDeductions = resultDeductions.data?.GET_ALL_DEDUCTIONS;

    const [createSettlementPayRoll] = useMutation(CREATE_SETTLEMENTPAYROLL, {
        refetchQueries: [{ query: GET_ALL_SETTLEMENTPAYROLL },{ query: GET_ALL_USERS_COLLABORATOR }],
      });

    const [deactivateUsers] = useMutation(DEACTIVATE_USERS, {
        refetchQueries: [{ query: GET_ALL_USERS_COLLABORATOR }, { query: GET_ALL_USERS_INACTIVOS }]
        });

    const {
        dischargeDate,
        dischargeType,
        reason,
        recessionJob,
        Taxable,
        NotTaxable,
        Mixed,
        Total,
        idConcept,
        idCollaborator,
        Concepts,
        onChange,
        formulario,
        reset,
        setForm,
      } = useForm<SettlementPayrollModal>({
        Total: 0,
        Taxable: false,
        NotTaxable: false,
        Mixed: false,
        idConcept: 0,
        dischargeDate: "",
        dischargeType: "",
        reason: "",
        recessionJob: "",
        idCollaborator: 0,
        Concepts: ""
      });


      const onSumbit = async () => {
          if(collaborator){
            debugger;
              if (formulario.dischargeType !== '' && formulario.dischargeDate !== '') {
                  let id = collaborator._id;
                  {

                    

               createSettlementPayRoll({
                  variables: {
                    input: {
                      dischargeDate: formulario.dischargeDate,
                      dischargeType: formulario.dischargeType,
                      reason: formulario.reason,
                      recessionJob: formulario.recessionJob,
                      Taxable: formulario.Taxable.toString() === "true" ? true : false,
                      NotTaxable: formulario.NotTaxable.toString() === "true" ? true : false,
                      Mixed: formulario.Mixed.toString() === "true" ? true : false,
                      idConcept: parseInt(formulario.idConcept.toString()),
                      Total: parseFloat(formulario.Total.toString()),
                      idCollaborator: parseInt(id.toString()),
                    },
                },
                })

             deactivateUsers({
                    variables: {
                        id,
                      input: {
                        FechaBaja:formulario.dischargeDate,
                      },
                    },
                  }).then(() => {
                      console.log("Se ha desactivado el usuario");
                })
                      
    
                  SuccessfulAlert({
                    text: "??Se ha desactivado al colaborador!"
                  });
                  handleClose();
  
            SuccessfulAlert({
              text: "??Se ha a??adido la solicitud de baja!"
            });
  
            clearSettlementProcess({}, SettlementPayrollDispatch);
          }
        } else {
          return ErrorAlert({ text: "Ingrese todos los datos." });
        }
    }else {
        return ErrorAlert({ text: "No existe el colaborador" });
    }
};



      
    const handleClose = () => {
        collaboratorDispatch(cleanCollaborator());

        setInactiveOpen();
    }

    const handleDelete = async () => {
        
        if (collaborator) {
           
            
        };
    };

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={inactiveOpen} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                </DialogTitle>
                <div className={style.contenedorTitulo}>
                    <span className={style.titulo}>Solicitud de baja</span>
                    </div>
                    <div className={style.contenedorPrincipal}>
                        <div>
                        <div className={style.fechas}>
                            <div>
                            <span className={style.textoFecha}>Fecha *</span>
                            </div>
                            <div>
                            <input
                                name="dischargeDate"
                                type="date"
                                className={style.inputFecha}
                                onChange={({ target }) =>
                                onChange(target.value as string, "dischargeDate")
                                }
                            />
                            </div>
                        </div>
                        </div>

                        <fieldset className={style.fieldsetNombre}>
                        <legend className={style.tituloFieldsetNombre}>Tipo de baja *</legend>
                        <select
                        className={style.selectNombre}
                        onChange={({ target }) =>
                            onChange(target.value as string, "dischargeType")
                        }
                        >
                        <option value={"" || ""} disabled>
                            Seleccione...
                        </option>
                        <option value="Voluntaria Planeada">Voluntaria Planeada</option>
                        <option value="Voluntaria no planeada">Voluntaria no planeada</option>
                        <option value="Involuntaria planeada">Involuntaria planeada</option>
                        <option value="Involuntaria no planeada">Involuntaria no planeada</option>
                        </select>
                    </fieldset>

                        <fieldset className={style.fieldsetUpdate}>
                        <legend className={style.tituloFieldsetNombre}>Raz??n</legend>
                        <input
                        className={style.inputUpdate}
                        name="reason"
                        type="text"
                        onChange={({ target }) => onChange(target.value, "reason")}
                        />
                    </fieldset>


                    <fieldset className={style.fieldsetNombre}>
                        <legend className={style.tituloFieldsetNombre}>Tipo de rescisi??n para c??lculo *</legend>
                        <select
                        className={style.selectNombre}
                        onChange={({ target }) =>
                            onChange(target.value as string, "recessionJob")
                        }
                        >
                        <option value={"" || ""} disabled>
                            Seleccione...
                        </option>
                        <option value="Finiquito">Finiquito</option>
                        <option value="Liquidaci??n">Liquidaci??n</option>
                        </select>
                    </fieldset>

                    <div className={style.radioitem}>
                        <input
                        type="radio"
                        name="tx"
                        id="ritema"
                        onChange={(e) => onChange(e.target.checked.toString(), "Taxable")}
                        />
                        <label htmlFor="ritema"> Gravable </label>
                    </div>
                    <div className={style.radioitem}>
                        <input
                        type="radio"
                        name="tx"
                        id="ritemb"
                        onChange={(e) =>
                            onChange(e.target.checked.toString(), "NotTaxable")
                        }
                        />
                        <label htmlFor="ritemb"> No Gravable </label>
                    </div>
                    <div className={style.radioitem}>
                        <input
                        type="radio"
                        name="tx"
                        id="ritemc"
                        onChange={(e) => onChange(e.target.checked.toString(), "Mixed")}
                        />
                        <label htmlFor="ritemc"> Ambas </label>
                    </div>

                    <fieldset className={style.fieldsetUpdate}>
                        <legend className={style.tituloFieldsetNombre}>Importe de incidencias</legend>
                        <input
                            className={style.inputUpdate}
                            name="Total"
                            type="text"
                            onChange={({ target }) => onChange(target.value, "Total")}
                        />
                        </fieldset>

                    <fieldset className={style.fieldsetNombre}>
                        <legend className={style.tituloFieldsetNombre}>Concepto *</legend>
                        <select
                        className={style.selectNombre}
                        onChange={(e) => {
                            onChange(e.target.value as string, "idConcept");
                            //onChange2(e);
                        }}
                        >
                        <option value={"" || ""}>{""}</option>
                        {resultallDeductions?.map((lis: any) => (
                            <option
                            key={lis?.id}
                            value={lis?.id}
                            >
                            {lis.concept_type}
                            </option>
                        ))}
                        </select>
                    </fieldset>
            
                    <div>
                        <ul className={style.contenedorLista}>
                        {seleccionadosConcepto.map((lis: any) => (
                            <li className={style.listaNombres}>
                            <div className={style.nombre}> {lis.nombre} </div>
                            </li>
                        ))}
                        </ul>
                    </div>
            
                    <DialogActions className={style.contenedorAcciones}>
                        <div className={style.contenedorBotones}>
                        <button className={style.botonCancelar} onClick={handleClose}>
                            Cancelar
                        </button>
                        <button className={style.botonAgregar} onClick={onSumbit}>
                            <div className={style.iconoAgregar}>
                            <SaveIcon />
                            </div>
                            <div>
                            <span className={style.textoAgregar}>+ Solicitar</span>
                            </div>
                        </button>
                        </div>
                    </DialogActions>
                    </div>
                {/* <DialogActions>
                    <Button autoFocus onClick={handleClose} variant="contained" color="default">
                    Cerrar
                    </Button>
                    <Button autoFocus onClick={handleDelete} variant="contained" color="secondary">
                        Dar de Baja
                    </Button>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default InactiveCollaboratorModal
