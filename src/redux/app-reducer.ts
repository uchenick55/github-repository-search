import {InferActionsTypes} from "./store-redux";
import {ComThunkTp, RepositoriesDataType} from "../common/types/commonTypes";
import {
    getMyRepositoriesDataThCr,
    getPaginationDataThunkCreator,
    getSearchQueryThunkCreator,
    GithubActions
} from "./gh-list-reducer";
import {gitHubQuery} from "../api/graphQl";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const SET_INITIALISED_APP = "myApp/app-reducer/SET_INITIALISED_APP"; //константа инициализации приложения
const SET_IS_FETCHING = "myApp/app-reducer/SET_IS_FETCHING"; //константа задания процесса загрузки

export const AppActions = {
    setInitialisedApp: () => { // экшн креатор  инициализации приложения
        return {type: SET_INITIALISED_APP} as const
    },
    setIsFetchingAC: (IsFetching: boolean) => { // экшн креатор задания процесса загрузки
        return {type: SET_IS_FETCHING, IsFetching} as const
    },

}

type AppActionTypes = InferActionsTypes<typeof AppActions>

type initialStateType = typeof initialState

const initialState = { //стейт по умолчанию для инициализации приложения
    initialisedApp: false, // флаг приложение инициализировано?
    IsFetching: false // индикатор процесса загрузки

}

const appReducer = (state: initialStateType = initialState, action: AppActionTypes): initialStateType => {//редьюсер инициализации приложения
    let stateCopy: initialStateType; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_INITIALISED_APP: // экшн инициализации приложения
            stateCopy = {
                ...state, // копия всего стейта
                initialisedApp: true, // смена флага инициализации приложения на true
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_IS_FETCHING: // экшн задания индикатора загрузки
            stateCopy = {
                ...state, // копия всего стейта
                IsFetching: action.IsFetching
            }
            return stateCopy; // возврат копии стейта после изменения
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}

export const initialisedAppThunkCreator = (): ComThunkTp<AppActionTypes> => {// санкреатор инициализации приложения
    return (dispatch, getState) => { // санки  инициализации приложения
        const promise1 = dispatch( getPaginationDataThunkCreator() )// получить данные по пагинации
        const promise2 = dispatch( getSearchQueryThunkCreator() )// получить данные по поисковому запросу
        Promise.all( [promise1, promise2] ) // если все промисы зарезолвились
            .then( () => {
                dispatch( AppActions.setInitialisedApp() ) // смена флага инициализации на true
            } )
    };
}

export const checkGhTokenThCr = (): ComThunkTp<AppActionTypes> => {//санкреатор проверки токена github
    return (dispatch, getState) => { // санка
        dispatch( AppActions.setIsFetchingAC( true ) ) // начать процесс загрузки
        gitHubQuery.checkGhToken().then( (response1: any) => {

                console.log( "checkGhTokenThCr", response1 )
          //  dispatch(initialisedAppThunkCreator())
            }
        )
            .catch( (error1) => {
                    console.log( error1 )
                }
            )
    }
}


export default appReducer;










