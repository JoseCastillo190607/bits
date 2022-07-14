import React from "react";
import { Form, Button } from "semantic-ui-react";
import Box from "@mui/material/Box";
import style from "../../ModalAddEmpresa/ModalAddEmpresa.module.css";
import { Switch, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import BusinessIcon from "@mui/icons-material/Business";

function InformacionBancaria({
  handleInputChange,
  siguientePaso,
  enviar,
  handleInputChecked,
  toggle,
}: any) {
  return (
    <Form>
      <TextField
        type="text"
        name="cuentaBancaria"
        onChange={handleInputChange}
        label="Cuenta bancaria"
        className={style.TextField}
        variant="outlined"
        id="outline-basic"
        size="small"
        margin="normal"
      />
      <TextField
        type="text"
        name="cuentaSTP"
        onChange={handleInputChange}
        label="Cuenta STP"
        className={style.TextField}
        variant="outlined"
        id="outline-basic"
        size="small"
        margin="normal"
      />
      <TextField
        type="text"
        name="cuentaClabeSTP"
        onChange={handleInputChange}
        label="Cuenta CLABE STP"
        className={style.TextField}
        variant="outlined"
        id="outline-basic"
        size="small"
        margin="normal"
      />

      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "88px",
        }}
      >
        <Button
          className={style.buttonsAddEnterprise}
          onClick={toggle}
          style={{ border: "solid 0.8px #c7ccdc", backgroundColor: "#fff" }}
        >
          Cancelar
        </Button>
        <Button
          className={style.buttonsAddEnterprise}
          onClick={enviar}
          style={{ backgroundColor: "#fabb00" }}
        >
          Crear
          <BusinessIcon
            sx={{
              width: "15px",
              height: "13px",
            }}
          />
        </Button>
      </Box>
    </Form>
  );
}

const initialValues = () => {
  return {
    cuentaBancaria: "",
    cuentaSTP: "",
    cuentaClabeSTP: "",
    lecturaAutomaticaHorasExtra: false,
    calculoAutomaticoPromedioVariables: false,
    usarSTPComoMedioPago: false,
  };
};

const validationSchema = () => {
  return {
    cuentaBancaria: Yup.string().required("Este campo es obligatorio"),
    cuentaSTP: Yup.string().required("Este campo es obligatorio"),
    cuentaClabeSTP: Yup.string().required("Este campo es obligatorio"),
  };
};

export default InformacionBancaria;
