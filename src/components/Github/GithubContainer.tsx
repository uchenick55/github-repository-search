import React from "react";
import {GlobalStateType} from "../../redux/store-redux";
import {connect} from "react-redux";
import GitHubCOM from "./GitHubCOM";

const GitHubContainer:React.FC<mapStateToPropsType & mapDispatchToPropsType> = ({MyRepositoriesData, SearchResultData}) => {
    return <div>
        <GitHubCOM MyRepositoriesData={MyRepositoriesData} SearchResultData={SearchResultData}  />
    </div>
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        MyRepositoriesData: state.github.MyRepositoriesData, // данные моего репозитория
        SearchResultData: state.github.SearchResultData, // данные поиска репозиториев
        CardData: state.github.CardData //  карточка автора репозитория
    }
}
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
}

export default connect<mapStateToPropsType,
    mapDispatchToPropsType,
    unknown,
    GlobalStateType>( mapStateToProps, {} )( GitHubContainer );
// коннектим к app флаг и санки инициализации
