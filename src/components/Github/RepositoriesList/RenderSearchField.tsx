import React, {useState} from "react";
import s from "./Repositories.module.css"
import sc from "../../../common/classes/commonClasses.module.css"

type RenderSearchFieldType = {
    SearchQuery: string, // поле поиска
    IsFetching:boolean // индикатор процесса загрузки
    setSearchQuery: (searchQuery: string) => void // задание в стейт поискового запроса
}

const RenderSearchField: React.FC<RenderSearchFieldType> = ({setSearchQuery, SearchQuery, IsFetching}) => {
    const [inputValue, setInputValue] = useState<string>( SearchQuery )
    const checkEnterPressed = (event: React.KeyboardEvent) => { // проверка нажатия Enter
        if (event.charCode === 13) {
            setSearchQuery( inputValue )//задание статуса при нажатии Enter
        }
    }
    return <div className={s.SearchFieldCommon}>
        <input className={s.SearchField} type="text"
               value={inputValue}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                   setInputValue( e.target.value )
               }}
               autoFocus //  фокусировка на поле ввода текста
               disabled={IsFetching}
               placeholder={"Поиск по gitHub репозиториям"}// текст при пустом поле ввода
               onKeyPress={checkEnterPressed} // проверка нажатия Enter
        />
        <div className={sc.ButtonEnterExt + " " + sc.ButtonEnterEtxList}>
            <div
                className={`${sc.ButtonEnterInt} ${IsFetching && sc.Disabled}`}
                onClick={()=>{setSearchQuery( inputValue )}}>Enter</div>
        </div>

    </div>
}
export default RenderSearchField