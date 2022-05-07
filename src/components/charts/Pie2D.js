import React from "react";

import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";

import Chart from "fusioncharts/fusioncharts.charts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "pie2D",
    width: "90%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Monthly Expense, Category Wise",
        use3DLighting: "0",
        showPercentValues: "1",
        decimals: "1",
        useDataPlotColorForLabels: "1",
        theme: "fusion",
      },
      data: data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
