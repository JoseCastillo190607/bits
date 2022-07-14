import { useContext } from "react";
import { Grid} from "@material-ui/core"
import CollaboratorContext from "../../../../context/CollaboratorContext/CollaboratorContext";
import File from '../Fields/File';
import { putCandidate } from "../../../../services/candidateService";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { AdminContext } from "../../../../context/AdminContext/AdminContext";


const OfertaLaboralNuevoIngreso = () => {
    const { state } = useContext(CollaboratorContext);

    const UpdateCandidate = async () => {
        let result = await putCandidate(state.collaborator, state.collaborator.Estatus === "sent" ? 'si' : 'no');
        if (result === true) {
            await SuccessfulAlert({ text: "Datos guardados correctamente." });
        }
    }

    return (
        <>
        <div className={state.sections[2] >= 100 ? `validate__border` : `novalidate__border`}>
            <Grid direction="row" container>
                <Grid xs={12} item>
                    <File label="Descarga, firma y sube tu carta oferta" span="(PDF)" name="CartaOfertaFirmada" withDownload={true} required={true} />
                </Grid>
            </Grid>
            <hr />
            <Grid direction="row" container>
                <Grid xs={12} item>
                    <File label="Descarga, firma y sube tu declaración de información"
                        spam="(PDF)"
                        name="AGREEMENT_PDF" withDownload={true} required={true} />
                </Grid>
            </Grid>
            {/* {Math.round(state.sections[0]) < 100 && (<span className="spanRequerido">Descarga, firma y sube tu Carta Oferta</span>) } */}
            {/* {!(state.collaborator.Archivos.CartaOfertaFirmada?.length > 0) && (<span className="spanRequerido">Descarga, firma y sube tu Carta Oferta</span>) }
            {!(state.collaborator.Archivos.AGREEMENT_PDF?.length > 0) && (<span className="spanRequerido">Descarga, firma y sube tu Declaración de la información</span>) } */}
            {/* <span className="spanRequerido"></span> */} 
        </div>
        </>
    )
}

export default OfertaLaboralNuevoIngreso;