import React from "react";
import {GlobalStateType} from "../../../redux/store-redux";
import {connect} from "react-redux";
import GitHubCOM from "./GitHubCOM";
import {
    GithubActions,
    PaginationDataType,
    setPaginationDataThunkCreator, setSearchQueryThunkCreator
} from "../../../redux/gh-list-reducer";

const RepoListContainer: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
    {MyRepositoriesData, SearchResultData, PaginationData,
        setPaginationDataThunkCreator, setSearchQueryThunkCreator, SearchQuery}) => {

    const setSearchQuery = (searchQuery: string) => {
        //GithubActions.setSearchResultDataAC([])
        setSearchQueryThunkCreator(searchQuery)

    }

    const setPaginationData = (PaginationData: PaginationDataType) => {
        setPaginationDataThunkCreator(PaginationData)
    }

    return <div>
        <GitHubCOM MyRepositoriesData={MyRepositoriesData} SearchResultData={SearchResultData}
                   setSearchQuery={setSearchQuery} PaginationData={PaginationData}
                   setPaginationData={setPaginationData} SearchQuery={SearchQuery}/>
    </div>
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        MyRepositoriesData: state.ghList.MyRepositoriesData, // данные моего репозитория
        SearchResultData: state.ghList.SearchResultData, // данные поиска репозиториев
        PaginationData: state.ghList.PaginationData, //данные для пагинации
        SearchQuery: state.ghList.SearchQuery, // значение поля поиска (после ввода)
    }
}
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
    setPaginationDataThunkCreator: (PaginationData: PaginationDataType) => void//санкреатор задания данных пагинации в локалсторадж и потом в стейт
    setSearchQueryThunkCreator: (SearchQuery: string) => void //санкреатор задания данных SearchQuery в локалсторадж и потом в стейт
}
export default connect<mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType>( mapStateToProps, {
    setPaginationDataThunkCreator, setSearchQueryThunkCreator,
} )( RepoListContainer );
// коннектим к app флаг и санки инициализации
