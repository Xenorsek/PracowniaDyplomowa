import React, { useState } from "react";
import { useLogin } from "../hooks/useLogIn";
import { useResetPassword } from "../hooks/useResetPassword";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();
  const [emailToResetPassword, setEmailToResetPassword] = useState("");
  const [ResetPassword, setResetPassword] = useState(false);
  const { resetPassword, message } = useResetPassword()

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
  };

  const handleShowResetPassword = (e) => {
    setResetPassword(!ResetPassword)
  }
  const handleSubmitResetPassword = (e) => {
    e.preventDefault();
    resetPassword(emailToResetPassword)
  }
  return (
    <>
      {!ResetPassword && <>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <label>
            <span>email: </span>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label>
              <span>password: </span>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
            {!isPending && <button className="btn">Login</button>}
            {isPending && <button className="btn" disabled>loading</button>}
            {error && <p>{error}</p>}
          </label>
        </form>
        <button className="btn" onClick={handleShowResetPassword} >Zapomniałeś hasła?</button>
      </>}
      {ResetPassword && (
        <>
          <form onSubmit={handleSubmitResetPassword}>
            <label>
              <h2>Podaj swój adres email</h2>
              <span>email: </span>
              <input type="email"
                onChange={(e) => setEmailToResetPassword(e.target.value)}
                value={emailToResetPassword} />
              {message === "Email sent!" && (<button disabled className="btn">Poszło</button>)}
              {(!message || message !== "Email sent!") && (<button className="btn">Odzyskaj hasło</button>)}
              {message && <p>{message}</p>}
            </label>
          </form>
          <button className="btn" onClick={handleShowResetPassword} >Zaloguj się</button>
        </>
      )}
    </>
  );
}
