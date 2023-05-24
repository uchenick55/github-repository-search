import React from "react";
import s from "./Repositories.module.css"
import GetDate, {DataReturn2Type} from "../../../common/GetDate/GetDate";
import {NavLink} from "react-router-dom";

type RepositoryItemType = {
    RepositoryName:string | null
    stars: number
    LastCommit:string | null
    Link: string | null | undefined
    id: string | null
    ind: number
}
const RepositoryItem:React.FC<RepositoryItemType> = ({RepositoryName, stars, LastCommit, Link, id, ind})=>{
    const LocalDate:DataReturn2Type = GetDate(LastCommit? LastCommit:"")
    return <div className={s.RepositoryItemCommon}>
        <div className={s.Repositoryid  + " " + s.PosAbs }>{ind+1}</div>
        <NavLink to={`/card/${id}`}>
            <div className={s.RepositoryItemName + " " + s.PosRelative}>{RepositoryName}</div> {/*имя*/}
        </NavLink>
        <div className={s.RepositoryItemStars + " " + s.PosAbs} >{stars}</div> {/*количество звезд*/}
        <div className={s.RepositoryItemLastCommit+ " " + s.PosAbs}>
            {LocalDate.Day} / {LocalDate.Month} / {LocalDate.Year} </div> {/*время последнего коммита*/}
        <a className={s.RepositoryItemLink+ " " + s.PosAbs} href={Link?Link:""} >Go to repository</a> {/*ссылка на репозиторий*/}
    </div>
}
export default RepositoryItem