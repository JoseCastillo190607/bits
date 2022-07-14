import React from "react";
import { Form, Button } from "semantic-ui-react";
import Box from "@mui/material/Box";
import style from "../../ModalAddEmpresa/ModalAddEmpresa.module.css";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import { useFormik } from "formik";
import SaveIcon from "@mui/icons-material/Save";
import File_Helper from '../../Collaborator/Expedient/Fields/File_Helper';

function FormIdentidadLegal({
  handleInputChange,
  siguientePaso,
  toggle,
  state,
  setState,
}: any) {
  // const formik = useFormik({
  //   initialValues: initialValues(),
  //   validationSchema: Yup.object(validationSchema()),
  //   onSubmit: (formData) => {
  //     setState({
  //       ...state,
  //       nombreDeLaEmpresa: formData.nombreDeLaEmpresa,
  //       razonSocial: formData.razonSocial,
  //       logo: formData.logo,
  //       industria: formData.industria,
  //       rfc: formData.rfc,
  //       regimenFiscal: formData.regimenFiscal,
  //       registroPatronal: formData.registroPatronal,
  //       primaDeRiesgo: formData.primaDeRiesgo,
  //       estado: formData.estado,
  //       direccion: formData.direccion,
  //       codigoPostal: formData.codigoPostal,
  //     });
  //     siguientePaso();
  //   },
  // });

  return (
    <Form>
      <TextField
        type="text"
        label="Nombre comercial"
        name="nombreDeLaEmpresa"
        onChange={handleInputChange}
        className={style.TextField}
        variant="outlined"
        id="outline-basic"
        size="small"
        margin="normal"
      />

      <TextField
        type="text"
        name="razonSocial"
        onChange={handleInputChange}
        label="Razón social"
        className={style.TextField}
        variant="outlined"
        id="outline-basic"
        size="small"
        margin="normal"
      />
      <Box style={{ position: "relative", top: "5px" }}>
        <Box className={style.boxLogo}>
          <Button
            className={style.bottonLogo}
            as="label"
            htmlFor="file"
            type="button"
          >
            <File_Helper label="Subir fotografía" name="Foto_IMG" accept=".png,.jpg,.jpeg"  parametrofrom="empresa.imagen" />
            Cargar imagen logotipo...
            <SaveIcon
              sx={{
                width: "24px",
                height: "24px",
                backgroundColor: "#fabb00",
                marginRight: "4px",
                borderRadius: "4px",
              }}
            />
          </Button>
          
          <input
            name="logo"
            onChange={handleInputChange}
            type="file"
            id="file"
            style={{ display: "hidden" }}
          />
        </Box>
      </Box>

      <TextField
        type="text"
        name="rfc"
        onChange={handleInputChange}
        label="RFC"
        className={style.TextField}
        variant="outlined"
        id="outline-basic"
        size="small"
        margin="normal"
      />
      <TextField
        type="text"
        name="regimenFiscal"
        onChange={handleInputChange}
        label="Régimen fiscal"
        className={style.TextField}
        variant="outlined"
        id="outline-basic"
        size="small"
        margin="normal"
      />
      {/* <TextField
        type="text"
        name="registroPatronal"
        onChange={handleInputChange}
        label="Registro patronal"
        className={style.TextField}
        variant="outlined"
        id="outline-basic"
        size="small"
        margin="normal"
      />
      <TextField
        type="text"
        name="primaDeRiesgo"
        onChange={handleInputChange}
        label="Prima de riesgo"
        className={style.TextField}
        variant="outlined"
        id="outline-basic"
        size="small"
        margin="normal"
      /> */}
      <TextField
        type="text"
        name="direccion"
        onChange={handleInputChange}
        label="Dirección"
        className={style.TextField}
        variant="outlined"
        id="outline-basic"
        size="small"
        margin="normal"
      />
      <TextField
        type="text"
        name="estado"
        onChange={handleInputChange}
        label="Estado"
        className={style.TextField}
        variant="outlined"
        id="outline-basic"
        size="small"
        margin="normal"
      />
      <TextField
        type="text"
        name="codigoPostal"
        onChange={handleInputChange}
        label="Código postal"
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
          onClick={siguientePaso}
          style={{ backgroundColor: "#fabb00" }}
        >
          Siguiente
        </Button>
      </Box>
    </Form>
  );
}

const initialValues = () => {
  return {
    nombreDeLaEmpresa: "",
    razonSocial: "",
    logo: "",
    rfc: "",
    regimenFiscal: "",
    registroPatronal: "",
    primaDeRiesgo: "",
    estado: "",
    direccion: "",
    codigoPostal: "",
  };
};

const validationSchema = () => {
  return {
    nombreDeLaEmpresa: Yup.string().required("Este campo es obligatorio"),
    razonSocial: Yup.string().required("Este campo es obligatorio"),
    logo: Yup.string().required("Este campo es obligatorio"),
    rfc: Yup.string().required("Este campo es obligatorio"),
    regimenFiscal: Yup.string().required("Este campo es obligatorio"),
    registroPatronal: Yup.string().required("Este campo es obligatorio"),
    primaDeRiesgo: Yup.string().required("Este campo es obligatorio"),
    estado: Yup.string().required("Este campo es obligatorio"),
    direccion: Yup.string().required("Este campo es obligatorio"),
    codigoPostal: Yup.string().required("Este campo es obligatorio"),
  };
};

export default FormIdentidadLegal;
