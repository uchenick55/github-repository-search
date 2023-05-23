import React from "react";
import с from "./Preloader.module.css"

let Preloader: React.FC<unknown> = () => {
    return <div className={с.spinner}/>
}
export default Preloader
