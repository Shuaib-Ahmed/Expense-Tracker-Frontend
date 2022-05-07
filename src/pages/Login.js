import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import style from "../static/PageCss/login.module.css";

import LoginImage from "../static/images/LoginImage.jpg";

const Login = () => {
  
  const {loginWithRedirect} = useAuth0();

  return (
    <section className={style.container}>
      <img src={LoginImage} alt="image" className={style.img} />
      <article className={style.right}>
        <h1>Welcome</h1>
        <h3>I hope u and your family are in good health</h3>
        <h3>
          In order to use this application u have to sign-in, or if u already
          have an account u need to login
        </h3>
        <button className="blue-btn" onClick={loginWithRedirect}>
          Login In
        </button>
      </article>
    </section>
  );
};

export default Login;
