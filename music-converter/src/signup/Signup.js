import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

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
      <h2>Signup</h2>
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
        <label>
          <span>display name: </span>
          <input
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        {!isPending &&<button className="btn">Sign up</button>}
        {isPending && <button className="btn" disabled>loading</button>}
        {error && <p>{error}</p>}
      </label>
    </form>
  );
}
