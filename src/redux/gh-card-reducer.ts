import {InferActionsTypes} from "./store-redux";
import {CardDataType, ComThunkTp} from "../common/types/commonTypes";
import {AppActions} from "./app-reducer";
import {gitHubQuery} from "../api/graphQl";

const SET_CARD_DATA = "myApp/app-reducer/SET_CARD_DATA"; //константа задания данных карточки
const SET_CARD_MARKERS = "myApp/app-reducer/SET_CARD_MARKERS"; //константа задания вспомогательных маркеров

export const GhCardActions = {
    setCardDataAC: (CardData: CardDataType) => { // экшн креатор задания  карточки
        return {type: SET_CARD_DATA, CardData} as const
    },
    setCardMarkersAC: (CardMarkers: CardMarkersType) => { // экшн креатор задания вспомогательных макреров
        return {type: SET_CARD_MARKERS, CardMarkers} as const
    },

}

type CardActionTypes = InferActionsTypes<typeof GhCardActions> | InferActionsTypes<typeof AppActions>

type initialStateType = typeof initialState

let initialState = { //стейт по умолчанию для карточки репозитория
    CardData: // данные загруженой карточки
        {} as CardDataType,
    CardMarkers: { // вспомогательные маркеры для cards (исключить рендеры до загрузки данных)
        IsCardDataUploaded: false // загружены ли данные карточки
    }
}
export type CardMarkersType = typeof initialState.CardMarkers

let ghCardListReducer = (state: initialStateType = initialState, action: CardActionTypes): initialStateType => {//редьюсер инициализации приложения
    let stateCopy: initialStateType; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_CARD_DATA: // экшн задания поискового запроса в стейт
            stateCopy = {
                ...state, // копия всего стейта
                CardData: action.CardData
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_CARD_MARKERS: // экшн задания вспомогательных маркеров
            stateCopy = {
                ...state, // копия всего стейта
                CardMarkers: action.CardMarkers
            }
            return stateCopy; // возврат копии стейта после изменения
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}
export const getCardDataThCr = (cardId: string): ComThunkTp<CardActionTypes> => {//санкреатор получения SearchResultData с gitHub через axios/grapgQl
    return (dispatch, getState) => { // санка

        dispatch( AppActions.setIsFetchingAC( true ) ) // начать процесс загрузки
        gitHubQuery.getCardData( cardId, getState().app.GITHUB_TOKEN ).then((response1: CardDataType)=>{
            console.log( "получены данные SearchResultData с gitHub через axios/grapgQl", response1 )

            dispatch( GhCardActions.setCardDataAC( response1 ) )  //записать полученное SearchResultData с gitHub в store
            dispatch( AppActions.setIsFetchingAC( false ) ) // убрать процесс загрузки

            dispatch(GhCardActions.setCardMarkersAC({
                ...getState().ghCard.CardMarkers,
                IsCardDataUploaded: true
            }))
            console.log( "меркер загруки данных карточки переведен в true" )

        })
    }
}

export default ghCardListReducer;










