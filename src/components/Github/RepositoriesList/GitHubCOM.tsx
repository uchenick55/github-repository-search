import {PaginationDataType} from "../../../redux/gh-list-reducer";
import React from "react";
import s from "./Repositories.module.css"
import sc from "../../../common/classes/commonClasses.module.css"



import RenderRepositories from "./RenderRepositories";
import RenderSearchField from "./RenderSearchField";
import Pagination from "./Pagination";
import {RepositoriesDataType} from "../../../common/types/commonTypes";
import Preloader from "../../../common/Preloader/Preloader";
import notFound2 from "../../../assets/svg/404.svg"

export type GitHubCOMType = {
    RepositoriesData: Array<RepositoriesDataType> , // данные списка репозиториев моих, либо поиска
    PaginationData: PaginationDataType // данные пагинации
    SearchQuery: string, // поле поиска
    IsFetching:boolean // индикатор процесса загрузки
    setSearchQuery: (searchQuery: string) => void // задание в стейт поискового запроса
    setPaginationData: (PaginationData: PaginationDataType) => void //колбек задания данных пагинации в стейт
}
const GitHubCOM: React.FC<GitHubCOMType> = (
    {setSearchQuery, PaginationData, setPaginationData, SearchQuery, IsFetching, RepositoriesData}) => {

    return <div className={sc.ToCenter}> {/*  центруем*/}
        <div className={s.GitHubCOM}>
            {IsFetching && <Preloader/>}
            <RenderSearchField setSearchQuery={setSearchQuery} SearchQuery={SearchQuery}/> {/*отрисовка поля поиска */}

            {!IsFetching && <div>

                {RepositoriesData.length>0
                    ? <RenderRepositories RepositoriesData={RepositoriesData} PaginationData={PaginationData}/>
                    : <div>
                        {!IsFetching && <div>
                            <div className={s.NotFoundText}>Ничего не найдено</div>
                            <img className={s.NotFoundImg} src={notFound2} alt=""/>
                        </div>}

                    </div>
                }
                {/*отрисовка списка репозиториев*/}

                <Pagination totalRepositoriesCount={RepositoriesData.length} pageSize={PaginationData.pageSize}
                currentPage={PaginationData.currentPage}
                setPaginationData={setPaginationData} PaginationData={PaginationData}/>
            </div>}
        </div>

    </div>
}
export default GitHubCOM