import { useReducer } from "react";
import { EmpresaContext } from "./EmpresaContex";
import { EmpresasState } from "../../interfaces/Empresa.interfaces";
import { empresaReducer } from "./EmpresaReducer";

const INITIAL_STATE: EmpresasState = {
  paso: 1,
  empresa: [
    {
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
    },
  ],
};

interface props {
  children: JSX.Element | JSX.Element[];
}

export const EmpresaProvider = ({ children }: props) => {
  const [EmpresaState, dispatch] = useReducer(empresaReducer, INITIAL_STATE);
  return (
    <EmpresaContext.Provider value={{ EmpresaState }}>
      {children}
    </EmpresaContext.Provider>
  );
};
