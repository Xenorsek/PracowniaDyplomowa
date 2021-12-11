import React, { useEffect, useState } from "react";
import Elements from "../magentajs-component/elements";
import { projectFirestore } from "../firebase/config";
import i18n from "../i18n/i18n";
import { Translation } from 'react-i18next';

function Library({ theme }) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const privateCollection = false;
  const [lastVisible, setLastVisible] = useState(null);
  const [UpToDate, setUpToDate] = useState(false)
  const limit = 5;

  function setSecond() {
    setIsPending(true);
    projectFirestore.collection("musicSequences").orderBy('date', 'desc').startAfter(lastVisible).limit(limit).where("publicStatus", "==", true).get()
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

  useEffect(() => {
    setIsPending(true);
    projectFirestore.collection("musicSequences").orderBy('date', 'desc').limit(limit).where("publicStatus", "==", true).get().then((snapshot) => {
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
  }, []);

  return (
    <div class="pudelko">
      {error && <p className="error">{error}</p>}
      {data && (
        <Elements sequences={data} privateCollection={privateCollection} theme={theme} />
      )}
      {isPending && <p className="loading"> Loading...</p>}
      <div className="loadMore">
        {UpToDate && <p>{UpToDate}</p>}
        {!UpToDate && !isPending &&
          <button onClick={setSecond}><Translation>{(t, { i18n }) => <>{i18n.t('LoadMore')}</>}</Translation></button>
        }
      </div>
    </div>
  );
}
export default Library;
