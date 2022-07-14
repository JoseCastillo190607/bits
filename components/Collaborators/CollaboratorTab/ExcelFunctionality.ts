const Excel = require('exceljs');

export const CreateExcelFile = (link:any,type:string) => {
    const workbook = new Excel.Workbook();
    const LaborData = workbook.addWorksheet("DATOS LABORALES");
    const PersonalData = workbook.addWorksheet("DATOS PERSONALES");
    const PaymentData = workbook.addWorksheet("DATOS PARA PAGO");
    const ContactData = workbook.addWorksheet("DATOS DE CONTACTOS");

    console.table(["lab", LaborData, "per", PersonalData, "pay", PaymentData, "con", ContactData]);

    //create a viarable with type any 
    let InactiveData: any = null;
    let isActive = false;

    if (isActive) {
        InactiveData = workbook.addWorksheet("DATOS DE BAJA");
    }

    const width = 40;

    const header = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '002060' }
    };
    const headerFont = {
        name: 'Arial',
        color: { argb: 'FFFFFF' },
        family: 2,
        size: 11,
        bold: true,
    };

    LaborData.columns = [
        { header: 'NOMBRE', key: 'name', width },
        { header: `${type === 'active' ? 'FECHA DE INGRESO' : 'FECHA DE BAJA'}`, key: 'FechaIngreso' , width, style: { numFmt: 'dd/mm/yyyy' } },
        { header: 'PROYECTO', key: 'project', width },
        { header: 'CLIENTE', key: 'client', width },
        { header: 'AREA', key: 'area', width },
        { header: 'PUESTO', key: 'position', width },
        { header: 'LUGAR DE OFICINA', key: 'officePlace', width },
        { header: 'RAZON SOCIAL', key: 'reason_social', width },
        { header: 'TIPO CONTRATO', key: 'contractName', width },
        { header: 'PERIODICIDAD DE PAGO', key: 'paymentPeridicity', width },
        { header: 'JORNADA', key: 'working_day', width },
        { header: 'SUELDO NETO', key: 'netSalary', width, style: { numFmt: '$#,##0.00;[Red]-$#,##0.00' } },
        { header: 'SUELDO BRUTO', key: 'grossSalary', width, style: { numFmt: '$#,##0.00;[Red]-$#,##0.00' } },
        { header: 'SD', key: 'sd', width, style: { numFmt: '$#,##0.00;[Red]-$#,##0.00' } },
        { header: 'SDI', key: 'sdi', width, style: { numFmt: '$#,##0.00;[Red]-$#,##0.00' } },
        //{ header: 'ESQUEMA DE NOMINA', key: 'schedule', width }
    ];

    PersonalData.columns = [
        { header: 'NOMBRE', key: 'name', width },
        { header: `${type === 'active' ? 'FECHA DE INGRESO' : 'FECHA DE BAJA'}`, key: 'FechaIngreso' , width, style: { numFmt: 'dd/mm/yyyy' } },
        { header: 'PROYECTO', key: 'project', width },
        { header: 'E-MAIL PROFESIONAL', key: 'email', width },
        { header: 'TELEFONO CELULAR', key: 'telephone', width },
        { header: 'CALLE Y NO.', key: 'street', width },
        { header: 'COLONIA', key: 'subur', width },
        { header: 'DELEGACION/MUNICIPIO', key: 'delegacion', width },
        { header: 'CP', key: 'cp', width },
        { header: 'ESTADO', key: 'state', width },
        { header: 'PAIS', key: 'country', width },
        { header: 'NACIONALIDAD', key: 'nacionality', width },
        { header: 'CLAVE DE ELECTOR', key: 'clave', width },
        { header: 'PASAPORTE', key: 'passport', width },
        { header: 'FECHA DE NACIMIENTO', key: 'fecha', width, style: { numFmt: 'dd/mm/yyyy' } },
        { header: 'LUGAR DE NACIMIENTO', key: 'location', width },
        { header: 'GENERO', key: 'gender', width },
        { header: 'ESTADO CIVIL', key: 'estado', width },
        { header: 'HIJOS', key: 'hijos', width },
        { header: 'NSS', key: 'nss', width },
        { header: 'CREDITO INFONAVIT', key: 'credito', width },
        { header: 'CURP', key: 'curp', width },
        { header: 'RFC', key: 'rfc', width }
    ];

    PaymentData.columns = [
        { header: 'NOMBRE', key: 'name', width },
        { header: `${type === 'active' ? 'FECHA DE INGRESO' : 'FECHA DE BAJA'}`, key: 'FechaIngreso' , width, style: { numFmt: 'dd/mm/yyyy' } },
        { header: 'PROYECTO', key: 'project', width },
        { header: 'BANCO', key: 'bank', width },
        { header: 'CUENTA', key: 'account', width },
        { header: 'CLABE', key: 'password', width }
    ];
    
    ContactData.columns = [
        { header: 'NOMBRE', key: 'c1', width },
        { header: `${type === 'active' ? 'FECHA DE INGRESO' : 'FECHA DE BAJA'}`, key: 'FechaIngreso' , width, style: { numFmt: 'dd/mm/yyyy' } },
        { header: 'PROYECTO', key: 'c3', width },
        { header: 'NOMBRE DEL BENEFICIARIO SEGURO', key: 'c4', width },
        { header: 'PARENTESCO', key: 'c5', width },
        { header: 'FECHA DE NACIMIENTO', key: 'c6', width, style: { numFmt: 'dd/mm/yyyy' } },
        { header: 'CURP', key: 'c7', width },
        { header: 'DIRECCION CALLE Y NUMERO', key: 'c8', width },
        { header: 'COLONIA', key: 'c9', width },
        { header: 'CODIGO POSTAL', key: 'c10', width },
        { header: 'PAIS', key: 'c11', width },
        { header: 'ESTADO', key: 'c12', width },
        { header: 'MUNICIPIO', key: 'c13', width },
        { header: 'NOMBRE DEL CONTACTO DE EMERGENCIA', key: 'c14', width },
        { header: 'PARENTESCO', key: 'c15', width },
        { header: 'TELEFONO FIJO', key: 'c16', width },
        { header: 'TELEFONO MOVIL', key: 'c17', width },
        { header: 'DIRECCION CALLE Y NUMERO', key: 'c18', width },
        { header: 'COLONIA', key: 'c19', width }
    ];

    let letter = 65;
    LaborData.columns.forEach(() => {
        LaborData.getCell(`${String.fromCharCode(letter)}1`).fill = header;
        LaborData.getCell(`${String.fromCharCode(letter)}1`).font = headerFont;
        LaborData.getCell(`${String.fromCharCode(letter)}1`).alignment = { horizontal: 'center' };
        letter++;
    });
    letter = 65;
    PersonalData.columns.forEach(() => {
        PersonalData.getCell(`${String.fromCharCode(letter)}1`).fill = header;
        PersonalData.getCell(`${String.fromCharCode(letter)}1`).font = headerFont;
        PersonalData.getCell(`${String.fromCharCode(letter)}1`).alignment = { horizontal: 'center' };
        letter++;
    });
    letter = 65;
    PaymentData.columns.forEach(() => {
        PaymentData.getCell(`${String.fromCharCode(letter)}1`).fill = header;
        PaymentData.getCell(`${String.fromCharCode(letter)}1`).font = headerFont;
        PaymentData.getCell(`${String.fromCharCode(letter)}1`).alignment = { horizontal: 'center' };
        letter++;
    });
    letter = 65;
    ContactData.columns.forEach(() => {
        ContactData.getCell(`${String.fromCharCode(letter)}1`).fill = header;
        ContactData.getCell(`${String.fromCharCode(letter)}1`).font = headerFont;
        ContactData.getCell(`${String.fromCharCode(letter)}1`).alignment = { horizontal: 'center' };
        letter++;
    });
    if (isActive) {
        letter = 65;
        InactiveData.columns.forEach(() => {
            InactiveData.getCell(`${String.fromCharCode(letter)}1`).fill = header;
            InactiveData.getCell(`${String.fromCharCode(letter)}1`).font = headerFont;
            InactiveData.getCell(`${String.fromCharCode(letter)}1`).alignment = { horizontal: 'center' };
            letter++;
        });
    }

    let c = 0;

    link.forEach((collaborator: any) => {
        c++;
        let name = collaborator.fullName.toUpperCase()
       

        LaborData.addRow({
            name,
            FechaIngreso: ParseDate(type === 'active' ? collaborator.FechaIngreso: collaborator.FechaBaja),
            client: collaborator.client,
            project: collaborator.project,
            area: collaborator.area,
            position: collaborator.Puesto,
            officePlace: collaborator.officePlace,
            reason_social: collaborator.reasonCollaborator,
            contractName:collaborator.contractName,
            paymentPeridicity:collaborator.paymentPeridicity,
            working_day: collaborator.journey,
            netSalary: collaborator.netSalary,
            grossSalary: collaborator.grossSalary,
            sd: collaborator.DS,
            sdi: collaborator.ISD,
            
            //schedule: collaborator.EsquemaNomin
        });

        PersonalData.addRow({
            name,
            FechaIngreso: ParseDate(type === 'active' ? collaborator.FechaIngreso: collaborator.FechaBaja),
            project: collaborator.project,
            email: collaborator.email,
            telephone: collaborator.cellphone,
            street: collaborator.adress,
            subur: collaborator.suburb,
            delegacion: collaborator.municipality,
            cp: collaborator.ZC,
            state: collaborator.state,
            country: collaborator.country,
            nacionality: collaborator.nacionality,
            clave: collaborator.ClaveElectoralPasaporte,
            passport: collaborator.ClaveElectoralPasaporte,
            fecha: ParseDate(collaborator.dateOfBirth),
            location: collaborator.placeOfBirth,
            gender: collaborator.gender,
            estado: collaborator.state,
            hijos: collaborator.children,
            nss: collaborator.IMSS,
            credito: collaborator.creditoInfonavit,
            curp: collaborator.CURP,
            rfc: collaborator.RFC
        });

        PaymentData.addRow({
            name,
            FechaIngreso: ParseDate(type === 'active' ? collaborator.FechaIngreso: collaborator.FechaBaja),
            project: collaborator.project,
            bank: collaborator.bank,
            account: collaborator.accountNumber,
            password: collaborator.clabeNum
        });

        ContactData.addRow({
            c1: name,
            c2: ParseDate(type === 'active' ? collaborator.FechaIngreso: collaborator.FechaBaja),
            c3: collaborator.project,
            c4: `${(collaborator) ? (collaborator.benefitiary !== undefined) ? collaborator.benefitiary : "" : ""}`,
            c5: `${(collaborator) ? (collaborator.ParentescoB !== undefined) ? collaborator.ParentescoB : "" : ""}`,
            c6: `${(collaborator) ? (collaborator.benefitiaryDateOfBirth !== undefined) ? ParseDate(collaborator.benefitiaryDateOfBirth) : "" : ""}`,
            c7: `${(collaborator) ? (collaborator.benefitiaryCURP !== undefined) ? collaborator.benefitiaryCURP : "" : ""}`,
            c8: `${(collaborator) ? (collaborator.benefitiaryAddress !== undefined) ? collaborator.benefitiaryAddress : "" : ""}`,
            c9: `${(collaborator) ? (collaborator.benefitiarySuburb !== undefined) ? collaborator.benefitiarySuburb : "" : ""}`,
            c10: `${(collaborator) ? (collaborator.benefitiaryZC !== undefined) ? collaborator.benefitiaryZC : "" : ""}`,
            c11: `${(collaborator) ? (collaborator.benefitiaryCountry !== undefined) ? collaborator.benefitiaryCountry : "" : ""}`,
            c12: `${(collaborator) ? (collaborator.benefitiaryState !== undefined) ? collaborator.benefitiaryState : "" : ""}`,
            c13: `${(collaborator) ? (collaborator.benefitiaryMunicipality !== undefined) ? collaborator.benefitiaryMunicipality : "" : ""}`,
            
            c14: `${(collaborator) ? (collaborator.emergencyContact !== undefined) ? collaborator.emergencyContact : "" : ""}`,
            c15: `${(collaborator) ? (collaborator.ParentescoCE !== undefined) ? collaborator.ParentescoCE : "" : ""}`,
            c16: `${(collaborator) ? (collaborator.phoneCE !== undefined) ? collaborator.phoneCE : "" : ""}`,
            c17: `${(collaborator) ? (collaborator.cellphoneCE !== undefined) ? collaborator.cellphoneCE : "" : ""}`,
            c18: `${(collaborator) ? (collaborator.addressCE !== undefined) ? collaborator.addressCE : "" : ""}`,
            c19: `${(collaborator) ? (collaborator.suburbCE !== undefined) ? collaborator.suburbCE : "" : ""}`
        });
        if (isActive) {
            InactiveData.addRow({
                name,
                FechaIngreso: ParseDate(type === 'active' ? collaborator.FechaIngreso: collaborator.FechaBaja),
                project: collaborator.project,
                FechaBaja: ParseDate2(collaborator.FechaBaja, name, "Inactive"),
                typeDrop: collaborator.typeDrop,
                reasonCollaborator: collaborator.reasonCollaborator,
            });
        }
     
    });
    workbook.xlsx.writeBuffer().then(function (data: Blob) {
        const blob = new Blob([data],
          { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'ReporteColaboradores.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
}

function ParseDate(input:any) {
    try{
        var parts = input.match(/(\d+)/g);
        let correctFormat = new Date(parts[0], parts[1]-1, parts[2]); 
        //return DateTime.format(correctFormat,'DD/MM/YYYY')
        console.log('Esto devuelvo :'+ correctFormat);
        return correctFormat;
     } catch (error) {
        console.log(error);
     }
  }
function ParseDate2(input:any, name:any, modulo:any) {
   if (input == null){
       console.log("Fecha nulla. Usuario: " + name + " en modulo " + modulo);
       return input;  
   } else if (!input.trim()) {
       console.log("Fecha vacía. Usuario: " + name + " en modulo " + modulo);
       return input;   
   } else {
       var strigDate = input;
       var date = new Date(strigDate);
       var useDate = date.toLocaleDateString('en-GB');
       return useDate;
   }
 }