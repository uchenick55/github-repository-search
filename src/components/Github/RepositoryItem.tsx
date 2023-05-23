import React from "react";
import classes from "./GitHub.module.css"

type RepositoryItemType = {
    RepositoryName:string
    stars: number
    LastCommit:string
}
const RepositoryItem:React.FC<RepositoryItemType> = ({RepositoryName, stars, LastCommit})=>{
    return <div className={classes.RepositoryItemCommon}>
        <div className={classes.RepositoryItemName}>{RepositoryName}</div>
        <div className={classes.RepositoryItemStars}>{stars}</div>
        <div className={classes.RepositoryItemLastCommit}>{LastCommit}</div>
    </div>
}
export default RepositoryItem