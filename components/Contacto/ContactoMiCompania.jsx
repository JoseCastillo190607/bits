import React from "react";
import { Form, Label, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";

function ContactoMiCompania() {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
    },
  });
  return (
    <div>
      <p>Representante Legal</p>
      <Form onSubmit={formik.handleSubmit}>
        <Label>Nombre</Label>
        <Form.Input
          type="text"
          onChange={formik.handleChange}
          error={formik.errors.nameRL}
        />
        <Label>Email</Label>
        <Form.Input
          name="emailRL"
          type="text"
          onChange={formik.handleChange}
          error={formik.errors.emailRL}
        />
        <Label>Nacionalidad</Label>
        <Form.Input
          name="nacionalidadRL"
          type="text"
          onChange={formik.handleChange}
          error={formik.errors.nacionalidadRL}
        />
        <Label>CURP</Label>
        <Form.Input
          name="curpRL"
          type="text"
          onChange={formik.handleChange}
          error={formik.errors.curpRL}
        />
        <Label>Telefono</Label>
        <Form.Input
          name="telefonoRL"
          type="text"
          onChange={formik.handleChange}
          erorr={formik.errors.telefonoRL}
        />
        <Label>Firma</Label>
        <Form.Input
          name="firmaRL"
          type="text"
          onChange={formik.handleChange}
          error={formik.errors.firmaRL}
        />
        <p> Contacto RRHH</p>
        <Label>Nombre</Label>
        <Form.Input
          name="nameCRH"
          type="text"
          onChange={formik.handleChange}
          erorr={formik.errors.nameCRH}
        />
        <Label>Email</Label>
        <Form.Input
          name="emailCRH"
          type="text"
          onChange={formik.handleChange}
          error={formik.errors.emailCRH}
        />
        <Label>Nacionalidad</Label>
        <Form.Input
          name="nacionalidadCRH"
          type="text"
          onChange={formik.handleChange}
          error={formik.errors.nacionalidadCRH}
        />
        <Label>CURP</Label>
        <Form.Input name="curpCRH" type="text" oChange={formik.handleChange} />
        <Label>Telefono</Label>
        <Form.Input
          name="telefonoCRH"
          type="text"
          onChange={formik.handleChange}
          error={formik.errors.telefonoCRH}
        />
        <Button type="submit">Enviar</Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    nameRL: "",
    emailRL: "",
    nacionalidadRL: "",
    curpRL: "",
    telefonoRL: "",
    firmaRL: "",
    nameCRH: "",
    emailCRH: "",
    nacionalidadCRH: "",
    curpCRH: "",
    telefonoCRH: "",
  };
}

function validationSchema() {
  return {
    nameRL: Yup.string().required(true),
    emailRL: Yup.string().email().required(true),
    nacionalidadRL: Yup.string().required(true),
    curpRL: Yup.string().required(true),
    telefonoRL: Yup.number().required(true),
    firmaRL: Yup.string().required(true),
    nameCRH: Yup.string().required(true),
    emailCRH: Yup.string().email().required(true),
    nacionalidadCRH: Yup.string().required(true),
    curpCRH: Yup.string().required(true),
    telefonoCRH: Yup.number().required(true),
  };
}

export default ContactoMiCompania;
