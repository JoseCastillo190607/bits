import { useContext } from "react";
import { Box, Grid } from "@material-ui/core"
import CollaboratorContext from "../../../context/CollaboratorContext/CollaboratorContext";
import File from './Fields/File';

const PersonalDocuments = () => {
    const { state } = useContext(CollaboratorContext);

    return (
        <div className={state.sections[0] >= 100 ? `validate__border` : `novalidate__border`}>
            <Grid direction="row" container>
                <Grid xs={6} item>
                    <div className="Expediente">
                        <File label="Acta de nacimiento" name="ActaNacimiento_PDF" required={true} />
                        <File label="Último comprobante de estudios" name="ComprobanteEstudios_PDF" span="(Título, Carta de Pasante o Kardex)" required={true} />
                        <File label="Comprobante de domicilio" name="ComprobanteDomicilio_PDF" span="(Fecha no mayor a 2 meses)" required={true} />
                        <File label="Identificación oficial" name="IdentificacionOficial_PDF" span="(INE, Pasaporte)" required={true} />
                        <File label="RFC" span="(Emitido por el SAT)" name="RFC_PDF" required={true} />
                    </div>
                </Grid>
                <Grid xs={6} item>
                    <Box ml={1}>
                        <File label="CURP" name="CURP_PDF" required={true} />
                        <File label="Comprobante oficial de NSS" span="(Número de Seguro Social)" name="ComprobanteNSS_PDF" required={true} />
                        <File label="Subir fotografía" icon={true} name="Foto_IMG" accept=".png,.jpg,.jpeg" required={true} />
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default PersonalDocuments;