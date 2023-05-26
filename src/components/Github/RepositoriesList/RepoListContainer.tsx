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
    {MyRepositoriesData, SearchResultData, PaginationData,
        setPaginationDataThunkCreator, setSearchQueryThunkCreator, SearchQuery, IsFetching,
        getMyRepositoriesDataThCr, getSearchResultDataThCr}) => {

    const setSearchQuery = (searchQuery: string) => {
        setSearchQueryThunkCreator(searchQuery)
    }

    const setPaginationData = (PaginationData: PaginationDataType) => {
        setPaginationDataThunkCreator(PaginationData)
    }

    useEffect(()=>{
        if (SearchQuery==="" && MyRepositoriesData.length===0) {
            console.log("разово получить данные по моим репозиториям")
            getMyRepositoriesDataThCr()
        } else {
            console.log("разово получить данные по поисковому запросу")
            getSearchResultDataThCr(SearchQuery)
        }
    },[])






    return <div>
        <GitHubCOM MyRepositoriesData={MyRepositoriesData} SearchResultData={SearchResultData}
                   setSearchQuery={setSearchQuery} PaginationData={PaginationData}
                   setPaginationData={setPaginationData} SearchQuery={SearchQuery}
                   IsFetching={IsFetching}
        />
    </div>
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        MyRepositoriesData: state.ghList.MyRepositoriesData, // данные моего репозитория
        SearchResultData: state.ghList.SearchResultData, // данные поиска репозиториев
        PaginationData: state.ghList.PaginationData, //данные для пагинации
        SearchQuery: state.ghList.SearchQuery, // значение поля поиска (после ввода)
        IsFetching:state.app.IsFetching, // индикатор процесса загрузки
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
