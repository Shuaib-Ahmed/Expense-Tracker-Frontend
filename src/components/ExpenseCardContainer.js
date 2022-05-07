import React, { useEffect, useContext } from "react";
import style from "./css/expensecardcontainer.module.css";

import { Link } from "react-router-dom";

import { MainContext } from "../context/MainContext";
import ExpenseCard from "./ExpenseCard";

const ExpenseCardContainer = () => {
  const {
    expenses,
    getAllExpense,
    filterData,
    setFilter,
    getExpenseByFilter,
    filterError,
  } = useContext(MainContext);

  const changeHandler = (e) => {
    const data = { ...filterData, [e.target.id]: e.target.value };
    setFilter(data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    getExpenseByFilter();
  };

  const clearFilters = () => {
    getAllExpense();
  };

  useEffect(async () => {
    filterData.start_date === "" && filterData.end_date === ""
      ? getAllExpense()
      : getExpenseByFilter();
  }, []);

  return (
    <>
      <form className={style.formContainer} onSubmit={submitHandler}>
        <h3>Fliter</h3>
        <label htmlFor="start_date">From :</label>
        <input
          type="date"
          id="start_date"
          onChange={changeHandler}
          value={filterData.start_date}
          required
        />
        <label htmlFor="end_date">To :</label>
        <input
          type="date"
          id="end_date"
          onChange={changeHandler}
          value={filterData.end_date}
          required
        />
        <button type="submit" className="dark-btn">
          Apply
        </button>
        <button className="red-btn" onClick={clearFilters}>
          Clear
        </button>
      </form>

      {filterError && (
        <div className="noExpenseContainer">
          <h3>
            No Expense Exist From : {filterData.start_date} To :
            {filterData.end_date}
          </h3>
        </div>
      )}

      {/* if no expense exist */}
      {!expenses.length && !filterError && (
        <div className="noExpenseContainer">
          <h1>No expense exist please create one</h1>
          <Link to="/create-expense" className="linkBtn blue-btn">
            Create Expense
          </Link>
        </div>
      )}

      <section className={style.expenseCardContainer}>
        {expenses.length &&
          expenses.map((expenseDetail) => (
            <ExpenseCard key={expenseDetail._id} detail={expenseDetail} />
          ))}
      </section>
    </>
  );
};

export default ExpenseCardContainer;
