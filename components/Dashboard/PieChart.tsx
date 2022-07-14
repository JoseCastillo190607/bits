import { useQuery } from "@apollo/client";
import React, { PureComponent, useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { GET_COUNT_COMMENT } from "../../Querys/querys";
import style from "../../screens/BitsScreen.module.css";

const PieChartData = () => {
  const resultMood = useQuery(GET_COUNT_COMMENT);
  const data = resultMood.data?.GET_COUNT_COMMENT;
  const COLORS = ["#9C54E5", "#FB337B", "#367EEA", "#FEC104", "#42DBBE"];
  const [total, setTotal] = useState(0);

  useEffect(() => {
  
    actualizaTotal();

    return () =>{
        actualizaTotal()
    }
  }, []);



  const actualizaTotal = ( ) =>{
  let arrayTotales =  (data?.map((lis:any) =>(lis.value)))
  const suma = (acc:any, curr:any) => acc +curr
  setTotal(arrayTotales?.reduce(suma))
  }

  return (
    <>
      <div className={style.divPieChartPrincipal}>
        <div className={style.divPieChart}>
          <span className={style.textoTotal}>{total}</span>
          <br></br>
          <span className={style.textognral}>Respuesta</span>
        </div>

        <PieChart width={200} height={200}>
          <Pie data={data} innerRadius={60} outerRadius={78} dataKey="value">
            {data?.map((entry: any, index: number) => (
              <Cell
                stroke="none"
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </>
  );
};

export default PieChartData;
