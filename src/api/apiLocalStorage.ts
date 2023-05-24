import {initialStateGhList, PaginationDataType} from "../redux/gh-list-reducer";

export const apiCommon = { // объект с методами api для общих нужд

  putPaginationData: (PaginationData:PaginationDataType) => { // задание PaginationData в localStorage

    localStorage.setItem("PaginationData", JSON.stringify(PaginationData)); // отправить PaginationData в LocalStorage

    return apiCommon.getPaginationData()// запросить тему с localStorage после записи
  },
  getPaginationData: () => { // получение PaginationData из localStorage

    // @ts-ignore
    let Data1:PaginationDataType | null = JSON.parse(localStorage.getItem("PaginationData")); // получить PaginationData из LocalStorage
    if (!Data1) {
      Data1=initialStateGhList.PaginationData // задаем значение темы по умолчанию
      apiCommon.putPaginationData(Data1) // записываем тему по умолчанию в localStorage если ее нет
    }
    return Data1 // вернуть тему после считывания
  },
}
