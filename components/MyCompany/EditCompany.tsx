import React from "react";
import { Form, Label, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_COMPANY } from "../../Querys/querys";

function EditCompany({ logo, id, name, fundationDate, toggle }: any) {
  const [updateCompany] = useMutation(UPDATE_COMPANY);

  const formik = useFormik({
    initialValues: initialValues(id),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      //   console.log(formData);
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
      });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Label>Nombre:</Label>
      <Form.Input
        name="name"
        placeholder={name}
        onChange={formik.handleChange}
      />
      <Label>Logo</Label>
      <Form.Input
        name="logo"
        placeholder={logo}
        onChange={formik.handleChange}
      />
      <Label>Fecha de fundación</Label>
      <Form.Input name="date" type="date" onChange={formik.handleChange} />
      <Button type="submit">Guardar cambios</Button>
      <Button onClick={toggle}>Cancelar</Button>
    </Form>
  );
}

const initialValues = (id: any) => {
  return {
    id,
    name: "",
    logo: "",
    date: "",
  };
};

const validationSchema = () => {
  return {
    name: Yup.string(),
    logo: Yup.string(),
    date: Yup.string(),
  };
};

export default EditCompany;
