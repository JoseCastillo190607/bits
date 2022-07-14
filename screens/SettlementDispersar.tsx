import { useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { Box, Grid } from "@material-ui/core";
import styles from "../../src/components/Payroll/PayrollStyles.module.css";
import { useState,useEffect } from "react";
import { GET_SETTLEMENTCOLLABORATOR_DISPERSION } from "../Querys/querys";

import CustomTabs from '../components/Collaborators/Tab/CustomTabs';
import CustomTab from '../components/Collaborators/Tab/CustomTabMain';
import {formatter} from "../helpers/formatoMoneda"
import ProgressBar from '../components/Payroll/SettlementProgressBar'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const SettlementTimbrar = (props: TabPanelProps) => {
  const { id, tab } = useParams<any>();
  const history = useHistory();

  const resultSettlementDispersion = useQuery(GET_SETTLEMENTCOLLABORATOR_DISPERSION, {
    variables: { getSettlementPayrollcollaboratorDispersionId: id },
  });
  
  const allSettlementDispersion = resultSettlementDispersion.data?.GET_SETTLEMENTCOLLABORATOR_DISPERSION;

  const handleChange = () =>{
    console.log(1)
  }

  useEffect(() => {
  },);


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
            <div className={styles.pd_iconoCompleto}>
            </div>
          </div>
          <div className={styles.pc_lineaSeguimientoCompleto}>
          </div>
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
        </div>
      </div>
      <div className={styles.pc_contenedorBotones}>
           <button 
            className={styles.pd_botonDispersarDosInactivo}
            >
            <div className={styles.pd_iconoDispersarDos}></div>
            Dispersar
          </button>  
          <button className={styles.pc_botonDispersar}
          onClick={() => history.push(`/SettlementTimbrar/${id}/${tab}`)}
          >
            <div
            >
            Ir a Timbrar
            </div>
            <div className={styles.pc_iconoDispersar}></div>
          </button>
      </div>
     </div>
     <div className={styles.pc_contenedorPrincipal}>
      <div className={styles.pc_tituloContenedorPrincipal}>
        <div className={styles.pc_contenedorNombre}>
          <div>
            <span className={styles.pc_tituloPrincipal}>{tab}</span>
          </div>
       </div>
       <div className={styles.pd_contenedorTituloSaldos}>
       <div className={styles.pd_cuentaBancaria}>
        <div className={styles.pd_textoCuentaBancaria}>
          Cuenta Bancaria
        </div>
         <div className={styles.pd_contenedorCuentaBancaria}>
          4915 3345 2234 5678
         </div>
       </div>
       <div className={styles.pd_contenedorSaldos}>
        <div className={styles.pd_contenedorInterno}>
          <div className={styles.pd_tituloSaldos}>
            Saldo disponible
          </div>
          <div className={styles.pd_saldoInterno}>
            {formatter(2500000)}
          </div>
        </div>
        <div className={styles.pd_contenedorInterno}>
          <div className={styles.pd_tituloSaldos}>
            Monto pagado
          </div>
          <div className={styles.pd_saldoInterno}>
            {formatter(250000)}
          </div>
        </div>
        <div className={styles.pd_contenedorInterno}>
          <div className={styles.pd_saldoInterno}>
            Diferencia
          </div>
          <div className={styles.pd_saldoInterno}>
            {formatter(2250000)}
          </div>
        </div>
       </div>
       </div>
      </div>
      <div className={styles.p_contenedorTablaDispersion}>
        <table className={styles.pd_tablaPrincipal}>
          <thead className={styles.pd_contenedorTitulos}>
            <td className={styles.pd_columnaTitulos}>RFC</td>
            <td className={styles.pd_columnaTitulos}>Banco</td>
            <td className={styles.pd_columnaTitulos}>Cuenta bancaria</td>
            <td className={styles.pd_columnaTitulos}>CLABE</td>
            <td className={styles.pd_columnaTitulos}>Total a dispersar</td>
            <td className={styles.pd_columnaTitulos}>Estatus</td>
          </thead>
          <tbody className={styles.pc_contenedorTitulos}>
          {allSettlementDispersion?.map((lis:any, index:Number)=>(
              <tr>
                <td className={styles.pd_columnaDatos}>{lis.users.RFC}</td>
                <td className={styles.pd_columnaDatos}>{lis.users.bank}</td>
                <td className={styles.pd_columnaDatos}>{lis.users.accountNumber}</td>
                <td className={styles.pd_columnaDatos}>{lis.users.clabeNum}</td>
                <td className={styles.pd_columnaDatos}>{formatter(lis.total)}</td>
                <td className={styles.pd_columnaDatos}>
                  {(index == 0)?
                    <div className={`${styles.pd_botonEstatus} ${styles.pd_botonEstatusUno}`}>
                      <div className={styles.pd_textoBotonEstatus}>
                        Dispersar
                      </div>
                      <div className={styles.pd_botonInternoDispersar}>
                      <div className={styles.pd_iconoDispersar}></div>
                      </div>
                    </div>
                  : null
                  }
                  {(index == 1)?
                    <div className={`${styles.pd_botonEstatus} ${styles.pd_botonEstatusDos}`}>
                    <div className={styles.pd_textoBotonEstatusDos}>
                      En proceso...
                    </div>
                  </div>
                  : null
                  }
                  {(index == 2)?
                    <div className={styles.pd_botonEstatusTres}>
                    <div className={styles.pd_contenedorEstatusTres}>
                      <div className={styles.pd_contEstatusTres}>
                        <div className={styles.pd_iconoError}></div>
                        <div className={styles.pd_textoBotonError}>
                          Error al dispersar
                        </div>
                      </div>
                      <div className={styles.pd_textoBotonErrorDos}>
                        Intentar nuevamente
                      </div>
                    </div>
                    <div className={styles.pd_botonInternoDispersar}>
                      <div className={styles.pd_iconoIntentar}></div>
                    </div>
                  </div>
                  : null
                  }
                  {(index == 3)?
                    <div className={`${styles.pd_botonEstatus} ${styles.pd_botonEstatusCuatro}`}>
                    <div className={styles.pd_textoBotonEstatusCuatro}>
                      Finalizado
                    </div>
                      <div className={styles.pd_iconoEstatusCuatro}></div>
                    </div>
                  : null
                  }
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
      <div>
        <div className={styles.pd_contenedorBarraEstado}>
          <div className={styles.pd_barraEstado} >
            <div className={styles.pd_contenedorRegreso}
            onClick={() => history.push(`/InitSettlement/${id}/${tab}`)}
            >
               <div className={styles.pd_botonRegreso}></div>
              <div>Regresar a "Calcular"</div>
            </div>
              <button className={styles.pd_botonSalir}
                onClick={() => history.push(`/payroll`)}
              >
                Salir
              </button>
          </div>
        </div>
      </div>
      <div className={styles.pd_contenedorBarraDispersando}>
        <ProgressBar valor={50}/>
      </div>
    </div>

    </>
  );
};

export default SettlementTimbrar;
