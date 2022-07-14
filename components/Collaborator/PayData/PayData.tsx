import { useState, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { AdminContext } from '../../../context/AdminContext/AdminContext';

import List from "../List";
import BankData from "./BankData";
import BankDataColaboradores from  './Colaboradores/BankDataColaboradores'
import BankDataInactivos from './Inactivos/BankDataInactivos';
import BankDataNuevoIngreso from './Candidatos/BankDataNuevoIngreso';
const labels: Array<string> = ["Datos Bancarios"];

const PayData = () => {
    const {adminState} = useContext(AdminContext)
    let location = useLocation();
    let Desde = location.pathname
    let nuevoArrayEtiquetas =[]
    let nuevoArrayTablas = []

    if(Desde.includes('collaborators') || Desde.includes('candidate')){
            nuevoArrayEtiquetas.push('Datos Bancarios')
            nuevoArrayTablas.push(BankDataNuevoIngreso)
    }

    if(Desde.includes('nuevoingreso')){
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosParaPago?.DatosBancarios?.Ver === true){
            nuevoArrayEtiquetas.push('Datos Bancarios')
            nuevoArrayTablas.push(BankDataNuevoIngreso)
        }
    }
    if(Desde.includes('colaboradores')){
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.DatosParaPago?.DatosBancarios?.Ver === true){
            nuevoArrayEtiquetas.push('Datos Bancarios')
            nuevoArrayTablas.push(BankDataColaboradores)
        }
    }

    if(Desde.includes('inactivos')){
        if (adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos?.Ver?.DatosParaPago?.DatosBancarios?.Ver === true){
            nuevoArrayEtiquetas.push('Datos Bancarios')
            nuevoArrayTablas.push(BankDataInactivos)
        }
    }


    return (
        <List
            title="DATOS BANCARIOS"
            labels={nuevoArrayEtiquetas}
            components={nuevoArrayTablas}
            numTab={5}
            progress={3}
        />
    )
}

export default PayData;