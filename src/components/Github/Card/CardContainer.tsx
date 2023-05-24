import {GlobalStateType} from "../../../redux/store-redux";
import {connect} from "react-redux";
import React from "react";
import CardCommon from "./CardCommon";

const CardContainer:React.FC<mapStateToPropsType & mapDispatchToPropsType> = ({CardData}) => {
    return <div>
        <CardCommon CardData={CardData}/>
    </div>
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        CardData: state.ghCard.CardData
    }
}
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
}
export default connect<mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType>( mapStateToProps, {
} )( CardContainer );