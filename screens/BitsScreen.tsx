import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import BarChartData from "../components/Dashboard/BarChart";

import "../components/Dashboard/Dashboard.css";
import PieChart from "../components/Dashboard/PieChart";
import WelcomeUser from "../components/Dashboard/WelcomeUser";
import { AdminContext } from "../context/AdminContext/AdminContext";
import AdministratrosContext from "../context/AdministratorsContext/AdministratorsContext";
import stylesPayrroll from "../../src/components/Payroll/PayrollStyles.module.css";
import {
  GET_ALL_FECHAS,
  GET_ALL_PAYROLL_ACTIVE,
  GET_ALL_USERS_COLLABORATOR,
  GET_COUNT_COMMENT,
  GET_PAYROLL_DAY,
  GET_USER_CONTRACT_CAL,
  GET_USER_TEAM,
} from "../Querys/querys";
import { getMyMood } from "../services/mymoodService";
import style from "./BitsScreen.module.css";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import Progress from "../components/Dashboard/ProgressDashborad";
import Carousel from "../components/Dashboard/CarouselElement";
import CircularProgressBar from "../components/Dashboard/CircularProgressBar";
import {
  createincidenciaModal,
  clearPayrollProcess,
} from "../context/PayrollProcess/Actions";
import PayrollProcessContext from "../context/PayrollProcess/PayrollProcessContext";
import { Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const BitsScreen = () => {
  localStorage.setItem("currentModule", "Dashboard");

  const { state, dispatch } = useContext(AdministratrosContext);
  const resultDias = useQuery(GET_PAYROLL_DAY);
  const dataDias = resultDias.data?.GET_PAYROLL_DAY;
  const resultTeam = useQuery(GET_USER_TEAM);
  const resultallTeam = resultTeam.data?.GET_USER_TEAM;
  const [showC, setShow] = useState(false);
  const startDay = moment().format("YYYY-MM-DD");

  const resultFechas = useQuery(GET_ALL_FECHAS);
  const resultallFechas = resultFechas.data?.GET_ALL_FECHAS;
  const dataHoy = resultallFechas?.filter((lis: { fechaInicio: any }) =>
    lis?.fechaInicio.includes(startDay)
  );
  const dataMes = resultallFechas?.filter(
    (lis: { fechaInicio: any }) => !lis?.fechaInicio.includes(startDay)
  );

  const resultnomina = useQuery(GET_ALL_PAYROLL_ACTIVE);
  const datanomina = resultnomina.data?.GET_ALL_PAYROLL_ACTIVE;

  const resultColaboladores = useQuery(GET_USER_CONTRACT_CAL);
  const dataContratos = resultColaboladores.data?.GET_USER_CONTRACT_CAL;
  const { state: payrollState, dispatch: payrollDispatch } = useContext(
    PayrollProcessContext
  );
  const createModal = (id: any) => {
    createincidenciaModal({ _id: id, createIncidencia: true }, payrollDispatch);
  };

  const [totalColaboladores, setTotalColaboladores] = useState(0);
  const resultMood = useQuery(GET_COUNT_COMMENT);
  const data = resultMood.data?.GET_COUNT_COMMENT;
  console.log('datos', data)
  const [total, setTotal] = useState(0);
  const [totalDias, setTotalDias] = useState(0);
  const [done, setDone] = useState(0);
  const [listaPorcent, setlistaPorcent] = useState<any[]>([]);
  const porcents: any[] = [];
  const history = useHistory();
  const handleActiveModule = (name: string) => {
    localStorage.setItem("currentModule", String(name));
  };
  
  useEffect(() => {
    actualizaTotal();

    return () => {
      actualizaTotal();
    };
  }, []);

  const actualizaTotal = () => {
    setTotalColaboladores(dataContratos?.[0].UsuarioTotal);
    let arrayTotales = data?.map((lis: any) => lis.value);
    const suma = (acc: any, curr: any) => acc + curr;
    setTotal(arrayTotales?.reduce(suma));

    data?.map((lis: any) =>
      porcents?.push({
        porcent: parseFloat(((lis.value / total) * 100).toString()).toFixed(2),
        name: lis.name,
      })
    );
    setlistaPorcent(porcents);

    let fechaProxima = new Date();
    let fechaCalculo = "";

    if (dataDias !== undefined) {
      fechaProxima = new Date(dataDias[0]?.init_date);
      fechaCalculo = moment(fechaProxima).format("YYYY-MM-DD");
      let diff = findDayDifference(startDay, fechaCalculo);
      setTotalDias(diff);
      let progreso = (diff / 15) * 100;
      setDone(progreso);

     
    }
  };

  function findDayDifference(date1: any, date2: any) {
    // always round down
    let date11 = new Date(date1);
    let date22 = new Date(date2);

    // To calculate the time difference of two dates
    let Difference_In_Time = date22.getTime() - date11.getTime();

    // To calculate the no. of days between two dates
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  }

  return (
    <>
      {/* Cambiar a Admin */}
      <div className={style.principal}>
        <div>
          <div className={style.botonesAction}>
            <WelcomeUser />
            <button
              onClick={() => createModal(1)}
              className={style.botonaction}
              type="button"
            >
              <span className={style.iconoAgregar}>+</span>
              <span className={style.textoAgregar}> Agregar incidencias</span>
            </button>
            <button className={style.botonaction} type="button">
              <span className={style.iconoAgregar}>
                <EditIcon />
              </span>
              <span className={style.textoAgregar}>Editar dashboard</span>
            </button>
          </div>
        </div>

        <div className={style.wrapper}>
          <div className={style.divazul}>
            <span className={style.textognral}>Hoy es</span>
            <br></br>
            <span className={style.textognralmayor}>
              {moment().format("LLLL")}
            </span>
          </div>
          <div className={style.wrappertwo}>
            <div className={style.detalleSup}>
              <div className={style.divSupBorder}>
                <div className={style.center}>
                  <span className={style.textognralmayor}>{totalDias}</span>
                  <span className={style.textognral}>
                    &nbsp; d??as para la siguiente n??mina
                  </span>
                </div>

                <div className={style.center}>
                  <Progress done={done} />
                </div>
              </div>
              <div>
                <div className={style.center}>
                  <span className={style.textognralmayor}>
                    {totalColaboladores}
                  </span>
                  <span className={style.textognral}>
                    &nbsp; Colaboradores activos
                  </span>
                </div>
                <div className={style.center}>
                  <img
                    className={style.usr}
                    src="/assets/svg/grupo_usr.svg"
                    alt="Grupo"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={style.divContratos}>
            {dataContratos?.length === 0 ? (
              <div className={style.center}>
                <div>
                  <span className={style.iconoContrato}>
                    <img src="/assets/svg/check_contr.svg" />
                  </span>
                  <br></br>
                  <br></br>
                  <span className={style.textognral}>
                    No hay ning??n contrato cerca de vencer
                  </span>
                </div>
              </div>
            ) : null}
            {dataContratos?.length === 1 ? (
              <>
                <div>
                  <div className={style.espaciotexto}>
                    <span className={style.textognral}>El contrato de</span>
                  </div>
                  <div className={style.espaciotexto}>
                    <span
                      className={`${style.textognral} ${style.espaciotexto}`}
                    >
                      <b>{dataContratos?.[0].bussinesName}</b>
                    </span>
                  </div>
                  <div>
                    <span className={style.textognralmayor}>Vence pronto</span>
                  </div>
                  <CircularProgressBar
                    strokeWidth={12}
                    percentage={dataContratos?.[0].percentage}
                    numberday={dataContratos?.[0].numberday}
                  />
                  <button onClick={() => history.push(`/colaboradores/${dataContratos?.[0].id}/1`)} className={style.boton} type="button">
                    <span className={style.textoAgregar}>
                      Ir a renovar &nbsp;{" "}
                    </span>
                    <span className={style.iconoAgregar}>
                      <img src="/assets/svg/direc.svg" />
                    </span>
                  </button>
                </div>
              </>
            ) : null}

            {dataContratos?.length > 1 ? (
              <>
                <div>
                  <br></br> <br></br>
                  <div className={style.espaciotexto}>
                    <span className={style.textognral}>El contrato de</span>
                  </div>
                  <div className={style.espaciotexto}>
                    <span
                      className={`${style.textognral} ${style.espaciotexto}`}
                    >
                      <b>{dataContratos?.length}</b>
                    </span>
                    <span className={style.textognral}>colaboladores</span>
                  </div>
                  <div className={style.espaciotexto}>
                    <span className={style.textognralmayor}>Vence pronto</span>
                  </div>
                  <div className={style.semaforo}>
                    <div className={style.semaforo_1}></div>
                    <div className={style.semaforo_2}></div>
                    <div className={style.semaforo_3}></div>
                  </div>
                  <button
                    onClick={() => {
                      setShow(!showC);
                    }}
                    className={style.boton}
                    type="button"
                  >
                    <span className={style.textoAgregarDetalle}>Detalle</span>
                  </button>
                  {showC ? (
                    <div className={style.detalleColaboladores} style={style}>
                      {dataContratos.map((lis: any) => (
                        <>
                          <div>
                            <br></br>
                            <div>
                              <span className={style.textognral}>
                                {lis.bussinesName}
                              </span>
                            </div>

                            <span className={style.textognralmingray}>
                              Vence dentro de {lis.numberday} d??as
                            </span>
                          </div>
                        </>
                      ))}
                      <br></br>
                      <button onClick={() => history.push(`/collaborators/id/0`)} className={style.boton} type="button">
                        <span className={style.textoAgregar}>
                          Ir a renovar &nbsp;
                        </span>
                        <span className={style.iconoAgregar}>
                          <img src="/assets/svg/direc.svg" />
                        </span>
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : null}
          </div>

          <div className={style.div}>
            <span className={style.textognralmayor}>My mood</span>
            <div className={style.divGrafica}>
              <div>
                <PieChart />
              </div>
              <div>
                <br></br>
                <div className={style.moods}>
                  <div className={style.mood1}></div>
                  <div className={style.texxt}>
                    <span className={style.textognralmin}>Motivados</span>
                  </div>
                  <div>
                    <span className={style.textognralmingray}>
                    {(data === undefined || data?.length === 0) ? '0%' : data[0]?.percentaje + '%'}
                    </span>
                  </div>
                </div>

                <div className={style.moods}>
                  <div className={style.mood2}></div>
                  <div className={style.texxt}>
                    <span className={style.textognralmin}>Productivos</span>
                  </div>
                  <div>
                    <span className={style.textognralmingray}>
                    {(data === undefined || data?.length === 0) ? '0%' : data[1]?.percentaje + '%'}
                    </span>
                  </div>
                </div>

                <div className={style.moods}>
                  <div className={style.mood3}></div>
                  <div className={style.texxt}>
                    <span className={style.textognralmin}>Aburridos</span>
                  </div>
                  <div>
                    <span className={style.textognralmingray}>
                    {(data === undefined || data?.length === 0) ? '0%' : data[2]?.percentaje + '%'}
                    </span>
                  </div>
                </div>

                <div className={style.moods}>
                  <div className={style.mood4}></div>
                  <div className={style.texxt}>
                    <span className={style.textognralmin}>Presionados</span>{" "}
                  </div>
                  <div>
                    <span className={style.textognralmingray}>
                    {(data === undefined || data?.length === 0) ? '0%' : data[3]?.percentaje + '%'}
                    </span>{" "}
                  </div>
                </div>

                <div className={style.moods}>
                  <div className={style.mood5}></div>
                  <div className={style.texxt}>
                    <span className={style.textognralmin}>Enfadados</span>{" "}
                  </div>
                  <div>
                    <span className={style.textognralmingray}>
                    {(data === undefined || data?.length === 0) ? '0%' : data[4]?.percentaje + '%'}
                    </span>{" "}
                  </div>
                </div>
              </div>
              <div className={style.moodsGrafica}>
                <span className={style.textognralmingray}>??ltimos 15 d??as</span>
                <BarChartData mood_type="Motivado" color="#367EEA" />
                <BarChartData mood_type="Productivo" color="#42DBBE" />
                <BarChartData mood_type="Aburrido" color="#9C54E5" />
                <BarChartData mood_type="Presionado" color="#FEC104" />
                <BarChartData mood_type="Enfadado" color="#FB337B" />
              </div>
            </div>
          </div>

          <div
            className={
              dataHoy?.length > 0 ? style.divFelicitar : style.divContratos
            }
          >
            <div className={style.center}>
              {dataHoy?.length > 0 ? (
                <div>
                  <span className={style.textognralmayor}>Eventos Hoy</span>
                  {dataHoy?.map((lis: any) => (
                    <div key={lis.id} className={style.detalle}>
                      <div className={style.detallegrupor}>
                        <img
                          className={
                            lis.tipo == "Cumplea??os"
                              ? style.detallegruporm
                              : style.detallegruporv
                          }
                          src={
                            state.Permisos?.img
                              ? state.Permisos?.img
                              : "/assets/svg/user-avatar.svg"
                          }
                          alt="img"
                        />
                      </div>
                      <div className={style.detallegrupo}>
                        <div>
                          <span className={style.textognralmin}>
                            {lis.titulo}
                          </span>
                        </div>
                        <div>
                          <span
                            className={
                              lis.tipo == "Cumplea??os"
                                ? style.aniversario
                                : style.cumple
                            }
                          >
                            {lis.tipo}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className={style.buttonFelicitarPosicion}>
                  <Link href={`/calendar`} target="_blank">
                    <button className={style.boton} type="button">
                      <span className={style.iconoAgregar}>
                        <img src="/assets/svg/cake.svg" alt="Cumplea??os" />
                      </span>
                      <span className={style.textoAgregar}>Felicitar</span>
                    </button>
                  </Link>
                  </div>
                
                 
                </div>
              ) : (
                <div>
                  <span className={style.iconoContrato}>
                    <img src="/assets/svg/celebration.svg" />
                  </span>
                  <br></br>
                  <br></br>
                  <span className={style.textognral}>
                    No hay ning??n evento el d??a de hoy
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className={style.div}>
            <div>
              <span className={style.textognralmayor}>My team</span>
            </div>
            {resultallTeam?.map((lis: any) => (
              <div key={lis.id} className={style.detalle}>
                <div className={style.detallegrupor}>
                  <img
                    className={style.detallegrupora}
                    src={
                      state.Permisos?.img
                        ? state.Permisos?.img
                        : "/assets/svg/user-avatar.svg"
                    }
                    alt="img"
                  />
                </div>
                <div className={style.myteam}>
                  <span className={style.textognralmin}>
                    {lis.bussinesName}
                  </span>
                  <br></br>
                  <span className={style.textognralmingray}>{lis.email}</span>
                  <br></br>
                  <span className={style.textognralmingray}>
                    {lis.cellphone}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div
            className={datanomina?.length > 0 ? style.div : style.divContratos}
          >
            {datanomina?.length > 0 ? (
              <div>
                <span className={style.textognralmayor}>
                  Estatus de pre-n??mina
                </span>

                <br></br>
                <br></br>
                <div className={style.divscrollcon}>
                  {datanomina?.map((lis: any) => (
                    <div key={lis.id} className={style.estatuspre}>
                      <span className={style.textognral}>{lis.group_name}</span>

                      {lis.statusProgress === "Calcular" ? (
                        <div>
                          <span className={style.textognralmingray}>
                            {lis.statusProgress}
                          </span>
                          <br></br>
                          <div className={style.pc_contenedorIconoSeguimiento}>
                            <div className={stylesPayrroll.pc_circuloAmarillo}>
                              <div
                                className={stylesPayrroll.pc_circuloBlanco}
                              ></div>
                            </div>
                            <div
                              className={stylesPayrroll.pc_lineaSeguimiento}
                            ></div>
                            <div
                              className={stylesPayrroll.pc_circuloGris}
                            ></div>
                            <div
                              className={stylesPayrroll.pc_lineaSeguimiento}
                            ></div>
                            <div
                              className={stylesPayrroll.pc_circuloGris}
                            ></div>
                          </div>
                        </div>
                      ) : null}
                      {lis.statusProgress === "Dispersar" ? (
                        <div>
                          <span className={style.textognralmingray}>
                            {lis.statusProgress}
                          </span>
                          <br></br>
                          <div className={style.pc_contenedorIconoSeguimiento}>
                            <div className={stylesPayrroll.pc_circuloAmarillo}>
                              <div
                                className={stylesPayrroll.pd_iconoCompleto}
                              ></div>
                            </div>
                            <div
                              className={
                                stylesPayrroll.pc_lineaSeguimientoCompleto
                              }
                            ></div>
                            <div className={stylesPayrroll.pc_circuloAmarillo}>
                              <div
                                className={stylesPayrroll.pc_circuloBlanco}
                              ></div>
                            </div>
                            <div
                              className={stylesPayrroll.pc_lineaSeguimiento}
                            ></div>
                            <div
                              className={stylesPayrroll.pc_circuloGris}
                            ></div>
                          </div>
                        </div>
                      ) : null}
                      {lis.statusProgress === "Timbrar" ? (
                        <div>
                          <span className={style.textognralmingray}>
                            {lis.statusProgress}
                          </span>
                          <br></br>
                          <div className={style.pc_contenedorIconoSeguimiento}>
                            <div className={stylesPayrroll.pc_circuloAmarillo}>
                              <div
                                className={stylesPayrroll.pd_iconoCompleto}
                              ></div>
                            </div>
                            <div
                              className={
                                stylesPayrroll.pc_lineaSeguimientoCompleto
                              }
                            ></div>
                            <div className={stylesPayrroll.pc_circuloAmarillo}>
                              <div
                                className={stylesPayrroll.pd_iconoCompleto}
                              ></div>
                            </div>
                            <div
                              className={
                                stylesPayrroll.pc_lineaSeguimientoCompleto
                              }
                            ></div>
                            <div className={stylesPayrroll.pc_circuloAmarillo}>
                              <div
                                className={stylesPayrroll.pc_circuloBlanco}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {lis.statusProgress === "Terminar" ? (
                        <div className={style.img}>
                          <img src="/assets/svg/finally.svg" />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={style.center}>
                <div>
                  <span className={style.iconoContrato}>
                    <img src="/assets/svg/countnomina.svg" />
                  </span>
                  <br></br>
                  <br></br>
                  <span className={style.textognral}>
                    No hay ning??n proceso de dispersi??n pendiente
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className={style.div}>
            <div>
              <span className={style.textognralmayor}>
                Eventos de {moment().format("MMMM")}
              </span>
            </div>
            <div className={style.divscrollcon}>
              {dataMes?.map((lis: any) => (
                <div key={lis.id} className={style.detalle}>
                  <div className={style.detallegrupor}>
                    <img
                      className={
                        "Cumplea??os" == "Cumplea??os"
                          ? style.detallegruporm
                          : style.detallegruporv
                      }
                      src={
                        state.Permisos?.img
                          ? state.Permisos?.img
                          : "/assets/svg/user-avatar.svg"
                      }
                      alt="img"
                    />
                  </div>
                  <div className={style.detallegrupo}>
                    <div>
                      <span className={style.dia}>
                        {moment(lis.fechaInicio).locale("es").format("dddd") +
                          " " +
                          moment(lis.fechaInicio).locale("es").format("MM")}
                      </span>
                    </div>
                    <div>
                      <span className={style.textognralmin}>{lis.titulo}</span>
                    </div>
                    <div>
                      <span
                        className={
                          lis.tipo == "Cumplea??os"
                            ? style.aniversario
                            : style.cumple
                        }
                      >
                        {lis.tipo}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BitsScreen;
