import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

let mapStateToProps = (state) => {
    return {
        isAuth: state.app.isAuth, // текущий флаг авторизации
    }
}

let NavigateToListHoc2 = (Component) => {
    const NavigateToListHocWithAuth2 = (props) => {
        if (props.isAuth) {
            return <Navigate to='../list'/>;
        }
        return <Component {...props}/>;
    }

    return connect(mapStateToProps, null)(NavigateToListHocWithAuth2);
}

export default NavigateToListHoc2
