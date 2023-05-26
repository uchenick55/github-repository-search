import {GlobalStateType} from "../../../redux/store-redux";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import CardCommon from "./CardCommon";
import {compose} from "redux";
import withRouter2 from "../../../common/hoc/withRouter2";
import {getCardDataThCr} from "../../../redux/gh-card-reducer";

const CardContainer:React.FC<mapStateToPropsType & mapDispatchToPropsType & OwnPropsType> = (
    {CardData, userId, getCardDataThCr}) => {

    useEffect(()=>{
        console.log("получить данные по карточке при первой загрузке")
        getCardDataThCr(userId) // получить данные по карточке при первой загрузке
    },[])

    return <div>
        {CardData && <CardCommon CardData={CardData}/>}
    </div>
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        CardData: state.ghCard.CardData
    }
}
type OwnPropsType = {
    userId: string // id пользователя
}
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
    getCardDataThCr: (cardId: string) => void // санкреатор получить данные по карточке выбранного userId
}
export default compose<React.ComponentType>(

    connect<mapStateToPropsType, // тип mapStateToProps
        mapDispatchToPropsType, // тип mapDispatchToProps
        OwnPropsType, // тип входящих пропсов от родителя
        GlobalStateType // глобальный стейт из стора
        >( mapStateToProps, {
        getCardDataThCr
    } ),
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
)( CardContainer )
