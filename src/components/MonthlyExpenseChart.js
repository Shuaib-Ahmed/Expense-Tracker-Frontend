import React, { useEffect, useState } from "react";
import styles from "./css/displaychart.module.css";

import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { defaultMonthlyChartData, BaseApiUrl, year, month } from "../static";

import { Area2D } from "./charts";

const MonthlyExpenseChart = () => {
  const currentDate = month > 10 ? `${year}-${month}` : `${year}-0${month}`;

  const { user } = useAuth0();
  const [input, setInput] = useState(currentDate);
  const [chartData, setChartData] = useState([]);

  const getMonthlyData = async () => {
    const year = input.substring(0, 4);
    const month = input.substring(5);
    const { data } = await axios.get(
      `${BaseApiUrl}/${user.email}/month/?year=${year}&month=${month}`
    );
    const res = formatData(data);
    setChartData(res);
  };

  const changeHandler = (event) => {
    setInput(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    getMonthlyData();
  };

  const formatData = (data) => {
    // {"01": total, "02": total, .....}
    const result1 = data.reduce((prev, current) => {
      const day = current.expense_date.substring(8, 10);
      if (!prev[day]) {
        prev[day] = Number(current.expense_total);
      } else {
        prev[day] = prev[day] + Number(current.expense_total);
      }
      return prev;
    }, {});

    // fomat date for charts
    const result2 = [];
    for (const key in result1) {
      result2.push({ label: key, value: result1[key] });
    }

    result2.sort((a, b) => Number(a.label) - Number(b.label));

    return result2.length ? result2 : defaultMonthlyChartData;
  };

  useEffect(() => {
    getMonthlyData();
  }, []);

  return (
    <section className={styles.chartContainer}>
      <form className={styles.chartHeader} onSubmit={submitHandler}>
        <h3>Current Month And Year : </h3>
        <input
          type="month"
          onChange={changeHandler}
          defaultValue={input}
          required
        />
        <button type="submit" className="dark-btn">
          Fetch
        </button>
      </form>
      <Area2D data={chartData} />
    </section>
  );
};

export default MonthlyExpenseChart;
