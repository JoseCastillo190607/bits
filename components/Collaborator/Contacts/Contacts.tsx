import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AdminContext } from "../../../context/AdminContext/AdminContext";
import List from "../List";
import BeneficiarioNuevoIngreso from "./Candidatos/BeneficiarioNuevoIngreso";
import BeneficiarioColaboradores from "./Colaboradores/BeneficiarioColaboradores";
import BeneficiarioInactivos from "./Inactivos/BeneficiarioInactivos";
import EmergenciaNuevoIngreso from "./Candidatos/EmergenciaNuevoIngreso";
import EmergenciaColaboradores from "./Colaboradores/EmergenciaColaboradores";
import EmergenciaInactivos from "./Inactivos/EmergenciaInactivos";
import EnfermedadInactivos from "./Inactivos/EnfermedadInactivos";
import EnfermedadColaboradores from "./Colaboradores/EnfermedadColaboradores";
import EnfermedadNuevoingreso from "./Candidatos/EnfermedadNuevoingreso";


const Contacts = () => {
    const {adminState} = useContext(AdminContext)
    let location = useLocation();
    let Desde = location.pathname
    let nuevoArrayEtiquetas =[]
    let nuevoArrayTablas = []


    if(Desde.includes('collaborators') || Desde.includes('candidate')){
            nuevoArrayEtiquetas.push('Beneficiario')
            nuevoArrayTablas.push(BeneficiarioNuevoIngreso)
            nuevoArrayEtiquetas.push('Contacto de Emergencia')
            nuevoArrayTablas.push(EmergenciaNuevoIngreso)
            nuevoArrayEtiquetas.push('Información Médica')
            nuevoArrayTablas.push(EnfermedadNuevoingreso)
    }

    if(Desde.includes('nuevoingreso')){
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.SaludEmergencias?.Beneficiario?.Ver === true){
            nuevoArrayEtiquetas.push('Beneficiario')
            nuevoArrayTablas.push(BeneficiarioNuevoIngreso)
        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.SaludEmergencias?.ContactoEmergencia.Ver === true){
            nuevoArrayEtiquetas.push('Contacto de Emergencia')
            nuevoArrayTablas.push(EmergenciaNuevoIngreso)

        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.SaludEmergencias?.InformacionMedica.Ver === true){
            nuevoArrayEtiquetas.push('Información Médica')
            nuevoArrayTablas.push(EnfermedadNuevoingreso)
        }
    }
    if(Desde.includes('colaboradores')){
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.SaludEmergencias?.Beneficiario?.Ver === true){
            nuevoArrayEtiquetas.push('Beneficiario')
            nuevoArrayTablas.push(BeneficiarioColaboradores)
        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.SaludEmergencias?.ContactoEmergencia.Ver === true){
            nuevoArrayEtiquetas.push('Contacto de Emergencia')
            nuevoArrayTablas.push(EmergenciaColaboradores)

        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.SaludEmergencias?.InformacionMedica.Ver === true){
            nuevoArrayEtiquetas.push('Información Médica')
            nuevoArrayTablas.push(EnfermedadColaboradores)
        }
    }
    if(Desde.includes('inactivos')){
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos?.Ver?.SaludEmergencias?.Beneficiario?.Ver === true){
            nuevoArrayEtiquetas.push('Beneficiario')
            nuevoArrayTablas.push(BeneficiarioInactivos)
        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos?.Ver?.SaludEmergencias?.ContactoEmergencia.Ver === true){
            nuevoArrayEtiquetas.push('Contacto de Emergencia')
            nuevoArrayTablas.push(EmergenciaInactivos)

        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos?.Ver?.SaludEmergencias?.InformacionMedica.Ver === true){
            nuevoArrayEtiquetas.push('Información Médica')
            nuevoArrayTablas.push(EnfermedadInactivos)
        }
    }

    return (
        <List
            title="SALUD Y EMERGENCIAS"
            labels={nuevoArrayEtiquetas}
            components={nuevoArrayTablas}
            numTab={4}
            progress={2}
        />
    )
}

export default Contacts;