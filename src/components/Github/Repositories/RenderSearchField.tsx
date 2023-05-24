import React, {useState} from "react";
import s from "./Repositories.module.css"

type RenderSearchFieldType = {
    setSearchQuery: (searchQuery:string)=>void // задание в стейт поискового запроса
}

const RenderSearchField: React.FC<RenderSearchFieldType> = ({setSearchQuery}) => {
    const [inputValue, setInputValue] = useState<string>( "" )
    const checkEnterPressed = (event: React.KeyboardEvent) => { // проверка нажатия Enter
        if (event.charCode==13) {
            setSearchQuery(inputValue)//задание статуса при нажатии Enter
        }
    }
    return <div className={s.SearchFieldCommon}>
        <div>
            <input className={s.SearchField} type="text"
                   value={inputValue}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                       setInputValue( e.target.value )
                   }}
                   autoFocus //  фокусировка на поле ввода текста
                   placeholder={"Поиск по gitHub репозиториям"}// текст при пустом поле ввода
                   onKeyPress={checkEnterPressed} // проверка нажатия Enter

            /></div>

    </div>
}
export default RenderSearchField