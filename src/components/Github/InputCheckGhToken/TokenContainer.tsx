import React, {useEffect} from "react";
import {GlobalStateType} from "../../../redux/store-redux";
import {connect} from "react-redux";
import InputCheckGhToken from "./InputCheckGhToken";
import {checkGhTokenThCr} from "../../../redux/app-reducer";
import {compose} from "redux";
import NavigateToLoginHoc2 from "../../../common/hoc/NavigateToLoginHoc2";


const TokenContainer: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
    {checkGhTokenThCr, ServerError, IsFetching})=> {

    const setTokenToState = (Token:string) =>  {
        checkGhTokenThCr(Token)
    }

    return <div>
        <InputCheckGhToken setTokenToState={setTokenToState} ServerError={ServerError} IsFetching={IsFetching}/>
    </div>
}




const mapStateToProps = (state: GlobalStateType) => {
    return {
        IsFetching:state.app.IsFetching, // индикатор процесса загрузки
        ServerError: state.app.ServerError // ошибки с сервера
    }

}
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
    checkGhTokenThCr:  (Token:string) => void //
}

// export default connect<mapStateToPropsType,
//     mapDispatchToPropsType,
//     unknown,
//     GlobalStateType>( mapStateToProps, {
//     checkGhTokenThCr
// } )( TokenContainer )


export default compose<React.ComponentType>(
    connect<mapStateToPropsType, // тип mapStateToProps
        mapDispatchToPropsType, // тип mapDispatchToProps
        unknown, // тип входящих пропсов от родителя
        GlobalStateType // глобальный стейт из стора
        >( mapStateToProps, {
            checkGhTokenThCr
    } ),
    NavigateToLoginHoc2// проверка, залогинен ли я
)( TokenContainer )