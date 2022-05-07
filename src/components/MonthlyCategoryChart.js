import React, { useEffect, useState } from "react";
import styles from "./css/displaychart.module.css";

import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { BaseApiUrl, year, month } from "../static";

import { Pie2D } from "./charts";

const MonthlyCategoryChart = () => {
  const currentDate = month > 10 ? `${year}-${month}` : `${year}-0${month}`;

  const { user } = useAuth0();
  const [input, setInput] = useState(currentDate);
  const [chartData, setChartData] = useState([]);

  const formatData = (data) => {
    // {rent: 900, loan: 5000 ......}
    const result1 = data.reduce((prev, current) => {
      const type = current.expense_type;
      if (!prev[type]) {
        prev[type] = Number(current.expense_total);
      } else {
        prev[type] = prev[type] + Number(current.expense_total);
      }
      return prev;
    }, {});

    // fomat date for charts
    const result2 = [];
    for (const key in result1) {
      result2.push({ label: key, value: result1[key] });
    }

    return result2.length ? result2 : [];
  };

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
      <Pie2D data={chartData} />
    </section>
  );
};

export default MonthlyCategoryChart;
