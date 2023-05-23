import React from "react";
import classes from "./Preloader.module.css"

let Preloader: React.FC<unknown> = () => {
    return <div className={classes.spinner}/>
}
export default Preloader
