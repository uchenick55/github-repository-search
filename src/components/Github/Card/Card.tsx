import React from "react";
import s from "./CardCommon.module.css"
import sc from "../../../common/classes/commonClasses.module.css"
import LogOut from "../../../assets/svg/logOut.svg"

import GetDate, {DataReturn2Type} from "../../../common/GetDate/GetDate";
import {CardDataType} from "../../../common/types/commonTypes";

export type CardCommonType = {
    CardData: CardDataType // тип данных карточки
    logOut:  () => void //логаут

}
const Card: React.FC<CardCommonType> = ({CardData, logOut}) => {
    const {name, description} = CardData
    const totalCount = CardData.stargazers && CardData.stargazers.totalCount
    const login = CardData.owner && CardData.owner.login
    const Languages = CardData.languages && CardData.languages.nodes
    const RepoLink = CardData.url
    const AuthorLink = CardData.owner.url

    const DateLocal: DataReturn2Type = GetDate(CardData.defaultBranchRef ? CardData.defaultBranchRef.target.committedDate :"" )
    return <div className={sc.ToCenter}> {/*  центруем*/}

        <div className={s.CardCommon}>
            <img
                className={sc.logOutCommon + " " + sc.logoutCard}
                src={LogOut} alt="log out"
                title="log out"
                onClick={()=>logOut()}

            /> {/*кнопка логаута (зануление токена*/}
            <img className={s.imgAvatar} src={CardData.owner && CardData.owner.avatarUrl} alt=""/>
            <div className={s.otherData}>
                <h2 data-testid="CardName"><a href={RepoLink} >{name} </a></h2>
                 <div><b>Stars: </b> {totalCount}</div>
                <div><b>Last Commit: </b> {DateLocal.Day} / {DateLocal.Month} / {DateLocal.Year}</div>
                {login && <div><b>Author: </b><div data-testid="CardAuthor"><a href={AuthorLink} >{login}</a></div></div>}
                {description && <div><b>Description: </b>{description}</div>}
                {Languages.length>0 && <div><b>Used Languages:</b> <ul>{Languages.map( n => {
                    return <li key={n.name}>{n.name}</li>
                } )}</ul></div>}
            </div>
        </div>

    </div>
}
export default Card