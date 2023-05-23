import React from "react";
import с from "./RenderRepositories.module.css"
import GetDate, {DataReturn2Type} from "../common/GetDate";
import {NavLink} from "react-router-dom";

type RepositoryItemType = {
    RepositoryName:string | null
    stars: number
    LastCommit:string | null
    Link: string | null | undefined
    id: string | null
}
const RepositoryItem:React.FC<RepositoryItemType> = ({RepositoryName, stars, LastCommit, Link, id})=>{
    const LocalDate:DataReturn2Type = GetDate(LastCommit? LastCommit:"")
    return <div className={с.RepositoryItemCommon}>
        <NavLink to={`/${id}`}>
            <div className={с.RepositoryItemName + " " + с.PosRelative}>{RepositoryName}</div> {/*имя*/}
        </NavLink>
        <div className={с.RepositoryItemStars + " " + с.PosAbs} >{stars}</div> {/*количество звезд*/}
        <div className={с.RepositoryItemLastCommit+ " " + с.PosAbs}>
            {LocalDate.Day} / {LocalDate.Month} / {LocalDate.Year} </div> {/*время последнего коммита*/}
        <a className={с.RepositoryItemLink+ " " + с.PosAbs} href={Link?Link:""} >Go to repository</a> {/*ссылка на репозиторий*/}
    </div>
}
export default RepositoryItem