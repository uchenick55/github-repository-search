import React, {useEffect} from "react";
import {GlobalStateType} from "../../../redux/store-redux";
import {connect} from "react-redux";
import GitHubCOM from "./GitHubCOM";
import {GithubActions, PaginationDataType} from "../../../redux/github-reducer";

const GitHubContainer: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
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
        MyRepositoriesData: state.github.MyRepositoriesData, // данные моего репозитория
        SearchResultData: state.github.SearchResultData, // данные поиска репозиториев
        CardData: state.github.CardData, //  карточка автора репозитория
        PaginationData: state.github.PaginationData
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
} )( GitHubContainer );
// коннектим к app флаг и санки инициализации
