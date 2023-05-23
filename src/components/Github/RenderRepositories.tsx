import {MyRepositoriesDataType, SearchResultDataType} from "../../redux/github-reducer";
import React from "react";
import с from "./RenderRepositories.module.css";
import RepositoryItem from "./RepositoryItem";


type RenderRepositoriesType = {
    MyRepositoriesData: MyRepositoriesDataType, // автополучение типа входящих данных моих репозиториев
    SearchResultData: SearchResultDataType

}
const RenderRepositories: React.FC<RenderRepositoriesType> = ({MyRepositoriesData, SearchResultData}) => {
    return <div className={с.RenderRepositories}>
        <div className={с.RepositoryItemHeaderCommon+ " " + с.PosAbs}>
            <div className={с.RepositoryItemNameHeader + " " + с.PosAbs}>Repository</div>
            <div className={с.RepositoryItemStarsHeader + " " + с.PosAbs}>Stars</div>
            <div className={с.RepositoryItemLastCommitHeader+ " " + с.PosAbs} >Last Commit</div>
            <div className={с.RepositoryItemLinkHeader+ " " + с.PosAbs}>Link</div>
        </div>

        {SearchResultData.map(m=>{
            return <RepositoryItem
                key = {m.id} RepositoryName = {m.name} stars = {m.stargazers.totalCount}
                LastCommit={
                    m.defaultBranchRef &&
                    m.defaultBranchRef.target.committedDate}
                Link={m.url} id={m.id}
            />

        })}
    </div>
}
export default RenderRepositories