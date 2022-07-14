import {
  Theme,
  Dialog,
  Button,
  withStyles,
  Box,
  Select,
  TextField,
  FormControl
} from '@material-ui/core';
import '../Modal/CrearPolitic.css';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { Checkbox, OutlinedInput } from '@mui/material';
import { useEffect, useState, useContext, useReducer } from 'react';
import { SuccessfulAlert } from '../../../alerts/successAlerts';
import { PoliticModal } from '../../../interfaces/TabPolitic.interfaces';
import { useForm } from '../../../hooks/useForm';
import { editPolitic, getAllPolitic } from '../../../services/PoliticService';
import PoliticContext from "../../../context/ConfigPayrollContext/PoliticContext";
import { closePoliticModal } from '../../Team/Modals/ModalPoliticModal';
import '../Politic.css';
import { ErrorAlert } from '../../../alerts/errorAlert';
import {updatePolitic} from '../../../helpers/Nomina/Politics'
import BpCheckbox from '../../ConfigPayroll/IOSSwitch/PoliticCheckbox';
import { useMutation } from "@apollo/client";
import { GET_ALL_POLITIC, UPDATE_POLITIC } from "../../../Querys/querys";
import SaveIcon from '@material-ui/icons/Save';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid } from "semantic-ui-react";
import InputMask from "react-input-mask";



const DialogContent = withStyles((theme: Theme) => ({
  root: {
      padding: theme.spacing(2),
  },
}))(MuiDialogContent);


const EditaPuesto = (props: any) => {
      debugger;
  const [updatePolitics] = useMutation(UPDATE_POLITIC, {
      refetchQueries: [{ query: GET_ALL_POLITIC }],
  });
  

  const [politics, setPolitics] = useState([]);
  const {state, dispatch} = useContext(PoliticContext)
  const [cambio, setCambio] = useState(0)
  const [value, setValue] = useState()




  const handleClose = async () => {
      await closePoliticModal(dispatch);
      dispatch({ type: "CLOSE_POLITIC_MODAL" });
  }

  useEffect(() => {
    console.log('state', state)
    },[])

    
  
  const initialValues = () => {
    return {
      policy_name: state.PolicyName ?? "",
      pantry_value_type: state.PantryValueType ?? "Porcentual",
      saving_fund_type: state.SavingsFundType ?? "Porcentual",
      restaurant_value_type: state.RestaurantValueType ?? "Porcentual",
      anniversary_vacation_premium: state.AnniversaryVacationPremium ?? false,
      pantry_value: state.PantryValue ?? false,
      saving_fund: state.SavingsFund ?? false,
      restaurant_value: state.RestaurantValue ?? false,
      absence_discount: state.AbsenceDiscount ?? false,
      disability_discount: state.DisabilityDiscount ?? false,
      voucher_cost: state.VoucherCost ?? false,
      economic_days: state.EconomicDays ?? 0,
      pantry_value_cap: state.PantryValueCap ?? 0,
      saving_fund_cap: state.SavingsFundCap ?? 0,
      restaurant_value_cap: state.RestaurantValueCap ?? 0,
    };
  };

  return(
<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={state.showEdit} fullWidth={false} maxWidth={"md"}>
    <div className="contenedorModalPolitics mt-10PoliticsModal">
      <p className="tituloModalPolitics">Editar política</p>
    </div>
    <DialogContent className="dialogModalPolitics">
      <Formik
        initialValues={initialValues()}
        validationSchema={validationSchema}
        onSubmit={async (formData: any) => {
          debugger
          formData.economic_days = parseInt(formData.economic_days);
          formData.pantry_value_cap = parseInt(formData.pantry_value_cap);
          formData.saving_fund_cap = parseInt(formData.saving_fund_cap);
          formData.restaurant_value_cap = parseInt(
            formData.restaurant_value_cap
          );
          let { data } = await updatePolitics({
            variables: {
              updatePoliticId: state._id,
              input: formData,
            },
          });
          debugger;
          if (data) {
            await props.getDatos();
            SuccessfulAlert({
              title: "¡Exito!",
              text: "¡Se ha añadido la política correctamente!",
            });
          } else {
            ErrorAlert({
              title: "¡Error!",
              text: "¡No se ha podido añadir la política!",
            });
          }
          SuccessfulAlert({ text: "Se actualizó correctamente" });

          //console.log(formData)
          //console.log(stateCalendario[0].startDate)
          handleClose();
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="form-without-css">
            <Box mb={2}>
              <Grid xs item>
                <TextField
                  error={touched.policy_name && Boolean(errors.policy_name)}
                  helperText={!values.policy_name && "Obligatorio"}
                  name="policy_name"
                  label="Nombre"
                  value={values.policy_name}
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  onChange={handleChange}
                />
              </Grid>
            </Box>
            <Grid xs item>
              <Box mb={1}>
                <TextField
                  error={
                    touched.economic_days && Boolean(errors.economic_days)
                  }
                  helperText={!values.economic_days && "Obligatorio"}
                  name="economic_days"
                  label="Días económicos"
                  value={values.economic_days}
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  onChange={handleChange}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </Box>
            </Grid>
            <Grid xs item>
              <Box mb={1}>
                <Checkbox
                  checked={values.anniversary_vacation_premium ? true : false}
                  value={values.anniversary_vacation_premium}
                  onChange={handleChange}
                  name="anniversary_vacation_premium"
                  color="primary"
                />

                <span className="textoModalPolitics">
                  Prima vacacional al aniversario
                </span>
              </Box>
            </Grid>
            <Grid xs item>
              <Box mb={2}>
                <Box mb={1}>
                  <div style={{ display: "flex" }}>
                    <span className="subtituloModalPolitics">
                      Vales de despensa
                    </span>
                    <div className="iconoAtencion">¡</div>
                  </div>
                </Box>

                <div style={{ display: "flex" }}>
                  <select
                    value={values.pantry_value_type}
                    onChange={handleChange}
                    name="pantry_value_type"
                    className="selectModalPolitics"
                  >
                    <option
                      value="Selecciona una de las categorias"
                      selected
                      disabled
                    >
                      Selecciona una de las categorías
                    </option>
                    <option value="Porcentual">Porcentual</option>
                    <option value="Fijo">Fijo</option>
                  </select>

                  <div>
                    {values.pantry_value_type === "Porcentual" ? (
                      <InputMask
                        mask="999"
                        value={values.pantry_value_cap}
                        onChange={handleChange}
                        disabled={false}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      >
                        {(inputProps: any) => (
                          <TextField
                            name="pantry_value_cap"
                            type="text"
                            className="inputMedioModalPolitics"
                            value={values.pantry_value_cap}
                            size="small"
                            fullWidth={true}
                            error={
                              touched.pantry_value_cap ||
                              (errors.pantry_value_cap ==
                                "El valor no debe ser mayor a 100" &&
                                Boolean(errors.pantry_value_cap))
                            }
                            helperText={
                              errors.pantry_value_cap ==
                                "El valor no debe ser mayor a 100" &&
                              "El valor no debe ser mayor a 100"
                            }
                            {...inputProps}
                          />
                        )}
                      </InputMask>
                    ) : (
                      <TextField
                        name="pantry_value_cap"
                        type="text"
                        className="inputMedioModalPolitics"
                        value={values.pantry_value_cap}
                        size="small"
                        fullWidth={true}
                        onChange={handleChange}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        error={
                          touched.pantry_value_cap &&
                          Boolean(errors.pantry_value_cap)
                        }
                      />
                    )}
                  </div>
                </div>
                <Box mt={1}>
                  <Checkbox
                    checked={values.pantry_value ? true : false}
                    value={values.pantry_value}
                    onChange={handleChange}
                    name="pantry_value"
                    color="primary"
                  />

                  <span className="textoModalPolitics">
                    Tope de vales de despensa
                  </span>
                </Box>
              </Box>
            </Grid>

            <Grid xs item>
              <Box mb={1}>
                <Box mb={1}>
                  <div style={{ display: "flex" }}>
                    <span className="subtituloModalPolitics">
                      Fondo de ahorro
                    </span>
                    <div className="iconoAtencion">¡</div>
                  </div>
                </Box>
                <div style={{ display: "flex" }}>
                  <select
                    value={values.saving_fund_type}
                    onChange={handleChange}
                    name="saving_fund_type"
                    className="selectModalPolitics"
                  >
                    <option value="Selecciona una de las categorias" disabled>
                      Selecciona una de las categorías
                    </option>
                    <option value="Porcentual">Porcentual</option>
                    <option value="Fijo">Fijo</option>
                  </select>
                  <div>
                    {values.saving_fund_type === "Porcentual" ? (
                      <InputMask
                        mask="999"
                        value={values.saving_fund_cap}
                        onChange={handleChange}
                        disabled={false}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      >
                        {(inputProps: any) => (
                          <TextField
                            name="saving_fund_cap"
                            type="text"
                            className="inputMedioModalPolitics"
                            value={values.saving_fund_cap}
                            size="small"
                            fullWidth={true}
                            error={
                              touched.saving_fund_cap ||
                              (errors.saving_fund_cap ==
                                "El valor no debe ser mayor a 100" &&
                                Boolean(errors.saving_fund_cap))
                            }
                            helperText={
                              errors.saving_fund_cap ==
                                "El valor no debe ser mayor a 100" &&
                              "El valor no debe ser mayor a 100"
                            }
                            {...inputProps}
                          />
                        )}
                      </InputMask>
                    ) : (
                      <TextField
                        name="saving_fund_cap"
                        type="text"
                        className="inputMedioModalPolitics"
                        value={values.saving_fund_cap}
                        size="small"
                        fullWidth={true}
                        onChange={handleChange}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        error={
                          touched.saving_fund_cap &&
                          Boolean(errors.saving_fund_cap)
                        }
                      />
                    )}
                  </div>
                </div>
                <Box mt={1}>
                  <Checkbox
                    checked={values.saving_fund ? true : false}
                    value={values.saving_fund}
                    onChange={handleChange}
                    name="saving_fund"
                    color="primary"
                  />

                  <span className="textoModalPolitics">
                    Tope de fondo de ahorro
                  </span>
                </Box>
              </Box>
            </Grid>

            <Grid xs item>
              <Box mb={1}>
                <Box mb={1}>
                  <div style={{ display: "flex" }}>
                    <span className="subtituloModalPolitics">
                      Vales de restaurante
                    </span>
                    <div className="iconoAtencion">¡</div>
                  </div>
                </Box>

                <div style={{ display: "flex" }}>
                  <select
                    value={values.restaurant_value_type}
                    onChange={handleChange}
                    name="restaurant_value_type"
                    className="selectModalPolitics"
                  >
                    <option value="Selecciona una de las categorias" disabled>
                      Selecciona una de las categorías
                    </option>
                    <option value="Porcentual">Porcentual</option>
                    <option value="Fijo">Fijo</option>
                  </select>
                  <div>
                    {values.restaurant_value_type === "Porcentual" ? (
                      <InputMask
                        mask="999"
                        value={values.restaurant_value_cap}
                        onChange={handleChange}
                        disabled={false}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      >
                        {(inputProps: any) => (
                          <TextField
                            name="restaurant_value_cap"
                            type="text"
                            className="inputMedioModalPolitics"
                            value={values.restaurant_value_cap}
                            size="small"
                            fullWidth={true}
                            error={
                              touched.restaurant_value_cap ||
                              (errors.restaurant_value_cap ==
                                "El valor no debe ser mayor a 100" &&
                                Boolean(errors.restaurant_value_cap))
                            }
                            helperText={
                              errors.restaurant_value_cap ==
                                "El valor no debe ser mayor a 100" &&
                              "El valor no debe ser mayor a 100"
                            }
                            {...inputProps}
                          />
                        )}
                      </InputMask>
                    ) : (
                      <TextField
                        name="restaurant_value_cap"
                        type="text"
                        className="inputMedioModalPolitics"
                        value={values.restaurant_value_cap}
                        size="small"
                        fullWidth={true}
                        onChange={handleChange}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        error={
                          touched.restaurant_value_cap &&
                          Boolean(errors.restaurant_value_cap)
                        }
                      />
                    )}
                  </div>
                </div>
                <Box mt={1}>
                  <Checkbox
                    checked={values.restaurant_value ? true : false}
                    value={values.restaurant_value}
                    onChange={handleChange}
                    name="restaurant_value"
                    color="primary"
                  />

                  <span className="textoModalPolitics">
                    Tope de vales de restaurante
                  </span>
                </Box>
              </Box>
            </Grid>

            <Grid xs item>
              <Box mb={2}>
                <Box mb={1}>
                  <div style={{ display: "flex" }}>
                    <span className="subtituloModalPolitics">
                      Descuento para cálculos
                    </span>
                    <div className="iconoAtencion">¡</div>
                  </div>
                </Box>

                <Box>
                  <Checkbox
                    checked={values.absence_discount ? true : false}
                    value={values.absence_discount}
                    onChange={handleChange}
                    name="absence_discount"
                    color="primary"
                  />

                  <span className="textoModalPolitics">
                    Se descuentan faltas
                  </span>
                </Box>

                <Box>
                  <Checkbox
                    checked={values.disability_discount ? true : false}
                    value={values.disability_discount}
                    onChange={handleChange}
                    name="disability_discount"
                    color="primary"
                  />

                  <span className="textoModalPolitics">
                    Se descuentan incapacidades
                  </span>
                </Box>
                <Box>
                  <Checkbox
                    checked={values.voucher_cost ? true : false}
                    value={values.voucher_cost}
                    onChange={handleChange}
                    name="voucher_cost"
                    color="primary"
                  />

                  <span className="textoModalPolitics">
                    Costo vales de restaurante
                  </span>
                </Box>
              </Box>
            </Grid>
            <div className="contenedorBotonesPoliticsModal">
              <button onClick={handleClose} className="botonCancelarModal">
                Cancelar
              </button>
              <button type="submit" className="botonGuardarModal botonDoble">
                <div className="contenedorIconoBotonModal">
                  <SaveIcon fontSize="small" />
                </div>
                <div>Guardar</div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </DialogContent>
  </Dialog>
  )
}

const validationSchema = Yup.object().shape({
  economic_days: Yup.string().required("El campo es requerido"),
  policy_name: Yup.string().required("El campo es requerido"),
  pantry_value_type: Yup.string().required("El campo es requerido"),
  //  if pantry_value_type is porcentual then pantry_value_cap is required and not must be major than 100
  pantry_value_cap: Yup.number().when("pantry_value_type", {
    is: "Porcentual",
    then: Yup.number()
      .min(0, "El valor no debe ser menor a 0")
      .max(100, "El valor no debe ser mayor a 100")
      .required("El campo es requerido"),
    otherwise: Yup.number()
      .min(0, "El valor no debe ser menor a 0")
      .required("El campo es requerido"),
  }),

  saving_fund_type: Yup.string().required("El campo es requerido"),
  //  if saving_fund_type is porcentual then saving_fund_cap is required and not must be major than 100
  saving_fund_cap: Yup.number().when("saving_fund_type", {
    is: "Porcentual",
    then: Yup.number()
      .min(0, "El valor no debe ser menor a 0")
      .max(100, "El valor no debe ser mayor a 100"),
    otherwise: Yup.number().min(0, "El valor no debe ser menor a 0"),
  }),

  restaurant_value_type: Yup.string().required("El campo es requerido"),
  //  if restaurant_value_type is porcentual then restaurant_value_cap is required and not must be major than 100
  restaurant_value_cap: Yup.number().when("restaurant_value_type", {
    is: "Porcentual",
    then: Yup.number()
      .min(0, "El valor no debe ser menor a 0")
      .max(100, "El valor no debe ser mayor a 100"),
    otherwise: Yup.number().min(0, "El valor no debe ser menor a 0"),
  }),
});

export default EditaPuesto

