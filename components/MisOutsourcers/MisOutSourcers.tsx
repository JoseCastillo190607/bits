import React, { useState } from "react";
import styles from "./MisOutsourcers.module.css";
import { Box } from "@material-ui/core";
import { Button } from "semantic-ui-react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InfoIcon from "@mui/icons-material/Info";
import Modal from "../Portal/Modal";
import ModalAddOutsourcers from "./ModalAddOutsourcers/ModalAddOutsourcers";
import TableOutSources from "./TableOutsources/TableOutsorces";
import { useQuery } from "@apollo/client";
import { GET_ALL_OUTSOURCERS } from "../../Querys/querys";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
};

export const MisOutSourcers = (props: TabPanelProps) => {
  const [active, setActive] = useState(false);
  const toggle = () => {
    setActive(!active);
  };

  const resultOutsources = useQuery(GET_ALL_OUTSOURCERS);
  const allOutsources = resultOutsources.data?.GET_ALL_OUTSOURCERS;

  // console.log(allOutsources?.map((outsorcer: any) => outsorcer.status));

  const activos = allOutsources?.map((outsorcer: any) => outsorcer.status);
  const result = activos?.filter((active: any) => active.length === 6);

  return (
    <Box className={styles.misOutSourcersGeneralDiv}>
      <Modal active={active} toggle={toggle}>
        <ModalAddOutsourcers toggle={toggle} />
      </Modal>
      <Box className={styles.titleButonBox}>
        <Box className={styles.title}>Mis Outsourcers</Box>
        <Button onClick={toggle} className={styles.ButtonOutsources}>
          <PersonAddIcon />
          Crear outsourcer
        </Button>
      </Box>
      {result?.length >= 1 ? (
        <Box className={styles.cajaTabla}>
          <TableOutSources />
        </Box>
      ) : (
        <Box className={styles.boxEmptyNote}>
          No tienes outsourcers para tu compañía
          <InfoIcon sx={{ width: 13, margin: 1 }} />
        </Box>
      )}
    </Box>
  );
};

export default MisOutSourcers;
