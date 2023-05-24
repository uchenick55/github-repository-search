import {MyRepositoriesDataType, PaginationDataType, SearchResultDataType} from "../../../redux/github-reducer";
import React from "react";
import s from "./Repositories.module.css";
import RepositoryItem from "./RepositoryItem";


type RenderRepositoriesType = {
    RepositoriesData: SearchResultDataType | MyRepositoriesDataType, // автополучение типа входящих данных моих репозиториев
    PaginationData: PaginationDataType // данныен пагинации для фильтрации
}
const RenderRepositories: React.FC<RenderRepositoriesType> = ({RepositoriesData, PaginationData}) => {

    const RepositoriesDataFiltered: SearchResultDataType | MyRepositoriesDataType
        = RepositoriesData.filter((r, ind, arr)=>ind<PaginationData.pageSize)

    return <div className={s.RenderRepositoriesCommon}>
        <div className={s.RepositoryItemHeaderCommon+ " " + s.PosAbs}>
            <div className={s.RepositoryItemNameHeader + " " + s.PosAbs}>Название репозитория</div>
            <div className={s.RepositoryItemStarsHeader + " " + s.PosAbs}>Звёзд</div>
            <div className={s.RepositoryItemLastCommitHeader+ " " + s.PosAbs} >Дата коммита</div>
            <div className={s.RepositoryItemLinkHeader+ " " + s.PosAbs}>Ссылка на Github</div>
        </div>

        {RepositoriesDataFiltered.map(m=>{
            return <RepositoryItem
                key = {m.id} RepositoryName = {m.name} stars = {m.stargazers.totalCount}
                LastCommit={
                    m.defaultBranchRef &&
                    m.defaultBranchRef.target.committedDate}
                Link={m.url} id={m.id}
            />

        })}
    </div>
}
export default RenderRepositories