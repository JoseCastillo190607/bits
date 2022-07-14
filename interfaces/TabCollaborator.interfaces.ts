export interface TabCollaboratorInterfaces {
    data?: Collaborator[];
    error?: string
}

export interface Collaborator {
    _id: string;
    Proyecto: string;
    Sede: string;
    Cliente: string;
    email: string;
    FechaIngreso: string;
    Puesto?: string;
    FullName: string;
    FechaBaja?: string;
    netSalary?: number;
    reasonCollaborator?: string;
    typeDrop?: string;
    img?: string;
    baja?: boolean;
    done?: boolean;
    bussinesName: string;
    terminationDate: string;
    Nombre?: string;
    ApellidoPaterno?: string;
    ApellidoMaterno?: string;
    FechaNacimiento?: string;
  
}

export interface CollaboratorModal {
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    FechaNacimiento: string;
    FechaIngreso: string;
    email: string;
    bussinesName: string;
    terminationDate: string;
    Sede: string;
    Cliente: string;
    Proyecto: string;
    Anfitrion?: string;
}

export enum TabCollaboratorTypes {
    init = '[Tab Collaborator] Init',
    add = '[Tab Collaborator] Add',
    substract = '[Tab Collaborator] Substract',
    filter = '[Tab Collaborator] Filter',
    scheduleDrop = '[Tab Collaborator] Scuedule Drop',
    setCollaborator = '[Tab Collaborator] Set Colaborator',
    cleanCollaborator = '[Tab Collaborator] Clean Colaborator',
}

export type ActionTabCollaboratorReducer = {
    type: TabCollaboratorTypes,
    payload?: any
};
export interface StateTabCollaboratorInterface {
    loading: boolean;
    collaborators: Collaborator[];
    collaboratorsFilter?: Collaborator[];
    collaborator?: Collaborator | null;
};

export interface ScheduleDropCollaborator {
    FechaBaja: string;
    reasonCollaborator: string;
    typeDrop: string;
}