import Element from "./element";
function Elements({sequences, canDelete}){
    return(
<div class="pudelko">
      {sequences && sequences.map((musicSequence, index) => (
        <Element key={index} title={musicSequence.title}
        seq={musicSequence}
        name={musicSequence.name} canDelete = {canDelete} />
      ))
      }
    </div>
    )
}
export default Elements;