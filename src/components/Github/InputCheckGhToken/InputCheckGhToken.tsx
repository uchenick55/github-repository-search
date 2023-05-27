import React, {useState} from "react";
import s from "./InputCheckTocken.module.css"
import sc from "../../../common/classes/commonClasses.module.css"
import {ServerErrorType} from "../../../redux/app-reducer";
import Preloader from "../../../common/Preloader/Preloader";

type InputCheckGhTokenType = {
    ServerError: ServerErrorType
    setTokenToState: (tokenLocal:string) => void // запись токена в стейт
    IsFetching: boolean // статус загрузки данных
    isAuth: boolean // я авторизован по токену?
}

const InputCheckGhToken: React.FC<InputCheckGhTokenType> = (
    {setTokenToState, ServerError, IsFetching, isAuth}) => {

    const [tokenLocal, setTokenLocal] = useState<string>("")

    const checkEnterPressed = (event: React.KeyboardEvent) => { // проверка нажатия Enter
        if (event.charCode===13) {
            setTokenToState(tokenLocal)//задание статуса при нажатии Enter
        }
    }
    return <div className={sc.ToCenter} >
        {IsFetching && <Preloader/>} {/*индикатор загрузки */}

        <div className={s.InputTokenText}>
            <h3>Для поиска по репозиториям GutHub введите полученый токен, либо создайте свой:</h3>
            {`https://github.com => Settings => Developer settings => Personal access tokens =>
            Fine-grained personal access tokens => `}
            <a rel="stylesheet" href="https://github.com/settings/tokens?type=beta">Generate new token</a>
        </div>
        <input
            className={s.inputToken}
            type="password"
            value={tokenLocal}
            autoFocus={true}
            onChange={(e)=>setTokenLocal(e.target.value)}
            onKeyPress={checkEnterPressed} // проверка нажатия Enter
        />
        {ServerError && <div className={s.ServerError}>{ServerError}</div>} {/*ошибки с сервера*/}
        {isAuth && <div className={s.isAuthTrue}>Авторизация успешна</div> } {/*авторизация успешна*/}
    </div>
}
export default InputCheckGhToken