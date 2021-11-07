import React, { useEffect, useState } from "react";
import Element from "../magentajs-component/element";
import Elements from "../magentajs-component/elements";
import { SamplesSequences } from "../magentajs-component/samplesSequences";
import { projectFirestore } from "../firebase/config";
function Library() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setIsPending(true);
    projectFirestore
      .collection("musicSequences")
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
  }, []);

  return (
    <div class="pudelko">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading"> Loading...</p>}
      {data && (
          <Elements sequences={data}/>
      )}
    </div>
  );
}
export default Library;
