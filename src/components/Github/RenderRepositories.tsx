import {MyRepositoriesDataType} from "../../redux/github-reducer";
import React from "react";
import с from "./RenderRepositories.module.css";
import RepositoryItem from "./RepositoryItem";


type RenderRepositoriesType = {
    MyRepositoriesData: MyRepositoriesDataType, // автополучение типа входящих данных моих репозиториев
}
const RenderRepositories: React.FC<RenderRepositoriesType> = ({MyRepositoriesData}) => {
    return <div className={с.RenderRepositories}>
        <div className={с.RepositoryItemHeaderCommon+ " " + с.PosAbs}>
            <div className={с.RepositoryItemNameHeader + " " + с.PosAbs}>Repository</div>
            <div className={с.RepositoryItemStarsHeader + " " + с.PosAbs}>Stars</div>
            <div className={с.RepositoryItemLastCommitHeader+ " " + с.PosAbs} >Last Commit</div>
            <div className={с.RepositoryItemLinkHeader+ " " + с.PosAbs}>Link</div>
        </div>

        {MyRepositoriesData.map(m=>{
            return <RepositoryItem
                key = {m.id} RepositoryName = {m.name} stars = {m.stargazers.totalCount}
                LastCommit={m.defaultBranchRef.target.committedDate} Link={m.url}
            />

        })}
    </div>
}
export default RenderRepositories