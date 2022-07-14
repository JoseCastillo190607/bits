
import { useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Grid } from "@material-ui/core";
import styles from "../../src/components/Payroll/PayrollStyles.module.css";
import CustomTabs from '../components/Collaborators/Tab/CustomTabs';
import CustomTab from '../components/Collaborators/Tab/CustomTabMain';
import { useQuery } from "@apollo/client";
import {
  GET_SETTLEMENTCOLLABORATOR,
} from "..//Querys/querys";
import {formatter} from "../helpers/formatoMoneda"

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

export const InitSettlement = (props: TabPanelProps) => {
  const { id, tab } = useParams<any>();
  const history = useHistory();

  const resultSettlementCollaborator = useQuery(GET_SETTLEMENTCOLLABORATOR, {
    variables: { getSettlementPayrollcollaboratorId: id },
  });
  const allSettlementCollaborator = resultSettlementCollaborator.data?.GET_SETTLEMENTCOLLABORATOR;

  useEffect(() => {
  },);

  console.log(allSettlementCollaborator)

  const handleChange = () =>{
    console.log()
  }


  return (
    <>
      <Box mt={3} ml={5} className="Title">
        Nóminas
      </Box>
      <Box p={5} pb={3} pt={0}>
        <Grid
          container
          justify="flex-start"
        >
          <CustomTabs
            value={1}
            onChange={handleChange}
            aria-label="simple tabs example"
          > 
            <CustomTab label="Pre-Nómina" value={0}/>
            <CustomTab label="Finiquito / Liquidación" value={1}/>
            <CustomTab label="Eventuales" value={2}/>
            <CustomTab label="Históricas" value={3}/>
            <CustomTab label="Calculadora" value={4}/>
            <CustomTab label="Reportes" value={5}/>
          </CustomTabs>
        </Grid>
     </Box>
     <div className={styles.pc_contenedorTitulo}>
      <div className={styles.pc_contenedorProceso}>
        <div>
          <span className={styles.pc_tituloProceso}>Calcular</span>
          <span className={styles.pc_tituloProceso}>Dispersar</span>
          <span className={styles.pc_tituloProceso}>Timbrar</span>
          <span className={styles.pc_tituloProceso}>Terminar</span>
        </div>
        <div className={styles.pc_contenedorIconoSeguimiento}>
          <div className={styles.pc_circuloAmarillo}>
            <div className={styles.pc_circuloBlanco}>
            </div>
          </div>
          <div className={styles.pc_lineaSeguimiento}>
          </div>
          <div className={styles.pc_circuloGris}>
          </div>
          <div className={styles.pc_lineaSeguimiento}>
          </div>
          <div className={styles.pc_circuloGris}>
          </div>
          <div className={styles.pc_lineaSeguimiento}>
          </div>
          <div className={styles.pc_circuloGris}>
          </div>
        </div>
      </div>
      <div className={styles.pc_contenedorBotones}>
        <button className={styles.fl_botonDescargar}>
          <div className={styles.fl_iconoDescargar}></div>
          <div>
            Descargar Documentos
          </div>
        </button>
          <button className={styles.pc_botonCalcular}>
            <div className={styles.pc_iconoCalcular}></div>
            Calcular
          </button>
          <button 
            className={styles.pc_botonDispersar}
            onClick={() => history.push(`/SettlementDispersar/${id}/${tab}`)}>
            <div>
            Ir a Dispersar
            </div>
            <div className={styles.pc_iconoDispersar}></div>
          </button>
      </div>
     </div>
     <div className={styles.pc_contenedorPrincipal}>
      <div className={styles.fl_tituloContenedorPrincipal}>
        <div className={styles.pc_contenedorNombre}>
          <div>
            <span className={styles.pc_tituloPrincipal}>{tab}</span>
          </div>
       </div>
       <div className={styles.pc_contenedorNombre}>
          <div>
            <span className={styles.pc_tituloPrincipal}></span>
          </div>
       </div>
      </div>
      <div className={styles.p_contenedorTablaDispersion}>
        <table className={styles.pd_tablaPrincipal}>
          <thead className={styles.pd_contenedorTitulos}>
            <td className={`${styles.pd_columnaTitulos} ${styles.fl_primeraFila}`}>Sueldo</td>
            <td className={styles.pd_columnaTitulos}>Incidencias</td>
            <td className={styles.pd_columnaTitulos}>Aguinaldo</td>
            <td className={styles.pd_columnaTitulos}>Vacaciones</td>
            <td className={styles.pd_columnaTitulos}>Prima Vacacional</td>
            <td className={styles.pd_columnaTitulos}>Impuestos (ISR/Subsidio)</td>
            <td className={styles.pd_columnaTitulos}>Total</td>
          </thead>
          <tbody className={styles.pc_contenedorTitulos}>
            {
              allSettlementCollaborator?.map((lis:any)=>(
                <tr>
                  <td className={`${styles.pd_columnaDatos} ${styles.fl_primeraFila}`}>{formatter(lis.salary)}</td>
                  <td className={styles.pd_columnaDatos}>{formatter(lis.incident)}</td>
                  <td className={styles.pd_columnaDatos}>{formatter(lis.aguinaldo)}</td>
                  <td className={styles.pd_columnaDatos}>{formatter(lis.holidays)}</td>
                  <td className={styles.pd_columnaDatos}>{formatter(lis.primaVacacional)}</td>
                  <td className={styles.pd_columnaDatos}>{formatter(lis.taxes)}</td>
                  <td className={styles.pd_columnaDatos}>{formatter(lis.total)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>    
      <div className={styles.fl_contenedorArchivos}>
        <div className={styles.fl_textoArchivos}>
            <div className={styles.fl_textoArchivosInterno}>Carta finiquito</div>
            <div className={styles.fl_contenedorTextoArchivos}>
              <div className={styles.fl_iconoVerDocumento}></div>
              <div className={styles.fl_textoVerDocumento}>Ver documento</div>
            </div>
        </div>
        <div>
          <button className={styles.fl_botonSinDocumento}>
            <div className={styles.fl_iconoSubirArchivo}></div>
            Cambiar archivo
          </button>
        </div>
      </div>
      <div className={styles.fl_contenedorArchivosDos}>
        <div className={styles.fl_textoArchivos}>
            <div className={styles.fl_textoArchivosInterno}>Carta finiquito</div>
            <div className={styles.fl_contenedorTextoArchivos}>
              <div className={styles.fl_iconoVerDocumento}></div>
              <div className={styles.fl_textoVerDocumento}>Ver documento</div>
            </div>
        </div>
        <div>
          <button className={styles.fl_botonSinDocumento}>
            <div className={styles.fl_iconoSubirArchivo}></div>
            Cambiar archivo
          </button>
        </div>
      </div>
      <div>
        <div className={styles.pd_contenedorBarraEstado}>
          <div className={styles.pd_barraEstado} >
          <div className={styles.pd_contenedorRegreso}
              onClick={() => history.push(`/payroll`)}
            >
              <div className={styles.pd_botonRegreso}></div>
              <div>Regresar a "Finiquito/Liquidaci&oacute;n"</div>
            </div>
              <button className={styles.pd_botonSalir}
                onClick={() => history.push(`/payroll`)}
              >
                Salir
              </button>
          </div>
        </div>
      </div>
      
    </div>
    </>
    );
}
    
export default InitSettlement;

