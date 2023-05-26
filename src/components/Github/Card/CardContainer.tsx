import {GlobalStateType} from "../../../redux/store-redux";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import CardCommon from "./CardCommon";
import {compose} from "redux";
import withRouter2 from "../../../common/hoc/withRouter2";
import {getCardDataThCr} from "../../../redux/gh-card-reducer";
import Preloader from "../../../common/Preloader/Preloader";

const CardContainer:React.FC<mapStateToPropsType & mapDispatchToPropsType & OwnPropsType> = (
    {CardData, userId, getCardDataThCr, CardMarkers, IsFetching}) => {

    useEffect(()=>{
        console.log("запросить данные по карточке при первой загрузке")
        getCardDataThCr(userId) // получить данные по карточке при первой загрузке
    },[])

    return <div>
        {IsFetching && <Preloader/>} {/*индикатор загрузки */}

        {/*пока не пройдет загрузка и маркер загрузки не переведен в true, не отрисовывать карточку*/}
        {CardMarkers.IsCardDataUploaded && !IsFetching && <CardCommon CardData={CardData}/>}
    </div>
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        CardData: state.ghCard.CardData,// данные загруженой карточки
        CardMarkers: state.ghCard.CardMarkers, // вспомогательные маркеры для cards (исключить повторные рендеры и загрузки)
        IsFetching: state.app.IsFetching // индикатор загрузки
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
