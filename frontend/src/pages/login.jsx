import { useState, useEffect } from "react";


function Login({setLogin}) {
  async function getData(body) {
    const data = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await data.json();
    setLogin(response.token, response.user)
    return response;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      username: e.target[0].value,
      password: e.target[1].value
    };
    getData(body);
  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: <input name="username" />
        </label>
        <label htmlFor="password">Password: 
        <input name="password" />
        </label>
        <input type="submit" value="Login" />
      </form>
    </>
  );
}

export default Login;
