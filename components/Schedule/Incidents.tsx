import React, {useState, useEffect} from "react"
import {
    GET_CALENDARINCIDENT
} from "../../Querys/querys"
import { useQuery } from "@apollo/client"

export default function Incidents(idCalendar: any){
    const [filtrado, setFiltrado] = useState([])
    const resultIncident = useQuery(GET_CALENDARINCIDENT, {
        variables: { idCalendar: parseInt(idCalendar.idCalendar) },
    });
    //console.log(idCalendar.idCalendar)
    console.log(resultIncident)
    const allIncident = resultIncident.data?.GET_CALENDARINCIDENT;

    useEffect(() =>{
        obtenerDatos()
    },[allIncident])

    const obtenerDatos = async () => {
        await setFiltrado(allIncident)
        //console.log('Filtrado',filtrado)
    };
    //console.log(idCalendar.idCalendar)
    return <div>Incidencia</div>

}