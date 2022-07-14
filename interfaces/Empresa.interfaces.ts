export interface EmpresasState {
  paso: number;
  empresa: [{}];
}

export interface Empresa {
  nombreDeLaEmpresa: string;
  razonSocial: string;
  logo: string;
  industria: string;
  rfc: string;
  regimenFiscal: string;
  registroPatronal: string;
  primaDeRiesgo: string;
  estado: string;
  direccion: string;
  codigoPostal: string;
  claveSubdelegacion: string;
  llaveCertificado: string;
  certificadoSelloDigital: string;
  contrasenaParaELCertificado: string;
  IMSSObreroIntegrado: boolean;
  usuarioCertificadoImms: boolean;
  contrasenaCertificadoIMSS: boolean;
  certificadoIMSS: boolean;
  certificadoFIEL: boolean;
  llavePrivadaFIEL: boolean;
  cuentaBancaria: string;
  cuentaSTP: string;
  cuentaClabeSTP: string;
  lecturaAutomaticaHorasExtra: boolean;
  calculoAutomaticoPromedioVariables: boolean;
  usarSTPComoMedioPago: boolean;
}
