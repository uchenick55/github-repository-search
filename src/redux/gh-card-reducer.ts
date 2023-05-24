import {InferActionsTypes} from "./store-redux";

const AAA = "myApp/app-reducer/AAA"; //константа задания поискового запроса в стейт

export const GithubActions = {
    setAAA: (aaa: string) => { // экшн креатор задания 
        return {type: AAA, aaa} as const
    },
}

type CardActionTypes = InferActionsTypes<typeof GithubActions>

type initialStateType = typeof initialState

let initialState = { //стейт по умолчанию для карточки репозитория
    CardData: // заглушка, захардкодил карточку автора репозитория
        {
            "name": "multidiffusion-upscaler-for-automatic1111",
            "stargazers": {"totalCount": 2311, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {"committedDate": "2023-05-22T19:44:01Z", "__typename": "Commit"},
                "__typename": "Ref"
            },
            "owner": {
                "avatarUrl": "https://avatars.githubusercontent.com/u/59076257?u=60308b91eaf54a0a6bafeb3413c5c13321888799&v=4",
                "login": "pkuliyi2015",
                "url": "https://github.com/pkuliyi2015",
                "__typename": "User"
            },
            "languages": {
                "nodes": [{"name": "Python", "__typename": "Language"}, {
                    "name": "JavaScript",
                    "__typename": "Language"
                }], "__typename": "LanguageConnection"
            },
            "description": "Tiled Diffusion and VAE optimize, licensed under CC BY-NC-SA 4.0",
            "url": "https://github.com/pkuliyi2015/multidiffusion-upscaler-for-automatic1111",
            "__typename": "Repository"
        }

}
export type CardDataType = typeof initialState.CardData

let ghCardListReducer = (state: initialStateType = initialState, action: CardActionTypes): initialStateType => {//редьюсер инициализации приложения
    let stateCopy: initialStateType; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case AAA: // экшн задания поискового запроса в стейт
            stateCopy = {
                ...state, // копия всего стейта
            }
            return stateCopy; // возврат копии стейта после изменения
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}

export default ghCardListReducer;










