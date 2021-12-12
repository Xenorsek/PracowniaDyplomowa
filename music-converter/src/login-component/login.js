import React, { useState } from "react";
import { useLogin } from "../hooks/useLogIn";
import { useResetPassword } from "../hooks/useResetPassword";
import { Translation } from 'react-i18next';

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
        <Translation>{(t,{i18n})=><h2>{i18n.t('Login2.1.Login')}</h2>}</Translation>
          <label>
          <Translation>{(t,{i18n})=><span>{i18n.t('Login2.3.Email')}: </span>}</Translation>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label>
            <Translation>{(t,{i18n})=><span>{i18n.t('Login2.2.Password')}: </span>}</Translation>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
            {!isPending && <button className="btn"><Translation>{(t,{i18n})=><>{i18n.t('Login2.1.Login')}</>}</Translation></button>}
            {isPending && <button className="btn" disabled>loading</button>}
            {error && <p>{error}</p>}
          </label>
        </form>
        <button className="btn" onClick={handleShowResetPassword} ><Translation>{(t,{i18n})=><>{i18n.t('Login2.5.ResetPassword')}</>}</Translation></button>
      </>}
      {ResetPassword && (
        <>
          <form onSubmit={handleSubmitResetPassword}>
            <label>
            <Translation>{(t,{i18n})=><h2>{i18n.t('Login2.6.WriteYourEmail')}</h2>}</Translation>
              <Translation>{(t,{i18n})=><span>{i18n.t('Login2.3.Email')}: </span>}</Translation>
              <input type="email"
                onChange={(e) => setEmailToResetPassword(e.target.value)}
                value={emailToResetPassword} />
              {message === "Email sent!" && (<button disabled className="btn"><Translation>{(t,{i18n})=><>{i18n.t('Login2.7.Done')}</>}</Translation></button>)}
              {(!message || message !== "Email sent!") && (<button className="btn"><Translation>{(t,{i18n})=><>{i18n.t('Login2.8.RecoverPassword')}</>}</Translation></button>)}
              {message && <p>{message}</p>}
            </label>
          </form>
          <button className="btn" onClick={handleShowResetPassword} ><Translation>{(t,{i18n})=><>{i18n.t('Login2.1.Login')}</>}</Translation></button>
        </>
      )}
    </>
  );
}
