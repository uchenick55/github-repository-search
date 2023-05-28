import {GlobalStateType} from "../../../redux/store-redux";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import Card from "./Card";
import {compose} from "redux";
import withRouter2 from "../../../common/hoc/withRouter2";
import {getCardDataThCr} from "../../../redux/gh-card-reducer";
import Preloader from "../../../common/Preloader/Preloader";
import NavigateToLoginHoc2 from "../../../common/hoc/NavigateToLoginHoc2";
import {checkGhTokenThCr} from "../../../redux/app-reducer";

const CardContainer:React.FC<mapStateToPropsType & mapDispatchToPropsType & OwnPropsType> = (
    {CardData, cardId, getCardDataThCr, CardMarkers, IsFetching, checkGhTokenThCr}) => {

    useEffect(()=>{
        console.log("запросить данные по карточке при первой загрузке")
        getCardDataThCr(cardId) // получить данные по карточке при первой загрузке
    },[])

    const logOut = () => {
        checkGhTokenThCr("") // занулить токен и запустить проверку логина
    }

    return <div>
        {IsFetching && <Preloader/>} {/*индикатор загрузки */}

        {/*пока не пройдет загрузка и маркер загрузки не переведен в true, не отрисовывать карточку*/}
        {CardMarkers.IsCardDataUploaded && !IsFetching && <Card CardData={CardData} logOut={logOut}/>}
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
    cardId: string // id пользователя
}
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
    getCardDataThCr: (cardId: string) => void // санкреатор получить данные по карточке выбранного cardId
    checkGhTokenThCr:  (Token: string) => void // санка записи в стейт и локалсторадж GITHUB_TOKEN
}
export default compose<React.ComponentType>(

    connect<mapStateToPropsType, // тип mapStateToProps
        mapDispatchToPropsType, // тип mapDispatchToProps
        OwnPropsType, // тип входящих пропсов от родителя
        GlobalStateType // глобальный стейт из стора
        >( mapStateToProps, {
        getCardDataThCr, checkGhTokenThCr
    } ),
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2 //проверка, залогинен ли я
)( CardContainer )
