import React from "react";
import s from "./CardCommon.module.css"
import GetDate, {DataReturn2Type} from "../../../common/GetDate/GetDate";
import {CardDataType} from "../../../common/types/commonTypes";

export type CardCommonType = {
    CardData: CardDataType
}
const CardCommon: React.FC<CardCommonType> = ({CardData}) => {
    const DateLocal: DataReturn2Type = GetDate( CardData.defaultBranchRef.target.committedDate )
    return <div className={s.ToCenter}> {/*  центруем*/}
        <div className={s.CardCommon}>
            <div>{CardData.name}</div>
            <div>Stars - {CardData.stargazers.totalCount}</div>
            <div>Last Commit - {DateLocal.Day} / {DateLocal.Month} / {DateLocal.Year}</div>
            <div>Author - {CardData.owner.login}</div>
            <div>{CardData.description}</div>
            <div>Used Languages - <ul>{CardData.languages.nodes.map( n => {
                return <li key={n.name}>{n.name}</li>
            } )}</ul></div>
            <img src={CardData.owner.avatarUrl} alt=""/>
        </div>

    </div>
}
export default CardCommon