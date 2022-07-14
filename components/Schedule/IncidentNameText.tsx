import { getJSDocReturnType } from "typescript"
import "./styles.css"
const IncidentNameText = ({incidentName}: any) =>{
    //console.log(incidentName)
    //console.log(Array.isArray(incidentName));
    
    const circleIncident = (TypeIncident: any) =>{
        if(TypeIncident === "Incapacidad"){
            return "circleIncidentPink"
        }
        if(TypeIncident === "Vacaciones"){
            return "circleIncidentBlue"
        }
        if(TypeIncident === "Faltas"){
            return "circleIncidentCian"
        }
        if(TypeIncident === "Cumpleaños"){
            return "circleIncidentRed"
        }
        if(TypeIncident === "Aniversarios"){
            return "circleIncidentOrange"
        }
        if(TypeIncident === "Horas extra"){
            return "circleIncidentPurple"
        }
        if(TypeIncident === "PCG"){
            return "circleIncidentGreen"
        }
        if(TypeIncident === "PSG"){
            return "circleIncidentYellow"
        }

    }


    return (
            <div className="ContainerIncidentTitle" >
                
                {
                    incidentName?.map((name: any) =>(
                        <div className="incidentContainer">
                            <div className="incidentName">
                                <div className={circleIncident(name.Name)}></div>
                                <div className="incidentText"><p>{name.Name}</p></div>
                            </div>
                        </div>
                    ))
                }
                
            </div>
    )
}

export default IncidentNameText