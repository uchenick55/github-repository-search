import {PaginationDataType, SearchResultDataType} from "../../../redux/gh-list-reducer";
import React from "react";
import s from "./Repositories.module.css"
import RenderRepositories from "./RenderRepositories";
import RenderSearchField from "./RenderSearchField";
import Pagination from "./Pagination";
import {RepositoriesDataType} from "../../../common/types/commonTypes";
import Preloader from "../../../common/Preloader/Preloader";

export type GitHubCOMType = {
    MyRepositoriesData: Array<RepositoriesDataType> , // автополучение типа входящих данных моих репозиториев
    SearchResultData: SearchResultDataType
    PaginationData: PaginationDataType // данные пагинации
    SearchQuery: string, // поле поиска
    IsFetching:boolean // индикатор процесса загрузки
    setSearchQuery: (searchQuery: string) => void // задание в стейт поискового запроса
    setPaginationData: (PaginationData: PaginationDataType) => void //колбек задания данных пагинации в стейт
}
const GitHubCOM: React.FC<GitHubCOMType> = (
    {MyRepositoriesData, SearchResultData, setSearchQuery, PaginationData, setPaginationData, SearchQuery, IsFetching}) => {
     const RepositoriesData: RepositoriesDataType | SearchResultDataType  = SearchQuery==="" ? MyRepositoriesData : SearchResultData
    // const RepositoriesData: Array<MyRepositoriesDataType>  = MyRepositoriesData

    return <div className={s.ToCenter}> {/*  центруем*/}
        <div className={s.GitHubCOM}>
            {IsFetching && <Preloader/>}

            <RenderSearchField setSearchQuery={setSearchQuery} SearchQuery={SearchQuery}/> {/*отрисовка поля поиска */}

            <RenderRepositories RepositoriesData={RepositoriesData} PaginationData={PaginationData}/>
            {/*отрисовка списка репозиториев*/}

            <Pagination totalRepositoriesCount={RepositoriesData.length} pageSize={PaginationData.pageSize}
                        currentPage={PaginationData.currentPage}
                        setPaginationData={setPaginationData} PaginationData={PaginationData}/>

        </div>

    </div>
}
export default GitHubCOM