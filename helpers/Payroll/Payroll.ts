export const getDateDay = (fecha:any) =>{
  let fechaSinHora = fecha.slice(0,10)
  let Dia = fechaSinHora.slice(8,10)
  let Mes = fechaSinHora.slice(5,7)

  let MesLetra = ''

  switch(Mes){
    case '01':
      MesLetra = 'Ene'
    break;
    case '02':
      MesLetra = 'Feb'
    break;
    case '03': 
      MesLetra = 'Mar'
    break;
    case '04':
      MesLetra = 'Abr'
    break;
    case '05':
      MesLetra = 'May'
    break;
    case '06':
      MesLetra = 'Jun'
    break;
    case '07':
      MesLetra = 'Jul'
    break;
    case '08':
      MesLetra = 'Ago'
    break;
    case '09':
      MesLetra = 'Sep'
    break;
    case '10':
      MesLetra = 'Oct'
    break;
    case '11':
      MesLetra = 'Nov'
    break;
    case '12':
      MesLetra = 'Dic'
    break
     default: 
      MesLetra = 'Fecha Invalida'
    break;
  }

  

  return `${Dia}${MesLetra}`;
}

export const getDateComplete = (fecha:any) =>{
  let fechaSinHora = fecha.slice(0,10)
  let Dia = fechaSinHora.slice(8,10)
  let Mes = fechaSinHora.slice(5,7)
  let anio = fechaSinHora.slice(0,4)

  let MesLetra = ''

  switch(Mes){
    case '01':
      MesLetra = 'Enero'
    break;
    case '02':
      MesLetra = 'Febrero'
    break;
    case '03': 
      MesLetra = 'Marzo'
    break;
    case '04':
      MesLetra = 'Abril'
    break;
    case '05':
      MesLetra = 'Mayo'
    break;
    case '06':
      MesLetra = 'Junio'
    break;
    case '07':
      MesLetra = 'Julio'
    break;
    case '08':
      MesLetra = 'Agosto'
    break;
    case '09':
      MesLetra = 'Septiembre'
    break;
    case '10':
      MesLetra = 'Octubre'
    break;
    case '11':
      MesLetra = 'Noviembre'
    break;
    case '12':
      MesLetra = 'Diciembre'
    break
     default: 
      MesLetra = 'Fecha Invalida'
    break;
  }

  

  return `${Dia} ${MesLetra} ${anio}`;
}

export const getDateMonthYear = (fecha:string) =>{
  let fechaSinHora = fecha.slice(0,10)
  let Mes = fechaSinHora.slice(5,7)
  let anio = fechaSinHora.slice(0,4)

  return `${Mes}/${anio}`;
}


export const getDateYear = (fecha:string) =>{
  return  fecha.slice(0,4)
}

export const getMonth = (fecha:any) =>{
  let fechaSinHora = fecha.slice(0,10)
  let Dia = fechaSinHora.slice(8,10)
  let Mes = fechaSinHora.slice(5,7)
  let anio = fechaSinHora.slice(0,4)

  let MesLetra = ''

  switch(Mes){
    case '01':
      MesLetra = 'Enero'
    break;
    case '02':
      MesLetra = 'Febrero'
    break;
    case '03': 
      MesLetra = 'Marzo'
    break;
    case '04':
      MesLetra = 'Abril'
    break;
    case '05':
      MesLetra = 'Mayo'
    break;
    case '06':
      MesLetra = 'Junio'
    break;
    case '07':
      MesLetra = 'Julio'
    break;
    case '08':
      MesLetra = 'Agosto'
    break;
    case '09':
      MesLetra = 'Septiembre'
    break;
    case '10':
      MesLetra = 'Octubre'
    break;
    case '11':
      MesLetra = 'Noviembre'
    break;
    case '12':
      MesLetra = 'Diciembre'
    break
     default: 
      MesLetra = 'Fecha Invalida'
    break;
  }

  

  return `${MesLetra}`;
}




export const getDateMonth= (fecha:any) =>{
  let fechaSinHora = fecha.slice(0,10)
  let Dia = fechaSinHora.slice(8,10)
  let Mes = fechaSinHora.slice(5,7)
  let anio = fechaSinHora.slice(0,4)

  let MesLetra = ''

  switch(Mes){
    case '01':
      MesLetra = 'Enero'
    break;
    case '02':
      MesLetra = 'Febrero'
    break;
    case '03': 
      MesLetra = 'Marzo'
    break;
    case '04':
      MesLetra = 'Abril'
    break;
    case '05':
      MesLetra = 'Mayo'
    break;
    case '06':
      MesLetra = 'Junio'
    break;
    case '07':
      MesLetra = 'Julio'
    break;
    case '08':
      MesLetra = 'Agosto'
    break;
    case '09':
      MesLetra = 'Septiembre'
    break;
    case '10':
      MesLetra = 'Octubre'
    break;
    case '11':
      MesLetra = 'Noviembre'
    break;
    case '12':
      MesLetra = 'Diciembre'
    break
     default: 
      MesLetra = 'Fecha Invalida'
    break;
  }

  

  return `${Dia} ${MesLetra}`;
}