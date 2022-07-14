export interface ICalendarFetch {
    data?: ICalendar[];
    error?: string;
}

export interface ICalendar {
    _id: string;
    titulo: string;
    tittle: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFinal: Date;
    tipo: string;
    proyecto: string;
    createdAt?: Date;
    updatedAt?: Date;
    customDate?: string;
};

export interface StateCalendarModalForm {
    titulo: string;
    descripcion: string;
    fechaInicio: string;
    fechaFinal: string;
    tipo: string;
    proyecto: string[] | string;
    _id?: string;
}