import {MyRepositoriesDataType, PaginationDataType, SearchResultDataType} from "../../../redux/github-reducer";
import React from "react";
import RepositoryItem from "./RepositoryItem";
import s from "./RenderRepositories.module.css"
import RenderRepositories from "./RenderRepositories";
import RenderSearchField from "./RenderSearchField";
import Pagination from "./Pagination/Pagination";

export type GitHubCOMType = {
    MyRepositoriesData: MyRepositoriesDataType, // автополучение типа входящих данных моих репозиториев
    SearchResultData: SearchResultDataType
    setSearchQuery: (searchQuery: string) => void // задание в стейт поискового запроса
    PaginationData:PaginationDataType // данные пагинации
}
const GitHubCOM: React.FC<GitHubCOMType> = ({MyRepositoriesData, SearchResultData, setSearchQuery, PaginationData}) => {

    const onPageChanged = () => {

    }
    const onChangeRangeLocal = () => {

    }

    return <div className={s.ToCenter}> {/*  центруем*/}
        <div className={s.GitHubCOM}>
            <RenderSearchField setSearchQuery={setSearchQuery}/> {/*отрисовка поля поиска */}

            <RenderRepositories
                RepositoriesData={SearchResultData.length > 0 ? SearchResultData : MyRepositoriesData}/>
            {/*отрисовка списка репозиториев*/}

            <Pagination totalRepositoriesCount={SearchResultData.length} pageSize={PaginationData.pageSize}
                                currentPage={PaginationData.currentPage} onPageChanged={onPageChanged}
                                currentRangeLocal={PaginationData.currentRangeLocal}
                                onChangeRangeLocal={onChangeRangeLocal}/>

        </div>

    </div>
}
export default GitHubCOM