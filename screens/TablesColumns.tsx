import { TBColumn } from '../interfaces/TableBits.interfaces';
const columns: TBColumn[] = [
    {
        id: "colaborator",
        label: 'Colaborador',
        align: 'left',
    },
    {
        id: "netIncome",
        label: 'Ingreso neto mensual',
        align: 'left',
    },
    {
        id: "DS",
        label: 'Ingreso diario',
        align: 'left',
    },
    {
        id: "GDS",
        label: 'Salario diario gravable',
        align: 'left',
    },

    {
        id: "periodDays",
        label: 'Días del periodo',
        align: 'left',
    },
    {
        id: "workingDays",
        label: 'Días laborados',
        align: 'left',
    },
    {
        id: "grossSalary",
        label: 'Sueldo bruto',
        align: 'left',
    },
    {
        id: "Subsidy",
        label: 'Subidio al empleo',
        align: 'left',
    },

    {
        id: "ISR",
        label: 'ISR',
        align: 'left',
    },
    {
        id: "IMSS",
        label: 'Cuota IMSS trabajador',
        align: 'left',
    },
    {
        id: "SavingsFund",
        label: 'Fondo de ahorro',
        align: 'left',
    },
    {
        id: "INFONAVIT",
        label: 'Crédito INFONAVIT',
        align: 'left',
    },


    {
        id: "incident",
        label: 'Incidencias',
        align: 'left',
    },
    {
        id: "netIncomeTaxable",
        label: 'Sueldo neto gravable',
        align: 'left',
    },
    {
        id: "TotalIncomeNotTaxable",
        label: 'Total a pagar no gravable',
        align: 'left',
    }, 
];
export default columns;