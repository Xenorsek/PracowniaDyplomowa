import React, { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export const useAddFavorites = () => {
    const addToFavorites = async (musicSequences, user) =>{
    const doc = {musicSequences, user };
    try {
        await projectFirestore.collection("favorites").add(doc).then(()=>{
          console.log("Successfully added to favorites!");
      }).catch((error) => {
          console.error("Error with added to favorites: ", error);
      });
      } catch (err) {
        console.log(err);
      }
    }
    return {addToFavorites};
}