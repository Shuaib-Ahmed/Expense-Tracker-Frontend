import React, { createContext, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BaseApiUrl } from "../static";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValue = {
  expenses: [],
  getAllExpense: () => {},
  filterData: {},
  setFilter: () => {},
  getExpenseByFilter: () => {},
  filterError: false,
  deleteExpense: () => {},
};

const MainContext = createContext(initialValue);

const MainContextProvider = ({ children }) => {
  const initialFilter = {
    start_date: "",
    end_date: "",
  };

  toast.configure();
  const { user } = useAuth0();
  const [expenses, setExpenses] = useState([]);
  const [filterData, setFilterData] = useState(initialFilter);
  const [filterError, setFilterError] = useState(false);

  const setFilter = (data) => setFilterData(data);

  const getAllExpense = async () => {
    setFilterError(false);
    setFilterData(initialFilter);
    const { data } = await axios.get(`${BaseApiUrl}/${user.email}`);
    setExpenses(data);
  };

  const getExpenseByFilter = async () => {
    const { start_date, end_date } = filterData;

    const url = `${BaseApiUrl}/${user.email}/dates/?start_date=${start_date}&end_date=${end_date}`;

    const { data } = await axios.get(url);

    data.sort((a, b) => new Date(a.expense_date) - new Date(b.expense_date));

    data.length ? setFilterError(false) : setFilterError(true);

    setExpenses(data);
  };

  const deleteExpense = async (id) => {
    if (window.confirm("Are u sure u want to delete this ...") === true) {
      await axios.delete(`${BaseApiUrl}/${user}/${id}`);

      toast.success("Successfully Deleted", {
        position: toast.POSITION.TOP_RIGHT,
      });

      filterData.start_date === "" && filterData.end_date === ""
        ? getAllExpense()
        : getExpenseByFilter();
    } else {
      console.log("Do not remove");
    }
  };

  return (
    <MainContext.Provider
      value={{
        expenses,
        getAllExpense,
        filterData,
        setFilter,
        getExpenseByFilter,
        filterError,
        deleteExpense,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
