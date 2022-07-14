import { createContext, Dispatch } from 'react';
import { AdminTypes } from './AdminTypes';

export type AdminProps = {
    id: string,
    Nombre: string,
    Usuario: string,
    image: string,
    logged: boolean,
    loading: boolean,
    Cargando: boolean,
    Proyectos:{
        idProyectos: string,
        Proyectos: string
    },
    Permisos:{
        tipoAdmin: string,
        Modulos:{
            Dashboard:{
                Ver: boolean,
                Editar: boolean
                Eliminar: boolean
            },
            EstructuraEquipo:{
                Ver: boolean
                Sedes:{
                    Ver: boolean,
                    Editar: boolean,
                    Eliminar: boolean
                }
                Clientes:{
                    Ver: boolean,
                    Editar: boolean,
                    Eliminar: boolean
                }
                Proyectos:{
                    Ver: boolean,
                    Editar: boolean,
                    Eliminar: boolean
                }
            },
            Colaboradores:{
                Ver: boolean
            }
        }
    },
    PermisosContex: any

};

type PayloadAdmin =
    | AdminProps;

export interface DispatchAdmin {
    type: AdminTypes
    payload?: PayloadAdmin
};

type AdminPartial = {
    adminState: AdminProps,
    adminDispatch: Dispatch<DispatchAdmin>
};



export const AdminContext = createContext<Partial<AdminPartial>>({});