import React from "react";
import s from "./CardCommon.module.css"
import sc from "../../../common/classes/commonClasses.module.css"


import GetDate, {DataReturn2Type} from "../../../common/GetDate/GetDate";
import {CardDataType} from "../../../common/types/commonTypes";

export type CardCommonType = {
    CardData: CardDataType
}
const CardCommon: React.FC<CardCommonType> = ({CardData}) => {
    const {name, description} = CardData
    const totalCount = CardData.stargazers && CardData.stargazers.totalCount
    const login = CardData.owner && CardData.owner.login
    const Languages = CardData.languages && CardData.languages.nodes
    const RepoLink = CardData.url

    const DateLocal: DataReturn2Type = GetDate(CardData.defaultBranchRef ? CardData.defaultBranchRef.target.committedDate :"" )
    return <div className={sc.ToCenter}> {/*  центруем*/}
        <div className={s.CardCommon}>
            <img className={s.imgAvatar} src={CardData.owner && CardData.owner.avatarUrl} alt=""/>
            <div className={s.otherData}>
                <h2>{name}</h2>
                 <div><b>Stars: </b> {totalCount}</div>
                <div><b>Last Commit: </b> {DateLocal.Day} / {DateLocal.Month} / {DateLocal.Year}</div>
                {login && <div><b>Author: </b><a href={RepoLink}>{login}</a></div>}
                {description && <div><b>Description: </b>{description}</div>}
                {Languages.length>0 && <div><b>Used Languages:</b> <ul>{Languages.map( n => {
                    return <li key={n.name}>{n.name}</li>
                } )}</ul></div>}
            </div>
        </div>

    </div>
}
export default CardCommon