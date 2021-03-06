import { Form, Button, Item } from "semantic-ui-react";
import style from "../../ModalAddEmpresa/ModalAddEmpresa.module.css";
import "./Forms.css";
import { Box, Switch, TextField } from "@material-ui/core";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Grid } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_ALL_KEYS, CREATE_KEYS, DELETE_KEYS } from "../../../Querys/querys";
import { useMutation } from "@apollo/client";
import FormRegPrim from "./FormRegPrim";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function CertificadoYLlaves({
  handleInputChange,
  siguientePaso,
  handleInputChecked,
  toggle,
  state,
  setState,
}: any) {
  const getAllKeys = useQuery(GET_ALL_KEYS);
  const allKeys = getAllKeys?.data?.GET_ALL_KEYS;

  const activos = allKeys?.map((keys: any) => keys.status);
  const result = activos?.filter((active: any) => active.length === 6);

  const [createNewKey] = useMutation(CREATE_KEYS, {
    refetchQueries: [{ query: GET_ALL_KEYS }],
  });

  const [deleteKeys] = useMutation(DELETE_KEYS, {
    refetchQueries: [{ query: GET_ALL_KEYS }],
  });

  const onDelete = (id: any) => {
    deleteKeys({
      variables: {
        deleteKeysId: id,
      },
    });
  };
  // const formik = useFormik({
  //   initialValues: initialValues(),
  //   validationSchema: Yup.object(validationSchema()),
  //   onSubmit: (formData) => {
  //     console.log(formData);
  //     // createNewKey({
  //     //   variables: {
  //     //     input: {
  //     //       registroPatronal: formData.registroPatronal,
  //     //       primaDeRiesgo: formData.primaDeRiesgo,
  //     //     },
  //     //   },
  //     // });
  //     // siguientePaso();
  //   },
  // });

  return (
    <Box
      style={{
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          width: "420px",
          height: "220px",
          backgroundColor: "#F1F2F5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "4px",
        }}
      >
        <Box className={style.tilteBox}>Certificado IMSS</Box>
        <Box className="boxArchivoSubmit">
          <p className="text">Llave del certificado de sello digital</p>
          <Box className="boxSubmitArchivo">
            <Button
              className="buttonArchivo"
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
              onChange={handleInputChange}
            />
          </Box>
        </Box>
        <Box className="boxArchivoSubmit">
          <p className="text">Certificado de sello digital</p>
          <Box
            className="boxSubmitArchivo"
            style={{ backgroundColor: "#fabb00" }}
          >
            <Button
              className="buttonArchivo"
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
              onChange={handleInputChange}
            />
          </Box>
        </Box>
        <TextField
          type="password"
          name="contrasenaParaELCertificado"
          onChange={handleInputChange}
          label="Contrase??a para el certificado digital"
          className={style.TextField}
          variant="outlined"
          id="outline-basic"
          size="small"
          margin="normal"
          InputProps={{
            endAdornment: (
              <Box>
                <VisibilityIcon
                  sx={{ width: "20px", height: "15px", color: "#093C5D" }}
                />
              </Box>
            ),
          }}
        />
      </Box>

      <FormRegPrim />
      {result?.length >= 1 ? (
        <Box className={style.boxPrimasAgregadas}>
          {/* Aqui comienza la iteraci??n de los registros y primas agregadas */}
          {/* TODO: Realizar un componente  */}

          {allKeys?.map((k: any) => {
            console.log(k);
            return (
              k.status === "Activo" && (
                <Grid container className={style.boxDatos}>
                  <Grid item xs={6}>
                    <Item className={style.itemAdd}>{k.registroPatronal}</Item>
                  </Grid>
                  <Grid style={{ borderLeft: "1px solid #c7ccdc" }} item xs={6}>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Item className={style.itemAdd}>{k.primaDeRiesgo}</Item>
                      <Box
                        onClick={() => {
                          onDelete(k.id);
                        }}
                      >
                        <DeleteOutlineOutlinedIcon sx={{ color: "red" }} />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              )
            );
          })}

          {/* Aqui termina el componente iterable */}
        </Box>
      ) : (
        <Box className={style.sinRegistros}>Sin registros patronales</Box>
      )}
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
          type="button"
          className={style.buttonsAddEnterprise}
          onClick={siguientePaso}
          style={{ backgroundColor: "#fabb00" }}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  );
}

const initialValues = () => {
  return {
    // claveSubdelegacion: "",
    // llaveCertificado: "",
    // certificadoSelloDigital: "",
    // contrasenaParaELCertificado: "",
    // IMSSObreroIntegrado: false,
    // usuarioCertificadoImms: false,
    // contrasenaCertificadoIMSS: false,
    // certificadoIMSS: false,
    // certificadoFIEL: false,
    // llavePrivadaFIEL: false,
    // registroPatronal: "",
    // primaDeRiesgo: "",
  };
};

const validationSchema = () => {
  return {
    // claveSubdelegacion: Yup.string().required("Este campo es obligatorio"),
    // llaveCertificado: Yup.string().required("Este campo es obligatorio"),
    // certificadoSelloDigital: Yup.string().required("Este campo es obligatorio"),
    // contrasenaParaELCertificado: Yup.string().required(
    //   "Este campo es obligatorio"
    // ),
    // registroPatronal: Yup.string().required("este campo es requerido"),
    // primaDeRiesgo: Yup.string().required("este campo es requerido"),
  };
};

export default CertificadoYLlaves;
