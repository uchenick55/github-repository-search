import {MyRepositoriesDataType, SearchResultDataType} from "../../../redux/github-reducer";
import React from "react";
import RepositoryItem from "./RepositoryItem";
import s from "./RenderRepositories.module.css"
import RenderRepositories from "./RenderRepositories";
import RenderSearchField from "./RenderSearchField";

export type GitHubCOMType = {
    MyRepositoriesData: MyRepositoriesDataType, // автополучение типа входящих данных моих репозиториев
    SearchResultData: SearchResultDataType
}
const GitHubCOM: React.FC<GitHubCOMType> = ({MyRepositoriesData, SearchResultData}) => {

    return <div className={s.ToCenter}> {/*  центруем*/}
        <div className={s.GitHubCOM}>
            <RenderSearchField/> {/*отрисовка поля поиска */}

            <RenderRepositories
                RepositoriesData={SearchResultData.length > 0 ? SearchResultData : MyRepositoriesData}/> {/*отрисовка списка репозиториев*/}
        </div>

    </div>
}
export default GitHubCOM