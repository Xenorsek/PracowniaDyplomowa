import { useAuthContext } from "../hooks/useAuthContext";
import Element from "./element";
function Elements({sequences, privateCollection}){
  const {user} = useAuthContext();
    return(
<div class="pudelko">
      {sequences && sequences.map((musicSequence, index) => (
        <Element key={index} title={musicSequence.title}
        seq={musicSequence}
        name={musicSequence.name} privateCollection = {privateCollection} user={user} />
      ))
      }
    </div>
    )
}
export default Elements;