import React from "react";

import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";

import Chart from "fusioncharts/fusioncharts.charts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.umber";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);


const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "area2d", 
    width: "90%", 
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Daily Expense, Monthly Wise",
        xAxisName: "Days",
        yAxisName: "Expenses (In Rs.)",
        numberSuffix: "",
        theme: "umber",
        outCnvBaseFontSize: 10,
      },
      data: data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
