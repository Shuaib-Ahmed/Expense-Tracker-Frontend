import React, { useState } from "react";
import styles from "./css/expenseform.module.css";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BaseApiUrl, expenseType, initialFormValues } from "../static";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateExpenseForm = () => {
  toast.configure();
  const { user } = useAuth0();
  const [expenseDetails, setExpenseDetails] = useState(initialFormValues);

  const changeHandler = (e) => {
    setExpenseDetails((prevDetails) => {
      return { ...prevDetails, [e.target.id]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BaseApiUrl}/${user.email}`, {
        expenseDetails,
      });
      setExpenseDetails(initialFormValues);
      toast.success("Successfully Created", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error(`Somthing went wrong please try again`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <section className={styles.createExpenseFormContainer}>
      <header>
        <h1>Craete New Expense</h1>
      </header>
      <form onSubmit={submitHandler}>
        {/* Expense name */}
        <div className={styles.label_input_container}>
          <label htmlFor="expense_name">Expense Name</label>
          <input
            type="text"
            name="expense_name"
            id="expense_name"
            placeholder="Enter Expense Name"
            value={expenseDetails.expense_name}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Expense Total */}
        <div className={styles.label_input_container}>
          <label htmlFor="expense_total">Expense Total</label>
          <input
            type="number"
            name="expense_total"
            id="expense_total"
            placeholder="Enter Total Expense"
            value={expenseDetails.expense_total}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Expense Date */}
        <div className={styles.label_input_container}>
          <label htmlFor="expense_date">Expense Date</label>
          <input
            type="date"
            name="expense_date"
            id="expense_date"
            value={expenseDetails.expense_date}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Expense Type */}
        <div className={styles.label_input_container}>
          <label htmlFor="expense_type">Expense Type</label>
          <select
            name="expense_type"
            id="expense_type"
            value={expenseDetails.expense_type}
            onChange={changeHandler}
            required
          >
            {expenseType.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Expense Discription */}
        <div className={styles.label_textarea_container}>
          <label htmlFor="expense_description">
            Expense Description - Optional
          </label>
          <textarea
            name="expense_description"
            id="expense_description"
            placeholder="Enter Expense Description"
            value={expenseDetails.expense_description}
            onChange={changeHandler}
          ></textarea>
        </div>

        <div className="button-container">
          <button type="submit" className="blue-btn">
            Create
          </button>
          <Link className="linkBtn red-btn" to="/">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default CreateExpenseForm;
