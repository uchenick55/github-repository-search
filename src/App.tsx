import React, {useEffect} from 'react';
import RepoListContainer from "./components/Github/RepositoriesList/RepoListContainer";
import ErrorBoundary from "./common/ErrorBoundary/ErrorBoundary";
import {GlobalStateType} from "./redux/store-redux";
import {connect} from "react-redux";
import {initialisedAppThunkCreator} from "./redux/app-reducer";
import Preloader from "./common/Preloader/Preloader";
import {HashRouter} from "react-router-dom";
import CardContainer from "./components/Github/Card/CardContainer";
import {Route, Routes} from "react-router-dom";

const App: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
    {initialisedAppThunkCreator, initialisedApp}) => {

    useEffect( () => {
        initialisedAppThunkCreator() // запускаем инициализацию приложения

    }, [] )
    if (!initialisedApp) { // если приложение еще не инициализировано
        return <Preloader/> // показать статус загрузки
    }

    return <div>
        <HashRouter> {/*BrowserRouter для продакшн, HashRouter для gh-pages*/}
            <ErrorBoundary> {/*Общий обработчик ошибок во всем приложении*/}
                <Routes> {/*в зависимости от URL подгрузка разного контента*/}
                    <Route path='' element={<RepoListContainer/>}/> {/*лист репозиториев - моих, или с поиска*/}
                    <Route path='/card/*' element={<CardContainer/>}/> {/*карточка репозитория*/}
                </Routes>
            </ErrorBoundary>
        </HashRouter>
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
