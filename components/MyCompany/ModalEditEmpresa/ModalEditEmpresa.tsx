import React from "react";
import { Box } from "@material-ui/core";
import { Form, Button, Item } from "semantic-ui-react";
import style from "./ModalEditEmpresa.module.css";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import {
  UPDATE_ENTERPRISE,
  GET_ALL_ENTERPRISE,
  GET_ENTERPRISE,
} from "../../../Querys/querys";
import { Grid } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function ModalEditEmpresa({
  id,
  toggle,
  enterprise,
  taxRegime,
  adress,
  state,
  zipCode,
}: any) {
  const [updateEnterprise] = useMutation(UPDATE_ENTERPRISE, {
    refetchQueries: [{ query: GET_ALL_ENTERPRISE }],
  });

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      console.log(formData);
      updateEnterprise({
        variables: {
          updateEnterpriseId: id,
          input: {
            name: formData.nombreDeLaEmpresa || enterprise,
            logo: formData.logo,
            showlogo: true,

            taxRegime: formData.rfc || taxRegime,
            propertyRegime: "na",
            surcharge: "na",
            state: formData.estado || state,
            address: formData.direccion || adress,
            zipCode: formData.codigoPostal || zipCode,
            bankaccount: "null",
            IMSSSubdelegationKey: formData.claveSubdelegacionIMSS,
            fileCER: formData.certificadoDeSelloDigital,
            extrahours: false,
            automaticCalculationsVariables:
              formData.calculoAutomaticoDePromedioVariable,
            useSTPaspaymentmethod: formData.UsarSTPcomoMedioDePago,
            STPaccount: "na",
            stpCLABE: "na",
            IMSSminimumwage: false,
            operationsIMSSSender: false,
            CertificateOfUserIMSS: "este campo ya no existe",
            CertificatePaswordIMSS: "este campo ya no existe",
            IMSSCertificate: "este campo ya no existe",
            FIELCertificate: "este campo no existe",
            FIELPrivateKey: "este campo no existe",
          },
        },
      });
      alert("los datos han sido modificados exitosamente");
      toggle();
    },
  });

  return (
    <Box className={style.modalEditBox}>
      <Box className={style.titleEdit}>Editar empresa</Box>
      <Form onSubmit={formik.handleSubmit}>
        <Box className={style.boxForm}>
          <Box className={style.boxLeft}>
            <TextField
              name="nombreDeLaEmpresa"
              className={style.texFieldEdit}
              id="outline-basic"
              label="Nombre de la empresa"
              variant="outlined"
              // size="small"
              onChange={formik.handleChange}
              margin="normal"
              value={formik.touched.nombreDeLaEmpresa}
              defaultValue={enterprise}
            />
            <TextField
              name="razonSocial"
              className={style.texFieldEdit}
              id="outline-basic"
              label="Razón social"
              variant="outlined"
              // size="small"
              onChange={formik.handleChange}
              margin="normal"
              value={formik.touched.razonSocial}
              defaultValue={enterprise}
            />
            <Box style={{ position: "relative", top: "5px" }}>
              <Box className={style.boxLogo}>
                <Button
                  className={style.bottonLogo}
                  as="label"
                  htmlFor="file"
                  type="button"
                >
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
                  onChange={formik.handleChange}
                  type="file"
                  id="file"
                  style={{ display: "hidden" }}
                />
              </Box>
            </Box>

            <TextField
              name="rfc"
              className={style.texFieldEdit}
              id="outline-basic"
              label="RFC"
              variant="outlined"
              // size="small"
              onChange={formik.handleChange}
              margin="normal"
              value={formik.touched.rfc}
              defaultValue={taxRegime}
            />
            <TextField
              name="regimenFiscal"
              className={style.texFieldEdit}
              id="outline-basic"
              label="Régimen fiscal"
              variant="outlined"
              // size="small"
              onChange={formik.handleChange}
              margin="normal"
              value={formik.touched.regimenFiscal}
              defaultValue={taxRegime}
            />

            <TextField
              name="direccion"
              className={style.texFieldEdit}
              id="outline-basic"
              label="Dirección"
              variant="outlined"
              // size="small"
              onChange={formik.handleChange}
              margin="normal"
              value={formik.touched.direccion}
              defaultValue={adress}
            />
            <TextField
              name="estado"
              className={style.texFieldEdit}
              id="outline-basic"
              label="Estado"
              variant="outlined"
              // size="small"
              onChange={formik.handleChange}
              margin="normal"
              value={formik.touched.estado}
              defaultValue={state}
            />
            <TextField
              name="codigoPostal"
              className={style.texFieldEdit}
              id="outline-basic"
              label="Código postal"
              variant="outlined"
              // size="small"
              onChange={formik.handleChange}
              margin="normal"
              value={formik.touched.codigoPostal}
              defaultValue={zipCode}
            />
          </Box>
          <Box className={style.boxRigth}>
            <Box className={style.boxTitleRight}>
              Agregar uno o varios registros patronales y su prima de riesgo
            </Box>
            <Box className={style.boxArchivoSubmit}>
              <p className={style.text}>
                Llave del certificado de sello digital
              </p>
              <Box className={style.boxSubmitArchivo}>
                <Button
                  className={style.buttonArchivo}
                  as="label"
                  htmlFor="llaveCertificadoDeSelloDigital"
                  type="button"
                >
                  <SaveIcon />
                  Cambiar Archivo
                </Button>
                <input
                  type="file"
                  id="llaveCertificadoDeSelloDigital"
                  style={{ display: "hidden" }}
                  name="llaveCertificadoDeSelloDigital"
                  onChange={formik.handleChange}
                />
              </Box>
            </Box>
            <Box className={style.boxArchivoSubmit}>
              <p className={style.text}>Certificado de sello digital</p>
              <Box
                className={style.boxSubmitArchivo}
                style={{ backgroundColor: "#fabb00" }}
              >
                <Button
                  className={style.buttonArchivo}
                  as="label"
                  htmlFor="certificadoDeSelloDigital"
                  type="button"
                >
                  <SaveIcon />
                  Seleccionar archivo
                </Button>
                <input
                  type="file"
                  id="certificadoDeSelloDigital"
                  style={{ display: "hidden" }}
                  name="certificadoDeSelloDigital"
                  onChange={formik.handleChange}
                />
              </Box>
            </Box>
            <TextField
              name="contrasenaCertDig"
              className={style.texFieldEdit}
              type="password"
              id="outline-basic"
              label="Contraseña para el certificado de sello digital"
              variant="outlined"
              size="small"
              onChange={formik.handleChange}
              margin="normal"
            />
            <Box style={{ display: "flex", width: "369px" }}>
              <TextField
                name="registroPatronal"
                type="text"
                id="outline-basic"
                label="Registro Patronal"
                variant="outlined"
                size="small"
                onChange={formik.handleChange}
                margin="normal"
              />

              <TextField
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                name="registroPatronal"
                type="text"
                id="outline-basic"
                label="Registro Patronal"
                variant="outlined"
                size="small"
                onChange={formik.handleChange}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <Box style={{ position: "relative", top: "5px" }}>
                      <Box>
                        <Button
                          // className={style.bottonLogo}
                          as="label"
                          htmlFor="file"
                          type="button"
                        >
                          <AddOutlinedIcon
                            sx={{
                              width: "24px",
                              height: "24px",
                              backgroundColor: "#fabb00",
                              opacity: "0.4",
                              marginRight: "4px",
                              borderRadius: "4px",
                            }}
                          />
                        </Button>
                        <input
                          name="logo"
                          onChange={formik.handleChange}
                          type="file"
                          id="file"
                          style={{ display: "hidden" }}
                        />
                      </Box>
                    </Box>
                  ),
                }}
              />
            </Box>
            <Box className={style.boxPrimasAgregadas}>
              {/* Aqui comienza la iteración de los registros y primas agregadas */}
              {/* TODO: Realizar un componente  */}
              <Grid container className={style.boxDatos}>
                <Grid item xs={6}>
                  <Item className={style.itemAdd}>ABC1234567</Item>
                </Grid>
                <Grid style={{ borderLeft: "1px solid #c7ccdc" }} item xs={6}>
                  <Item className={style.itemAdd}>0.5</Item>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            className={style.buttonCancelar}
            style={{ marginRight: "20px" }}
            onClick={toggle}
          >
            Cancelar
          </Button>
          <Button className={style.bottonSave}>
            <SaveIcon />
            Guardar
          </Button>
        </Box>
      </Form>
    </Box>
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
    claveSubdelegacionIMSS: "",
    llaveCertificadoDeSelloDigital: "",
    certificadoDeSelloDigital: "",
    contrasenaCertDig: "",
    lecturaAutomaticaDeHorasExtras: "",
    calculoAutomaticoDePromedioVariable: false,
    UsarSTPcomoMedioDePago: false,
    IMSSObreroIntegradoAIMSSpatronal: false,
    usuarioDeCertificadoIMSS: false,
    contraseñaDeCertificadoIMSS: false,
    certificadoIMSS: false,
    certificadoFIEL: false,
    llavePrivadaFIEL: false,
  };
};

const validationSchema = () => {
  return {
    // nombreDeLaEmpresa: Yup.string().required("Este campo es requerido"),
    // razonSocial: Yup.string().required("Este campo es requerido"),
    // logo: Yup.string().required("Este campo es requerido"),
    // rfc: Yup.string().required("Este campo es requerido"),
    // regimenFiscal: Yup.string().required("Este campo es requerido"),
    // registroPatronal: Yup.string().required("Este campo es requerido"),
    // primaDeRiesgo: Yup.string().required("Este campo es requerido"),
    // estado: Yup.string().required("Este campo es requerido"),
    // direccion: Yup.string().required("Este campo es requerido"),
    // codigoPostal: Yup.string().required("Este campo es requerido"),
    // claveSubdelegacionIMSS: Yup.string().required("Este campo es requerido"),
    // llaveCertificadoDeSelloDigital: Yup.string().required(
    //   "Este campo es requerido"
    // ),
    // certificadoDeSelloDigital: Yup.string().required("Este campo es requerido"),
    // contrasenaCertDig: Yup.string().required("Este campo es requerido"),
    // lecturaAutomaticaDeHorasExtras: Yup.string().required(
    //   "Este campo es requerido"
    // ),
  };
};

export default ModalEditEmpresa;
