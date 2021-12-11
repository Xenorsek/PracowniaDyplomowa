import React from "react";
import { projectFirestore } from "../firebase/config";

export const useRemoveFavorites = () => {
    const removeFromFavorites = async (musicSequences, user) =>{
    try {
        await projectFirestore.collection("favorites")
        .where("user","==",user)
        .where("musicSequences","==",musicSequences)
        .limit(1)
        .get()
        .then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                doc.ref.delete().then(()=>{
                    console.log("successful removed from favorites")
                });
            })
      }).catch((error) => {
          console.log(error)
      });
      } catch (err) {
        console.log(err);
      }
    }
    return {removeFromFavorites};
}