export interface INews {
    _id: string;
    Body: string;
    Reviewers: any[];
    Admin: boolean;
    Movil: boolean;
    visible: boolean;
    Reacts: IReactNews[];
    Autor: string;
    Titulo: string;
    BodyHTML: string;
    Fecha: Date;
    ImageUri: string;
    AutorImg: string;
    Proyectos: string;
};

export type INew = {
    isOpen: boolean;
    showModal: boolean;
    sent: boolean;
    _id: string;
    projects: string;
    titulo: string;
    BodyHTML: string;
    AutorImg: string | undefined;
    Fecha: string;
    scheduled: boolean;
    scheduleDate: string;
    File: string | Blob;
    Image: boolean;
    ImageUri?: string;
    Autor: string;
}

export interface IStateNews {
    news: INews[];
    newsFilter: INews[];
    loading: boolean;
    isOpen: boolean;
    newSelected?: INews;
};

export interface IReactNews {
    userId: string;
    nameUser: string;
    reacts: IReactsNews;
}

export interface IReactsNews {
    interes: boolean;
    motivacion: boolean;
    encanta: boolean;
}