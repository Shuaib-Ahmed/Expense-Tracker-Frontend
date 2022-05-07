import React from "react";
import { useParams } from "react-router-dom";

import { Navbar, EditExpenseForm, Footer } from "../components";

const EditExpense = () => {
  const { id } = useParams();
  return (
    <>
      <Navbar />
      <EditExpenseForm id={id}/>
      <Footer />
    </>
  );
};

export default EditExpense;
