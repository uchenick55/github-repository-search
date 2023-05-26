import { InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../common/types/commonTypes";
import {getMyRepositoriesDataThCr, getPaginationDataThunkCreator, getSearchQueryThunkCreator} from "./gh-list-reducer";

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
        const promise1 = dispatch(getPaginationDataThunkCreator())// получить данные по пагинации
        const promise2 = dispatch(getSearchQueryThunkCreator())// получить данные по поисковому запросу
        Promise.all( [promise1, promise2] ) // если все промисы зарезолвились
            .then( () => {
                dispatch( AppActions.setInitialisedApp() ) // смена флага инициализации на true
            } )
    };
}

export default appReducer;










