import React from "react";

type PaginationType = {
    totalRepositoriesCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (setPage: number) => void,
    currentRangeLocal: number,
    onChangeRangeLocal: (rangeShift: number) => void,

}
const Pagination: React.FC<PaginationType> = ({
                                                  totalRepositoriesCount, // общее число пользователей на сервере
                                                  pageSize, // количество пользователей на одной странице
                                                  currentPage, // текущая страница пагинации
                                                  onPageChanged, // колбек-функция изменения текущей страницы
                                                  currentRangeLocal,
                                                  onChangeRangeLocal
                                              }) => {
    const PortionSize: number = 6 // количество отображаемых страниц из всего массива
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
            onChangeRangeLocal( -1 ) // уменьшаем диапазон на 1
        }
        if (setPortionValue === "nextPortion") // если мы жмем nextPortion
        {
            onChangeRangeLocal( +1 ) // увеличиваем  диапазон на 1
        }
    };

    const renderSlicedPages = slicedPages2.map( (p) => { // мапинг отобранного массива
        return (
            <div // пагинация бутстрапа
                key={p} // ключ - страница
                onClick={() => { // по клику
                    onPageChanged( p ); // смена текущей старницы на кликнутую
                }}
            >
                {p} {/*отрисовать номер страницы в пагинации*/}
            </div>

        );
    } )

    return (
        <div>
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
