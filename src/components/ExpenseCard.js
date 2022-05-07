import React, { useContext } from "react";
import style from "./css/expensecard.module.css";

import { Link } from "react-router-dom";
import { MainContext } from "../context/MainContext";

const ExpenseCard = (props) => {
  const { detail } = props;
  const {
    expense_name,
    expense_total,
    expense_date,
    expense_type,
    expense_description,
    _id,
  } = detail;
  const date = expense_date.substring(0, 10);

  const { deleteExpense } = useContext(MainContext);

  return (
    <div className={style.expenseCard}>
      <h3>Expense Details</h3>
      <p>Expense Date : {date}</p>
      <p>Expense Name : {expense_name}</p>
      <p>Expense Total : {expense_total}</p>
      <p>Expense Type: {expense_type}</p>
      <p>Expense Description : {expense_description}</p>
      <div className="button-container">
        <Link className="linkBtn blue-btn" to={`/edit-expense/${_id}`}>
          Edit
        </Link>
        <button className="linkBtn red-btn" onClick={() => deleteExpense(_id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
