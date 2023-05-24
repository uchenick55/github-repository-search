import {MyRepositoriesDataType, PaginationDataType, SearchResultDataType} from "../../../redux/gh-list-reducer";
import React from "react";
import s from "./Repositories.module.css";
import RepositoryItem from "./RepositoryItem";


type RenderRepositoriesType = {
    RepositoriesData: SearchResultDataType | MyRepositoriesDataType, // автополучение типа входящих данных моих репозиториев
    PaginationData: PaginationDataType // данныен пагинации для фильтрации
}
const RenderRepositories: React.FC<RenderRepositoriesType> = ({RepositoriesData, PaginationData}) => {
    console.log("RenderRepositories")
    const RepositoriesDataFiltered: SearchResultDataType | MyRepositoriesDataType
        = RepositoriesData.filter((r, ind)=> // фильтрация всех загруженых репозиториев
        ind>=PaginationData.pageSize*(PaginationData.currentPage-1) && // с репозиториев по текущей странице
        ind<PaginationData.pageSize*PaginationData.currentPage // до репозиториев на pageSize больше
    )

    return <div className={s.RenderRepositoriesCommon}>
        <div className={s.RepositoryItemHeaderCommon+ " " + s.PosAbs}>
            <div className={s.RepositoryItemNameHeader + " " + s.PosAbs}>Название репозитория</div>
            <div className={s.RepositoryItemStarsHeader + " " + s.PosAbs}>Звёзд</div>
            <div className={s.RepositoryItemLastCommitHeader+ " " + s.PosAbs} >Дата коммита</div>
            <div className={s.RepositoryItemLinkHeader+ " " + s.PosAbs}>Ссылка на Github</div>
        </div>

        {RepositoriesDataFiltered.map((m, ind)=>{
            return <RepositoryItem
                key = {m.id} RepositoryName = {m.name} stars = {m.stargazers.totalCount} ind={ind}
                LastCommit={
                    m.defaultBranchRef &&
                    m.defaultBranchRef.target.committedDate}
                Link={m.url} id={m.id}
            />

        })}
    </div>
}
export default RenderRepositories