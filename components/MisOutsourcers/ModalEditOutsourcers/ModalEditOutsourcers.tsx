import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Box, TextField } from "@material-ui/core";
import style from "./ModalEditOutsourcers.module.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GET_ALL_OUTSOURCERS, UPDATE_OUTSOURCER } from "../../../Querys/querys";
import { useMutation } from "@apollo/client";
import { SuccessfulAlert } from "../../../alerts/successAlerts";

function ModalAddOutsourcers({
  toggle,
  id,
  nombre,
  logo,
  razonSocial,
  rfc,
  numeroDeRepse,
  sitioWeb,
  direccionEmpresa,
  direccionFiscal,
  nombreDeContacto,
  correoContacto,
  telefonoContacto,
  comentariosAdicionales,
  vigencia,
}: any) {
  // cambiar a update
  const [updateOutsourcer] = useMutation(UPDATE_OUTSOURCER, {
    refetchQueries: [{ query: GET_ALL_OUTSOURCERS }],
  });

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      console.log(formData);
      updateOutsourcer({
        variables: {
          updateOutsourcersId: id,
          input: {
            nombre: formData.nombre || nombre,
            logo: formData.logo || logo,
            razonSocial: formData.razonSocial || razonSocial,
            rfc: formData.rfc || rfc,
            numeroDeRepse: formData.numeroDeRepse || numeroDeRepse,
            sitioWeb: formData.sitioWeb || sitioWeb,
            direccionFiscal: formData.direccionFiscal || direccionFiscal,
            direccionEmpresa: formData.direccionEmpresa || direccionEmpresa,
            nombreDeContacto: formData.nombreDeContacto || nombreDeContacto,
            correoContacto: formData.correoContacto || correoContacto,
            telefonoContacto: formData.telefonoContacto || telefonoContacto,
            comentariosAdicionales:
              formData.comentariosAdicionales || comentariosAdicionales,
          },
        },
      }).then(()=>{
        SuccessfulAlert({text:"Outsourcer actualizado con éxito"});
    });
      toggle();
    },
  });

  return (
    <Box className={style.divModalAdd}>
      <Box className={style.boxTitle}>Editar outsources</Box>
      <Form onSubmit={formik.handleSubmit}>
        <TextField
          className={style.TexfieldOutsorces}
          name="nombre"
          label="Nombre *"
          size="small"
          id="outlined-basic"
          variant="outlined"
          margin="dense"
          onChange={formik.handleChange}
          //   error={formik.touched.nombre && Boolean(formik.errors.nombre)}
          // helperText={formik.touched.nombre && formik.errors.nombre}
          value={formik.touched.nombre}
          defaultValue={nombre}
        />
        <Box style={{ position: "relative", top: "5px" }}>
          <Box className={style.boxLogo}>
            <Button
              className={style.bottonLogo}
              as="label"
              htmlFor="file"
              type="button"
            >
              Sube tu logo*
              <FileUploadIcon
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
          className={style.TexfieldOutsorces}
          name="razonSocial"
          label="Razón social *"
          size="small"
          variant="outlined"
          margin="dense"
          onChange={formik.handleChange}
          //   error={Boolean(formik.errors.razonSocial)}
          value={formik.touched.razonSocial}
          defaultValue={razonSocial}
        />
        <TextField
          className={style.TexfieldOutsorces}
          name="rfc"
          label="RFC *"
          size="small"
          variant="outlined"
          margin="dense"
          onChange={formik.handleChange}
          //   error={Boolean(formik.errors.rfc)}
          value={formik.touched.rfc}
          defaultValue={rfc}
        />
        <Box className={style.boxNumRapse}>
          <TextField
            className={style.TexfieldOutsorcesRepse}
            name="numeroDeRepse"
            label="Numero de Repse *"
            size="small"
            variant="outlined"
            margin="dense"
            onChange={formik.handleChange}
            // error={Boolean(formik.errors.numeroDeRepse)}
            value={formik.touched.numeroDeRepse}
            defaultValue={numeroDeRepse}
            InputProps={{
              endAdornment: (
                <Box className={style.BoxRepseFile}>
                  <Button
                    className={style.textIcon}
                    as="label"
                    htmlFor="file"
                    type="button"
                  >
                    <FileUploadIcon
                      sx={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: "#fabb00",
                        marginRight: "4px",
                        borderRadius: "4px",
                      }}
                    />
                    Subir Aviso de registro
                  </Button>
                  <input
                    name="avisoRegistro"
                    onChange={formik.handleChange}
                    type="file"
                    id="file"
                    style={{ display: "hidden" }}
                  />
                </Box>
              ),
            }}
          />
        </Box>
        <TextField
          className={style.TexfieldOutsorces}
          name="vigencia"
          // label="viegencia"
          type="date"
          size="small"
          variant="outlined"
          margin="dense"
          value={formik.touched.vigencia}
          defaultValue={vigencia}
        />
        <TextField
          className={style.TexfieldOutsorces}
          name="sitioWeb"
          label="Sitio web"
          size="small"
          variant="outlined"
          margin="dense"
          onChange={formik.handleChange}
          //   error={Boolean(formik.errors.sitioWeb)}
          value={formik.touched.sitioWeb}
          defaultValue={sitioWeb}
        />
        <TextField
          className={style.TexfieldOutsorces}
          name="direccionFiscal"
          label="Dirección fiscal*"
          size="small"
          variant="outlined"
          margin="dense"
          onChange={formik.handleChange}
          //   error={Boolean(formik.errors.direccionFiscal)}
          value={formik.touched.direccionFiscal}
          defaultValue={direccionFiscal}
        />
        <TextField
          className={style.TexfieldOutsorces}
          name="direccionEmpresa"
          label="Dirección empresa *"
          size="small"
          variant="outlined"
          margin="dense"
          onChange={formik.handleChange}
          //   error={Boolean(formik.errors.direccionEmpresa)}
          value={formik.touched.direccionEmpresa}
          defaultValue={direccionEmpresa}
        />
        <TextField
          className={style.TexfieldOutsorces}
          name="nombreDeContacto"
          label="Nombre de contacto*"
          size="small"
          variant="outlined"
          margin="dense"
          onChange={formik.handleChange}
          //   error={Boolean(formik.errors.nombreDeContacto)}
          value={formik.touched.nombreDeContacto}
          defaultValue={nombreDeContacto}
        />
        <TextField
          className={style.TexfieldOutsorces}
          name="correoContacto"
          label="Correo de contacto *"
          size="small"
          variant="outlined"
          margin="dense"
          onChange={formik.handleChange}
          //   error={Boolean(formik.errors.correoContacto)}
          value={formik.touched.correoContacto}
          defaultValue={correoContacto}
        />
        <TextField
          className={style.TexfieldOutsorces}
          name="telefonoContacto"
          label="Teléfono de contacto *"
          size="small"
          variant="outlined"
          margin="dense"
          onChange={formik.handleChange}
          //   error={Boolean(formik.errors.telefonoContacto)}
          value={formik.touched.telefonoContacto}
          defaultValue={telefonoContacto}
        />
        <TextField
          id="outlined-multiline-static"
          className={style.TexfieldOutsorces}
          name="comentariosAdicionales"
          label="Comentarios adicionales *"
          size="small"
          variant="outlined"
          margin="dense"
          multiline
          rows={4}
          onChange={formik.handleChange}
          //   error={Boolean(formik.errors.comentariosAdicionales)}
          value={formik.touched.comentariosAdicionales}
          defaultValue={comentariosAdicionales}
        />
        <Box className={style.buttonsBox}>
          <Button onClick={toggle} className={style.buttonsOutsorces}>
            Cancelar
          </Button>
          <Button
            className={style.buttonsOutsorces}
            style={{ backgroundColor: "#fabb00" }}
          >
            <PersonAddIcon
              sx={{ width: "16px", height: "16px", marginRight: "8px" }}
            />
            Editar
          </Button>
        </Box>
      </Form>
    </Box>
  );
}

const initialValues = () => {
  return {
    nombre: "",
    logo: "",
    razonSocial: "",
    rfc: "",
    numeroDeRepse: "",
    avisoRegistro: "",
    sitioWeb: "",
    direccionFiscal: "",
    direccionEmpresa: "",
    nombreDeContacto: "",
    correoContacto: "",
    telefonoContacto: "",
    comentariosAdicionales: "",
    vigencia: "",
  };
};

// @ts-ignore
const validationSchema = () => {
  return {
    // nombre: Yup.string().required("El nombre es requerido"),
    // logo: Yup.string().required("El logo es requerido"),
    // razonSocial: Yup.string().required("La razón social es requerida"),
    // rfc: Yup.string().required("El RFC es requerido"),
    // numeroDeRepse: Yup.string().required("El numero de Repse es requerido"),
    // sitioWeb: Yup.string().required("El sitio web es requerido"),
    // direccionFiscal: Yup.string().required("La dirección fiscal es requerida"),
    // direccionEmpresa: Yup.string().required(
    //   "La dirección empresa es requerida"
    // ),
    // nombreDeContacto: Yup.string().required(
    //   "El nombre de contacto es requerido"
    // ),
    // correoContacto: Yup.string().required("El correo de contacto es requerido"),
    // telefonoContacto: Yup.string().required(
    //   "El teléfono de contacto es requerido"
    // ),
    // comentariosAdicionales: Yup.string().required(
    //   "Los comentarios adicionales son requeridos"
    // ),
  };
};

// @ts-ignore
export default ModalAddOutsourcers;
