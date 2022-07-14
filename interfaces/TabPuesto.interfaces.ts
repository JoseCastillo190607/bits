export interface TabPuestoInterfaces {
    data?: Puesto[];
    error?: string
}

export interface Puesto {
    _id: string;
    NombrePuesto: string;
    AreaProyecto: string;
    PuestoSuperior: string;
    Descripcion: string;
}

export interface PuestoModal {
    NombrePuesto: string;
    AreaProyecto: string;
    PuestoSuperior: string;
    Descripcion: string;
    NombreUsuario: string;
    idUsuario:string;
}

export enum TabPuestoTypes {
    init = '[Tab Puesto] Init',
    add = '[Tab Puesto] Add',
    substract = '[Tab Puesto] Substract',
    filter = '[Tab Puesto] Filter',
    scheduleDrop = '[Tab Puesto] Scuedule Drop',
    setPuesto = '[Tab Puesto] Set Colaborator',
    cleanPuesto = '[Tab Puesto] Clean Colaborator',
}

export type ActionTabPuestoReducer = {
    type: TabPuestoTypes,
    payload?: any
};

export interface StateTabPuestoInterface {
    loading: boolean;
    Puestos: Puesto[];
    PuestosFilter?: Puesto[];
    Puesto?: Puesto | null;
};
