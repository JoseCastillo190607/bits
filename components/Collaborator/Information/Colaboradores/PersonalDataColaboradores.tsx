import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Box, Grid, TextField } from "@material-ui/core";
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import { updateData } from "../../../../helpers/Collaborator/Collaborator";
import { useParams } from "react-router-dom";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import SaveIcon from "@material-ui/icons/Save";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";
import { useMutation } from "@apollo/client";
import { UPDATE_USERS } from "../../../../Querys/querys";
import { Button } from "semantic-ui-react";

const PersonalDataColaboradores = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  console.log("CollaboratorContext", state);
  const { adminState } = useContext(AdminContext);
  const [disabled, setDisabled] = useState<boolean>(false);
  const params = useParams();

  const [updateColaboradores] = useMutation(UPDATE_USERS);

  useEffect(() => {
    if ("register" in params) setDisabled(true);
  }, [params]);

  const handleChange = async (
    e: ChangeEvent<{ name: string; value: unknown }>
  ) => {
    await updateData(e, state, dispatch, 0);
  };

  const UpdateCandidate = async () => {
    updateColaboradores({
      variables: {
        updateUsersId: state.collaborator?.id,
        input: {
          name: state.collaborator?.name,
          firstName: state.collaborator?.firstName,
          lastName: state.collaborator?.lastName,
          email: state.collaborator?.email,
          cellphone: state.collaborator?.cellphone,
        },
      },
    });

    await SuccessfulAlert({ text: "Datos guardados correctamente." });
  };
  return (
    <>
      <div
        className={
          Math.round(state.sections[0]) >= 100
            ? `validate__border`
            : `novalidate__border`
        }
      >
        <Box mb={2}>
          <TextField
            type="text"
            name="name"
            defaultValue={state.collaborator?.name}
            label="Nombre(s)"
            variant="outlined"
            size="small"
            fullWidth={true}
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
            onBlur={(e) => handleChange(e)}
            InputProps={{
              readOnly: false,
            }}
            disabled={disabled}
            helperText={!state.collaborator?.email && "Obligatorio"}
          />
        </Box>
        <Box mt={2}>
          <TextField
            type="number"
            name="cellphone"
            defaultValue={state.collaborator?.cellphone || ""}
            label="Teléfono celular profesional"
            variant="outlined"
            size="small"
            fullWidth={true}
            onBlur={(e) => handleChange(e)}
            InputProps={{
              readOnly: false,
            }}
            disabled={disabled}
            helperText={!state.collaborator?.cellphone && "Obligatorio"}
          />
        </Box>
        {/* {Math.round(state.sections[0]) < 100 && (<span className="spanRequerido">Todos los campos son requeridos</span>) } */}
      </div>
      <div>
        <Grid direction="row" container justify="flex-end" alignItems="center">
          <Box mt={0} pt={1}>
            {adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso
              ?.Ver?.InformacionAlta?.InformacionPersonal.Editar === true ? (
              <Button
                type="submit"
                className="buttonSave"
                onClick={UpdateCandidate}
              >
                Guardar y Continuar&nbsp;
                <SaveIcon />
              </Button>
            ) : null}
          </Box>
        </Grid>
      </div>
    </>
  );
};

export default PersonalDataColaboradores;
