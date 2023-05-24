import {MyRepositoriesDataType, PaginationDataType, SearchResultDataType} from "../../../redux/gh-list-reducer";
import React from "react";
import s from "./Repositories.module.css"
import RenderRepositories from "./RenderRepositories";
import RenderSearchField from "./RenderSearchField";
import Pagination from "./Pagination";

export type GitHubCOMType = {
    MyRepositoriesData: MyRepositoriesDataType, // автополучение типа входящих данных моих репозиториев
    SearchResultData: SearchResultDataType
    PaginationData:PaginationDataType // данные пагинации
    SearchQuery: string, // поле поиска
    setSearchQuery: (searchQuery: string) => void // задание в стейт поискового запроса
    setPaginationData: (PaginationData: PaginationDataType) => void //колбек задания данных пагинации в стейт

}
const GitHubCOM: React.FC<GitHubCOMType> = (
    {MyRepositoriesData, SearchResultData, setSearchQuery, PaginationData, setPaginationData, SearchQuery}) => {


    return <div className={s.ToCenter}> {/*  центруем*/}
        <div className={s.GitHubCOM}>
            <RenderSearchField setSearchQuery={setSearchQuery} SearchQuery={SearchQuery}/> {/*отрисовка поля поиска */}

            <RenderRepositories
                RepositoriesData={SearchResultData.length > 0 ? SearchResultData : MyRepositoriesData}
                PaginationData={PaginationData}  />
            {/*отрисовка списка репозиториев*/}

            <Pagination totalRepositoriesCount={SearchResultData.length} pageSize={PaginationData.pageSize}
                                currentPage={PaginationData.currentPage}
                        setPaginationData={setPaginationData} PaginationData={PaginationData}/>

        </div>

    </div>
}
export default GitHubCOM