import { TBColumn } from '../../interfaces/TableBits.interfaces';
const columns: TBColumn[] = [
    {
        id: "LowerLimit",
        label: 'L�mite Inferior',
        align: 'left',
    },
    {
        id: "UpperLimit",
        label: 'L�mite Superior',
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