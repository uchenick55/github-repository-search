import {MyRepositoriesDataType} from "../../redux/github-reducer";
import React from "react";
import RepositoryItem from "./RepositoryItem";
import с from "./RenderRepositories.module.css"
import RenderRepositories from "./RenderRepositories";
import RenderSearchField from "./RenderSearchField";

export type GitHubCOMType = {
    MyRepositoriesData: MyRepositoriesDataType, // автополучение типа входящих данных моих репозиториев
}
const GitHubCOM: React.FC<GitHubCOMType> = ({MyRepositoriesData}) => {

    return <div className={с.ToCenter}> {/*  центруем*/}

        <RenderSearchField/> {/*отрисовка поля поиска */}

        <RenderRepositories MyRepositoriesData={MyRepositoriesData}/> {/*отрисовка списка репозиториев*/}

    </div>
}
export default GitHubCOM