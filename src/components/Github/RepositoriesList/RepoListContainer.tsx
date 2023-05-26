import React, {useEffect} from "react";
import {GlobalStateType} from "../../../redux/store-redux";
import {connect} from "react-redux";
import GitHubCOM from "./GitHubCOM";
import {
    getMyRepositoriesDataThCr, getSearchResultDataThCr,
    GithubActions,
    PaginationDataType,
    setPaginationDataThunkCreator, setSearchQueryThunkCreator
} from "../../../redux/gh-list-reducer";

const RepoListContainer: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
    { PaginationData, setPaginationDataThunkCreator, setSearchQueryThunkCreator, SearchQuery,
        IsFetching, getMyRepositoriesDataThCr, getSearchResultDataThCr, RepositoriesData}) => {

    const setSearchQuery = (searchQuery: string) => {
        setSearchQueryThunkCreator(searchQuery)
    }

    const setPaginationData = (PaginationData: PaginationDataType) => {
        setPaginationDataThunkCreator(PaginationData)
    }

    useEffect(()=>{
        if (SearchQuery==="") {
            console.log("получить данные по моим репозиториям")
            getMyRepositoriesDataThCr()
        } else {
            console.log("получить данные по поисковому запросу")
            getSearchResultDataThCr(SearchQuery)
        }
    },[SearchQuery])






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

    }
}
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
    setPaginationDataThunkCreator: (PaginationData: PaginationDataType) => void//санкреатор задания данных пагинации в локалсторадж и потом в стейт
    setSearchQueryThunkCreator: (SearchQuery: string) => void //санкреатор задания данных SearchQuery в локалсторадж и потом в стейт
    getMyRepositoriesDataThCr: () => void, // получение данных моих репозиториев
    getSearchResultDataThCr: (SearchQuery:string) => void, // получение данных поискового запроса
}
export default connect<mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType>( mapStateToProps, {
    setPaginationDataThunkCreator, setSearchQueryThunkCreator,
    getMyRepositoriesDataThCr, getSearchResultDataThCr
} )( RepoListContainer );
// коннектим к app флаг и санки инициализации
