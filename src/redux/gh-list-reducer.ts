import {InferActionsTypes} from "./store-redux";
import {apiCommon} from "../api/apiLocalStorage";
import {ComThunkTp, RepositoriesDataType} from "../common/types/commonTypes";
import {gitHubQuery} from "../api/graphQl";
import {AppActions} from "./app-reducer";

const SET_SEARCH_QUERY = "myApp/app-reducer/SET_SEARCH_QUERY"; //константа задания поискового запроса в стейт
const SET_PAGINATION_DATA = "myApp/app-reducer/SET_PAGINATION_DATA"; //константа задания данных пагинации
const SET_MY_REPOSITORIES_DATA = "myApp/app-reducer/SET_MY_REPOSITORIES_DATA"; //константа задания MyRepositoriesData
const SET_SEARCH_RESULT_DATA = "myApp/app-reducer/SET_SEARCH_RESULT_DATA"; //константа задания SearchResultData
const SET_REPOSITORIES_DATA = "myApp/app-reducer/SET_REPOSITORIES_DATA"; //константа задания RepositoriesData
const SET_LIST_MARKERS = "myApp/app-reducer/SET_LIST_MARKERS"; //константа задания вспомогательных маркеров

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
    setRepositoriesDataAC: (RepositoriesData: Array<RepositoriesDataType>) => { // экшн креатор задания MyRepositoriesData
        return {type: SET_REPOSITORIES_DATA, RepositoriesData} as const
    },
    setListMarkersAC: (ListMarkers: MarkersListType) => { // экшн креатор задания вспомогательных макреров
        return {type: SET_LIST_MARKERS, ListMarkers} as const
    },
}

type GithubActionTypes = InferActionsTypes<typeof GithubActions> | InferActionsTypes<typeof AppActions>

type initialStateGhListType = typeof initialStateGhList

export const initialStateGhList = { //стейт по умолчанию с гитхаба
    SearchQuery: "", // поисковый запрос после нажатия на ввоод поля ввода
    PaginationData: { // данные пагинации
        totalRepositoriesCount: 0, // общее число репозиториев, загруженых с сервера
        pageSize: 10, // количество репозиториев на одной странице
        currentPage: 1, // текущая страница пагинации
    },
    RepositoriesData: // данные по всем репозиториям (либо мои репозитории, либо результаты поиска)
        [] as Array<RepositoriesDataType>,
    ListMarkers: { // вспомогательные маркеры для List (исключить повторные рендеры и загрузки)
        IsRepositoriesDataUploaded: false, // загружены ли данные по репозиториям
    }
}
export type PaginationDataType = typeof initialStateGhList.PaginationData
export type MarkersListType = typeof initialStateGhList.ListMarkers

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
        case SET_REPOSITORIES_DATA: // экшн задания RepositoriesData
            stateCopy = {
                ...state, // копия всего стейта
                RepositoriesData: action.RepositoriesData,
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_LIST_MARKERS: // экшн задания ListMarkers
            stateCopy = {
                ...state, // копия всего стейта
                ListMarkers: action.ListMarkers,
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

        dispatch( setPaginationDataThunkCreator( initialStateGhList.PaginationData ) ) // зануление пагинации при новом поисковом запросе

        if (response1 !== "") { // при непустом поисковом запросе
            console.log( "после записи нового SearchQuery в стейт, запускаем получение данных graphQl с сервера" )
            dispatch( getSearchResultDataThCr( SearchQuery ) )  // получить данные с сервера SearchResultData
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
    return (dispatch, getState) => { // санка
        dispatch( AppActions.setIsFetchingAC( true ) ) // начать процесс загрузки
        gitHubQuery.getStarredRepos(getState().app.GITHUB_TOKEN).then( (response1: Array<RepositoriesDataType>) => {
            dispatch( GithubActions.setMyRepositoriesDataAC( response1 ) );  //записать полученное MyRepositoriesData с gitHub в store
            dispatch( GithubActions.setRepositoriesDataAC( response1 ) );  //записать полученное MyRepositoriesData с gitHub в store
            dispatch( AppActions.setIsFetchingAC( false ) ) // убрать процесс загрузки

            dispatch( GithubActions.setListMarkersAC( {
                ...getState().ghList.ListMarkers,
                IsRepositoriesDataUploaded: true
            } ) )
            console.log( "getMyRepositoriesDataThCr - IsRepositoriesDataUploaded: true" )

            }
        )
    }
}
export const getSearchResultDataThCr = (SearchQuery: string): ComThunkTp<GithubActionTypes> => {//санкреатор получения SearchResultData с gitHub через axios/grapgQl
    return (dispatch, getState) => { // санка
        dispatch( AppActions.setIsFetchingAC( true ) ) // начать процесс загрузки
        gitHubQuery.searchRepos( SearchQuery, getState().app.GITHUB_TOKEN ).then( (response1: Array<RepositoriesDataType>) => {
            console.log( "получены данные SearchResultData с gitHub", response1 )
            dispatch( GithubActions.setSearchResultDataAC( response1 ) )  //записать полученное SearchResultData с gitHub в store
            dispatch( GithubActions.setRepositoriesDataAC( response1 ) );  //записать полученное SearchResultData с gitHub в store
            dispatch( AppActions.setIsFetchingAC( false ) ) // убрать процесс загрузки

            dispatch( GithubActions.setListMarkersAC( {
                ...getState().ghList.ListMarkers,
                IsRepositoriesDataUploaded: true
            } ) )
            console.log( "маркер загрузки SearchResultData переведен в true" )


        } )
    }
}


export default ghListReducer;










