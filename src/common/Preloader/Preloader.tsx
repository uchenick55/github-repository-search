import React from "react";
import s from "./Preloader.module.css"

let Preloader: React.FC<unknown> = () => {
    return <div className={s.spinner}/>
}
export default Preloader
