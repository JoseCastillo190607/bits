import { useState, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { AdminContext } from '../../../../context/AdminContext/AdminContext';
import List from '../List';
import HiringDataRegister from '../Components/HiringDataRegister';
import InputDataRegister from '../Components/InputDataRegister';
import PersonalData from '../Components/PersonalData';

const labels: Array<string> = ["Información Personal", "Datos de Ingreso", "Datos de Contratación"];

const Information = () => {
    const {adminState} = useContext(AdminContext)
    let location = useLocation();
    let Desde = location.pathname
    let nuevoArrayEtiquetas =[]
    let nuevoArrayTablas = []
    
    nuevoArrayEtiquetas.push('Información Personal')
    nuevoArrayTablas.push(PersonalData)
    nuevoArrayEtiquetas.push('Datos de Ingreso')
    nuevoArrayTablas.push(InputDataRegister)
    nuevoArrayEtiquetas.push('Datos de Contratación')
    nuevoArrayTablas.push(HiringDataRegister)


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