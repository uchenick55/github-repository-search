import React, {useEffect} from "react";
import {GlobalStateType} from "../../../redux/store-redux";
import {connect} from "react-redux";
import GitHubCOM from "./GitHubCOM";
import {
    getMyRepositoriesDataThCr, getSearchResultDataThCr, GithubActions, MarkersListType,
    PaginationDataType,
    setPaginationDataThunkCreator, setSearchQueryThunkCreator
} from "../../../redux/gh-list-reducer";
import {compose} from "redux";
import NavigateToLoginHoc2 from "../../../common/hoc/NavigateToLoginHoc2";

const RepoListContainer: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
    { PaginationData, setPaginationDataThunkCreator, setSearchQueryThunkCreator, SearchQuery,
        IsFetching, getMyRepositoriesDataThCr, getSearchResultDataThCr, RepositoriesData, ListMarkers,
        setListMarkersAC,}) => {

    const setSearchQuery = (searchQuery: string) => {
        !IsFetching && // если загрузка еще не идет (защита от повторной отправки запроса)
            setSearchQueryThunkCreator(searchQuery) // запрашиваем новые данные поиска

        if (searchQuery==="") { // при обнулении поискового запроса меняем маркер для загрузки моих репозиториев
            setListMarkersAC( {
                    ...ListMarkers,
                    IsRepositoriesDataUploaded: false
                }
            )
        }
    }

    const setPaginationData = (PaginationData: PaginationDataType) => {
        setPaginationDataThunkCreator(PaginationData)
    }

    useEffect(()=>{
        if (!ListMarkers.IsRepositoriesDataUploaded) {

            if (SearchQuery==="") {
                console.log("запросить данные по моим репозиториям")
                getMyRepositoriesDataThCr()
            } else {
                console.log("запросить данные по поисковому запросу")
                getSearchResultDataThCr(SearchQuery)
            }
        }
    },[SearchQuery, ListMarkers.IsRepositoriesDataUploaded, getMyRepositoriesDataThCr, getSearchResultDataThCr])

    return <div>
        <GitHubCOM setSearchQuery={setSearchQuery} PaginationData={PaginationData}
                   setPaginationData={setPaginationData} SearchQuery={SearchQuery}
                   IsFetching={IsFetching} RepositoriesData={RepositoriesData}
        />
    </div>
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        PaginationData: state.ghList.PaginationData, //данные для пагинации
        SearchQuery: state.ghList.SearchQuery, // значение поля поиска (после ввода)
        IsFetching:state.app.IsFetching, // индикатор процесса загрузки
        RepositoriesData: state.ghList.RepositoriesData, // данные списка репозиториев моих, либо поиска
        ListMarkers: state.ghList.ListMarkers, // вспомогательные маркеры
    }
}
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
    setPaginationDataThunkCreator: (PaginationData: PaginationDataType) => void//санкреатор задания данных пагинации в локалсторадж и потом в стейт
    setSearchQueryThunkCreator: (SearchQuery: string) => void //санкреатор задания данных SearchQuery в локалсторадж и потом в стейт
    getMyRepositoriesDataThCr: () => void, // получение данных моих репозиториев
    getSearchResultDataThCr: (SearchQuery:string) => void, // получение данных поискового запроса
    setListMarkersAC: (ListMarkers: MarkersListType) => void // изменение вспомогательных флагов ListMarkers
}

const {setListMarkersAC} = GithubActions

export default compose<React.ComponentType>(
    connect<mapStateToPropsType, // тип mapStateToProps
        mapDispatchToPropsType, // тип mapDispatchToProps
        unknown, // тип входящих пропсов от родителя
        GlobalStateType // глобальный стейт из стора
        >( mapStateToProps, {
           setPaginationDataThunkCreator, setSearchQueryThunkCreator,
           getMyRepositoriesDataThCr, getSearchResultDataThCr, setListMarkersAC
    } ),
     NavigateToLoginHoc2 //проверка, залогинен ли я
)( RepoListContainer )
