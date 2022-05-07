import React from "react";
import heroImg from "../static/images/HeroImage.png";

import style from "./css/herosection.module.css";

import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className={style.container}>
      <img src={heroImg} alt="image" className={style.img} />

      <article className={style.right}>
        <h1>Thanks For Visiting </h1>
        <h3>
          In order to save money u need to keep track of your expenses and this website is all about that.
        </h3>
        <h3>
          U can create a new expense by clicking the create expenses button down below
        </h3>
        <h3>
          We also provide you visual representation of daily, monthly,yearly and Category Wise expenses.
        </h3>
        <div className="button-container">
          <Link className="linkBtn blue-btn" to="/create-expense">
            Create Expense
          </Link>
          <Link className="linkBtn dark-btn" to="/all-expense">
            All Expenses
          </Link>
        </div>
      </article>
    </section>
  );
};

export default HeroSection;
