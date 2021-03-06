import React, { useState } from "react";
import { Box } from "@material-ui/core";
import "./infromacionGral.css";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import Modal from "../Portal/Modal";
import ModalAddEmpresa from "../ModalAddEmpresa/ModalAddEmpresa";

import { useQuery } from "@apollo/client";
import Companias from "./Companias";
import { GET_ALL_COMPANY, GET_ALL_ENTERPRISE } from "../../Querys/querys";
import Enterprise from "./Enterprise";
import { EmpresaProvider } from "../../context/MiEmpresa/EmpresaProvider";
import ModalState from "../../context/ModalContext/ModalState";
import Sedes from "../Team/Sedes";
import ProjectModalState from "../../context/ProjectsContext/ProjectModalState";
import Projects from "../Team/Projects";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function InformacionGral(props: TabPanelProps) {
  const [active, setActive] = useState(false);
  const [sedesActivo, setSedesActivo] = useState("1");

  const resultEnterprise = useQuery(GET_ALL_ENTERPRISE);
  const resultCompany = useQuery(GET_ALL_COMPANY);

  const allCompany = resultCompany.data?.GET_ALL_COMPANY;
  const allEnterprise = resultEnterprise.data?.GET_ALL_ENTERPRISE;
  console.log(allEnterprise);

  console.log("compañias", allEnterprise);

  const toggle = () => {
    setActive(!active);
  };

  const enterpriseData = {
    nombreDeLaEmpresa: "",
    razonSocial: "",
    logo: "",
    industria: "",
    rfc: "",
    regimenFiscal: "",
    registroPatronal: "",
    primaDeRiesgo: "",
    estado: "",
    direccion: "",
    codigoPostal: "",
    claveSubdelegacion: "",
    llaveCertificado: "",
    certificadoSelloDigital: "",
    contrasenaParaELCertificado: "",
    IMSSObreroIntegrado: false,
    usuarioCertificadoImms: false,
    contrasenaCertificadoIMSS: false,
    certificadoIMSS: false,
    certificadoFIEL: false,
    llavePrivadaFIEL: false,
    cuentaBancaria: "",
    cuentaSTP: "",
    cuentaClabeSTP: "",
    lecturaAutomaticaHorasExtra: false,
    calculoAutomaticoPromedioVariables: false,
    usarSTPComoMedioPago: false,
  };

  return (
    <>
      <EmpresaProvider>
        <Modal active={active} toggle={toggle}>
          <ModalAddEmpresa toggle={toggle} />
        </Modal>
      </EmpresaProvider>
      <div className="contenedorBaseCompania">
        <div>
          {allCompany?.map((c: any) => {
            return (
              c.status === "Activo" && (
                <Companias
                  id={c.id}
                  logo={c.logo}
                  name={c.Name}
                  fundationDate={c.fundationDate}
                />
              )
            );
          })}
        </div>
        <div>
          <div className="contenedorTituloEmpresa">
            <div>
              <span className="tituloEmpresa">Mis Empresas</span>
            </div>
            <div>
              <button className="button-Agregar-Compania" onClick={toggle}>
                + Agregar empresa
              </button>
            </div>
          </div>
          <div className="contenedorEmpresas">
            {resultEnterprise.loading ? (
              <div>Cargando...</div>
            ) : (
              allEnterprise?.map((c: any) => {
                return (
                  c.status === "Activo" && (
                    <>
                      <Enterprise
                        id={c.id}
                        name={c.name}
                        rfc={c.taxRegime}
                        cuentaBancaria={c.bankaccount}
                      />
                    </>
                  )
                );
              })
            )}
          </div>
        </div>
      </div>
      <div>
        <div>
          <TabsUnstyled defaultValue={0} className="mainConceptsHeader">
            <div className="conceptsHeaders">
              <TabsListUnstyled>
                <TabUnstyled
                  id="botonHeader"
                  className={`configBotonHeader ${
                    sedesActivo === "1" ? "activo" : "desactivo"
                  }`}
                  onClick={(e) => setSedesActivo("1")}
                >
                  <span className="conceptstextoBotonHeader">Sedes</span>
                </TabUnstyled>
                <TabUnstyled
                  style={{ width: "123px" }}
                  id="botonHeader"
                  className={`configBotonHeader ${
                    sedesActivo === "2" ? "activo" : "desactivo"
                  }`}
                  onClick={(e) => setSedesActivo("2")}
                >
                  <span className="conceptstextoBotonHeader">
                    Área o Proyecto
                  </span>
                </TabUnstyled>
              </TabsListUnstyled>
            </div>
            <div className="contenedorPrincipal">
              <TabPanelUnstyled value={0}>
                <div className="contenedorTablaSedes">
                  <ModalState>
                    <Sedes />
                  </ModalState>
                </div>
              </TabPanelUnstyled>
              <TabPanelUnstyled value={1}>
                <div className="contenedorTablaSedes">
                  <ModalState>
                    <ProjectModalState>
                      <Projects />
                    </ProjectModalState>
                  </ModalState>
                </div>
              </TabPanelUnstyled>
            </div>
          </TabsUnstyled>
        </div>
      </div>
    </>
  );
}

export default InformacionGral;
