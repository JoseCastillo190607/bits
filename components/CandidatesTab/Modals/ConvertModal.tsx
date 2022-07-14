import { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
} from "@material-ui/core";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CollaboratorContext, {
  Types,
} from "../../../context/CollaboratorContext/CollaboratorContext";
import { convertCandidate } from "../../../services/candidateService";
import { AttentionAlert } from "../../../alerts/AttentionAlert";
import { useEffect } from "react";
import moment from "moment";
import { useMutation } from "@apollo/client";
import {
  CONVERT_USERS,
  GET_ALL_USERS_COLLABORATOR,
  GET_ALL_USERS_NUEVOINGRESO,
} from "../../../Querys/querys";
import { SuccessfulAlert } from "../../../alerts/successAlerts";

const ConvertModal = () => {
  const { state, dispatch } = useContext(CollaboratorContext);
  const [date, setDate] = useState<string>("");
  const [user, setUser] = useState<Array<any>>([]);
  const [convertUser] = useMutation(CONVERT_USERS, {
    refetchQueries: [
      { query: GET_ALL_USERS_COLLABORATOR },
      { query: GET_ALL_USERS_NUEVOINGRESO },
    ],
  });

  useEffect(() => {
    setUser(state._id.split("/"));
    setDate(moment(state._id.split("/")[1]).format("YYYY-MM-DD"));
  }, [state._id]);

  const rejectData = async (): Promise<void> => {
    let result = await AttentionAlert({
      text: "¿Deseas Convertir a " + user[2] + " a Colaborador?",
      showDenyButton: true,
      confirmButtonText: "Convertir",
    });
    if (result.isConfirmed) {
      debugger;
      convertUser({
        variables: {
          id: user[0],
          input: {
            FechaIngreso: date,
          },
        },
      }).then(() => {
        SuccessfulAlert({ text: "Se convirtio correctamente a colaborador" });
      });

      dispatch({ type: Types.CANCEL_CONVERT_MODAL });
    }
  };
  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={state.convertModal}
      fullWidth={true}
    >
      <h2 id="form-dialog-title" className="text-center">
        Convertir Candidato
      </h2>

      <DialogContent>
        <Grid
          direction="row"
          container
          justify="flex-start"
          alignItems="center"
        >
          <label>
            Candidato: <b>{user[2]}</b>
          </label>
        </Grid>
      </DialogContent>

      <DialogContent>
        <Grid direction="row" container justify="center" alignItems="center">
          <Grid item xs>
            <label>Confirme Fecha de Ingreso</label>
          </Grid>
          <Grid item xs>
            <TextField
              variant="outlined"
              type="date"
              InputProps={{ readOnly: false }}
              name="Comentario"
              size="small"
              fullWidth={true}
              defaultValue={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <MuiDialogActions>
        <Button
          className="buttonCancel"
          onClick={() => dispatch({ type: Types.CANCEL_CONVERT_MODAL })}
        >
          Cerrar
        </Button>
        <Button className="buttonSave" onClick={rejectData}>
          Convertir
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
};

export default ConvertModal;
