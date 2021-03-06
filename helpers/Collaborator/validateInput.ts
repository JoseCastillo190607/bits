import moment from "moment";

export const validData = async (data: any) => {
    console.log("..........................");
    console.log("wntro a validar información");
    console.log(data);
    console.log("..........................");
    
    if (!(await ValidString(data.name))) return "El Nombre tiene un mal formato.";
    else if (!(await ValidString(data.firstName))) return "El Apellido Paterno tiene un mal formato.";
    else if (!(await Email(data.email))) return "El correo tiene un mal formato.";
    else if ((await Celular(data.Celular))) return "El celular tiene un mal formato.";
    // else if ((await Sueldos(data.SueldoNeto, data.SueldoBruto))) return "El sueldo neto debe ser menor al sueldo bruto.";

    if (data.DatosPersonales) {
        let DatosPersonales = data.DatosPersonales;

        if (data.hasOwnProperty("FechaNacimiento")) {
            if (!(await FechaNacimiento(data.FechaNacimiento))) return "La fecha de nacimiento tiene un mal formato.";
        }

        if (DatosPersonales.RFC) {
            if (!(await validarRFC(data.DatosPersonales.RFC))) return "RFC no cuenta con formato valido";
        }

        if (DatosPersonales.CURP) {
            if (!(await curpValida(data.DatosPersonales.CURP))) return "CURP no cuenta con formato valido";
        }
    }

    if (data.Contactos) {
        let Beneficiario = data.Contactos.Beneficiario;
        if (Beneficiario?.FechaNacimientoB) {
            if (!(await FechaNacimiento(data?.Contactos?.Beneficiario?.FechaNacimientoB))) return "La fecha de nacimiento del BENEFICIARIO tiene un mal formato.";
        }

        if (Beneficiario?.CURPB) {
            if (!(await curpValida(data?.Contactos?.Beneficiario?.CURPB))) return "La curp del BENEFICIARIO tiene un mal formato.";
        }
    }

    if(data.DatosPago) {
        let DatosPago = data.DatosPago;
        if(DatosPago.NumClabe) {
            if (!(await clabeValida(data.DatosPago.NumClabe))) return "La clabe bancaria debe de ser de 18 numeros";
        }
    }


    return true;
}

const ValidString = (string: string) => {
    if (string !== undefined) {
        if (string.trim().length >= 2) return true
        else return false;
    } else return false;
}

const Email = (Usuario: string) => {
    if (/(@gmail.com|@it-seekers.com|@hotmail.com|@yahoo.com|@outlook|@live.com)$/.test(Usuario)) return true
    else if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(Usuario)) {
        return true;
    } else return false;
}

const FechaNacimiento = (FechaNaciemieto: string) => {
    if (moment(FechaNaciemieto).isBefore(moment())) return true;
    else return false;
}

const Celular = (Celular: string) => {
    if (String(Celular).includes('-')) return true;
    else return false;
}

const Sueldos = (SueldoNeto: any, SueldoBruto: any) => {
    let Sbruto = Number(SueldoBruto);
    let Sneto = Number(SueldoNeto);
    if (Sbruto <= Sneto) return true;
    else return false;
}

export const curpValida = (curp: string) => {
    const re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
    const validado = curp.toLocaleUpperCase().match(re);
    if (!validado) return false;
    else return true;
}

function rfcValido(rfc: any, aceptarGenerico = true) {
    const re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
    //const re = /^([A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?)$/;
    var validado = rfc.match(re);
    //var validado = re.test(rfc);
    if (!validado)  //Coincide con el formato general del regex?
        return false;

    // //Separar el dígito verificador del resto del RFC
    // const digitoVerificador = validado.pop();
    // const rfcSinDigito = validado.slice(1).join('');
    // const len = rfcSinDigito.length;

    // //Obtener el digito esperado
    // const diccionario = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ";
    // const indice = len + 1;
    // let suma;
    // let digitoEsperado;

    // if (len === 12) suma = 0
    // else suma = 481; //Ajuste para persona moral

    // for (let i = 0; i < len; i++)
    //     suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
    // digitoEsperado = 11 - suma % 11;
    // if (digitoEsperado === 11) digitoEsperado = 0;
    // else if (digitoEsperado === 10) digitoEsperado = "A";

    // //El dígito verificador coincide con el esperado?
    // // o es un RFC Genérico (ventas a público general)?
    // if ((digitoVerificador !== digitoEsperado)
    //     && (!aceptarGenerico || rfcSinDigito + digitoVerificador !== "XAXX010101000"))
    //     return false;
    // else if (!aceptarGenerico && rfcSinDigito + digitoVerificador === "XEXX010101000")
    //     return false;
    return true;
}

function validarRFC(input: any) {
    var rfc = input.trim().toUpperCase();

    var rfcCorrecto = rfcValido(rfc);

    if (rfcCorrecto) {
        return true;
    } else {
        return false;
    }
}

function clabeValida(clabe: any){
    if (clabe.length == 18) return true;
    else return false;
}
