export const formatter = (numero:number) => {
  let formato = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  })
  let resultado = formato.format(numero)
  return resultado
} 

export const formatterMxn = (numero: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(numero);
};
