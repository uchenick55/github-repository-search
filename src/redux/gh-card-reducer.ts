import {InferActionsTypes} from "./store-redux";
import {CardDataType, ComThunkTp} from "../common/types/commonTypes";
import {AppActions} from "./app-reducer";
import {gitHubQuery} from "../api/graphQl";

const SET_CARD_DATA = "myApp/app-reducer/SET_CARD_DATA"; //константа задания данных карточки

export const GhCardActions = {
    setCardDataAC: (CardData: CardDataType) => { // экшн креатор задания  карточки
        return {type: SET_CARD_DATA, CardData} as const
    },
}

type CardActionTypes = InferActionsTypes<typeof GhCardActions> | InferActionsTypes<typeof AppActions>

type initialStateType = typeof initialState

let initialState = { //стейт по умолчанию для карточки репозитория
    CardData: // заглушка, захардкодил карточку автора репозитория
        {
            "name": "freeCodeCamp",
            "stargazers": {
                "totalCount": 367457,
                "__typename": "StargazerConnection"
            },
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-05-26T16:21:43Z",
                    "__typename": "Commit"
                },
                "__typename": "Ref"
            },
            "owner": {
                "avatarUrl": "https://avatars.githubusercontent.com/u/9892522?v=4",
                "login": "freeCodeCamp",
                "url": "https://github.com/freeCodeCamp",
                "__typename": "Organization"
            },
            "languages": {
                "nodes": [
                    {
                        "name": "TypeScript",
                        "__typename": "Language"
                    },
                    {
                        "name": "JavaScript",
                        "__typename": "Language"
                    },
                    {
                        "name": "CSS",
                        "__typename": "Language"
                    },
                    {
                        "name": "Dockerfile",
                        "__typename": "Language"
                    },
                    {
                        "name": "EJS",
                        "__typename": "Language"
                    },
                    {
                        "name": "HTML",
                        "__typename": "Language"
                    },
                    {
                        "name": "Shell",
                        "__typename": "Language"
                    },
                    {
                        "name": "Less",
                        "__typename": "Language"
                    }
                ],
                "__typename": "LanguageConnection"
            },
            "description": "freeCodeCamp.org's open-source codebase and curriculum. Learn to code for free.",
            "url": "https://github.com/freeCodeCamp/freeCodeCamp",
            "__typename": "Repository"
        }

}

let ghCardListReducer = (state: initialStateType = initialState, action: CardActionTypes): initialStateType => {//редьюсер инициализации приложения
    let stateCopy: initialStateType; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_CARD_DATA: // экшн задания поискового запроса в стейт
            stateCopy = {
                ...state, // копия всего стейта
                CardData: action.CardData
            }
            return stateCopy; // возврат копии стейта после изменения
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}
export const getCardDataThCr = (cardId: string): ComThunkTp<CardActionTypes> => {//санкреатор получения SearchResultData с gitHub через axios/grapgQl
    return (dispatch, getState) => { // санка
        console.log( "получение SearchResultData с gitHub через axios/grapgQl" )
        dispatch( AppActions.setIsFetchingAC( true ) ) // начать процесс загрузки
        gitHubQuery.getCardData( cardId ).then((response1: CardDataType)=>{
            console.log( "searchRepos", response1 )
            dispatch( GhCardActions.setCardDataAC( response1 ) )  //записать полученное SearchResultData с gitHub в store
            dispatch( AppActions.setIsFetchingAC( false ) ) // убрать процесс загрузки
        })
    }
}

export default ghCardListReducer;










