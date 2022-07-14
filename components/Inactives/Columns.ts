import { TBColumn } from "../../interfaces/TableBits.interfaces";

const columns: TBColumn[] = [
    {
        id: "bussinesName",
        label: 'Nombre',
        align: 'left',
    },
    // {
    //     id: "Sede",
    //     label: 'Sede',
    //     align: 'left',
    // },
    // {
    //     id: "Cliente",
    //     label: 'Cliente',
    //     align: 'left',
    // },
    {
        id: "dropType",
        label: 'Tipo de baja',
        align: 'left',
    },
    {
        id: "comment",
        label: 'Razón',
        align: 'left',
    },
    {
        id: "project",
        label: 'Proyecto',
        align: 'left',
    },
    {
        id: "dateOfAdmission",
        label: 'Fecha ingreso',
        align: 'left',
    },
    {
        id: "FechaBaja",
        label: 'Fecha baja',
        align: 'left',
    },
];

export default columns;