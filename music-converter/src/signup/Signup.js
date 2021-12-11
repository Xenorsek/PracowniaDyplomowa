import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import i18n from "../i18n/i18n";
import { Translation } from 'react-i18next';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, isPending, error, setError } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(displayName === "" || displayName.length < 5 || displayName == null){
      setError("displayName can't be empty or less than 5 characters")
    }
    else{
      signup(email, password, displayName)
    }
  };
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <Translation>{(t,{i18n})=><h2>{i18n.t('Login2.0.Signup')}</h2>}</Translation>
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
        <label>
        <Translation>{(t,{i18n})=><span>{i18n.t('Login2.4.DisplayName')}: </span>}</Translation>
          <input
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        {!isPending &&<button className="btn"><Translation>{(t,{i18n})=><>{i18n.t('Login2.0.Signup')}</>}</Translation></button>}
        {isPending && <button className="btn" disabled>loading</button>}
        {error && <p>{error}</p>}
      </label>
    </form>
  );
}
