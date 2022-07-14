import { useLazyQuery, useQuery } from "@apollo/client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { GET_ALL_USERS_COLLABORATOR } from "../../Querys/querys";
import style from "../../screens/BitsScreen.module.css";
import CarouselSlideItem from "./CarouselSlideItem";

const Carousel = () => {
  const resultColaboladores = useQuery(GET_ALL_USERS_COLLABORATOR);
  const dataColaboladores =
    resultColaboladores.data?.GET_ALL_USERS_COLLABORATOR;
  const Hoy = moment();
  const DiasMenos = Hoy.subtract(15, "days");

  const filtro = dataColaboladores?.filter(
    (lis: { dateContractDate: string }) =>
      moment(lis?.dateContractDate) > DiasMenos
  );
  const keys = Array.from(Array(filtro?.length).keys());
  const [items, setItems] = useState(keys);
  const [isTicking, setIsTicking] = useState(false);
  const [seleccionados, setSeleccionados] = useState<any[]>([]);
  

  useEffect(() => {
    setSeleccionados([filtro]); 
    setSeleccionados([{ total: filtro?.length }, ...seleccionados]);
    console.log(seleccionados);
  }, []);

  useEffect(() => {
    if (isTicking) sleep(300).then(() => setIsTicking(false));
  }, [isTicking]);

  useEffect(() => {
    setActiveIdx((length - (items[0] % length)) % length) // prettier-ignore
  }, [items]);

  const length = seleccionados?.length;
  const sleep = (ms = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };


  const [activeIdx, setActiveIdx] = useState(0);
  const bigLength = items?.length;

  const prevClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) => {
        return prev.map((_, i) => prev[(i + jump) % bigLength]);
      });
    }
  };

  const nextClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) => {
        return prev.map((_, i) => prev[(i - jump + bigLength) % bigLength]);
      });
    }
  };

  const handleDotClick = (idx: any) => {
    if (idx < activeIdx) prevClick(activeIdx - idx);
    if (idx > activeIdx) nextClick(idx - activeIdx);
  };

 
  return (
    <div> {/*  className={style.carousel__wrap} */}
      <div > {/* className={style.carousel__container} */}
        {/* <button
          className={`${style.carousel__btn} ${style.carousel__btn_arrow_prev}`}
          onClick={() => prevClick()}
        >
          <i
            className={`${style.carousel__btn_arrow} ${style.carousel__btn_arrow_left}`}
          />
        </button>
        className={style.carousel__container}
        */}
        <div >
            {/* className={style.carousel__slide_list} */}
          <ul >
            {items.map((pos, i) => (
              <>
                <CarouselSlideItem
                  lengthitem={length}
                  key={i}
                  idx={i}
                  pos={pos}
                  activeIdx={activeIdx}
                />
              </>
            ))}
          </ul>
        </div>
    
        {/* <button
          onClick={() => nextClick()}
          className={`${style.carousel__btn} ${style.carousel__btn_arrow_prev}`}
        >
          <i
            className={`${style.carousel__btn_arrow} ${style.carousel__btn_arrow_right}`}
          />
        </button> */}
      </div>
    </div>
  );
};

export default Carousel;
