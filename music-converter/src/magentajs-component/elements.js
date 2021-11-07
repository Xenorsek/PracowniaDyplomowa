import Element from "./element";
function Elements({sequences}){
    return(
<div class="pudelko">
      {sequences && sequences.map((musicSequence, index) => (
        <Element key={index} title={musicSequence.title}
        seq={musicSequence}
        name={musicSequence.name} />
      ))
      }
    </div>
    )
}
export default Elements;