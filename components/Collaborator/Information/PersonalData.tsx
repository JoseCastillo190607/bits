import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Box, Grid, TextField, Button} from "@material-ui/core";
import { Form } from "semantic-ui-react";
import CollaboratorContext, {
  Types,
} from "../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../helpers/Collaborator/Collaborator";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import {
  GET_ALL_USERS_NUEVOINGRESO,
  UPDATE_USERS,
} from "../../../Querys/querys";
import { useMutation } from "@apollo/client";
import { SuccessfulAlert } from "../../../alerts/successAlerts";
import SaveIcon from "@material-ui/icons/Save";

const PersonalData = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [phoneMask, setPhoneMask] = useState("");
  const history = useHistory();
  // const [createUserMutation] = useMutation(CREATE_USERS, {
  //   refetchQueries: [{ query: GET_ALL_USERS_NUEVOINGRESO }],
  // });

  const [updateColaboradores] = useMutation(UPDATE_USERS,{
    refetchQueries: [{ query: GET_ALL_USERS_NUEVOINGRESO }],
  });

  const params = useParams();
  useEffect(() => {
    if ("register" in params) setDisabled(true);
  }, [params]);

  const handleChange = async (
    e: ChangeEvent<{ name: string; value: unknown }>
  ) => {
    await updateData(e, state, dispatch, 0);
  };

  const initialValues = () => {
    return {
      name: state.collaborator?.name || "",
      firstName: state.collaborator?.firstName || "",
      lastName: state.collaborator?.lastName || "",
      email: state.collaborator?.email || "",
      cellphone: state.collaborator?.cellphone || "",
    };
  };

  
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),

    onSubmit: async (formData) => {

      updateColaboradores({
        variables: {
          updateUsersId: state.collaborator?.id,
          input: formData
        }
      }).then(res => {
        SuccessfulAlert({ text: "Se actualiz?? correctamente" });
        // dispatch({
        //   type: Types.SET_COLLABORATOR,
        //   payload: {
        //     progress: [33.3, 0, 0, 0],
        //     sections: [100, 0, 0, 0],
        //   },
        // });
      });
    },
  });

  useEffect(() => {
    //length of formik.errors
    if (Object.keys(formik.errors).length > 0) {
      dispatch({
        type: Types.SET_COLLABORATOR,
        payload: {
          progress: [0, 0, 0, 0],
          sections: [0, 0, 0, 0],
        },
      });
    }
  }, [formik.errors]);

  return (
    <Form onSubmit={formik.submitForm}>
      <div className="novalidate__border">
        <Box mb={2}>
          <TextField
            type="text"
            name="name"
            defaultValue={state.collaborator.name}
            label="Nombre(s)"
            variant="outlined"
            size="small"
            fullWidth={true}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.name)}
            onBlur={(e) => handleChange(e)}
            InputProps={{
              readOnly: false,
            }}
            disabled={disabled}
            helperText={!state.collaborator?.name && "Obligatorio"}
          />
        </Box>
        <Grid direction="row" container spacing={2}>
          <Grid xs item>
            <TextField
              name="firstName"
              defaultValue={state.collaborator?.firstName || ""}
              label="Primer apellido"
              variant="outlined"
              size="small"
              fullWidth={true}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.firstName)}
              onBlur={(e) => handleChange(e)}
              InputProps={{
                readOnly: false,
              }}
              disabled={disabled}
              helperText={!state.collaborator?.firstName && "Obligatorio"}
            />
          </Grid>
          <Grid xs item>
            <TextField
              name="lastName"
              defaultValue={state.collaborator?.lastName || ""}
              label="Segundo apellido"
              variant="outlined"
              size="small"
              fullWidth={true}
              onChange={formik.handleChange}
              onBlur={(e) => handleChange(e)}
              InputProps={{
                readOnly: false,
              }}
              disabled={disabled}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <TextField
            type="email"
            name="email"
            defaultValue={state.collaborator?.email || ""}
            label="Email"
            variant="outlined"
            size="small"
            fullWidth={true}
            error={Boolean(formik.errors.email)}
            onChange={formik.handleChange}
            onBlur={(e) => handleChange(e)}
            InputProps={{
              readOnly: false,
            }}
            disabled={disabled}
            helperText={!state.collaborator?.email && "Obligatorio"}
          />
        </Box>
        <Box mt={2}>
          <InputMask
            mask="999 999 99 99"
            defaultValue={state.collaborator?.cellphone || phoneMask}
            onChange={(e) => {
              setPhoneMask(e.target.value);
              formik.handleChange(e);
            }}
            disabled={false}
            onBlur={(e) => handleChange(e)}
          >
            {(inputProps: any) => (
              <TextField
                {...inputProps}
                id="cellphone"
                type="string"
                name="cellphone"
                defaultValue={state.collaborator?.Celular || ""}
                label="Tel??fono celular profesional"
                variant="outlined"
                size="small"
                fullWidth={true}
                error={Boolean(formik.errors.cellphone)}
                InputProps={{
                  readOnly: false,
                }}
                disabled={disabled}
                helperText={!state.collaborator?.Celular && "Obligatorio"}
              />
            )}
          </InputMask>
        </Box>
        {/* {Math.round(state.sections[0]) < 100 && (
        <span className="spanRequerido">Todos los campos son requeridos</span>
      )} */}
      </div>
      <Grid direction="row" container justify="flex-end" alignItems="center" style={{"marginTop":"20px"}}>
        <Button type="submit" className="buttonSave">
          <SaveIcon />
          &nbsp; Guardar
        </Button>
      </Grid>
    </Form>
  );
};



const validationSchema = () => {
  return {
    name: Yup.string().required("El name es requerido"),
    firstName: Yup.string().required("El apellido es un campo requerido"),
    email: Yup.string().email().required("El email es un campo obligatorio"),
    cellphone: Yup.number()
      .required("El celular es un campo obligatorio")
      .min(13, "El celular debe tener al menos 10 d??gitos"),
  };
};

export default PersonalData;
