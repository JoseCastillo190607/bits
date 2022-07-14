import { TBColumn } from '../../interfaces/TableBits.interfaces';
const columns: TBColumn[] = [
    {
        id: "employees",
        label: 'Empleados',
        align: 'left',
    },
    {
        id: "UpperLimit",
        label: 'Limite Superior',
        align: 'left',
    },
    {
        id: "FixedQuota",
        label: 'Cuota Fija',
        align: 'left',
    },
    {
        id: "Excess",
        label: 'Excedente',
        align: 'left',
    }
];
export default columns;