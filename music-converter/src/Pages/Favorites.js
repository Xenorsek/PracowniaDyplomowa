import React, { useEffect, useState } from "react";
import Elements from "../magentajs-component/elements";
import { projectFirestore } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import i18n from "../i18n/i18n";
import { Translation } from 'react-i18next';
import { Button } from "@mui/material";

function Favorites({theme}) {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const privateCollection = false;
  const [favoritesSequences, setFavoritesSequences] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [UpToDate, setUpToDate] = useState(false)
  const limit = 5;

  function setSecond() {
    setIsPending(true);
    projectFirestore.collection("musicSequences").orderBy('date','desc').startAfter(lastVisible).limit(limit).where("id", "in", favoritesSequences).get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setUpToDate(i18n.t('UpToDate'));
          setIsPending(false);
        }
        let results = data;
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
          setLastVisible(snapshot.docs[snapshot.docs.length - 1])
        });
        setData(results);
        setIsPending(false);
      }).catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }

  if (!favoritesSequences) {
    projectFirestore
      .collection("favorites").where("user", "==", user.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setError("No sequences to load");
          setIsPending(false);
        }
        else {
          let musicSequencesIds = [];
          snapshot.docs.forEach((doc) => {
            var dane = doc.data();
            musicSequencesIds.push(dane.musicSequences);
          })
          setFavoritesSequences(musicSequencesIds)
        }
      }).catch((err) => {
        setError(err.message);
        setIsPending(false);
      })
  }

  useEffect(() => {
    setIsPending(true);
    if (favoritesSequences) {
      projectFirestore
        .collection("musicSequences").orderBy("date",'desc').limit(limit).where("id", "in", favoritesSequences)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            setError("No sequences to load");
            setIsPending(false);
          } else {
            setLastVisible(snapshot.docs[snapshot.docs.length - 1])
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
      {error && <p className="error">{error}</p>}

      {data && (
        <Elements sequences={data} privateCollection={privateCollection} theme={theme} />
      )}
      {isPending && <p className="loading"> Loading...</p>}
      <div className="loadMore">
        {UpToDate && <p>{UpToDate}</p>}
        {!UpToDate && !isPending &&
          <Button color="secondary" onClick={setSecond}><Translation>{(t, { i18n }) => <>{i18n.t('LoadMore')}</>}</Translation></Button>
        }
      </div>
    </div>
  );
}
export default Favorites;
