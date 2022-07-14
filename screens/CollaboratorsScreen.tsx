import { ChangeEvent, useState, useEffect, useContext } from "react";
import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import CollaboratorTab from "../components/Collaborators/CollaboratorTab";
import NuevoIngresoCollaboratorTab from "../components/Collaborators/NuevoIngresoCollaboratorTab";
import InactivosCollaboratorTab from "../components/Collaborators/InactivosCollaboratorTab";

import AdminTab from "../components/Admin/AdminTab";
import InactiveTab from "../components/Inactives/InactivesTab";
import ModalState from "../context/ModalContext/ModalState";
import DeclinadoTab from "../components/Declinado/DeclinadoTab";
import CandidatesTab from "../components/CandidatesTab/CandidatesTab";
import CustomTabs from "../components/Collaborators/Tab/CustomTabs";
import CustomTab from "../components/Collaborators/Tab/CustomTabMain";
import "../components/Collaborators/collaborator.css";
import { AdminContext } from "../context/AdminContext/AdminContext";

const CollaboratorsScreen = () => {
  const [tab, setTab] = useState(0);
  const { adminState } = useContext(AdminContext);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
    localStorage.setItem("currentPill", String(newValue));
  };

  useEffect(() => {
    let pill = localStorage.getItem("currentPill");
    if (pill) setTab(Number(pill));
    else setTab(0);
  }, [tab]);

  return (
    <div>
      <Box mt={3} ml={5} className="Title">
        Colaboradores
      </Box>
      <Box p={5} pb={3} pt={0}>
        <Grid container justify="flex-start">
          <CustomTabs
            value={tab}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            {adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso
              ?.Acceso === true ? (
              <CustomTab label="Nuevo Ingreso" value={0} />
            ) : null}
            {adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores
              ?.Acceso === true ? (
              <CustomTab label="Colaboradores" value={1} />
            ) : null}
            {adminState?.PermisosContex?.Modulos?.Colaboradores?.Declinados
              ?.Ver === true ? (
              <CustomTab label="Declinados" value={2} />
            ) : null}
            {adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos
              ?.Acceso === true ? (
              <CustomTab label="Inactivos" value={3} />
            ) : null}
            {adminState?.PermisosContex?.tipoAdmin !== "Super" ? (
              <CustomTab label="Administradores" value={4} />
            ) : null}
          </CustomTabs>
        </Grid>
      </Box>

      <div className="collaborator__container">
        {}
        {tab === 0 && <CollaboratorTab value={tab} index={0} />}
        {tab === 1 && <CollaboratorTab value={tab} index={1} />}
        {tab === 2 && <CollaboratorTab value={tab} index={2} />}
        <ModalState>
          {tab === 3 && <CollaboratorTab value={tab} index={3} />}
          {tab === 4 && <CollaboratorTab value={tab} index={4} />}
        </ModalState>
      </div>
    </div>
  );
};

export default CollaboratorsScreen;
