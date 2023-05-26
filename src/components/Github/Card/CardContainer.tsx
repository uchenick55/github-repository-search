import {GlobalStateType} from "../../../redux/store-redux";
import {connect} from "react-redux";
import React from "react";
import CardCommon from "./CardCommon";
import {compose} from "redux";
import withRouter2 from "../../../common/hoc/withRouter2";

const CardContainer:React.FC<mapStateToPropsType & mapDispatchToPropsType & OwnPropsType> = (
    {CardData, userId}) => {
    return <div>
        <CardCommon CardData={CardData}/>
    </div>
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        CardData: state.ghCard.CardData
    }
}
type OwnPropsType = {
    userId: number // id пользователя
}
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
}
export default compose<React.ComponentType>(

    connect<mapStateToPropsType, // тип mapStateToProps
        mapDispatchToPropsType, // тип mapDispatchToProps
        OwnPropsType, // тип входящих пропсов от родителя
        GlobalStateType // глобальный стейт из стора
        >( mapStateToProps, {
    } ),
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
)( CardContainer )
