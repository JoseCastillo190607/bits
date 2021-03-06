import { Box } from "@material-ui/core";
import React from "react";
import style from "./NavBarAddCompany.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function NavBarAddCompany({ paso }: any) {
  return (
    <>
      <Box className={style.titleAddCompany}>
        <p className="titleAddCompany">Agregar nueva empresa</p>
      </Box>
      <Box className={style.boxForms}>
        {paso === 1 && (
          <>
            <Box className={style.boxFormsEmpty}>
              Identidad legal
              <div
                style={{
                  backgroundColor: " #c7ccdc",
                  width: "14px",
                  height: "14px",
                  borderRadius: "100px",
                }}
              ></div>
            </Box>
            <Box className={style.boxFormsField}>Certificados y llaves</Box>
            <Box className={style.boxFormsField}>Información bancaria</Box>
          </>
        )}
        {paso === 2 && (
          <>
            <Box className={style.boxFormsFull}>
              Identidad legal
              <CheckCircleIcon
                sx={{ color: "#11ca73", width: "14px", height: "14px" }}
              />
            </Box>
            <Box className={style.boxFormsEmpty}>
              Certificados y llaves{" "}
              <div
                style={{
                  backgroundColor: " #c7ccdc",
                  width: "14px",
                  height: "14px",
                  borderRadius: "100px",
                }}
              ></div>
            </Box>
            <Box className={style.boxFormsField}>Información bancaria</Box>
          </>
        )}
        {paso === 3 && (
          <>
            <Box className={style.boxFormsFull}>
              Identidad legal
              <CheckCircleIcon
                sx={{ color: "#11ca73", width: "14px", height: "14px" }}
              />
            </Box>
            <Box className={style.boxFormsFull}>
              Certificados y llaves{" "}
              <CheckCircleIcon
                sx={{ color: "#11ca73", width: "14px", height: "14px" }}
              />
            </Box>
            <Box className={style.boxFormsEmpty}>
              Información bancaria{" "}
              <div
                style={{
                  backgroundColor: " #c7ccdc",
                  width: "14px",
                  height: "14px",
                  borderRadius: "100px",
                }}
              ></div>
            </Box>
          </>
        )}
        {paso === 4 && (
          <>
            <Box className={style.boxFormsFull}>
              Identidad legal
              <CheckCircleIcon
                sx={{ color: "#11ca73", width: "14px", height: "14px" }}
              />
            </Box>
            <Box className={style.boxFormsFull}>
              Certificados y llaves{" "}
              <CheckCircleIcon
                sx={{ color: "#11ca73", width: "14px", height: "14px" }}
              />
            </Box>
            <Box className={style.boxFormsFull}>
              Información bancaria{" "}
              <CheckCircleIcon
                sx={{ color: "#11ca73", width: "14px", height: "14px" }}
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default NavBarAddCompany;
