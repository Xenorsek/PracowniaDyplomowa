import React, { Component, useEffect, useState } from "react";
import Elements from "../magentajs-component/elements";
import { projectFirestore } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import firebase from 'firebase';

function Favorites() {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const privateCollection = false;
  const [favoritesSequences, setFavoritesSequences] = useState(null);

  if(!favoritesSequences){
  projectFirestore
    .collection("favorites").where("user","==",user.uid)
    .get()
    .then((snapshot)=> {
        let musicSequencesIds = [];
        snapshot.docs.forEach((doc)=>{
            var dane = doc.data();
            musicSequencesIds.push(dane.musicSequences);
        })
        setFavoritesSequences(musicSequencesIds)
    })
  }

  useEffect(() => {
    setIsPending(true);
    if(favoritesSequences){
        projectFirestore
        .collection("musicSequences").where("id","in",favoritesSequences)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            setError("No sequences to load");
            setIsPending(false);
          } else {
            let results = [];
            snapshot.docs.forEach((doc) => {
              results.push({ id: doc.id, ...doc.data() });
            });
            setData(results);
            setIsPending(false);
          }
        })
        .catch((err) => {
          setError(err.message);
          setIsPending(false);
        });
      }
    }, [favoritesSequences]);
  
  return (
    <div className="favorites">
      <h1>Favorites</h1>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading"> Loading...</p>}
      {data && (
        <Elements sequences={data} privateCollection={privateCollection} />
      )}
    </div>
  );
}
export default Favorites;
