import React from "react";
import {PaginationDataType} from "../../../redux/gh-list-reducer";
import s from "./Repositories.module.css"
import sc from "../../../common/classes/commonClasses.module.css"


type PaginationType = {
    totalRepositoriesCount: number,//
    pageSize: number,//
    currentPage: number,// текущая страница пагинации
    setPaginationData: (PaginationData: PaginationDataType) => void // колбек задания данных пагинации в стейт
    PaginationData: PaginationDataType
}
const Pagination: React.FC<PaginationType> = (
    {totalRepositoriesCount, pageSize, currentPage, setPaginationData, PaginationData}) => {

    // currentRange - текущий диапазон. Он в PortionSize меньше PagesCount
    //setCurrentRange - изменение currentRange по клику на кнопку
    // PortionSizeLeft - Нижнее значение порций (не меньше 1)
    // const [mouseHovered, setMouseHovered] = useState("");
    const PagesCount = Math.ceil( totalRepositoriesCount / pageSize ); // сколько всего страниц можно вызвать
    //с пользователями пачками по PageSize
    const pages = []; // определяем массив страниц под всех пользователей
    for (let i = 1; i <= PagesCount; i++) {
        // В этот массив
        pages.push( i ); // добавляем все страницы пользователей
    }

    const renderSlicedPages = pages.map( (p) => { // мапинг отобранного массива
        return (
            <div // пагинация
                className={`${s.PIC} ${p===PaginationData.currentPage? s.PaginationItemCurrent:s.PaginationItem}`} //стиль каждого элемента пагинации
                key={p} // ключ - страница
                onClick={() => { // по клику
                    setPaginationData( {...PaginationData, currentPage: p} )

                    //  onPageChanged( p );  смена текущей старницы на кликнутую
                }}
            >
                {p} {/*отрисовать номер страницы в пагинации*/}
            </div>
        );
    } )

    return (
        <div className={sc.ToCenter}>  {/*в центр пагинацию*/}
            <div className={s.PaginationCommon}>{/*смещение сверху*/}
                {renderSlicedPages} {/*отрисовка пагинации страниц внутри кнопок*/}
            </div>
        </div>
    );
};

export default Pagination;
