import React, {useEffect} from "react";
import {GlobalStateType} from "../../../redux/store-redux";
import {connect} from "react-redux";
import GitHubCOM from "./GitHubCOM";
import {
    getPaginationDataThunkCreator,
    GithubActions,
    PaginationDataType,
    setPaginationDataThunkCreator
} from "../../../redux/gh-list-reducer";

const RepoListContainer: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
    {MyRepositoriesData, SearchResultData, setSearchQueryAC, PaginationData,
        setPaginationDataThunkCreator, getPaginationDataThunkCreator}) => {
    const setSearchQuery = (searchQuery: string) => {
        setSearchQueryAC( searchQuery )
    }

    const setPaginationData = (PaginationData: PaginationDataType) => {
       // setPaginationDataAC(PaginationData)
        setPaginationDataThunkCreator(PaginationData)
    }

    useEffect(()=>{
    },[])
    return <div>
        <GitHubCOM MyRepositoriesData={MyRepositoriesData} SearchResultData={SearchResultData}
                   setSearchQuery={setSearchQuery} PaginationData={PaginationData}
                   setPaginationData={setPaginationData}/>
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
    setPaginationDataThunkCreator: (PaginationData: PaginationDataType) => void//санкреатор задания данных пагинации в локалсторадж и потом в стейт
    getPaginationDataThunkCreator: () => void//санкреатор получения данных пагинации из локалсторадж и потом в стейт
}
const {setSearchQueryAC, setPaginationDataAC} = GithubActions
export default connect<mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType>( mapStateToProps, {
    setSearchQueryAC, setPaginationDataAC, setPaginationDataThunkCreator, getPaginationDataThunkCreator
} )( RepoListContainer );
// коннектим к app флаг и санки инициализации
