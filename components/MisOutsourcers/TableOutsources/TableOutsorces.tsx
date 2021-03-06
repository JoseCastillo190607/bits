import React from "react";
import { Box } from "@material-ui/core";

import style from "./TableOutsources.module.css";
import { useQuery } from "@apollo/client";
import { GET_ALL_OUTSOURCERS } from "../../../Querys/querys";

import OutsourcesCard from "./OutsourcesCard";

function TableOutsorces() {
  const resultOutsources = useQuery(GET_ALL_OUTSOURCERS);
  const allOutsources = resultOutsources.data?.GET_ALL_OUTSOURCERS;

  return (
    <Box className={style.boxTable}>
      <Box className={style.boxTitle}>
        <Box ml={1}>Outsource</Box>
        <Box>Razón social</Box>
        <Box mr={1}>Más información</Box>
      </Box>
      <Box className={style.boxOutsoursers}>
        {/* A aprtir de aquí se debe iterar */}
        {allOutsources?.map((c: any) => {
          return (
            c.status === "Activo" && (
              <OutsourcesCard
                id={c.id}
                logo={c.logo}
                nombre={c.nombre}
                razonSocial={c.razonSocial}
              />
            )
          );
        })}
      </Box>
    </Box>
  );
}

export default TableOutsorces;
