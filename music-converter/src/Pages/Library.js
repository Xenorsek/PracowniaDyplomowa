import React, { useEffect, useState } from "react";
import Elements from "../magentajs-component/elements";
import { projectFirestore } from "../firebase/config";
function Library() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const privateCollection = false;
  const [lastVisible, setLastVisible] = useState(null);
  const [UpToDate, setUpToDate] = useState(false)
  const limit = 5;

  function setSecond() {
    setIsPending(true);
    projectFirestore.collection("musicSequences").orderBy('date').startAfter(lastVisible).limit(limit).where("publicStatus", "==", true).get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setUpToDate("You are up to date!");
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
    projectFirestore.collection("musicSequences").orderBy('date').limit(limit).where("publicStatus", "==", true).get().then((snapshot) => {
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
        <Elements sequences={data} privateCollection={privateCollection} />
      )}
      {isPending && <p className="loading"> Loading...</p>}
      {UpToDate && <p>{ UpToDate }</p>}
      {!UpToDate && !isPending &&
        <button onClick={setSecond}>Load more</button>
      }


    </div>
  );
}
export default Library;
