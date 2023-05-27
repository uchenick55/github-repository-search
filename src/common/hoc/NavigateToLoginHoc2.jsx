import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";


let mapStateToProps = (state) => {
    return {
        isAuth: state.app.isAuth, // текущий флаг авторизации
    }
}

let NavigateToLoginHoc2 = (Component) => {
    const NavigateToLoginHocWithAuth2 = (props) => {
        if (props.isAuth) {
            return <Navigate to='../list'/>;
        }
        return <Component {...props}/>;
    }

    return connect(mapStateToProps, null)(NavigateToLoginHocWithAuth2);
}

export default NavigateToLoginHoc2
