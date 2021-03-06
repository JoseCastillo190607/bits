import { useState, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { AdminContext } from '../../../context/AdminContext/AdminContext';
import List from "../List";
import AddressData from "./AddressData";
import IdentityData from "./IdentityData";
import InformationData from "./InformationData";
import AddressDataNuevoIngreso from './Candidatos/AddressDataNuevoIngreso';
import IdentityDataNuevoIngreso from './Candidatos/IdentityDataNuevoIngreso'
import InformationDataNuevoIngreso from './Candidatos/InformationDataNuevoIngreso'; 
import AddressDataColaboradores from './Colaboradores/AddressDataColaboradores';
import IdentityDataColaboradores from './Colaboradores/IdentityDataColaboradores';
import InformationDataColaboradores from './Colaboradores/InformationDataColaboradores';
import AddressDataInactivos from './Inactivos/AddressDataInactivos';
import IdentityDataInactivos from './Inactivos/IdentityDataInactivos';
import InformationDataInactivos from './Inactivos/InformationDataInactivos';




const labels: Array<string> = ["Datos del domicilio", "Datos personales", "Datos de Identidad"];

const PersonalData = () => {
    const {adminState} = useContext(AdminContext)
    let location = useLocation();
    let Desde = location.pathname
    let nuevoArrayEtiquetas =[]
    let nuevoArrayTablas = []

    if(Desde.includes('collaborators') || Desde.includes('candidate')){
            nuevoArrayEtiquetas.push('Datos del domicilio')
            nuevoArrayTablas.push(AddressData)
            nuevoArrayEtiquetas.push('Datos personales')
            nuevoArrayTablas.push(InformationData)
            nuevoArrayEtiquetas.push('Datos de Identidad')
            nuevoArrayTablas.push(IdentityData)
    }  

    if(Desde.includes('nuevoingreso')){
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosPersonales?.DatosDomicilio.Ver === true){
            nuevoArrayEtiquetas.push('Datos del domicilio')
            nuevoArrayTablas.push(AddressData)
        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosPersonales?.DatosPersonales.Ver === true){
            nuevoArrayEtiquetas.push('Datos personales')
            nuevoArrayTablas.push(InformationData)
    
        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosPersonales?.DatosIdentidad.Ver === true){
            nuevoArrayEtiquetas.push('Datos de Identidad')
            nuevoArrayTablas.push(IdentityData)
        }
    
    }
    if(Desde.includes('colaboradores')){
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.DatosPersonales?.DatosDomicilio.Ver === true){
            nuevoArrayEtiquetas.push('Datos del domicilio')
            nuevoArrayTablas.push(AddressDataColaboradores)
        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.DatosPersonales?.DatosPersonales.Ver === true){
            nuevoArrayEtiquetas.push('Datos personales')
            nuevoArrayTablas.push(InformationDataColaboradores)
    
        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.DatosPersonales?.DatosIdentidad.Ver === true){
            nuevoArrayEtiquetas.push('Datos de Identidad')
            nuevoArrayTablas.push(IdentityDataColaboradores)
        }
    }
    if(Desde.includes('inactivos')){
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos?.Ver?.DatosPersonales?.DatosDomicilio.Ver === true){
            nuevoArrayEtiquetas.push('Datos del domicilio')
            nuevoArrayTablas.push(AddressDataInactivos)
        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos?.Ver?.DatosPersonales?.DatosPersonales.Ver === true){
            nuevoArrayEtiquetas.push('Datos personales')
            nuevoArrayTablas.push(InformationDataInactivos)
    
        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos?.Ver?.DatosPersonales?.DatosIdentidad.Ver === true){
            nuevoArrayEtiquetas.push('Datos de Identidad')
            nuevoArrayTablas.push(IdentityDataInactivos)
        }
    }


    return (
        <List
            title="DATOS PERSONALES"
            labels={nuevoArrayEtiquetas}
            components={nuevoArrayTablas}
            numTab={3}
            progress={1}
        />
    )
}

export default PersonalData;