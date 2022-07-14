import { useQuery } from "@apollo/client";
import style from "../../screens/BitsScreen.module.css";
import moment from "moment";
import { GET_ALL_USERS_COLLABORATOR } from "../../Querys/querys";
import CircularProgressBar from "./CircularProgressBar";
import { useEffect, useState } from "react";

const CarouselSlideItem = ({
  lengthitem = 0,
  pos = 0,
  idx = 0,
  activeIdx = 0,
}) => {
  const [_items, setState] = useState<any[]>([]);
  const resultColaboladores = useQuery(GET_ALL_USERS_COLLABORATOR);
  const dataColaboladores =
    resultColaboladores.data?.GET_ALL_USERS_COLLABORATOR;
  const [styleDiv, setStyleDiv] = useState({ display: "none" });
  const [showC, setShow] = useState(false);
  const [seleccionados, setSeleccionados] = useState<any[]>([]);
  const Hoy = moment();
  const DiasMenos = Hoy.subtract(15, "days");

  useEffect(() => {
    const filtro = dataColaboladores?.filter(
        (lis: { dateContractDate: string }) =>
          moment(lis?.dateContractDate) > DiasMenos
      );
    setSeleccionados([filtro]); 
    console.log(seleccionados);
  }, []);

  const slideWidth = 30;
  const length = lengthitem;

  const createItem = (position: number, idx: number) => {
    const startDay = moment().format("YYYY-MM-DD");

    let fechaProxima = new Date(seleccionados[idx]?.dateContractDate);
    let fechaCalculo = moment(fechaProxima).format("YYYY-MM-DD");

    let diff = findDayDifference(fechaCalculo, startDay);

    let progreso = (diff / 15) * 100;

    const item = {
      styles: {
        transform: `translateX(${position * slideWidth}rem)`,
      },
      player: seleccionados[idx],
      datavalues: {
        numberday: diff,
        percentage: progreso,
      },
    };

    switch (position) {
      case length - 1:
      case length + 1:
        item.styles = { ...item.styles };
        break;
      case length:
        break;
      default:
        item.styles = { ...item.styles };
        break;
    }
    console.log("item" , item?.player,item?.player?.bussinesName);
    return item;
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

  const item = createItem(pos, idx);

  return (
    <>
      {showC ? (
        <div className={style.detalleColaboladores} style={style}>
          {seleccionados.map((lis: any) => (
            <>
              <span className={style.textognral}>{lis.bussinesName}</span>
              <span className={style.textognralmingray}>
                {item?.datavalues?.numberday}
              </span>
            </>
          ))}
        </div>
      ) : (
        ""
      )}

   {/*className={style.carousel__slide_item}*/}
   
      <li  style={item.styles}>
        {seleccionados?.length === 1 ? (
          <>
            <div className={style.espaciotexto}>
              <span className={style.textognral}>El contrato de</span>
            </div>
            <div className={style.espaciotexto}>
              <span className={`${style.textognral} ${style.espaciotexto}`}>
                <b>{item?.player?.bussinesName}</b>
              </span>
            </div>
            <div>
              <span className={style.textognralmayor}>Vence pronto</span>
            </div>
            <CircularProgressBar
              strokeWidth={12}
              percentage={item?.datavalues?.percentage}
              numberday={item?.datavalues?.numberday}
            />
            <button className={style.boton} type="button">
              <span className={style.textoAgregar}>Ir a renovar</span>
              <span className={style.iconoAgregar}>
                <img src="/assets/svg/direc.svg" />
              </span>
            </button>
          </>
        ) : (
          <>
            <div className={style.espaciotexto}>
              <span className={style.textognral}>El contrato de</span>
            </div>
            <div className={style.espaciotexto}>
              <span className={`${style.textognral} ${style.espaciotexto}`}>
                <b>{item?.player?.total}</b>
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
          </>
        )}
      </li>
    </>
  );
};

export default CarouselSlideItem;
