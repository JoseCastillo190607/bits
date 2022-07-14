import { useState, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { AdminContext } from '../../../context/AdminContext/AdminContext';
import List from '../List';
import HiringData from './HiringData';
import InputData from './InputData';
import PersonalData from './PersonalData';
import HiringDataNuevoIngreso from './Candidatos/HiringDataNuevoIngreso'
import HiringDataColaboradores from './Colaboradores/HiringDataColaboradores';
import HiringDataInactivos from './Inactivos/HiringDataInactivos';
import InputDataNuevoIngreso from './Candidatos/InputDataNuevoIngreso';
import InputDataColaboradores from './Colaboradores/InputDataColaboradores';
import InputDataInactivos from './Inactivos/InputDataInactivos';
import PersonalDataNuevoIngreso from './Candidatos/PersonalDataNuevoIngreso';
import PersonalDataInactivos from './Inactivos/PersonalDataInactivos';
import PersonalDataColaboradores from './Colaboradores/PersonalDataColaboradores';

const labels: Array<string> = ["Información Personal", "Datos de Ingreso", "Datos de Contratación"];

const Information = () => {
    const {adminState} = useContext(AdminContext)
    let location = useLocation();
    let Desde = location.pathname
    let nuevoArrayEtiquetas =[]
    let nuevoArrayTablas = []

    if(Desde.includes('collaborators') || Desde.includes('candidate')){
            nuevoArrayEtiquetas.push('Información Personal')
            nuevoArrayTablas.push(PersonalData)
            nuevoArrayEtiquetas.push('Datos de Ingreso')
            nuevoArrayTablas.push(InputData)
            nuevoArrayEtiquetas.push('Datos de Contratación')
            nuevoArrayTablas.push(HiringData)
    }


    if(Desde.includes('nuevoingreso')){
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.InformacionAlta?.InformacionPersonal.Ver === true){
            nuevoArrayEtiquetas.push('Información Personal')
            nuevoArrayTablas.push(PersonalData)
        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.InformacionAlta?.DatosIngreso.Ver === true){
            nuevoArrayEtiquetas.push('Datos de Ingreso')
            nuevoArrayTablas.push(InputData)

        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.InformacionAlta?.DatosContratacion.Ver === true){
            nuevoArrayEtiquetas.push('Datos de Contratación')
            nuevoArrayTablas.push(HiringData)
        }
    }
    if(Desde.includes('colaboradores')){
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.InformacionAlta?.InformacionPersonal.Ver === true){
            nuevoArrayEtiquetas.push('Información Personal')
            nuevoArrayTablas.push(PersonalDataColaboradores)
        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.InformacionAlta?.DatosIngreso.Ver === true){
            nuevoArrayEtiquetas.push('Datos de Ingreso')
            nuevoArrayTablas.push(InputDataColaboradores)

        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.InformacionAlta?.DatosContratacion.Ver === true){
            nuevoArrayEtiquetas.push('Datos de Contratación')
            nuevoArrayTablas.push(HiringDataColaboradores)
        }
    }
    if(Desde.includes('inactivos')){
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos?.Ver?.InformacionAlta?.InformacionPersonal.Ver === true){
            nuevoArrayEtiquetas.push('Información Personal')
            nuevoArrayTablas.push(PersonalDataInactivos)
        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos?.Ver?.InformacionAlta?.DatosIngreso.Ver === true){
            nuevoArrayEtiquetas.push('Datos de Ingreso')
            nuevoArrayTablas.push(InputDataInactivos)

        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos?.Ver?.InformacionAlta?.DatosContratacion.Ver === true){
            nuevoArrayEtiquetas.push('Datos de Contratación')
            nuevoArrayTablas.push(HiringDataInactivos)
        }
    }

    return (
        <List
            title="INFORMACIÓN DE ALTA"
            labels={nuevoArrayEtiquetas}
            components={nuevoArrayTablas}
            numTab={2}
            progress={0}
        />
    )
}

export default Information;