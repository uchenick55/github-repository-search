import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "../../redux/store-redux";

export type ComThunkTp<A extends Action> = ThunkAction<
    void,    // санка ничего не возвращает
    GlobalStateType,    // глобальный стейт из redux
    unknown,    // нет доп параметров
    A // все типы ActionCreator
    >
export type NulableType<n> = null | n // тип нулевой


export type MyRepositoriesDataType = {
    id: string,
    name: string,
    url: string,
    stargazers: {
        totalCount: number,
        __typename: string
    },
    defaultBranchRef: {
        target: {
            committedDate: string,
            __typename: string
        },
        __typename: string
    },
    __typename: string
}