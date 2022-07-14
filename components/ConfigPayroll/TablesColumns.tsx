import { TBColumn } from '../../interfaces/TableBits.interfaces';
const columns: TBColumn[] = [
    {
        id: "LowerLimit",
        label: 'Límite Inferior',
        align: 'left',
    },
    {
        id: "UpperLimit",
        label: 'Límite Superior',
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