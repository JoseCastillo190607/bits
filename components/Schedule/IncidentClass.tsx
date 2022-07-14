export default function IncidentClass(type_Name: any){
    if (type_Name === "Incapacidad") return "circleIncidentPink"
    if (type_Name === "Vacaciones") return "circleIncidentBlue"
    if (type_Name === "Faltas") return "circleIncidentCian"
    if (type_Name === "Cumpleaños") return "circleIncidentRed"
    if (type_Name === "Aniversarios") return "circleIncidentOrange"
    if (type_Name === "Horas extra") return "circleIncidentPurple"
    if (type_Name === "PCG") return "circleIncidentGreen"
    if (type_Name === "PSG") return "circleIncidentYellow"
    return ""
}