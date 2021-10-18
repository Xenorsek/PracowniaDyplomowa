import Element from "./element";

const sampleSequences = require("./samplesSequences");

function Elements(){
    return(
<div class="pudelko">
          <Element
            title={sampleSequences.array[0].title}
            seq={sampleSequences.array[0]}
            name="Halina"
          />
          <Element
          title={sampleSequences.array[2].title}
          seq={sampleSequences.array[2]}
          name="Arek"
          />
          <Element
            title={sampleSequences.array[1].title}
            seq={sampleSequences.array[1]}
            name="Tadeusz"
          />
        </div>
    )
}
export default Elements;