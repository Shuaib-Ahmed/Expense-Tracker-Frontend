import React, { useEffect, useState } from "react";
import styles from "./css/expenseform.module.css";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BaseApiUrl, expenseType, initialFormValues } from "../static";

const EditExpenseForm = ({ id }) => {
  toast.configure();
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [expenseDetails, setExpenseDetails] = useState(initialFormValues);

  const changeHandler = (e) => {
    setExpenseDetails((prevDetails) => {
      return { ...prevDetails, [e.target.id]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BaseApiUrl}/${user}/${id}`, {
        expenseDetails,
      });

      toast.success("Successfully Updated", {
        position: toast.POSITION.TOP_RIGHT,
      });

      navigate("/all-expense");
    } catch (error) {
      toast.error(`Somthing went wrong please try again`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(async () => {
    try {
      const { data } = await axios.get(`${BaseApiUrl}/${user.email}/${id}`);
      setExpenseDetails(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className={styles.createExpenseFormContainer}>
      <header>
        <h1>Edit Expense</h1>
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
            value={expenseDetails.expense_date.substring(0, 10)}
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
            Update
          </button>
          <Link className="linkBtn red-btn" to="/all-expense">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default EditExpenseForm;
