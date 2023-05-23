import {MyRepositoriesDataType, SearchResultDataType} from "../../../redux/github-reducer";
import React from "react";
import s from "./RenderRepositories.module.css";
import RepositoryItem from "./RepositoryItem";


type RenderRepositoriesType = {
    RepositoriesData: SearchResultDataType | MyRepositoriesDataType, // автополучение типа входящих данных моих репозиториев

}
const RenderRepositories: React.FC<RenderRepositoriesType> = ({RepositoriesData}) => {
    return <div className={s.RenderRepositoriesCommon}>
        <div className={s.RepositoryItemHeaderCommon+ " " + s.PosAbs}>
            <div className={s.RepositoryItemNameHeader + " " + s.PosAbs}>Название репозитория</div>
            <div className={s.RepositoryItemStarsHeader + " " + s.PosAbs}>Звёзд</div>
            <div className={s.RepositoryItemLastCommitHeader+ " " + s.PosAbs} >Дата коммита</div>
            <div className={s.RepositoryItemLinkHeader+ " " + s.PosAbs}>Ссылка на Github</div>
        </div>

        {RepositoriesData.map(m=>{
            return <RepositoryItem
                key = {m.id} RepositoryName = {m.name} stars = {m.stargazers.totalCount}
                // @ts-ignore
                LastCommit={
                    m.defaultBranchRef &&
                    m.defaultBranchRef.target.committedDate}
                Link={m.url} id={m.id}
            />

        })}
    </div>
}
export default RenderRepositories