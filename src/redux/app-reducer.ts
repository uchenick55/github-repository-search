import { InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../types/commonTypes";

const SET_INITIALISED_APP = "myApp/app-reducer/SET_INITIALISED_APP"; //константа инициализации приложения
const SET_PATCH = "myApp/app-reducer/SET_PATCH"; //константа задания пути в URL

export const AppActions = {
    setInitialisedApp: () => { // экшн креатор  инициализации приложения
        return {type: SET_INITIALISED_APP} as const
    },
    setPatch: (patch: string) => { // экшн зануления при логауте
        return {type: SET_PATCH, patch} as const
    },

}

type AppActionTypes = InferActionsTypes<typeof AppActions>

type initialStateType = typeof initialState

let initialState = { //стейт по умолчанию для инициализации приложения
    initialisedApp: false, // флаг приложение инициализировано?
    patch: "", // название страницы из URL

}

let appReducer = (state: initialStateType = initialState, action: AppActionTypes): initialStateType => {//редьюсер инициализации приложения
    let stateCopy: initialStateType; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_INITIALISED_APP: // экшн инициализации приложения
            stateCopy = {
                ...state, // копия всего стейта
                initialisedApp: true, // смена флага инициализации приложения на true
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_PATCH: // экшн задания пути из URL
            stateCopy = {
                ...state, // копия всего стейта
                patch: action.patch, // задание пути
            }
            return stateCopy; // возврат копии стейта после изменения

        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}

export const initialisedAppThunkCreator = (): ComThunkTp<AppActionTypes> => {// санкреатор инициализации приложения
    return (dispatch, getState) => { // санки  инициализации приложения
        const promise1 = 123  //dispatch( getAuthMeThunkCreator()) проверка статуса авторизации
        Promise.all( [promise1] ) // если все промисы зарезолвились
            .then( () => {
                dispatch( AppActions.setInitialisedApp() ) // смена флага инициализации на true
            } )
    };
}

export default appReducer;










