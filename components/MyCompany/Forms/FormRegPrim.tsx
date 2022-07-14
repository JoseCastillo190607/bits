import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Box, TextField } from "@material-ui/core";
import style from "../../ModalAddEmpresa/ModalAddEmpresa.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GET_ALL_KEYS, CREATE_KEYS } from "../../../Querys/querys";
import { useMutation } from "@apollo/client";

function FormRegPrim() {
  const [createNewKey] = useMutation(CREATE_KEYS, {
    refetchQueries: [{ query: GET_ALL_KEYS }],
  });

  const onSubmit = ({ e, formData }: any) => {
    e.preventDefault();
    console.log(formData);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      // console.log(formData);
      createNewKey({
        variables: {
          input: {
            registroPatronal: formData.riesgoPatronal,
            primaDeRiesgo: formData.primaDeRiesgo,
          },
        },
      });
    },
  });

  return (
    <Form
      onSubmit={(e: any) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      <Box className={style.boxRegPrim}>
        <TextField
          type="text"
          name="riesgoPatronal"
          onChange={formik.handleChange}
          label="Riesgo patronal"
          variant="outlined"
          // id="outline-basic"
          size="small"
          margin="normal"
          error={Boolean(formik.errors.riesgoPatronal)}
        />
        <TextField
          type="text"
          name="primaDeRiesgo"
          onChange={formik.handleChange}
          label="Prima de riesgo"
          variant="outlined"
          // id="outline-basic"
          size="small"
          margin="normal"
          error={Boolean(formik.errors.primaDeRiesgo)}
          InputProps={{
            endAdornment: (
              <Button
                type="submit"
                // onClick={(e: any) => e.preventDefault()}
                className={style.addReg}
              >
                Agregar
              </Button>
            ),
          }}
        />
        {/* <Button className={style.addReg}>Agregar</Button> */}
      </Box>
    </Form>
  );
}

const initialValues = () => {
  return {
    riesgoPatronal: "",
    primaDeRiesgo: "",
  };
};

const validationSchema = () => {
  return {
    riesgoPatronal: Yup.string().required(),
    primaDeRiesgo: Yup.string().required(),
  };
};

export default FormRegPrim;
