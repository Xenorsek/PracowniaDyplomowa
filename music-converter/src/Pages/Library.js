import React from "react"
import Element from "../magentajs-component/element";
import { SamplesSequences } from "../magentajs-component/samplesSequences";

function Library(){
    return(
<div class="pudelko">
    {SamplesSequences.map((item,index)=>{
        return (
            <Element key={index} title={item.title}
            seq={item}
            name={item.name}/>
        )
    })}
        </div>
    )
}
export default Library