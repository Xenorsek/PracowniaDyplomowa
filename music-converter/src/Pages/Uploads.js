import React, { useEffect, useState } from "react";
import Elements from "../magentajs-component/elements";
import { projectFirestore } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

function Uploads() {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const privateCollection = true;
  useEffect(() => {
    setIsPending(true);
    projectFirestore
      .collection("musicSequences").where("author","==",user.uid)
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
  }, [user.uid]);
  return (
    <div className="Uploads">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading"> Loading...</p>}
      {data && <Elements sequences={data} privateCollection = {privateCollection} />}
    </div>
  );
}
export default Uploads;
