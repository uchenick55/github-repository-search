import {MyRepositoriesDataType, PaginationDataType, SearchResultDataType} from "../../../redux/github-reducer";
import React from "react";
import s from "./Repositories.module.css"
import RenderRepositories from "./RenderRepositories";
import RenderSearchField from "./RenderSearchField";
import Pagination from "./Pagination/Pagination";

export type GitHubCOMType = {
    MyRepositoriesData: MyRepositoriesDataType, // автополучение типа входящих данных моих репозиториев
    SearchResultData: SearchResultDataType
    PaginationData:PaginationDataType // данные пагинации
    setSearchQuery: (searchQuery: string) => void // задание в стейт поискового запроса
    setPaginationDataAC: (PaginationData: PaginationDataType) => void //экшн креатор задания данных пагинации в стейт

}
const GitHubCOM: React.FC<GitHubCOMType> = (
    {MyRepositoriesData, SearchResultData, setSearchQuery, PaginationData, setPaginationDataAC}) => {


    return <div className={s.ToCenter}> {/*  центруем*/}
        <div className={s.GitHubCOM}>
            <RenderSearchField setSearchQuery={setSearchQuery}/> {/*отрисовка поля поиска */}

            <RenderRepositories
                RepositoriesData={SearchResultData.length > 0 ? SearchResultData : MyRepositoriesData}
                PaginationData={PaginationData}  />
            {/*отрисовка списка репозиториев*/}

            <Pagination totalRepositoriesCount={SearchResultData.length} pageSize={PaginationData.pageSize}
                                currentPage={PaginationData.currentPage}
                                currentRangeLocal={PaginationData.currentRangeLocal}
                                PortionSize={PaginationData.PortionSize}
                                setPaginationDataAC={setPaginationDataAC} PaginationData={PaginationData}/>

        </div>

    </div>
}
export default GitHubCOM