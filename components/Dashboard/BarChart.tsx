import { useQuery } from "@apollo/client";
import React, { PureComponent, useEffect, useState } from "react";
import { GET_COUNT_COMMENT, GET_COUNT_COMMENT_15 } from "../../Querys/querys";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import style from "../../screens/BitsScreen.module.css";

const BarChartData = ({ mood_type = "", color = "" }) => {
  const resultMood = useQuery(GET_COUNT_COMMENT_15);
  const resultAllMood: any[] | undefined[] = resultMood.data?.GET_COUNT_COMMENT_15;
  const dataGrafica = resultAllMood?.filter((lis) => lis?.name === mood_type);
  const data = resultAllMood?.filter((lis) => lis?.name === mood_type);

  const [respuestasfiltro, setTotal] = useState(0);
  const [totalrespuestas, setContador] = useState(0);
  const [porcent, setPorcent] = useState("");
  useEffect(() => {
    actualizaTotales();

    return () => {
      actualizaTotales();
    };
  }, []);

  const actualizaTotales = () => {
    if(resultAllMood === undefined || dataGrafica === undefined){
      setPorcent("0")
    }else{
      let arrayCount = resultAllMood?.map((lis: any) => lis.value);
      const count = (acc: any, curr: any) => acc +curr;
      setContador(arrayCount?.reduce(count));
  
      let arrayTotales = dataGrafica?.map((lis: any) => lis.value);
      const seleccionados = (acc: any, curr: any) => acc +curr;
      setTotal(arrayTotales?.reduce(seleccionados));
      let porcentaje = parseFloat(
        ((respuestasfiltro / totalrespuestas) * 100).toString()
      ).toFixed(2);
      setPorcent(porcentaje);
    }
  };

  const startDay = moment().subtract(15, "day");
  const endDay = moment();
  const day = startDay.clone().subtract(1, "day");
  const fechas = data?.map((d) => d.fecha);

  while (day.isBefore(endDay, "day")) {
    let dia = day.add(1, "day").clone().format("MM/DD/YY");
    if (!fechas?.includes(dia)) {
      data?.push({
        __typename: "MoodScoreByType15",
        name: mood_type,
        value: 0.1,
        fecha: dia,
      });
    }
  }

  const dataNew: any[] | undefined[] = data?.sort((a, b) => {
    return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
  });
  console.log('dataNew', dataNew)
  
  return (
    <>
      <ResponsiveContainer width={100} height={30}>
        <BarChart data={dataNew}>
          <Bar dataKey="value" fill={color} />
        </BarChart>
      </ResponsiveContainer>
      <div className={style.detallegrupor}>
        <span className={style.textognralmingray}>{porcent +'%'} </span> 
      </div>
    </>
  );
};

export default BarChartData;
