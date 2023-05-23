import React, {useState} from "react";
import s from "./RenderRepositories.module.css"

const RenderSearchField: React.FC = ({}) => {
    const [inputValue, setInputValue] = useState<string>( "" )
    return <div className={s.SearchFieldCommon}>
        <div>
            <input className={s.SearchField} type="text"
                   value={inputValue}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                       setInputValue( e.target.value )
                   }}
                   autoFocus //  фокусировка на поле ввода текста
                   placeholder={"Поиск по gitHub репозиториям"}// текст при пустом поле ввода

            /></div>

    </div>
}
export default RenderSearchField