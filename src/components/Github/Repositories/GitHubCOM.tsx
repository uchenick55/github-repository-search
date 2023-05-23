import {MyRepositoriesDataType, SearchResultDataType} from "../../../redux/github-reducer";
import React from "react";
import RepositoryItem from "./RepositoryItem";
import s from "./RenderRepositories.module.css"
import RenderRepositories from "./RenderRepositories";
import RenderSearchField from "./RenderSearchField";

export type GitHubCOMType = {
    MyRepositoriesData: MyRepositoriesDataType, // автополучение типа входящих данных моих репозиториев
    SearchResultData: SearchResultDataType
    setSearchQuery: (searchQuery:string)=>void // задание в стейт поискового запроса
}
const GitHubCOM: React.FC<GitHubCOMType> = ({MyRepositoriesData, SearchResultData, setSearchQuery}) => {

    return <div className={s.ToCenter}> {/*  центруем*/}
        <div className={s.GitHubCOM}>
            <RenderSearchField setSearchQuery={setSearchQuery}/> {/*отрисовка поля поиска */}

            <RenderRepositories
                RepositoriesData={SearchResultData.length > 0 ? SearchResultData : MyRepositoriesData}/> {/*отрисовка списка репозиториев*/}
        </div>

    </div>
}
export default GitHubCOM