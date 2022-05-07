import React from "react";

import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";

import Chart from "fusioncharts/fusioncharts.charts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);


const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "column2d", 
    width: "90%", 
    height: "400", 
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Yearly Expenses, Monthly Wise",
        xAxisName: "Month",
        yAxisName: "Expenses (In Rs.)",
        numberSuffix: "",
        theme: "candy",
        outCnvBaseFontSize: 10,
      },
      data: data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
