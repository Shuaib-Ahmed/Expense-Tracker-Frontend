import React from "react";

import {
  Navbar,
  HeroSection,
  YearlyExpenseChart,
  MonthlyExpenseChart,
  MonthlyCategoryChart,
  Footer
} from "../components";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <YearlyExpenseChart />
      <MonthlyExpenseChart />
      <MonthlyCategoryChart />
      <Footer />
    </>
  );
};

export default Dashboard;
