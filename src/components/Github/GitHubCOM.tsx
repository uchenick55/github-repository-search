import {MyRepositoriesDataType} from "../../redux/github-reducer";
import React from "react";
import RepositoryItem from "./RepositoryItem";

type GitHubCOMType = {
    MyRepositoriesData: MyRepositoriesDataType, // автополучение типа входящих данных моих репозиториев
}
const GitHubCOM: React.FC<GitHubCOMType> = ({MyRepositoriesData}) => {
    return <div>
        {MyRepositoriesData.map(m=>{
            return <RepositoryItem
                key = {m.id} RepositoryName = {m.name} stars = {m.stargazers.totalCount} LastCommit={m.defaultBranchRef.target.committedDate}
            />

        })}

    </div>
}
export default GitHubCOM