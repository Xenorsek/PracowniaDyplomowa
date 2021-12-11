import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Profil() {
  const { user } = useAuthContext();
  const [password, setPassword] = useState();
  const [displayName, setDisplayName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [isPending, setPending] = useState();
  const [error, setError] = useState();
  const [isCancelled, setIsCancelled] = useState(false);

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    setPending(true);
    if (user.email !== email) {
      try {
        user
          .updateEmail(email)
          .then(() => {
            console.log("Update email successful");
            setPending(false);
          })
          .catch((error) => {
            console.log(error.message);
            setError(error.message);
            setPending(false);
          });
      } catch (err) {
        if (!isCancelled) {
          console.log(err.message);
          setError(err.message);
          setPending(false);
        }
      }
    } else {
      console.log("new email can't be previous email");
      setPending(false);
    }
  };
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    setPending(true);
    if (user.password !== password) {
      try {
        user
          .updatePassword(password)
          .then(() => {
            console.log("Update password successful");
            setPending(false);
          })
          .catch((error) => {
            console.log(error.message);
            setError(error.message);
            setPending(false);
          });
      } catch (err) {
        if (!isCancelled) {
          console.log(err.message);
          setError(err.message);
          setPending(false);
        }
      }
    } else {
      console.log("new password can't be previous password");
      setPending(false);
    }
  };
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    setPending(true);
    try {
      if (displayName !== user.displayName) {
        user
          .updateProfile({
            displayName: displayName,
          })
          .then(() => {
            console.log("Update displayName successful");
            setPending(false);
          })
          .catch((error) => {
            console.log(error.message);
            setError(error.message);
            setPending(false);
          });
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setPending(false);
      }
    }
  };
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);
  return (
    <>
      <form onSubmit={handleSubmitEmail} className="login-form">
        <label>
          <h2>Profil</h2>
          <span>email: </span>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </label>
        {!isPending && <button className="btn">change email</button>}
        {isPending && (
          <button className="btn" disabled>
            loading
          </button>
        )}
      </form>
      <form onSubmit={handleSubmitPassword}>
        <label>
          <span> new password: </span>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </label>
        {!isPending && <button className="btn">change password</button>}
        {isPending && (
          <button className="btn" disabled>
            loading
          </button>
        )}
      </form>
      <form onSubmit={handleSubmitProfile}>
        <label>
          <span> display name: </span>
          <input
            type="text"
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
            value={displayName}
          />
        </label>
        {!isPending && <button className="btn">change name </button>}
        {isPending && (
          <button className="btn" disabled>
            loading
          </button>
        )}
        {error && <p>{error}</p>}
      </form>
    </>
  );
}
