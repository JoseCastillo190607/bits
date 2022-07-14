import { useState } from "react";
import CertificadoYLlaves from "../MyCompany/Forms/CertificadoYLlaves";
import FormIdentidadLegal from "../MyCompany/Forms/FormIdentidadLegal";
import InformacionBancaria from "../MyCompany/Forms/InformacionBancaria";
import NavBarAddCompany from "../MyCompany/Forms/NavBarAddCompany";
import { GET_ALL_ENTERPRISE, CREATE_ENTERPRISE } from "../../Querys/querys";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { SuccessfulAlert } from "../../alerts/successAlerts";

function ModalAddEmpresa({ toggle }: any) {
  const [createNewCompany] = useMutation(CREATE_ENTERPRISE, {
    refetchQueries: [{ query: GET_ALL_ENTERPRISE }],
  });

  const [state, setState] = useState({
    paso: 1,
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
  });

  const siguientePaso = (e: any) => {
    e.preventDefault();
    const { paso } = state;
    setState({
      ...state,
      paso: paso + 1,
    });
  };

  const handleInputChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChecked = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.checked,
    });
  };

  const enviar = () => {
    console.log(state);
    createNewCompany({
      variables: {
        input: {
          name: state.nombreDeLaEmpresa,
          logo: state.logo,
          industry: state.industria,
          taxRegime: state.rfc,
          propertyRegime: state.regimenFiscal,
          surcharge: state.primaDeRiesgo,
          state: state.estado,
          address: state.direccion,
          zipCode: state.codigoPostal,
          bankaccount: state.cuentaBancaria,
          IMSSSubdelegationKey: state.claveSubdelegacion,
          fileCER: state.llaveCertificado,
          extrahours: false,
          automaticCalculationsVariables: state.lecturaAutomaticaHorasExtra,
          useSTPaspaymentmethod: state.usarSTPComoMedioPago,
          STPaccount: state.cuentaSTP,
          stpCLABE: state.cuentaClabeSTP,
          IMSSminimumwage: state.IMSSObreroIntegrado,
          operationsIMSSSender: state.usuarioCertificadoImms,
          CertificateOfUserIMSS: "NA",
          CertificatePaswordIMSS: "NA",
          IMSSCertificate: "NA",
          FIELCertificate: "NA",
          FIELPrivateKey: "NA",
        },
      },
    }).then(()=>{
      SuccessfulAlert({text:"Empresa Agregada con Éxito"})
    });
  };

  switch (state.paso) {
    case 1:
      return (
        <>
          <NavBarAddCompany paso={state.paso} />
          <FormIdentidadLegal
            state={state}
            setState={setState}
            handleInputChange={handleInputChange}
            siguientePaso={siguientePaso}
            toggle={toggle}
          />
        </>
      );
    case 2:
      return (
        <>
          <NavBarAddCompany paso={state.paso} />
          <CertificadoYLlaves
            state={state}
            setState={setState}
            handleInputChange={handleInputChange}
            siguientePaso={siguientePaso}
            handleInputChecked={handleInputChecked}
            toggle={toggle}
          />
        </>
      );
    case 3:
      return (
        <>
          <NavBarAddCompany paso={state.paso} />
          <InformacionBancaria
            handleInputChange={handleInputChange}
            siguientePaso={siguientePaso}
            handleInputChecked={handleInputChecked}
            enviar={enviar}
            toggle={toggle}
          />
        </>
      );
    case 4:
      return <></>;

    default:
      return <div>Error</div>;
  }
}

export default ModalAddEmpresa;
