import { TBColumn } from '../../interfaces/TableBits.interfaces';
const columns: TBColumn[] = [
    {
        id: "LowerIncome",
        label: 'Para ingresos de',
        align: 'left',
    },
    {
        id: "SuperiorIncome",
        label: 'Hasta ingresos de',
        align: 'left',
    },
    {
        id: "SubsidyAmount",
        label: 'Cantidad de subsidio para el empleo',
        align: 'left',
    },
];

export default columns;