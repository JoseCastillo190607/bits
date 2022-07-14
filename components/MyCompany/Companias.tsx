import React, { useState } from "react";
import moment from "moment";
import { Form, Label, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "../Portal/Modal";
import { Box, Grid } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import "./infromacionGral.css";
import EditCompany from "./EditCompany";
import {
  GET_ALL_COMPANY,
  DELETE_COMPANY,
  UPDATE_COMPANY,
} from "../../Querys/querys";
import EditIcon from "@mui/icons-material/Edit";
import File_Helper from '../Collaborator/Expedient/Fields/File_Helper';
import { SuccessfulAlert } from "../../alerts/successAlerts";

function Companias({ logo, id, name, fundationDate, status, idArchive, URL }: any) {
  let fechaFormato = moment(fundationDate).format("LL");
  const [editar, setEditar] = useState(false);
  const [updateCompany] = useMutation(UPDATE_COMPANY);

  const initialValues = (id: any) => {
    return {
      id,
      name: "",
      logo: "",
      date: "",
      idArchive: "",
    };
  };

  const validationSchema = () => {
    return {
      name: Yup.string(),
      logo: Yup.string(),
      date: Yup.string(),
      idArchive: Yup.string(),
    };
  };

  const formik = useFormik({
    initialValues: initialValues(id),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      setEditar(false);
      updateCompany({
        variables: {
          updateCompanyId: id,
          input: {
            Name: formData.name,
            fundationDate: formData.date,
            logo: formData.logo,
            website: "www.pruebas.com",
            User: "pruebas",
          },
        },
      }).then(()=>{
        SuccessfulAlert({text:"Se actualizó con éxito"})
    });
    },
  });

  const [delateCompany] = useMutation(DELETE_COMPANY, {
    refetchQueries: [{ query: GET_ALL_COMPANY }],
  });
  const [active, setActive] = useState(false);
  const toggle = () => {
    setActive(!active);
  };

  const onDelete = () => {
    delateCompany({
      variables: {
        deleteCompanyId: id,
      },
    });
    alert("La empresa ha sido eliminada");
  };

  return (
    <>
      {editar === false ? (
        <Grid container spacing={2} className="contenedorCompania">
          <Grid item xs={1} className="columnaCompania">
            <div className="logoCompania">
              <img className="ImgLogo" src={URL}></img>
            </div>
          </Grid>
          <Grid item xs={4} className="columnaCompania">
            <div>
              <span className="textoTitulosCompania">Nombre</span>
            </div>
            <div className="textoCompania">{name}</div>
          </Grid>
          <Grid item xs={4} className="columnaCompania">
            <div>
              <span className="textoTitulosCompania">Fecha de fundación</span>
            </div>
            <div className="textoCompania">{fechaFormato}</div>
          </Grid>
          <Grid item xs={3} className="columnaCompaniaButton">
            <button
              className="buttonEditarCompania"
              onClick={() => setEditar(!editar)}
            >
              <EditIcon
                sx={{ width: "16px", height: "16px", color: "#093c5d" }}
              />
              Editar información
            </button>
          </Grid>
        </Grid>
      ) : (
        <Form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1} className="contenedorCompania">
            <Grid item xs={1} className="columnaCompania">
              <div className="logoCompania">
              <img className="ImgLogo" src={URL}></img>
              <File_Helper name="Foto_IMG" accept=".png,.jpg,.jpeg"  parametrofrom="empresa.imagen" idUsr={id} idArchive={idArchive} />

              </div>
            </Grid>
            <Grid item xs={4} className="columnaCompania">
              <div>
                <span className="textoTitulosCompania">Nombre</span>
              </div>
              <div className="textoCompania">
                <Form.Input
                  name="name"
                  placeholder={name}
                  onChange={formik.handleChange}
                />
              </div>
            </Grid>
            <Grid item xs={4} className="columnaCompania">
              <div>
                <span className="textoTitulosCompania">Fecha de fundación</span>
              </div>
              <div className="textoCompania">
                <Form.Input
                  name="date"
                  type="date"
                  onChange={formik.handleChange}
                />
              </div>
            </Grid>
            <Grid item xs={3} className="columnaCompaniaOnEdit">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  className="buttonEditarCompaniaOnEdit mr-10"
                >
                  Guardar Cambios
                </Button>
                <button
                  className="buttonEditarCompaniaOnEdit"
                  onClick={() => setEditar(!editar)}
                >
                  Cancelar
                </button>
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </>
  );
}

export default Companias;
