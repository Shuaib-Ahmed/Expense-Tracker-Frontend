import React, { useState, useEffect } from "react";
import styles from "./css/displaychart.module.css";

import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { BaseApiUrl, defaultYearlyChartData } from "../static";

import { Column2D } from "./charts";

const YearlyExpenseChart = () => {
  const currentYear = new Date().getFullYear();
  const [input, setInput] = useState(currentYear);
  const [chartData, setChartData] = useState([]);
  const { user } = useAuth0();

  const getYearlyData = async () => {
    const { data } = await axios.get(
      `${BaseApiUrl}/${user.email}/year/?year=${input}`
    );
    const res = formatData(data);
    setChartData(res);
  };

  const changeHandler = (event) => {
    setInput(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    getYearlyData();
  };

  const formatData = (data) => {
    // {"01": total, "02": total, .....}
    const result1 = data.reduce((prev, current) => {
      const month = current.expense_date.substring(5, 7);
      if (!prev[month]) {
        prev[month] = Number(current.expense_total);
      } else {
        prev[month] = prev[month] + Number(current.expense_total);
      }
      return prev;
    }, {});

    // fomat date for charts
    let result2 = [];
    for (const key in result1) {
      result2.push({
        label: key,
        value: result1[key],
      });
    }

    // sort
    result2.sort((a, b) => Number(a.label) - Number(b.label));

    // label from 01 to Jan
    result2 = result2.map((item) => ({
      ...item,
      label: defaultYearlyChartData[Number(item.label)-1].label,
    }));

    return result2.length ? result2 : defaultYearlyChartData;
  };

  useEffect(() => {
    getYearlyData();
  }, []);

  return (
    <section className={styles.chartContainer}>
      <form className={styles.chartHeader} onSubmit={submitHandler}>
        <h3>Current Year : </h3>
        <input
          type="number"
          defaultValue={input}
          min="2000"
          max="2050"
          required
          onChange={changeHandler}
        />
        <button type="submit" className="dark-btn">
          Fetch
        </button>
      </form>
      <Column2D data={chartData} />
    </section>
  );
};

export default YearlyExpenseChart;
