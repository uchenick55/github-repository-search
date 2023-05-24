import {initialStateGhList, PaginationDataType} from "../redux/gh-list-reducer";

export const apiCommon = { // объект с методами api для общих нужд

  putPaginationData: (PaginationData:PaginationDataType) => { // задание PaginationData в localStorage

    localStorage.setItem("PaginationData", JSON.stringify(PaginationData)); // отправить PaginationData в LocalStorage

    return apiCommon.getPaginationData()// запросить PaginationData с localStorage после записи
  },
  getPaginationData: () => { // получение PaginationData из localStorage

    // @ts-ignore
    let Data1:PaginationDataType | null = JSON.parse(localStorage.getItem("PaginationData")); // получить PaginationData из LocalStorage
    if (!Data1) {
      Data1=initialStateGhList.PaginationData // задаем значение PaginationData по умолчанию
     // apiCommon.putPaginationData(Data1) // записываем PaginationData по умолчанию в localStorage если ее нет
    }
    return Data1 // вернуть PaginationData после считывания
  },
  putSearchQuery: (SearchQuery:string) => { // задание поискового запроса в localStorage

    localStorage.setItem("SearchQuery", JSON.stringify(SearchQuery)); // отправить поисковый запрос в LocalStorage

    return apiCommon.getSearchQuery()// запросить SearchQuery с localStorage после записи
  },
  getSearchQuery: () => { // получение SearchQuery из localStorage

    // @ts-ignore
    let Data1:string = JSON.parse(localStorage.getItem("SearchQuery")); // получить SearchQuery из LocalStorage
    if (!Data1) {
      Data1=initialStateGhList.SearchQuery // задаем значение SearchQuery по умолчанию
     // apiCommon.putSearchQuery(Data1) // записываем SearchQuery по умолчанию в localStorage если ее нет
    }
    return Data1 // вернуть SearchQuery после считывания
  },

}
