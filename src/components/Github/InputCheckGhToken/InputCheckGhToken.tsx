import React, {useState} from "react";
import s from "./InputCheckTocken.module.css"
import sc from "../../../common/classes/commonClasses.module.css"

type InputCheckGhTokenType = {
    setTokenToState: (tokenLocal:string) => void // запись токена в стейт
}
const InputCheckGhToken: React.FC<InputCheckGhTokenType> = ({setTokenToState}) => {
    const [tokenLocal, setTokenLocal] = useState<string>("")
    return <div className={sc.ToCenter} >
        <input
            className={s.inputToken}
            type="text"
            value={tokenLocal}
            onChange={(e)=>setTokenLocal(e.target.value)}
            onClick={()=>setTokenToState(tokenLocal)}
        />
    </div>
}
export default InputCheckGhToken