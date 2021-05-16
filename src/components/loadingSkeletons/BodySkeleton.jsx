import React from 'react'
import { Skeleton } from "@material-ui/lab";

export default function BodySkeleton() {
    const styleOfTitle={maxWidth:"80%"}
    const styleOfDifficultyLevelBox={maxWidth:"100px"}
    
const SkeletonWrapper=()=>{
    return <div className="row " style={{paddingTop:"50px"}}  >
    <div className="col-10 col-lg-10">
        <Skeleton  height={20} style={styleOfTitle} ></Skeleton>
    </div>
    <div className={"col-2 col-lg-2"}>
        <Skeleton height={20} style={styleOfDifficultyLevelBox}  ></Skeleton>
    </div>
</div>

}
    return (
        <div>
           {[1,2,3,4,5,6,7].map(no=>SkeletonWrapper())}
           
        </div>
    )
}
