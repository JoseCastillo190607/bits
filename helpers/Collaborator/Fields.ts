let arrayInformation = [
  "name",
  "firstName",
  "email",
  "cellphone",
  "dateOfAdmission",
  "campus",
  "client",
  "project",
  "area",
  "Puesto",
  "officePlace",
  "contractName",
  "netSalary",
  "grossSalary",
  "DS",
  "ISD",
  "Company",
  "paymentPeridicity",
  "journey",
  "nominesPayroll",
];
let arrayInformationDatosPersonales = [
  "address",
  "suburb",
  "country",
  "state",
  "municipality",
  "ZC",
  "nacionality",
  "educationalLevel",
  "placeOfBirth",
  "gender",
  "civilStatus",
  "children",
  "IMSS",
  "CURP",
  "RFC",
  "ClaveElectoralPasaporte",
];
let arrayContactos = [
  "benefitiary",
  "ParentescoB",
  "benefitiaryDateOfBirth",
  "benefitiaryCURP",
  "benefitiaryZC",
  "benefitiaryAddress",
  "benefitiarySuburb",
  "benefitiaryCountry",
  "benefitiaryState",
  "benefitiaryMunicipality",
  //"NombreContactoEmergencia", "ParentescoCE", "TelefonoFijoCE", "TelefonoMovilCE", "DireccionCE", "ColoniaCE",
  "EmergencyContact",
  "ParentescoCE",
  "cellphoneCE",
  "ADDRESSce",
  "suburbCE",
  "Alergias",
  "PadEnfer",
  "Cirugias",
  "TraMeRe",
];
let arrayPayData = ["bank", "accountNumber", "clabeNum"];
let arrayExpediente = [
  "ActaNacimiento_PDF",
  "ComprobanteEstudios_PDF",
  "ComprobanteDomicilio_PDF",
  "IdentificacionOficial_PDF",
  "RFC_PDF",
  "CURP_PDF",
  "ComprobanteNSS_PDF",
  "Foto_IMG",
  "CartaOfertaFirmada",
  "AGREEMENT_PDF",
  "AvisoRetencion_PDF",
  "CartaGMM_PDF",
  "CuentaBancaria_PDF",
];

// validating "Informacion Alta"
export const validateInformation = (user: any, fields: number) => {
  let porcent = 100 / fields;
  let finalPorcent = 0;
  for (let i = 0; i < arrayInformation.length; i++) {
    if (arrayInformation[i] === undefined) {
      return;
    } else if (
      arrayInformation[i] in user &&
      user[arrayInformation[i]] !== undefined
    ) {
      finalPorcent += porcent;
    }
  }
  if (user?.Archivos?.CartaOferta) finalPorcent += porcent;
  return finalPorcent;
};

export const validateInformationDatosPersonales = (
  user: any,
  fields: number
) => {
  let porcent = 100 / fields;
  let finalPorcent = 0;
  for (let i = 0; i < arrayInformationDatosPersonales.length; i++) {
    if (
      arrayInformationDatosPersonales[i] in user &&
      user[arrayInformationDatosPersonales[i]] !== undefined
    ) {
      finalPorcent += porcent;
    }
  }
  return finalPorcent;
};

// validating "Contactos"
export const validateContacts = (user: any, fields: number) => {
  let porcent = 100 / fields;
  let finalPorcent = 0;
  for (let i = 0; i < arrayContactos.length; i++) {
    if (arrayContactos[i] in user && user[arrayContactos[i]] !== undefined) {
      finalPorcent += porcent;
    }
  }
  return finalPorcent;
};

// validating "Datos de pago"
export const validateDatosPago = (user: any, fields: number, archivos: any) => {
  let porcent = 100 / fields;
  let finalPorcent = 0;
  for (let i = 0; i < arrayPayData.length; i++) {
    if (arrayPayData[i] in user && user[arrayPayData[i]] !== undefined) {
      finalPorcent += porcent;
    }
  }
  if (
    arrayExpediente[12] in archivos &&
    archivos[arrayExpediente[12]] !== undefined
  ) {
    finalPorcent += porcent;
  }
  return finalPorcent;
};

// validating "Expediente"
export const validateExpedient = (user: any, fields: number) => {
  let porcent = 100 / fields;
  let finalPorcent = 0;
  for (let i = 0; i < 9; i++) {
    if (arrayExpediente[i] in user && user[arrayExpediente[i]] !== undefined) {
      finalPorcent += porcent;
    }
  }
  return finalPorcent;
};

export const validateSection = (
  user: any,
  start: number,
  end: number,
  index: number
) => {
  let porcent = 100 / (end - start);
  let finalPorcent = 0;
  let array: Array<any> = [];
  let array2: Array<any> = [];
  let pago = 0;
 
  switch (index) {
    case 0: // Alta de Informacion
      array = arrayInformation;
      break;

    case 1:
      user = user.DatosPersonales;
      array = [...arrayInformationDatosPersonales];
      break;

    case 2: // Contactos
      array = arrayContactos;
      break;

    case 3: // Datos de Pago
      array = arrayPayData;
      array2 = arrayExpediente;
      pago = 1;
      break;

    case 4: // Expediente
      array = arrayExpediente;
      break;
  }
  
  //console.log('array', array);
  //console.log('user', user);
  for (let i = start; i < end; i++) {
    //console.log('array', array[i]);
    //console.log('user', user);
    if (typeof array[i] === 'undefined' || typeof user === 'undefined' || user === null) {
      //console.log("1");
    } else if (array[i] in user) {
      finalPorcent += porcent;
    }
  }
  return finalPorcent;
};

export const validateSection2 = (
  user: any,
  start: number,
  end: number,
  index: number,
  archivos: any
) => {
  let porcent = 100 / (end - start);
  let finalPorcent = 0;
  let array: Array<any> = [];
  let array2: Array<any> = [];
  let pago = 0;

  switch (index) {
    case 0: // Alta de Informacion
      array = arrayInformation;
      break;

    case 1:
      user = user.DatosPersonales;
      array = [...arrayInformationDatosPersonales];
      break;

    case 2: // Contactos
      array = arrayContactos;
      break;

    case 3: // Datos de Pago
      array = arrayPayData;
      array2 = arrayExpediente;
      pago = 1;
      break;

    case 4: // Expediente
      array = arrayExpediente;
      break;
  }

  for (let i = start; i < end; i++) {
    if (array[i] in user && user[array[i]] !== undefined) {
      finalPorcent += porcent;
    }
  }
  if (pago === 1) {
    if (array2[12] in archivos && archivos[arrayExpediente[12]] !== undefined) {
      finalPorcent += porcent;
    }
  }
  return finalPorcent;
};
