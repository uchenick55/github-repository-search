import React, {useEffect} from 'react';
import GitHubContainer from "./components/Github/GithubContainer";
import ErrorBoundary from "./components/common/ErrorBoundary/ErrorBoundary";
import {GlobalStateType} from "./redux/store-redux";
import {connect} from "react-redux";
import {initialisedAppThunkCreator} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

const App: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
    {initialisedAppThunkCreator, initialisedApp}) => {

    useEffect( () => {
        initialisedAppThunkCreator() // запускаем инициализацию приложения

    }, [] )
    if (!initialisedApp) { // если приложение еще не инициализировано
        return <Preloader/> // показать статус загрузки
    }

    return <div>
        <ErrorBoundary> {/*Общий обработчик ошибок во всем приложении*/}

            <GitHubContainer/>
        </ErrorBoundary>
    </div>
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        initialisedApp: state.app.initialisedApp, // флаг инициализации приложения
    }
}
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
    initialisedAppThunkCreator: () => void,
}

export default connect<mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType>( mapStateToProps, {initialisedAppThunkCreator} )( App );
// коннектим к app флаг и санки инициализации
