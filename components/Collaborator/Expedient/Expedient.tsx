import { useContext } from 'react';
import { AdminContext } from '../../../context/AdminContext/AdminContext';
import { useLocation } from "react-router-dom";
import List from "../List";
import OfertaLaboralNuevoIngreso from './NuevoIngreso/OfertaLaboralNuevoIngreso';
import OfertaLaboralColaboradores from './Colaboradores/OfertaLaboralColaboradores';
import OfertaLaboralInactivos from './Inactivos/OfertaLaboralInactivos';
import OptionalDocumentsNuevoIngreso from './NuevoIngreso/OptionalDocumentsNuevoIngreso';
import OptionalDocumentsColaboradores from './Colaboradores/OptionalDocumentsColaboradores';
import OptionalDocumentsInactivos from './Inactivos/OptionalDocumentsInactivos';
import PersonalDocumentsNuevoIngreso from './NuevoIngreso/PersonalDocumentsNuevoIngreso';
import PersonalDocumentsColaboradores from './Colaboradores/PersonalDocumentsColaboradores';
import PersonalDocumentsInactivos from './Inactivos/PersonalDocumentsInactivos';

const labels: Array<string> = ["Documentos personales", "Documentos opcionales", "Oferta laboral"];

const Expedient = () => {
    const {adminState} = useContext(AdminContext)
    let location = useLocation();
    let Desde = location.pathname
    let nuevoArrayEtiquetas =[]
    let nuevoArrayTablas = []

    if(Desde.includes('collaborators') || Desde.includes('candidate')){
            nuevoArrayEtiquetas.push('Documentos Personales')
            nuevoArrayTablas.push(PersonalDocumentsNuevoIngreso)
            nuevoArrayEtiquetas.push('Documentos Opcionales')
            nuevoArrayTablas.push(OptionalDocumentsNuevoIngreso)
            nuevoArrayEtiquetas.push('Oferta Laboral')
            nuevoArrayTablas.push(OfertaLaboralNuevoIngreso)
    }

    if(Desde.includes('nuevoingreso')){
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.Expediente?.DocumentosPersonales.Ver === true){
            nuevoArrayEtiquetas.push('Documentos Personales')
            nuevoArrayTablas.push(PersonalDocumentsNuevoIngreso)
        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.Expediente?.DocumentosOpcionales.Ver === true){
            nuevoArrayEtiquetas.push('Documentos opcionales')
            nuevoArrayTablas.push(OptionalDocumentsNuevoIngreso)

        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.Expediente?.OfertaLaboral.Ver === true){
            nuevoArrayEtiquetas.push('Oferta Laboral')
            nuevoArrayTablas.push(OfertaLaboralNuevoIngreso)
        }
    }
    if(Desde.includes('colaboradores')){
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.Expediente?.DocumentosPersonales.Ver === true){
            nuevoArrayEtiquetas.push('Documentos Personales')
            nuevoArrayTablas.push(PersonalDocumentsColaboradores)
        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.Expediente?.DocumentosOpcionales.Ver === true){
            nuevoArrayEtiquetas.push('Documentos opcionales')
            nuevoArrayTablas.push(OptionalDocumentsColaboradores)

        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.Expediente?.OfertaLaboral.Ver === true){
            nuevoArrayEtiquetas.push('OfertaLaboral')
            nuevoArrayTablas.push(OfertaLaboralColaboradores)
        }
    }
    if(Desde.includes('inactivos')){
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos?.Ver?.Expediente?.DocumentosPersonales.Ver === true){
            nuevoArrayEtiquetas.push('Documentos Personales')
            nuevoArrayTablas.push(PersonalDocumentsInactivos)
        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos?.Ver?.Expediente?.DocumentosOpcionales.Ver === true){
            nuevoArrayEtiquetas.push('Documentos opcionales')
            nuevoArrayTablas.push(OptionalDocumentsInactivos)

        }
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos?.Ver?.Expediente?.OfertaLaboral.Ver === true){
            nuevoArrayEtiquetas.push('OfertaLaboral')
            nuevoArrayTablas.push(OfertaLaboralInactivos)
        }
    }



    return (
        <List
            title="EXPEDIENTE"
            labels={nuevoArrayEtiquetas}
            components={nuevoArrayTablas}
            numTab={6}
            progress={4}
        />
    )
}

export default Expedient;