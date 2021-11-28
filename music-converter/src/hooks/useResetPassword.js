import React, { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
export const useResetPassword = () =>{
    const [message, setMessage] = useState(null);
    const [isCancelled, setIsCancelled] = useState(false);

    const resetPassword = async(email) =>{
        setMessage(null);
        try{
            projectAuth.sendPasswordResetEmail(email).then(()=>{
                setMessage("Email sent!")
            }).catch((error)=>{
                setMessage(error.message)
            })
            if (!isCancelled) {
                setMessage(null);
              }
        }
        catch(error){
            setMessage(error.message)
        };
    }
    useEffect(() => {
        return () => {
          setIsCancelled(true);
        };
      }, []);
    return { resetPassword, message };
}