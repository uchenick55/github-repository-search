import React, {useEffect} from "react";
import {GlobalStateType} from "../../../redux/store-redux";
import {connect} from "react-redux";
import GitHubCOM from "./GitHubCOM";
import ghListReducer, {GithubActions, PaginationDataType} from "../../../redux/gh-list-reducer";

const RepoListContainer: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
    {MyRepositoriesData, SearchResultData, setSearchQueryAC, PaginationData, setPaginationDataAC}) => {
    const setSearchQuery = (searchQuery: string) => {
        setSearchQueryAC( searchQuery )
    }

    return <div>
        <GitHubCOM MyRepositoriesData={MyRepositoriesData} SearchResultData={SearchResultData}
                   setSearchQuery={setSearchQuery} PaginationData={PaginationData}
                   setPaginationDataAC={setPaginationDataAC}/>
    </div>
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        MyRepositoriesData: state.ghList.MyRepositoriesData, // данные моего репозитория
        SearchResultData: state.ghList.SearchResultData, // данные поиска репозиториев
        PaginationData: state.ghList.PaginationData
    }
}
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
    setSearchQueryAC: (searchQuery: string) => void // экшн креатор задания поискового запроса из поля ввода в стейт
    setPaginationDataAC: (PaginationData: PaginationDataType) => void //экшн креатор задания данных пагинации в стейт
}
const {setSearchQueryAC, setPaginationDataAC} = GithubActions
export default connect<mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType>( mapStateToProps, {
    setSearchQueryAC, setPaginationDataAC
} )( RepoListContainer );
// коннектим к app флаг и санки инициализации
