import {GlobalStateType, InferActionsTypes} from "./store-redux";
import {apiCommon} from "../api/apiLocalStorage";
import {Dispatch} from "redux";
import {ComThunkTp, RepositoriesDataType} from "../common/types/commonTypes";
import {gitHubQuery} from "../api/graphQl";

const SET_SEARCH_QUERY = "myApp/app-reducer/SET_SEARCH_QUERY"; //константа задания поискового запроса в стейт
const SET_PAGINATION_DATA = "myApp/app-reducer/SET_PAGINATION_DATA"; //константа задания данных пагинации
const SET_MY_REPOSITORIES_DATA = "myApp/app-reducer/SET_MY_REPOSITORIES_DATA"; //константа задания MyRepositoriesData
const SET_SEARCH_RESULT_DATA = "myApp/app-reducer/SET_SEARCH_RESULT_DATA"; //константа задания SearchResultData
const SET_IS_FETCHING = "myApp/app-reducer/SET_IS_FETCHING"; //константа задания процесса загрузки

export const GithubActions = {
    setSearchQueryAC: (SearchQuery: string) => { // экшн креатор задания поискового запроса в стейт
        return {type: SET_SEARCH_QUERY, SearchQuery} as const
    },
    setPaginationDataAC: (PaginationData: PaginationDataType) => { // экшн креатор задания объекта с данными пагинации в стейт
        return {type: SET_PAGINATION_DATA, PaginationData} as const
    },
    setMyRepositoriesDataAC: (MyRepositoriesData: Array<RepositoriesDataType>) => { // экшн креатор задания MyRepositoriesData
        return {type: SET_MY_REPOSITORIES_DATA, MyRepositoriesData} as const
    },
    setSearchResultDataAC: (SearchResultData: Array<RepositoriesDataType>) => { // экшн креатор задания SearchResultData
        return {type: SET_SEARCH_RESULT_DATA, SearchResultData} as const
    },
    setIsFetchingAC: (IsFetching: boolean) => { // экшн креатор задания процесса загрузки
        return {type: SET_IS_FETCHING, IsFetching} as const
    },
}

type GithubActionTypes = InferActionsTypes<typeof GithubActions>

type initialStateGhListType = typeof initialStateGhList

export const initialStateGhList = { //стейт по умолчанию с гитхаба
    SearchQuery: "", // поисковый запрос после нажатия на ввоод поля ввода
    PaginationData: { // данные пагинации
        totalRepositoriesCount: 0, // общее число репозиториев, загруженых с сервера
        pageSize: 10, // количество репозиториев на одной странице
        currentPage: 1, // текущая страница пагинации
    },
    MyRepositoriesData: // заглушка, пока захардкодил список вместо моих репозиториев для примера
        [] as Array<RepositoriesDataType>,
    SearchResultData:  // заглушка, данные поиска репозиториев
        [] as Array<RepositoriesDataType>,
    IsFetching:false // индикатор процесса загрузки
}
export type SearchResultDataType = typeof initialStateGhList.SearchResultData
export type PaginationDataType = typeof initialStateGhList.PaginationData

let ghListReducer = (state: initialStateGhListType = initialStateGhList, action: GithubActionTypes): initialStateGhListType => {//редьюсер инициализации приложения
    let stateCopy: initialStateGhListType; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_SEARCH_QUERY: // экшн задания поискового запроса в стейт
            stateCopy = {
                ...state, // копия всего стейта
                SearchQuery: action.SearchQuery
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_PAGINATION_DATA: // экшн задания данных пагинации в стейт
            stateCopy = {
                ...state, // копия всего стейта
                PaginationData: action.PaginationData
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_MY_REPOSITORIES_DATA: // экшн задания MyRepositoriesData
            stateCopy = {
                ...state, // копия всего стейта
                MyRepositoriesData: action.MyRepositoriesData,
                IsFetching: false
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_SEARCH_RESULT_DATA: // экшн задания SearchResultData
            stateCopy = {
                ...state, // копия всего стейта
                SearchResultData: action.SearchResultData,
                IsFetching: false
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

export const setPaginationDataThunkCreator = (PaginationData: PaginationDataType): ComThunkTp<GithubActionTypes> => {//санкреатор задания PaginationData в LocalStorage и в стейт
    return async (dispatch, getState) => { // санка задания PaginationData в LocalStorage
        console.log( "запись PaginationData в LocalStorage" )
        const response1 = await apiCommon.putPaginationData( PaginationData )  //записать значение PaginationData в localStorage
        if (response1) {
            console.log( "запись PaginationData в стейт" )
            dispatch( GithubActions.setPaginationDataAC( response1 ) )  //записать считаное из localStorage значение PaginationData в store
        }
    }
}
export const getPaginationDataThunkCreator = (): ComThunkTp<GithubActionTypes> => {//санкреатор получения PaginationData из LocalStorage и запись в стейт
    return async (dispatch, getState) => { // санка получения PaginationData из LocalStorage
        console.log( "получить PaginationData из LocalStorage" )
        const response1 = await apiCommon.getPaginationData()  //получить значение PaginationData из localStorage
        if (response1) {
            console.log( "запись PaginationData в стейт" )
            dispatch( GithubActions.setPaginationDataAC( response1 ) )  //записать считаное из localStorage значение PaginationData в store
        }
    }
}
export const setSearchQueryThunkCreator = (SearchQuery: string): ComThunkTp<GithubActionTypes> => {//санкреатор задания SearchQuery в LocalStorage и в стейт
    return async (dispatch, getState) => { // санка задания SearchQuery в LocalStorage
        console.log( "запись SearchQuery в LocalStorage" )

        const response1 = await apiCommon.putSearchQuery( SearchQuery )  //записать значение SearchQuery в localStorage
        console.log( "запись SearchQuery в стейт" )
        dispatch( GithubActions.setSearchQueryAC( response1 ) )  //записать считаное из localStorage значение PaginationData в store

        dispatch(setPaginationDataThunkCreator(initialStateGhList.PaginationData)) // зануление пагинации при новом поисковом запросе

        dispatch(GithubActions.setSearchResultDataAC( [] )) // зануление SearchResultData при новом поисковом запросе

        if (response1 !== "") { // при непустом поисковом запросе
            console.log( "записали новое SearchQuery в стейт, запускаем получение данных graphQl с сервера" )
            dispatch(getSearchResultDataThCr(SearchQuery))  // получить данные с сервера SearchResultData
        }
    }
}
export const getSearchQueryThunkCreator = (): ComThunkTp<GithubActionTypes> => {//санкреатор получения SearchQuery из LocalStorage и в стейт
    return async (dispatch, getState) => { // санка получения SearchQuery из LocalStorage
        console.log( "получить SearchQuery из LocalStorage" )

        const response1 = await apiCommon.getSearchQuery()  //получить значение SearchQuery в localStorage
        console.log( "запись SearchQuery в стейт" )
        dispatch( GithubActions.setSearchQueryAC( response1 ) )  //записать считаное из localStorage значение PaginationData в store
    }
}
export const getMyRepositoriesDataThCr = (): ComThunkTp<GithubActionTypes> => {//санкреатор получения MyRepositoriesData с gitHub через axios/grapgQl
    return async (dispatch, getState) => { // санка
        dispatch( GithubActions.setIsFetchingAC(true)) // начать процесс загрузки
        const response1:Array<RepositoriesDataType> = await gitHubQuery.getStarredRepos()  //получить MyRepositoriesData с gitHub через axios/grapgQl
        dispatch( GithubActions.setMyRepositoriesDataAC( response1 ) )  //записать полученное MyRepositoriesData с gitHub в store
    }
}
export const getSearchResultDataThCr = (SearchQuery:string): ComThunkTp<GithubActionTypes> => {//санкреатор получения SearchResultData с gitHub через axios/grapgQl
    return async (dispatch, getState) => { // санка
        console.log( "получение SearchResultData с gitHub через axios/grapgQl" )
        dispatch( GithubActions.setIsFetchingAC(true)) // начать процесс загрузки
        const response1:Array<any> = await gitHubQuery.searchRepos(SearchQuery)  //получить SearchResultData с gitHub через axios/grapgQl
        console.log("searchRepos", response1)
         dispatch( GithubActions.setSearchResultDataAC( response1 ) )  //записать полученное SearchResultData с gitHub в store
    }
}



export default ghListReducer;










