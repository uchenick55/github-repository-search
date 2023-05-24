import React from "react";
import {PaginationDataType} from "../../../../redux/github-reducer";
import s from "../Repositories.module.css"

type PaginationType = {
    totalRepositoriesCount: number,// общее число репозиториев на странице
    pageSize: number,// количество репозиториев на одной странице
    currentPage: number,// текущая страница пагинации
    PortionSize: number// количество отображаемых страниц из всего массива
    currentRangeLocal: number,
    setPaginationDataAC: (PaginationData: PaginationDataType) => void //экшн креатор задания данных пагинации в стейт
    PaginationData: PaginationDataType
}
const Pagination: React.FC<PaginationType> = (
    {totalRepositoriesCount, pageSize, currentPage, currentRangeLocal, PortionSize, setPaginationDataAC, PaginationData}) => {

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

    const PortionSizeLeft = 1 + PortionSize * (currentRangeLocal - 1); // Нижнее значение порций (не меньше 1)
    const PortionSizeRight = PortionSize * currentRangeLocal; // Верхнее значение страниц (не больше PagesCount)
    const slicedPages2 = pages.filter(
        // фильтруем весь массив страниц пользователей
        (p) => p >= PortionSizeLeft && p <= PortionSizeRight // оставляем только в заданном диапазоне
    );

    type setPortionValueType = "prevPortion" | "nextPortion"
    const setPortion = (setPortionValue: setPortionValueType) => { // задать текущую порцию пагинации
        if (setPortionValue === "prevPortion" && currentRangeLocal > 1) // если мы жмем prevPortion
        {
            setPaginationDataAC( {...PaginationData, currentRangeLocal: PaginationData.currentRangeLocal - 1} )
            // onChangeRangeLocal( -1 )  уменьшаем диапазон на 1
        }
        if (setPortionValue === "nextPortion") // если мы жмем nextPortion
        {
            setPaginationDataAC( {...PaginationData, currentRangeLocal: PaginationData.currentRangeLocal + 1} )

            //    onChangeRangeLocal( +1 )увеличиваем  диапазон на 1
        }
    };

    const renderSlicedPages = slicedPages2.map( (p) => { // мапинг отобранного массива
        return (
            <span // пагинация
                className={s.PaginationItem}
                key={p} // ключ - страница
                onClick={() => { // по клику
                    setPaginationDataAC( {...PaginationData, currentPage: p} )

                    //  onPageChanged( p );  смена текущей старницы на кликнутую
                }}
            >
                {p} {/*отрисовать номер страницы в пагинации*/}
            </span>

        );
    } )

    return (
        <div className={s.PaginationCommon}>
            <div> {/*стиль мышки рука */}
                <button onClick={() => {
                    setPortion( "prevPortion" )
                }}>Prev
                </button>
                {/*диапазон пагинации вниз*/}
                {renderSlicedPages} {/*отрисовка пагинации страниц внутри кнопок*/}
                <button onClick={() => {
                    setPortion( "nextPortion" )
                }}>Next
                </button>
                {/*диапазон пагинации вверх*/}
            </div>
        </div>
    );
};

export default Pagination;
