import { gql } from "@apollo/client";

export const GET_ALL_COMPANY = gql`
  query {
    GET_ALL_COMPANY {
      id
      Name
      fundationDate
      logo
      website
      status
    }
  }
`;

export const GET_COMPANY = gql`
  query GET_COMPANY($getCompanyId: ID!) {
    GET_COMPANY(id: $getCompanyId) {
      Name
      fundationDate
      logo
      website
      status
      archive {
        URL
        id
      }
    }
  }
`;
export const GET_USER_TEAM = gql`
query GET_USER_TEAM {
  GET_USER_TEAM {
    id
    name
    firstName
    lastName
    email
    suburbCE
    addressCE
    Alergias
    PadEnfer
    Cirugias
    TraMeRe
    dropDate
    dropType
    FullName
    ImagenUsuario
    terminationDate
    bussinesName
    cellphone
  }
}
`;

export const GET_ALL_ENTERPRISE = gql`
  query {
    GET_ALL_ENTERPRISE {
      id
      name
      logo
      showlogo
      industry
      taxRegime
      propertyRegime
      surcharge
      state
      address
      zipCode
      bankaccount
      IMSSSubdelegationKey
      fileCER
      extrahours
      automaticCalculationsVariables
      useSTPaspaymentmethod
      STPaccount
      stpCLABE
      IMSSminimumwage
      operationsIMSSSender
      CertificateOfUserIMSS
      CertificatePaswordIMSS
      IMSSCertificate
      FIELCertificate
      FIELPrivateKey
      status
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation DELETE_COMPANY($deleteCompanyId: ID!) {
    DELETE_COMPANY(id: $deleteCompanyId)
  }
`;

export const DELETE_ENTERPRISE = gql`
  mutation DELETE_ENTERPRISE($deleteEnterpriseId: ID!) {
    DELETE_ENTERPRISE(id: $deleteEnterpriseId)
  }
`;

export const GET_ENTERPRISE = gql`
  query GET_ENTERPRISE($getEnterpriseId: ID!) {
    GET_ENTERPRISE(id: $getEnterpriseId) {
      id
      name
      logo
      showlogo
      industry
      taxRegime
      propertyRegime
      surcharge
      state
      address
      zipCode
      bankaccount
      IMSSSubdelegationKey
      fileCER
      extrahours
      automaticCalculationsVariables
      useSTPaspaymentmethod
      STPaccount
      stpCLABE
      IMSSminimumwage
      operationsIMSSSender
      CertificateOfUserIMSS
      CertificatePaswordIMSS
      IMSSCertificate
      FIELCertificate
      FIELPrivateKey
      userAdd
      dateAdd
      userMod
      dateMod
      status
    }
  }
`;

export const CREATE_ENTERPRISE = gql`
  mutation CREATE_ENTERPRISE($input: enterprise_Input) {
    CREATE_ENTERPRISE(input: $input) {
      id
      name
      logo
      industry
      taxRegime
      propertyRegime
      surcharge
      state
      address
      zipCode
      bankaccount
      IMSSSubdelegationKey
      fileCER
      extrahours
      automaticCalculationsVariables
      useSTPaspaymentmethod
      STPaccount
      stpCLABE
      IMSSminimumwage
      operationsIMSSSender
      CertificateOfUserIMSS
      CertificatePaswordIMSS
      IMSSCertificate
      FIELCertificate
      FIELPrivateKey
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation UPDATE_COMPANY($updateCompanyId: ID!, $input: company_Input) {
    UPDATE_COMPANY(id: $updateCompanyId, input: $input) {
      id
      Name
      fundationDate
      logo
      website
    }
  }
`;

export const UPDATE_ENTERPRISE = gql`
  mutation UPDATE_ENTERPRISE(
    $updateEnterpriseId: ID!
    $input: enterprise_Input
  ) {
    UPDATE_ENTERPRISE(id: $updateEnterpriseId, input: $input) {
      id
      name
      logo
      showlogo
      industry
      taxRegime
      propertyRegime
      surcharge
      state
      address
      zipCode
      bankaccount
      IMSSSubdelegationKey
      fileCER
      extrahours
      automaticCalculationsVariables
      useSTPaspaymentmethod
      STPaccount
      stpCLABE
      IMSSminimumwage
      operationsIMSSSender
      CertificateOfUserIMSS
      CertificatePaswordIMSS
      IMSSCertificate
      FIELCertificate
      FIELPrivateKey
      status
    }
  }
`;

export const GET_ALL_OUTSOURCERS = gql`
  query {
    GET_ALL_OUTSOURCERS {
      id
      nombre
      razonSocial
      logo
      rfc
      numeroDeRepse
      sitioWeb
      direccionFiscal
      direccionEmpresa
      nombreDeContacto
      correoContacto
      telefonoContacto
      comentariosAdicionales
      status
    }
  }
`;

export const GET_OUTSOURCER = gql`
  query GET_OUTSOURCERS($getOutsourcersId: ID!) {
    GET_OUTSOURCERS(id: $getOutsourcersId) {
      id
      nombre
      logo
      razonSocial
      rfc
      numeroDeRepse
      sitioWeb
      direccionEmpresa
      direccionFiscal
      nombreDeContacto
      correoContacto
      telefonoContacto
      comentariosAdicionales
      userAdd
      dateAdd
      userMod
      dateMod
      status
    }
  }
`;

export const CREATE_OUTSOURCERS = gql`
  mutation CREATE_OUTSOURCERS($input: outsoucers_Input) {
    CREATE_OUTSOURCERS(input: $input) {
      nombre
      logo
      razonSocial
      rfc
      numeroDeRepse
      sitioWeb
      direccionFiscal
      direccionEmpresa
      nombreDeContacto
      correoContacto
      telefonoContacto
      comentariosAdicionales
    }
  }
`;

export const UPDATE_OUTSOURCER = gql`
  mutation UPDATE_OUTSOURCERS(
    $updateOutsourcersId: ID!
    $input: outsoucers_Input
  ) {
    UPDATE_OUTSOURCERS(id: $updateOutsourcersId, input: $input) {
      id
      nombre
      logo
      razonSocial
      rfc
      numeroDeRepse
      sitioWeb
      direccionFiscal
      direccionEmpresa
      nombreDeContacto
      correoContacto
      telefonoContacto
      comentariosAdicionales
    }
  }
`;

export const DELETE_OUTSOURCERS = gql`
  mutation DELETE_OUTSOURCERS($deleteOutsourcersId: ID!) {
    DELETE_OUTSOURCERS(id: $deleteOutsourcersId)
  }
`;

export const GET_ALL_PAYROLL_GROUP = gql`
  query GET_ALL_PAYROLL_GROUP {
    GET_ALL_PAYROLL_GROUP {
      id
      group_name
      payment_scheme
      company_name
      bank_account
      payroll_period
      period_days
      social_security  
      monthly_ISR  
      ISR_with_regulation
      employee_benefit
      id_company
      statusPayroll_group
    }
  }
`;


export const CREATE_PAYROLL_GROUP = gql`
  mutation CREATE_PAYROLL_GROUP($input: payroll_group_Input) {
    CREATE_PAYROLL_GROUP(input: $input) {
      group_name
      payment_scheme
      company_name
      bank_account
      payroll_period
      period_days
      social_security  
      monthly_ISR  
      ISR_with_regulation
      employee_benefit
    }
  }
`;

export const UPDATE_PAYROLL_GROUP = gql`
mutation UPDATE_PAYROLL_GROUP($updatePayrollGroupId: ID!, $input: payroll_group_Input) {
  UPDATE_PAYROLL_GROUP(id: $updatePayrollGroupId, input: $input) {
      group_name
      payment_scheme
      company_name
      bank_account
      payroll_period
      period_days
      social_security  
      monthly_ISR  
      ISR_with_regulation
      employee_benefit
    }
  }
`;

export const DELETE_PAYROLL_GROUP = gql`
  mutation DELETE_PAYROLL_GROUP($deletePayrollGroupId: ID!) {
    DELETE_PAYROLL_GROUP(id: $deletePayrollGroupId)
  }
`;

export const GET_ALL_POLITIC= gql`
  query GET_ALL_POLITIC {
    GET_ALL_POLITIC {
      id
      policy_name
      economic_days
      anniversary_vacation_premium
      pantry_value_type
      pantry_value_cap
      pantry_value
      saving_fund_type
      saving_fund_cap
      saving_fund
      restaurant_value
      restaurant_value_type
      restaurant_value_cap
      absence_discount
      disability_discount
      voucher_cost
    }
  }
`;


export const CREATE_POLITIC = gql`
  mutation CREATE_POLITIC($input: politic_Input) {
    CREATE_POLITIC(input: $input) {
      policy_name
      economic_days
      anniversary_vacation_premium
      pantry_value_type
      pantry_value_cap
      pantry_value
      saving_fund_type
      saving_fund_cap
      saving_fund
      restaurant_value
      restaurant_value_type
      restaurant_value_cap
      absence_discount
      disability_discount
      voucher_cost
    }
  }
`;

export const UPDATE_POLITIC = gql`
mutation UPDATE_POLITIC($updatePoliticId: ID!, $input: politic_Input) {
  UPDATE_POLITIC(id: $updatePoliticId, input: $input) {
    policy_name
    economic_days
    anniversary_vacation_premium
    pantry_value_type
    pantry_value_cap
    pantry_value
    saving_fund_type
    saving_fund_cap
    saving_fund
    restaurant_value
    restaurant_value_type
    restaurant_value_cap
    absence_discount
    disability_discount
    voucher_cost
    }
  }
`;

export const DELETE_POLITIC = gql`
  mutation DELETE_POLITIC($deletePoliticId: ID!) {
    DELETE_POLITIC(id: $deletePoliticId)
  }
`;

export const GET_PERIODICISRSEMANAL = gql`
  query {
    GET_PERIODICISRSEMANAL {
      id
      TypeISR
      PeriodicISRcol
      LowerLimit
      UpperLimit
      FixedQuota
      Excess
    }
  }
`;

export const GET_PERIODICISRCATORCENAL = gql`
  query {
    GET_PERIODICISRCATORCENAL {
      id
      TypeISR
      PeriodicISRcol
      LowerLimit
      UpperLimit
      FixedQuota
      Excess
    }
  }
`;

export const GET_PERIODICISRQUINCENAL = gql`
  query {
    GET_PERIODICISRQUINCENAL {
      id
      TypeISR
      PeriodicISRcol
      LowerLimit
      UpperLimit
      FixedQuota
      Excess
    }
  }
`;

export const GET_PERIODICISRMENSUAL = gql`
  query {
    GET_PERIODICISRMENSUAL {
      id
      TypeISR
      PeriodicISRcol
      LowerLimit
      UpperLimit
      FixedQuota
      Excess
    }
  }
`;

export const GET_ALL_PAYROLL = gql`
  query {
    GET_ALL_PAYROLL {
      id
      group_name
      frecuency_payment
      init_date
      end_date
      employees
      perception
      deduction
      total
      status
    }
  }
`;

export const CREATE_PAYROLL= gql`
  mutation CREATE_PAYROLL($input: payroll_Input) {
    CREATE_PAYROLL(input: $input) {
      group_name
      frecuency_payment
      init_date
      end_date
      id_group_payroll
    }
  }
`;

export const GET_ALL_PAYROLL_COLLABORATOR = gql`
  query {
    GET_ALL_PAYROLL_COLLABORATOR {
      id
      idPayroll
      colaborator
      netIncome
      DS 
      GDS
      periodDays 
      workingDays
      grossSalary
      Subsidy
      ISR
      IMSS
      SavingsFund 
      INFONAVIT
      incident
      netIncomeTaxable 
      TotalIncomeNotTaxable
    }
  }
`;

export const GET_PAYROLLCOLLABORATOR = gql `
query GET_PAYROLLCOLLABORATOR($getPayrollcollaboratorId: ID!) {
  GET_PAYROLLCOLLABORATOR(id: $getPayrollcollaboratorId) {
    id
    idPayroll
    netIncome
    colaborator
    DS
    GDS
    periodDays
    workingDays
    grossSalary
    Subsidy
    ISR
    IMSS
    SavingsFund
    INFONAVIT
    incident
    netIncomeTaxable
    TotalIncomeNotTaxable
  }
}`;

export const GET_ALL_KEYS = gql`
 query {
    GET_ALL_KEYS {
      id
      registroPatronal
      primaDeRiesgo
      status
    }
  }
`;

export const CREATE_KEYS = gql`
  mutation CREATE_KEYS($input: keys_Input) {
    CREATE_KEYS(input: $input) {
      registroPatronal
      primaDeRiesgo
    }
  }
`;

export const DELETE_KEYS = gql`
  mutation DELETE_KEYS($deleteKeysId: ID!) {
    DELETE_KEYS(id: $deleteKeysId)
  }
`;



export const GET_PERIODICSUBSIDYSEMANAL = gql`
  query {
    GET_PERIODICSUBSIDYSEMANAL {
      id
      TypeSubsidy
      LowerIncome
      UpperIncome
      SubsidyAmount
    }
  }
`;

export const GET_PERIODICSUBSIDYCATORCENAL = gql`
  query {
    GET_PERIODICSUBSIDYCATORCENAL {
      id
      TypeSubsidy
      LowerIncome
      UpperIncome
      SubsidyAmount
    }
  }
`;

export const GET_PERIODICSUBSIDYQUINCENAL = gql`
  query {
    GET_PERIODICSUBSIDYQUINCENAL {
      id
      TypeSubsidy
      LowerIncome
      UpperIncome
      SubsidyAmount
    }
  }
`;

export const GET_PERIODICSUBSIDYMENSUAL = gql`
  query {
    GET_PERIODICSUBSIDYMENSUAL {
      id
      TypeSubsidy
      LowerIncome
      UpperIncome
      SubsidyAmount
    }
  }
`;



export const GET_ALL_PERCEPTIONS = gql`
  query GET_ALL_PERCEPTIONS {
    GET_ALL_PERCEPTIONS {
      id
      ConceptName
      SATKey
      Concept_Type
      AccuntingAccount
      PayType
      ISRTax
      ISNTax
      SocialSecurity
      IntegratesIMSS
      TaxBoth
      Calendar
      time
    }
  }
`;

export const CREATE_PERCEPTIONS = gql`
mutation CREATE_PERCEPTIONS($input: perceptions_Input) {
  CREATE_PERCEPTIONS(input: $input) {
    ConceptName
    SATKey
    Concept_Type
    AccuntingAccount
    PayType
    ISRTax
    ISNTax
    SocialSecurity
    IntegratesIMSS
    TaxBoth
  }
}
`;

export const UPDATE_PERCEPTIONS = gql`
mutation UPDATE_PERCEPTIONS($updatePerceptionsId: ID!, $input: perceptions_Input) {
  UPDATE_PERCEPTIONS(id: $updatePerceptionsId, input: $input) {
    ConceptName
    SATKey
    Concept_Type
    AccuntingAccount
    PayType
    ISRTax
    ISNTax
    SocialSecurity
    IntegratesIMSS
    TaxBoth
  }
}
`;

export const DELETE_PERCEPTIONS = gql`
  mutation DELETE_PERCEPTIONS($deletePerceptionsId: ID!) {
    DELETE_PERCEPTIONS(id: $deletePerceptionsId)
  }
`;

//Deductions


export const GET_DEDUCTIONS = gql`
  query {
    GET_DEDUCTIONS {
      id
      concept_type
      SATKey
      Calendar
    }
  }
`;

export const GET_ALL_DEDUCTIONS = gql`
  query GET_ALL_DEDUCTIONS {
    GET_ALL_DEDUCTIONS {
      id
      concept_type
      SATKey
      ISRTax
      TaxBoth
      Calendar
      time
    }
  }
`;

export const CREATE_DEDUCTIONS = gql`
mutation CREATE_DEDUCTIONS($input: deductions_Input) {
  CREATE_DEDUCTIONS(input: $input) {
    concept_type
    SATKey
    ISRTax
    TaxBoth
  }
}
`;

export const UPDATE_DEDUCTIONS = gql`
  mutation UPDATE_DEDUCTIONS($updateDeductionsId: ID!, $input: deductions_Input) {
    UPDATE_DEDUCTIONS(id: $updateDeductionsId, input: $input) {
      id
      concept_type
      SATKey
      ISRTax
      TaxBoth
    }
  }
`;

export const DELETE_DEDUCTIONS = gql`
  mutation DELETE_DEDUCTIONS($deleteDeductionId: ID!) {
    DELETE_DEDUCTIONS(id: $deleteDeductionId)
  }
`;

export const CREATE_ARCHIVE = gql`
  mutation CREATE_ARCHIVE($input: archive_Input) {
    CREATE_ARCHIVE(input: $input) {
      usersId
      URL
      fromto
      name
    }
  }
`;


export const DELETE_ARCHIVE = gql`
  mutation DELETE_ARCHIVE($idArchive: ID!) {
    DELETE_ARCHIVE(id: $idArchive)
  }
`;

export const GET_ALL_ARCHIVE = gql`
  query {
    GET_ALL_ARCHIVE {
    id
    URL
    idUsuario 
    fromto
    }
  }
`;


export const GET_ARCHIVE = gql`
query GET_ARCHIVE($idUsuario: String!, $fromto: String!) {
  GET_ARCHIVE(idUsuario: $idUsuario, fromto: $fromto) {
  id
  URL  
  }
}
`;

export const GET_ARCHIVE_NAME = gql`
  query GET_ARCHIVE_NAME(
    $idUsuario: String!
    $fromto: String!
    $name: String!
  ) {
    GET_ARCHIVE_NAME(idUsuario: $idUsuario, fromto: $fromto, name: $name) {
      id
      URL
      fromto
      name
    }
  }
`;

export const CREATE_PAYROLL_INCIDENT = gql`
mutation CREATE_PAYROLL_INCIDENT($input: payroll_Incident_Input) {
  CREATE_PAYROLL_INCIDENT(input: $input) {
    id
    idPayroll
    idCollaborator
    Incident_type
    InitDate
    EndDate
    Total
    Taxable
    NotTaxable
    Mixed
    idConcept
    Dias
    Horas
    Comentarios
    TypeConcept
    Periodico
    FechaPeriodica
  }
}
`;

export const GET_ALL_USERS_NUEVOINGRESO = gql`
  query GET_ALL_USERS_NUEVOINGRESO {
    GET_ALL_USERS_NUEVOINGRESO {
      id
      name
      firstName
      lastName
      fullName
      dateOfBirth
      email
      dateOfAdmission
      userType
      project
      campus
      client
      password
      active
      token
      linkedAccount
      cellphone
      area
      tittle
      officePlace
      bussinesName
      contractName
      netSalary
      grossSalary
      DS
      ISD
      nominesPayroll
      paymentPeridicity
      journey
      comment
      userStatus
      expiredAlta
      expiredPersonales
      currentToken
      host
      address
      municipality
      ZC
      state
      country
      placeOfBirth
      nacionality
      gender
      civilStatus
      children
      educationalLevel
      ClaveElectoralPasaporte
      IMSS
      CURP
      workPermission
      creditoInfonavit
      benefitiary
      emergencyContact
      diseases
      bank
      accountNumber
      clabeNum
      RFC
      id_payroll_group
      SDG
      id_User
      id_Bank
      done
      collaborator
      drop
      baja
      Puesto
      Company
      new
      suburb
      benefitiaryCountry
      benefitiaryState
      benefitiaryMunicipality
      benefitiaryCURP
      ParentescoB
      benefitiaryDateOfBirth
      benefitiaryZC
      benefitiaryAddress
      benefitiarySuburb
      ParentescoCE
      cellphoneCE
      phoneCE
      suburbCE
      addressCE
      Alergias
      PadEnfer
      Cirugias
      TraMeRe
      dropType
      dropDate
    }
  }
`;


export const GET_ALL_USERS_DECLINADOS = gql`
  query GET_ALL_USERS_DECLINADOS {
    GET_ALL_USERS_DECLINADOS {
      id
      name
      firstName
      lastName
      fullName
      dateOfBirth
      email
      dateOfAdmission
      userType
      project
      campus
      client
      password
      active
      token
      linkedAccount
      cellphone
      area
      tittle
      officePlace
      bussinesName
      contractName
      netSalary
      grossSalary
      DS
      ISD
      nominesPayroll
      paymentPeridicity
      journey
      comment
      userStatus
      expiredAlta
      expiredPersonales
      currentToken
      host
      address
      municipality
      ZC
      state
      country
      placeOfBirth
      nacionality
      gender
      civilStatus
      children
      educationalLevel
      ClaveElectoralPasaporte
      IMSS
      CURP
      workPermission
      creditoInfonavit
      benefitiary
      emergencyContact
      diseases
      bank
      accountNumber
      clabeNum
      status
      RFC
      id_payroll_group
      SDG
      id_User
      id_Bank
      done
      collaborator
      drop
      baja
      Puesto
      Company
      new
      suburb
      benefitiaryCountry
      benefitiaryState
      benefitiaryMunicipality
      benefitiaryCURP
      ParentescoB
      benefitiaryDateOfBirth
      benefitiaryZC
      benefitiaryAddress
      benefitiarySuburb
      ParentescoCE
      cellphoneCE
      phoneCE
      suburbCE
      addressCE
      Alergias
      PadEnfer
      Cirugias
      TraMeRe
      dropDate
      dropType
      FullName
      ImagenUsuario
      terminationDate
    }
  }
`;

export const GET_ALL_USERS_INACTIVOS = gql`
  query GET_ALL_USERS_INACTIVOS {
    GET_ALL_USERS_INACTIVOS {
      id
      name
      bussinesName
      fullName
      FechaIngreso
      FechaBaja
      client
      project
      area
      Puesto
      officePlace
      reasonCollaborator
      contractName
      paymentPeridicity
      journey
      netSalary
      grossSalary
      DS
      ISD
      typeDrop
      nominesPayroll
      email
      cellphone
      address
      suburb
      ZC
      municipality
      country
      nacionality
      ClaveElectoralPasaporte
      dateOfBirth
      placeOfBirth
      gender
      state
      children
      IMSS
      creditoInfonavit
      CURP
      RFC
      bank
      accountNumber
      clabeNum
      benefitiary
      ParentescoB
      benefitiaryDateOfBirth
      benefitiaryCURP
      benefitiaryAddress
      benefitiarySuburb
      benefitiaryZC
      benefitiaryCountry
      benefitiaryState
      benefitiaryMunicipality
      emergencyContact
    }
  }
`;

export const GET_ALL_USERS_COLLABORATOR = gql`
  query GET_ALL_USERS_COLLABORATOR{
    GET_ALL_USERS_COLLABORATOR {
      id
      _id: id
      name
      firstName
      lastName
      fullName
      dateOfBirth
      email
      dateOfAdmission
      userType
      project
      campus
      client
      password
      active
      token
      linkedAccount
      cellphone
      area
      tittle
      officePlace
      bussinesName
      contractName
      netSalary
      grossSalary
      DS
      ISD
      nominesPayroll
      paymentPeridicity
      journey
      comment
      userStatus
      expiredAlta
      expiredPersonales
      currentToken
      host
      address
      municipality
      ZC
      state
      country
      placeOfBirth
      nacionality
      gender
      civilStatus
      children
      educationalLevel
      ClaveElectoralPasaporte
      IMSS
      CURP
      workPermission
      creditoInfonavit
      benefitiary
      emergencyContact
      diseases
      bank
      accountNumber
      clabeNum
      RFC
      id_payroll_group
      SDG
      id_User
      id_Bank
      done
      collaborator
      drop
      baja
      Puesto
      Company
      new
      suburb
      benefitiaryCountry
      benefitiaryState
      benefitiaryMunicipality
      benefitiaryCURP
      ParentescoB
      benefitiaryDateOfBirth
      benefitiaryZC
      benefitiaryAddress
      benefitiarySuburb
      ParentescoCE
      cellphoneCE
      phoneCE
      suburbCE
      addressCE
      Alergias
      PadEnfer
      Cirugias
      TraMeRe
      dropType
      dropDate
      terminationDate
      dateContractDate
      FechaIngreso
    }
  }
`;
export const GET_USERS_BY_ID = gql`
  query GET_USERS($getUsersId: String!) {
    GET_USERS(id: $getUsersId) {
      id
      name
      firstName
      lastName
      dateOfBirth
      email
      dateOfAdmission
      userType
      project
      campus
      client
      password
      active
      token
      linkedAccount
      cellphone
      area
      tittle
      officePlace
      bussinesName
      contractName
      netSalary
      grossSalary
      DS
      ISD
      nominesPayroll
      paymentPeridicity
      journey
      comment
      userStatus
      expiredAlta
      expiredPersonales
      currentToken
      host
      address
      municipality
      ZC
      state
      country
      placeOfBirth
      nacionality
      gender
      civilStatus
      children
      educationalLevel
      ClaveElectoralPasaporte
      IMSS
      CURP
      workPermission
      creditoInfonavit
      benefitiary
      emergencyContact
      diseases
      bank
      accountNumber
      clabeNum
      status
      RFC
      id_payroll_group
      SDG
      id_User
      id_Bank
      done
      collaborator
      drop
      baja
      Puesto
      Company
      suburb
      benefitiaryCountry
      benefitiaryState
      benefitiaryMunicipality
      benefitiaryCURP
      ParentescoB
      benefitiaryDateOfBirth
      benefitiaryZC
      benefitiaryAddress
      benefitiarySuburb
      ParentescoCE
      cellphoneCE
      phoneCE
      suburbCE
      addressCE
      Alergias
      PadEnfer
      Cirugias
      TraMeRe
      dropDate
      dropType
      archive {
        URL
        id
        idUsuario
        fromto
        name
      }
      dateContractDate
      typeContract
      totalSalary
      recordableSalary
      notRecordableSalary
      typeSalary
      EmployerRegister
      idEnterprise
      id_payroll_group
      ActaNacimiento_PDF
      ComprobanteEstudios_PDF
      ComprobanteDomicilio_PDF
      IdentificacionOficial_PDF
      RFC_PDF
      CURP_PDF
      ComprobanteNSS_PDF
      Foto_IMG
      AvisoRetencion_PDF
      CartaGMM_PDF
      CartaOfertaFirmada
      AGREEMENT_PDF
      CartaOferta
      isAvisoRetencion
      isCartaGMM
      CuentaBancaria_PDF
    }
  }
`;

export const GET_PAYROLLCOLLABORATOR_DISPERSION = gql`
query GET_PAYROLLCOLLABORATOR_DISPERSION($getPayrollcollaboratorDispersionId: ID!) {
  GET_PAYROLLCOLLABORATOR_DISPERSION(id: $getPayrollcollaboratorDispersionId) {
    id
    colaborator
    netIncomeTaxable
    TotalIncomeNotTaxable
    dispersionStatus
    users {
      RFC
      accountNumber
      bank
      clabeNum
    }
  }
}`


export const GET_PAYROLLCOLLABORATOR_TIMBRADO = gql`
query GET_PAYROLLCOLLABORATOR_TIMBRADO($getPayrollcollaboratorTimbradoId: ID!) {
  GET_PAYROLLCOLLABORATOR_TIMBRADO(id: $getPayrollcollaboratorTimbradoId) {
    colaborator
    perception
    deduction
    netIncomeTaxable
    users {
      RFC
    }
  }
}`


export const GET_ALL_PROJECT = gql`
  query {
    GET_ALL_PROJECT {
    id
    proyectName
    client
    sede
    idClient
    idSede
    status
    }
  }
`;

export const CREATE_PROJECT = gql`
mutation CREATE_PROJECT($input: project_Input) {
  CREATE_PROJECT(input: $input)
}
`;

export const UPDATE_PROJECT = gql`
  mutation UPDATE_PROJECT($updateProjectId: ID!, $input: project_Input) {
    UPDATE_PROJECT(id: $updateProjectId, input: $input) {
      id
      proyectName
      client
      sede
      idClient
      idSede
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DELETE_PROJECT($deleteProjectId: ID!) {
    DELETE_PROJECT(id: $deleteProjectId)
  }
`;

export const GET_ALL_SEDE = gql`
  query {
    GET_ALL_SEDE {
    id
    sedeName
    }
  }
`;

export const CREATE_SEDE = gql`
mutation CREATE_SEDE($input: sede_Input) {
  CREATE_SEDE(input: $input) {
    sedeName
  }
}
`;

export const UPDATE_SEDE = gql`
  mutation UPDATE_SEDE($updateSedeId: ID!, $input: sede_Input) {
    UPDATE_SEDE(id: $updateSedeId, input: $input) {
      id
      sedeName
    }
  }
`;

export const DELETE_SEDE = gql`
  mutation DELETE_SEDE($deleteSedeId: ID!) {
    DELETE_SEDE(id: $deleteSedeId)
  }
`;

export const GET_ALL_CLIENT = gql`
  query {
    GET_ALL_CLIENT {
    id
    clientName
    }
  }
`;

export const CREATE_CLIENT = gql`
mutation CREATE_CLIENT($input: client_Input) {
  CREATE_CLIENT(input: $input) {
    clientName
  }
}
`;

export const UPDATE_CLIENT = gql`
  mutation UPDATE_CLIENT($updateClientId: ID!, $input: client_Input) {
    UPDATE_CLIENT(id: $updateClientId, input: $input) {
      id
      clientName
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation DELETE_CLIENT($deleteClientId: ID!) {
    DELETE_CLIENT(id: $deleteClientId)
  }
`;

export const CREATE_USERS = gql`
mutation CREATE_USERS($input: users_Input) {
  CREATE_USERS(input: $input) {
    id
    name
    firstName
    lastName
    dateOfBirth
    email
    dateOfAdmission
    userType
    project
    campus
    client
    password
    active
    token
    linkedAccount
    cellphone
    area
    tittle
    officePlace
    bussinesName
    contractName
    netSalary
    grossSalary
    DS
    ISD
    nominesPayroll
    paymentPeridicity
    journey
    comment
    userStatus
    expiredAlta
    expiredPersonales
    currentToken
    host
    address
    municipality
    ZC
    state
    country
    placeOfBirth
    nacionality
    gender
    civilStatus
    children
    educationalLevel
    ClaveElectoralPasaporte
    IMSS
    CURP
    workPermission
    creditoInfonavit
    benefitiary
    emergencyContact
    diseases
    bank
    accountNumber
    clabeNum
    status
    RFC
    id_payroll_group
    SDG
    id_User
    id_Bank
    done
    collaborator
    drop
    baja
    Puesto
    Company
    suburb
    benefitiaryCountry
    benefitiaryState
    benefitiaryMunicipality
    benefitiaryCURP
    ParentescoB
    benefitiaryDateOfBirth
    benefitiaryZC
    benefitiaryAddress
    benefitiarySuburb
    ParentescoCE
    cellphoneCE
    phoneCE
    suburbCE
    addressCE
    Alergias
    PadEnfer
    Cirugias
    TraMeRe
    dropDate
    dropType
  }
}
`;

export const UPDATE_USERS = gql`
  mutation UPDATE_USERS($updateUsersId: ID!, $input: users_Input) {
    UPDATE_USERS(id: $updateUsersId, input: $input) {
      id
      name
      firstName
      lastName
      dateOfBirth
      email
      dateOfAdmission
      userType
      project
      campus
      client
      password
      active
      token
      linkedAccount
      cellphone
      area
      tittle
      officePlace
      bussinesName
      contractName
      netSalary
      grossSalary
      DS
      ISD
      nominesPayroll
      paymentPeridicity
      journey
      comment
      userStatus
      expiredAlta
      expiredPersonales
      currentToken
      host
      address
      municipality
      ZC
      state
      country
      placeOfBirth
      nacionality
      gender
      civilStatus
      children
      educationalLevel
      ClaveElectoralPasaporte
      IMSS
      CURP
      workPermission
      creditoInfonavit
      benefitiary
      emergencyContact
      diseases
      bank
      accountNumber
      clabeNum
      status
      RFC
      id_payroll_group
      SDG
      id_User
      id_Bank
      done
      collaborator
      drop
      baja
      Puesto
      Company
      suburb
      benefitiaryCountry
      benefitiaryState
      benefitiaryMunicipality
      benefitiaryCURP
      ParentescoB
      benefitiaryDateOfBirth
      benefitiaryZC
      benefitiaryAddress
      benefitiarySuburb
      ParentescoCE
      cellphoneCE
      phoneCE
      suburbCE
      addressCE
      Alergias
      PadEnfer
      Cirugias
      TraMeRe
      dropDate
      dropType
      EmployerRegister
    }
  }
`;

export const DECLINE_USERS = gql`
  mutation DECLINE_USERS($declineUsersId: ID!) {
    DECLINE_USERS(id: $declineUsersId)
  }
`;

export const DELETE_PAYROLL = gql`
  mutation DELETE_PAYROLL($deletePayrollId: ID!) {
  DELETE_PAYROLL(id: $deletePayrollId)
}
`
export const GET_ALL_FILES = gql`
  query {
    GET_ALL_FILES {
      id
      name
      documentType
      maxWeight
      obligatory
      status
    }
  }
`;

export const CREATE_FILES = gql`
  mutation CREATE_FILES($input: files_Input) {
    CREATE_FILES(input: $input) {
      name
      documentType
      maxWeight
      obligatory
      status
    }
  }
`;

export const UPDATE_FILES = gql`
  mutation UPDATE_FILES($updateFilesId: ID!, $input: files_Input) {
    UPDATE_FILES(id: $updateFilesId, input: $input) {
      name
      documentType
      maxWeight
      obligatory
      status
    }
  }
`;

export const GET_FILE = gql`
  query GET_FILE($id: ID!) {
    GET_FILE(id: $id) {
      name
      documentType
      maxWeight
      obligatory
      status
    }
  }
`;

export const DELETE_FILES = gql`
  mutation DELETE_FILES($deleteFilesId: ID!) {
    DELETE_FILES(id: $deleteFilesId)
  }
`;


export const GET_ALL_AREA_PROJECT = gql`
  query {
    GET_ALL_PROJECT {
      id
      Cliente: client
      NombreProyecto: proyectName
    }
  }
`;

export const GET_ALL_PUESTOS = gql`
  query {
    GET_ALL_PUESTOS {
      idPuesto: id
      NombreUsuario
      NombrePuesto
      AreaProyecto
      PuestoSuperior
      Descripcion
      NombreUsuarioPuestoSuperior
      idUsuarioPuestoSuperior
      ImagenUsuario
      users {
        id
      }
    }
  }
`;

export const GET_PUESTO = gql`
  query GET_PUESTO($getPuestoId: ID!) {
    GET_PUESTO(id: $getPuestoId) {
      idPuesto: id
      NombrePuesto
      AreaProyecto
      PuestoSuperior
      Descripcion
      NombrePuestoSuperior: NombreUsuarioPuestoSuperior
      idUsuarioPuestoSuperior
      ImagenUsuario
      userAdd
      dateAdd
      userMod
      dateMod
      status
    }
  }
`;

export const GET_USER_AVAILABLE = gql`
  query GET_USER_AVAILABLE($puesto: ID!) {
    GET_USER_AVAILABLE(puesto: $puesto) {
      _id: id
      ApellidoUsuario: firstName
      PrimerNombre: name
      lastName
      FullName
      Usuario: email
      id_User
      id_Bank
      ImagenUsuario
      NombreUsuario: name
    }
  }
`;

export const GET_USER_ADMIN = gql`
  query GET_USER_ADMIN($puesto: ID!) {
    GET_USER_ADMIN(puesto: $puesto) {
      _id: id
      ApellidoUsuario: firstName
      PrimerNombre: name
      lastName
      FullName
      Usuario: email
      id_User
      id_Bank
      ImagenUsuario
      NombreUsuario: name
    }
  }
`;

export const UPDATE_PUESTO = gql`
  mutation UPDATE_PUESTO($idPuesto: ID!, $input: puesto_Input) {
    UPDATE_PUESTO(id: $idPuesto, input: $input) {
      id
      NombrePuesto
      AreaProyecto
      PuestoSuperior
      Descripcion
    }
  }
`;

export const DELETE_PUESTO = gql`
  mutation DELETE_PUESTO($deletePuestosId: ID!) {
    DELETE_PUESTO(id: $deletePuestosId)
  }
`;

export const DELETE_USER_PUESTO = gql`
  mutation DELETE_USER_PUESTO($deleteUserPuestoId: ID!) {
    DELETE_USER_PUESTO(id: $deleteUserPuestoId)
  }
`;

export const ADD_USER_PUESTO = gql`
  mutation ADD_USER_PUESTO($addUserPuestoId: ID!, $puestoId: ID!) {
    ADD_USER_PUESTO(id: $addUserPuestoId, puestoId: $puestoId)
  }
`;

export const CREATE_PUESTO = gql`
  mutation CREATE_PUESTO($input: puesto_Input) {
    CREATE_PUESTO(input: $input) {
      NombrePuesto
      AreaProyecto
      PuestoSuperior
      Descripcion
      NombreUsuarioPuestoSuperior
      idUsuarioPuestoSuperior
      id
    }
  }
`;


export const GET_ALL_PUESTOS_USERS = gql`
  query {
    GET_ALL_PUESTOS_USERS {
      idPuesto: id
      NombrePuesto
      AreaProyecto
      PuestoSuperior
      Descripcion
      NombreUsuario: NombreUsuarioPuestoSuperior
      idUsuario: idUsuarioPuestoSuperior
      ImagenUsuario
      users {
        idUsuario: id
        NombreUsuario:bussinesName
        ApellidoUsuario: firstName
        Usuario: email
      }
    }
  }
`;

export const GET_ALL_SETTLEMENTPAYROLL = gql`
  query {
    GET_ALL_SETTLEMENTPAYROLL {
      id
      dischargeDate
      dischargeType 
      reason
      recessionJob
      Taxable
      NotTaxable
      Mixed
      Total
      idConcept
      idCollaborator
      Collaborator
      users {
        RFC
        Company
        dateOfAdmission
      }
    }
  }
`;

export const CREATE_SETTLEMENTPAYROLL= gql`
  mutation CREATE_SETTLEMENTPAYROLL($input: settlementpayroll_Input) {
    CREATE_SETTLEMENTPAYROLL(input: $input) {
      dischargeDate
      dischargeType 
      reason
      recessionJob
      Taxable
      NotTaxable
      Mixed
      Total
      idConcept
      idCollaborator
    }
  }
`;

export const DELETE_SETTLEMENTPAYROLL = gql`
  mutation DELETE_SETTLEMENTPAYROLL($deleteSettlementPayrollId: ID!) {
    DELETE_SETTLEMENTPAYROLL(id: $deleteSettlementPayrollId)
}
`


export const GET_SETTLEMENTCOLLABORATOR = gql`
query GET_SETTLEMENTCOLLABORATOR($getSettlementPayrollcollaboratorId: ID!) {
  GET_SETTLEMENTCOLLABORATOR(id: $getSettlementPayrollcollaboratorId) {
    id
    idSettlement
    idCollaborator
    colaborator
    salary
    incident
    aguinaldo
    holidays
    perception
    deduction
    taxes
    total
    primaVacacional
  }
}`


export const GET_SETTLEMENTCOLLABORATOR_DISPERSION = gql`
query GET_SETTLEMENTCOLLABORATOR_DISPERSION($getSettlementPayrollcollaboratorDispersionId: ID!) {
  GET_SETTLEMENTCOLLABORATOR_DISPERSION(id: $getSettlementPayrollcollaboratorDispersionId) {
    colaborator
    total
    users {
      RFC
      accountNumber
      bank
      clabeNum
    }
  }
}`


export const GET_SETTLEMENTCOLLABORATOR_TIMBRADO = gql`
query GET_SETTLEMENTCOLLABORATOR_TIMBRADO($getSettlementPayrollcollaboratorTimbradoId: ID!) {
  GET_SETTLEMENTCOLLABORATOR_TIMBRADO(id: $getSettlementPayrollcollaboratorTimbradoId) {
    colaborator
    total
    perception
    deduction
    users {
      RFC
    }
  }
}`


export const GET_ALL_SETTLEMENT_COLLABORATOR = gql`
  query {
    GET_ALL_SETTLEMENT_COLLABORATOR {
      id
      idSettlement
      idCollaborator
      colaborator
      salary
      incident
      aguinaldo
	    holidays
      perception
      deduction
      taxes
      total
      primaVacacional
    }
  }
`;
export const GET_ALL_CALENDARS = gql`
  query {
    GET_ALL_CALENDARS {
      id
      name
      enterpriseId
      calendarScheme
      status
      calendar_scheme{
        id
        name
      }
      enterprise{
        name
      }
    }
  }`;


export const GET_ALL_CALENDARS_SCHEME = gql `
  query{
    GET_ALL_CALENDARS_SCHEME{
      id
      name
    }
  } 
`

export const GET_CALENDARS = gql `
  query GET_CALENDARS($id: ID!){
    GET_CALENDARS(id: $id){
      name
      enterpriseId
      calendarScheme
      status
      calendar_scheme{
        id
        name
      }
      enterprise{
        name
      }
    }
  }
`
export const UPDATE_CALENDARS = gql `
  mutation UPDATE_CALENDARS($updateCalendarsId: ID!, $input:calendars_Input){
    UPDATE_CALENDARS(id:$updateCalendarsId, input:$input){
      name
      enterpriseId
      calendarScheme
    }
  }
`

export const DELETE_CALENDARS = gql`
  mutation DELETE_CALENDARS($deleteCalendarId: ID!){
    DELETE_CALENDARS(id:$deleteCalendarId)
  }
`
export const CREATE_CALENDARS = gql `
mutation CREATE_CALENDARS ($input: calendars_Input){
  CREATE_CALENDARS(input: $input){
    name
    enterpriseId
    calendarScheme
  }
}
`
export const GET_PAYROLL = gql`
query GET_PAYROLL($getPayrollId: ID!) {
  GET_PAYROLL(id: $getPayrollId) {
    id
    group_name
    payroll_type
    frecuency_payment
    init_date
    end_date
    employees
    perception
    deduction
    total
    status
  }
}
`
export const SEND_DISPERSION = gql`
  mutation SEND_DISPERSION($sendDispersionId: [dispersion_Input!]) {
  SEND_DISPERSION(id: $sendDispersionId)  
  }
`
export const GET_PAYROLL_BY_CALENDAR = gql `
query GET_PAYROLL_BY_CALENDAR($id: Int!){
  GET_PAYROLL_BY_CALENDAR(calendarId: $id){
    id
    idPayroll
    idCollaborator
    payroll_collaborator {
      idPayroll
      colaborator
    }

  }
}
`
export const GET_ALL_EVENT = gql `
  query GET_ALL_EVENT ($id: Int!){
    GET_ALL_EVENT(calendarId: $id){
      id
    }
  }
`


export const GET_ALL_NON_WORKING = gql`
  query GET_ALL_NON_WORKING {
    GET_ALL_NON_WORKING {
      id
      calendarId
      name
      initDate
      endDate
      status
    }
  }
`;

export const GET_NON_WORKING = gql`
query GET_NON_WORKING($id: ID!) {
  GET_NON_WORKING (id: $id){
    id
    calendarId
    name
    initDate
    endDate
    status
  }
}
`;

export const GET_NON_WORKING_BY_DATE = gql`
  query GET_NON_WORKING_BY_DATE($calendarId: Int!, $initDate: String!) {
    GET_NON_WORKING_BY_DATE(calendarId: $calendarId, initDate: $initDate) {
      id
      name
      calendarId
      initDate
      endDate
      status
    }
  }
`;


export const GET_NON_WORKING_MONTH = gql`
  query GET_NON_WORKING_MONTH($calendarId: Int!, $initDate: String!) {
    GET_NON_WORKING_MONTH(calendarId: $calendarId, initDate: $initDate) {
      id
      name
      calendarId
      initDate
      endDate
      status
    }
  }
`;

export const CREATE_NON_WORKING = gql`
mutation CREATE_NON_WORKING($input: non_working_Input) {
  CREATE_NON_WORKING(input: $input) {
    name
    calendarId
    initDate
    endDate
  }
}
`;

export const GET_CALENDARINCIDENT = gql `
query GET_CALENDARINCIDENT($idCalendar: Int!, $dateFilter: String!) {
  GET_CALENDARINCIDENT(idCalendar: $idCalendar, date_Incident: $dateFilter) {
    id
    idArea
    idCollaborator
    idIncident_type
    incident_type_Name
    date_Incident
    incident_Name
    idCalendar
    status
    collaboratorName
  }
}`;

export const GET_CALENDAREVENT = gql `
query GET_CALENDAREVENT($idCalendar: Int!, $dateStart: String!) {
  GET_CALENDAREVENT(idCalendar: $idCalendar, dateStart: $dateStart) {
    id
    idType
    nameType
    eventName
    descriptionEvent
    dateStart
    dateEnd
    idArea
    areaName
    idCalendar
    status
  }
}`;

export const GET_ALL_PERCEPTIONS_CALENDAR = gql`
  query GET_ALL_PERCEPTIONS_CALENDAR {
    GET_ALL_PERCEPTIONS_CALENDAR {
      id
      ConceptName
      SATKey
      Concept_Type
      AccuntingAccount
      PayType
      ISRTax
      ISNTax
      SocialSecurity
      IntegratesIMSS
      descriptionPerception
      TaxBoth
      Calendar
      time
    }
  }
`;

export const GET_DEDUCTIONS_CALENDAR = gql`
query GET_DEDUCTIONS_CALENDAR{
  GET_DEDUCTIONS_CALENDAR {
    id
    concept_type
    SATKey
    ISRTax
    TaxBoth
    Calendar
    time
    descriptiondeductions
  }
}
`;

export const CREATE_EVENT = gql `
  mutation CREATE_EVENT ($input: event_Input){
    CREATE_EVENT(input: $input){
    name
    calendarId
    description
    initDate
    endDate
    projectId
    eventType
  }
}
`;

export const GET_CALENDAR = gql `
query GET_CALENDAR($id: ID!) {
  GET_CALENDAR(id: $id) {
    id
    name
    enterpriseId
    calendarScheme
    status
  }
}`;

export const GET_COMMENT = gql `
query GET_COMMENT($getCommentId: String) {
  GET_COMMENT(id: $getCommentId) {
    id
    fecha
    idUsuario
    Comentario
    estado
    Proyecto
  }
}`;

export const GET_COUNT_COMMENT = gql `
query GET_COUNT_COMMENT {
  GET_COUNT_COMMENT {
    name
    value
    percentage
  }
}`;

export const GET_COUNT_COMMENT_15 = gql `
query GET_COUNT_COMMENT_15 {
  GET_COUNT_COMMENT_15 {
    name
    value
    fecha
  }
}`;


export const GET_ALL_FECHAS = gql `
query GET_ALL_FECHAS {
  GET_ALL_FECHAS {
    id
    fechaInicio
    titulo
    descripcion
    fechaFinal
    tipo
    proyecto
    idUser
    userAdd
    dateAdd
    userMod
    dateMod
    status
  }
}`;

export const GET_ALL_FINISH_PAYROLL = gql`
  query {
    GET_ALL_FINISH_PAYROLL {
      id
      group_name
      payroll_type
      frecuency_payment
      init_date
      end_date
      employees
      perception
      deduction
      total
      id_group_payroll
      status
    }
  }
`;

export const GET_ALL_FINISH_PAYROLL_YEAR = gql`
  query GET_ALL_FINISH_PAYROLL_YEAR($init_date: String!){
    GET_ALL_FINISH_PAYROLL_YEAR (init_date:$init_date){
      id
      group_name
      payroll_type
      frecuency_payment
      init_date
      end_date
      employees
      perception
      deduction
      total
      id_group_payroll
      status
    }
  }
`;

export const GET_PAYROLL_DAY = gql `
query GET_PAYROLL_DAY {
  GET_PAYROLL_DAY {
    id
    group_name
    payroll_type
    frecuency_payment
    init_date
    end_date
    employees
    perception
    deduction
    total
    id_group_payroll
    status
    statusProgress
  }
}`;

export const GET_ALL_PAYROLL_ACTIVE = gql `
query GET_ALL_PAYROLL_ACTIVE {
  GET_ALL_PAYROLL_ACTIVE {
    id
    group_name
    payroll_type
    frecuency_payment
    init_date
    end_date
    employees
    perception
    deduction
    total
    id_group_payroll
    status
    statusProgress
  }
}`;


export const GET_ALL_PAYROLLCOLLABORATOR_EXCELL = gql `
query GET_ALL_PAYROLLCOLLABORATOR_EXCELL($getAllPayrollcollaboratorExcellId: ID!) {
  GET_ALL_PAYROLLCOLLABORATOR_EXCELL(id: $getAllPayrollcollaboratorExcellId) {
    id
    idPayroll
    colaborator
    netIncome
    DS
    GDS
    periodDays
    workingDays
    grossSalary
    Subsidy
    ISR
    IMSS
    SavingsFund
    INFONAVIT
    incident
    netIncomeTaxable
    TotalIncomeNotTaxable
  }
}`;

export const GET_PAYROLLCOLLABORATOR_HISTORICAL = gql `
query GET_PAYROLLCOLLABORATOR_HISTORICAL($payroll: String!) {
  GET_PAYROLLCOLLABORATOR_HISTORICAL(payroll: $payroll) {
    id
    idPayroll
    netIncome
    colaborator
    DS
    GDS
    periodDays
    workingDays
    grossSalary
    Subsidy
    ISR
    IMSS
    SavingsFund
    INFONAVIT
    incident
    netIncomeTaxable
    TotalIncomeNotTaxable
  }
}`;


export const GET_ALL_LISTARAYA = gql `
  query GET_ALL_LISTARAYA {
    GET_ALL_LISTARAYA {
      id
      idPayroll
      Empleado
      Sueldo
      SeptimoDia
      HorasExtras
      Destajos
      PremiosEficiencia
      Retroactivo
      PrimaVacaciones
      FondoAhorroEmpresa
      OtrasPercepciones
      TotalPercepciones
      RetInvYVida
      RetCesantia
      RetEnfYMatObrero
      Subsidio
      ISR
      IMSS
      FondoAhorro
      DeduccionGeneral
      AjusteSubsidioEmpleo
      SubEntregadoNoCorrespondia
      AjusteAlNeto
      ISRAjusteMensual
      ISRAjusteSubsidio
      AjusteAlSubsidioCausado
      PrestamoInfonavit
      TotalDeducciones
      Neto
      InvalidezYVida
      CesantiaYVejez
      EnfMatPatron
      FondoRetiroSAT
      ImpuestoEstatal
      RiesgoTrabajo
      ImssEmpresa
      InfonavitEmpresa
      GuarderiaImss
      TotalObligaciones
    }
}`;

export const GET_ALL_DISPERSIONLAYOUT = gql`
query GET_ALL_DISPERSIONLAYOUT($getAllDispersionlayoutId: ID!) {
  GET_ALL_DISPERSIONLAYOUT(id: $getAllDispersionlayoutId) {
    id
    idPayroll
    Nombre
    RFC
    Cuenta
    Clabe
    Banco
    MontoDispersar
  }
}`
export const CREATE_NOTIFICATION = gql`
  mutation CREATE_NOTIFICATION($input: notifications_Input) {
    CREATE_NOTIFICATION(input: $input) {
      id
      mensaje
      status
      statusNotification
    }
  }
`
export const GET_NOTIFICATIONS = gql`
  query GET_NOTIFICATIONS{
    GET_NOTIFICATIONS{
      id
      mensaje
      statusNotification
      tipo
    }
  }
`

export const GET_NOTIFICATIONS_SINVER = gql`
  query GET_NOTIFICATIONS_SINVER{
    GET_NOTIFICATIONS_SINVER{
      id
    }
  }
`

export const MARCAR_LEIDAS = gql`
  mutation MARCAR_LEIDAS{
    MARCAR_LEIDAS
  }
`

export const DELETE_NOTIFICATIONS = gql`
  mutation DELETE_NOTIFICATIONS{
    DELETE_NOTIFICATIONS
  }
`

export const DELETE_NOTIFICATION = gql` 
  mutation DELETE_NOTIFICATION($deleteNotificationId: ID!) {
    DELETE_NOTIFICATION(id: $deleteNotificationId)
  }
`
export const UPDATE_PAYROLL_STATE = gql`
  mutation UPDATE_PAYROLL_STATE($input: payroll_Input_state) {
    UPDATE_PAYROLL_STATE(input: $input) {
      id
      statusProgress
    }
  }
`;

export const GET_USER_CONTRACT_CAL = gql`
query GET_USER_CONTRACT_CAL {
  GET_USER_CONTRACT_CAL {
    id
    bussinesName
    numberday
    percentage
    UsuarioTotal
  }
}`;


export const GET_ALL_EVENTUALPAYROLL = gql`
  query GET_ALL_EVENTUALPAYROLL {
    GET_ALL_EVENTUALPAYROLL {
      id
      group_name
      payroll_type
      init_date
      end_date
      employees
      perception
      deduction
      total
      id_group_payroll
      status
      statusProgress
      id_Collaborator
      AportacionPatronal
      AnioPTU
      MontoRepartirPTU
    }
  }
`;

export const CREATE_EVENTUALPAYROLL= gql`
mutation Mutation($input: eventualPayroll_Input) {
  CREATE_EVENTUALPAYROLL(input: $input) {
      group_name
      payroll_type
      init_date
      end_date
      id_group_payroll
      AportacionPatronal
      AnioPTU
      MontoRepartirPTU
  }
}
`;

export const UPDATE_EVENTUALPAYROLL_STATE = gql`
  mutation UPDATE_EVENTUALPAYROLL_STATE($input: eventualPayroll_Input_state) {
    UPDATE_EVENTUALPAYROLL_STATE(input: $input) {
      id
      statusProgress
    }
  }
`;

export const DELETE_EVENTUALPAYROLL = gql`
  mutation DELETE_EVENTUALPAYROLL($deleteEventualPayrollId: ID!) {
    DELETE_EVENTUALPAYROLL(id: $deleteEventualPayrollId)
}
`


export const GET_EVENTUALPAYROLLCOLLABORATOR = gql `
query GET_EVENTUALPAYROLLCOLLABORATOR($getEventualpayrollcollaboratorId: ID!) {
  GET_EVENTUALPAYROLLCOLLABORATOR(id: $getEventualpayrollcollaboratorId) {
    id
    idEventualPayroll
    id_Collaborator
    colaborator
    perception
    deduction
    total
    idDispersion
    dispersionStatus
    SD
    init_datePTU
    end_datePTU
    workingDaysPTU
    AnnualIncomePTU
    IncomeDaysPTU
    TotalDealPTU
    NoContributions
    PercentageContributions
    WorkerContributions
    EmployerContributions
    users {
      RFC
      accountNumber
      bank
      clabeNum
    }
 }  
}`;

export const GET_EVENTUALPAYROLL = gql`
query GET_EVENTUALPAYROLL($getEventualPayrollId: ID!) {
  GET_EVENTUALPAYROLL(id: $getEventualPayrollId) {
    id
    group_name
    payroll_type
    init_date
    end_date
    employees
    perception
    deduction
    total
    id_group_payroll
    status
    statusProgress
    id_Collaborator
    AportacionPatronal
    AnioPTU
    MontoRepartirPTU
    FactorIngresos
    FactorDias
  }
}
`



export const GET_EVENTUALPAYROLLCOLLABORATOR_DISPERSION = gql`
query GET_EVENTUALPAYROLLCOLLABORATOR_DISPERSION($getEventualpayrollcollaboratorDispersionId: ID!) {
  GET_EVENTUALPAYROLLCOLLABORATOR_DISPERSION(id: $getEventualpayrollcollaboratorDispersionId) {
   id
    colaborator
    perception
    deduction
    total
    dispersionStatus
    users {
      RFC
      accountNumber
      bank
      clabeNum
    }
  }
}`


export const GET_EVENTUALPAYROLLCOLLABORATOR_TIMBRADO = gql`
query GET_EVENTUALPAYROLLCOLLABORATOR_TIMBRADO($getEventualpayrollcollaboratorTimbradoId: ID!) {
  GET_EVENTUALPAYROLLCOLLABORATOR_TIMBRADO(id: $getEventualpayrollcollaboratorTimbradoId) {
     colaborator
    perception
    deduction
    total
    users {
      RFC
    }
  }
}`

export const GET_PAYROLLCOLLABORATOR_IMPUESTO = gql`
  query GET_PAYROLLCOLLABORATOR_IMPUESTO($input: reports_Input){
    GET_PAYROLLCOLLABORATOR_IMPUESTO(input: $input){    
      Tipo
      MontoImpuesto
      Mes
    }
  }
`
export const GET_CALCULADORA = gql`
  query GET_CALCULADORA($input: calculadora_Input) {
    GET_CALCULADORA(input: $input) {
      LimiteInferior
      Excedente
      PorcentajeExcedente
      CuotaFija
      ImpuestoMarginal
      ImpuestoRetenido
      Imss
      SubsidioEmpleo
      SueldoNeto
    }
  }
`

export const GET_PAYROLLINCIDENT_REPORTE = gql`
query GET_PAYROLLINCIDENT_REPORTE($input: reporte_Input) {
  GET_PAYROLLINCIDENT_REPORTE(input: $input) {
    Nombre
    FechaAdmision
    Proyecto
    FechaIncidencia
    TipoIncidencia
    Dias
    Horas
    Monto
  }
}
`

export const REACTIVATE_USERS = gql`
mutation REACTIVATE_USERS($id: ID!, $input: users_Input_Reactivate) {
  REACTIVATE_USERS(id: $id, input: $input) {
    id
    name
    FechaIngreso
    FechaBaja
    typeDrop
    reasonCollaborator
  }
}
`;

export const GET_EXCEL_ACTIVE_USER = gql`
query GET_EXCEL_ACTIVE_USER {
  GET_EXCEL_ACTIVE_USER {
    name
    fullName
    FechaIngreso
    FechaBaja
    client
    project
    area
    Puesto
    officePlace
    reasonCollaborator
    contractName
    paymentPeridicity
    journey
    netSalary
    grossSalary
    DS
    ISD
    typeDrop
    
    nominesPayroll
    email
    cellphone
    address
    suburb
    ZC
    municipality
    country
    nacionality
    ClaveElectoralPasaporte
    dateOfBirth
    placeOfBirth
    gender
    state
    children
    IMSS
    creditoInfonavit
    CURP
    RFC
    bank
    accountNumber
    clabeNum
    
    benefitiary
    ParentescoB
    benefitiaryDateOfBirth
    benefitiaryCURP
    benefitiaryAddress
    benefitiarySuburb
    benefitiaryZC
    benefitiaryCountry
    benefitiaryState
    benefitiaryMunicipality
    
    emergencyContact
  }
}
`;

export const DEACTIVATE_USERS = gql`
mutation DEACTIVATE_USERS($id: ID!, $input: users_Input_Deactivate) {
  DEACTIVATE_USERS(id: $id, input: $input) {
    id
    name
  }
}
`;

export const GET_PAYROLL_BY_CALENDAR_BY_DATE = gql `
query GET_PAYROLL_BY_CALENDAR_BY_DATE($idCalendar: Int!, $dateFilter: String!) {
  GET_PAYROLL_BY_CALENDAR_BY_DATE(idCalendar: $idCalendar, date_Incident: $dateFilter) {
    id
    idCollaborator
    collaboratorName
    incident_type_Name
    date_Incident
    date_Incident_End
    idCalendar
  }
}`;

export const CREATE_PAYROLL_INCIDENT_CALENDAR = gql`
mutation CREATE_PAYROLL_INCIDENT_CALENDAR($input: payroll_Incident_Input_Calendar) {
  CREATE_PAYROLL_INCIDENT_CALENDAR(input: $input) {
    id
    idPayroll
    idCollaborator
    Incident_type
    InitDate
    EndDate
    Total
    Taxable
    NotTaxable
    Mixed
    idConcept
    Dias
    Horas
    Comentarios
    TypeConcept
    idCalendar
    Periodico
    FechaPeriodica
  }
}
`;
export const GET_MOVIMIENTOSIDSE = gql`
query GET_MOVIMIENTOSIDSE {
  GET_MOVIMIENTOSIDSE {
    id
    Nombre
    idMovimiento
    SCB
    Tipo
    Fecha
    estatusMovimiento
    Externo
    IMSS
  }
}
`

export const UPDATE_ESTATUSMOVIMIENTO = gql`
mutation UPDATE_ESTATUSMOVIMIENTO($updateEstatusmovimientoId: ID) {
  UPDATE_ESTATUSMOVIMIENTO(id: $updateEstatusmovimientoId)
}
`
export const GET_MOVIMIENTOS_TXT = gql`
query GET_MOVIMIENTOS_TXT($input: reportstxt_Input) {
  GET_MOVIMIENTOS_TXT(input: $input) {
    Resultado
  }
}
`


export const GET_ENTERPRISE_SELECT = gql `
query GET_ENTERPRISE_SELECT {
  GET_ENTERPRISE_SELECT {
    id
    name
  }
}
`
export const GET_ALL_EVENT_CALENDAR = gql `
query GET_ALL_EVENT_CALENDAR($calendarId: Int!, $initDate: String!) {
  GET_ALL_EVENT_CALENDAR(calendarId: $calendarId, initDate: $initDate) {
    id
    name
    initDate
    endDate
  }
}`

export const GET_ALL_EVENT_CALENDAR_BY_DATE = gql `
query GET_ALL_EVENT_CALENDAR_BY_DATE($calendarId: Int!, $initDate: String!) {
  GET_ALL_EVENT_CALENDAR_BY_DATE(calendarId: $calendarId, initDate: $initDate) {
    id
    name
    initDate
    endDate
  }
}`

export const UPDATE_PAYROLL_GROUP_STATUS = gql`
  mutation UPDATE_PAYROLL_GROUP_STATUS($updatePayrollGroupStatusId: ID!) {
  UPDATE_PAYROLL_GROUP_STATUS(id: $updatePayrollGroupStatusId)
}
`

export const GET_PAYROLL_GROUP= gql`
  query GET_PAYROLL_GROUP($getPayrollGroupId: ID!) {
    GET_PAYROLL_GROUP(id: $getPayrollGroupId) {
      id
      group_name
      payment_scheme
      company_name
      bank_account
      payroll_period
      period_days
      social_security
      monthly_ISR
      ISR_with_regulation
      employee_benefit
      id_company
      statusPayroll_group
    }
}`;

export const GET_ALL_EVENT_NONWORKINGDAY = gql `
query GET_ALL_EVENT_NONWORKINGDAY ($calendarId: Int!){
  GET_ALL_EVENT_NONWORKINGDAY(calendarId: $calendarId){
    name
    eventType
    initDate
    endDate
  }
}`;

export const GET_COUNT_EVENT_NONWORKINGDAY = gql`
query GET_COUNT_EVENT_NONWORKINGDAY {
  GET_COUNT_EVENT_NONWORKINGDAY {
    calendarId
    accumulated
  }
}`

export const UPDATE_NON_WORKING = gql `
  mutation UPDATE_NON_WORKING($upDateNonWorkingDayId: ID!, $input:non_working_Input){
    UPDATE_NON_WORKING(id:$upDateNonWorkingDayId, input:$input){
      name
      initDate
      endDate
    }
  }`

export const DELETE_NON_WORKING = gql`
mutation DELETE_NON_WORKING($deleteNonWorkingDayId: ID!){
  DELETE_NON_WORKING(id:$deleteNonWorkingDayId)
}
`

export const GET_EVENT = gql`
query GET_EVENT($id: ID!) {
  GET_EVENT (id: $id){
    id
    name
    calendarId
    description
    initDate
    endDate
    projectId
    eventType
  }
}
`;

export const DELETE_EVENT = gql`
mutation DELETE_EVENT($deleteEventId: ID!){
  DELETE_EVENT(id:$deleteEventId)
}`;

export const UPDATE_EVENT = gql `
mutation UPDATE_EVENT($upDateEventId: ID!, $input:event_Input){
  UPDATE_EVENT(id:$upDateEventId, input:$input){
    name
    calendarId
    description
    initDate
    endDate
    projectId
    eventType
  }
}`

  
export const GET_ALL_NOTICES = gql `
  query GET_ALL_NOTICES {
    GET_ALL_NOTICES {
      id
      autor
      tittle
      bodyhtml
      fecha
      projects
      visible
      admin
      movil
      userAdd
      fechaAdd
      userMod
      fechaMod
      status
    }
}`


export const GET_NOTICES = gql `
  query GET_NOTICES($getNoticesId: ID!) {
    GET_NOTICES(id: $getNoticesId) {
      id
      autor
      tittle
      bodyhtml
      fecha
      projects
      visible
      admin
      movil
      userAdd
      fechaAdd
      userMod
      fechaMod
      status
    }
}`


export const CREATE_NOTICES = gql `
mutation CREATE_NOTICES($input: notices_Input) {
  CREATE_NOTICES(input: $input) {
    id
    autor
    tittle
    bodyhtml
    fecha
    projects
    visible
    admin
    movil
  }
}`


export const UPDATE_NOTICES = gql `
  mutation UPDATE_NOTICES($updateNoticesId: ID!, $input: notices_Input) {
    UPDATE_NOTICES(id: $updateNoticesId, input: $input) {
      id
      autor
      tittle
      bodyhtml
      fecha
      projects
      visible
      admin
      movil
      userAdd
      fechaAdd
      userMod
      fechaMod
      status
    }
}`

export const DELETE_NOTICES = gql`
mutation DELETE_NOTICES($deleteNoticesId: ID!) {
  DELETE_NOTICES(id: $deleteNoticesId)
}`;

export const CREATE_ARCHIVE_INCIDENT = gql `
mutation CREATE_ARCHIVE_INCIDENT($input: archive_Incident_Input) {
  CREATE_ARCHIVE_INCIDENT(input: $input) {
    idIncident
    URL
    fromto
    name
  }
}`
export const CONVERT_USERS = gql`
mutation CONVERT_USERS($id: ID!, $input: users_Input_Reactivate) {
  CONVERT_USERS(id: $id, input: $input) {
    id
    name
  }
}
`;

export const CREATE_REGISTROPATRONAL = gql`
mutation CREATE_REGISTROPATRONAL($input: input_Registro_Pratronal) {
  CREATE_REGISTROPATRONAL(input: $input) {
    id
  }
}
`;