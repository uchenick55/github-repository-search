import {GlobalStateType, InferActionsTypes} from "./store-redux";
import {apiCommon} from "../api/apiLocalStorage";
import {Dispatch} from "redux";
import {ComThunkTp, MyRepositoriesDataType} from "../common/types/commonTypes";
import {gitHubQuery} from "../api/graphQl";

const SET_SEARCH_QUERY = "myApp/app-reducer/SET_SEARCH_QUERY"; //константа задания поискового запроса в стейт
const SET_PAGINATION_DATA = "myApp/app-reducer/SET_PAGINATION_DATA"; //константа задания данных пагинации
const SET_MY_REPOSITORIES_DATA = "myApp/app-reducer/SET_MY_REPOSITORIES_DATA"; //константа задания MyRepositoriesData

export const GithubActions = {
    setSearchQueryAC: (SearchQuery: string) => { // экшн креатор задания поискового запроса в стейт
        return {type: SET_SEARCH_QUERY, SearchQuery} as const
    },
    setPaginationDataAC: (PaginationData: PaginationDataType) => { // экшн креатор задания объекта с данными пагинации в стейт
        return {type: SET_PAGINATION_DATA, PaginationData} as const
    },
    setMyRepositoriesDataAC: (MyRepositoriesData: Array<MyRepositoriesDataType>) => { // экшн креатор задания MyRepositoriesData
        return {type: SET_MY_REPOSITORIES_DATA, MyRepositoriesData} as const
    },
}

type GithubActionTypes = InferActionsTypes<typeof GithubActions>

type initialStateGhListType = typeof initialStateGhList

export const initialStateGhList = { //стейт по умолчанию с гитхаба
    SearchQuery: "", // поисковый запрос после нажатия на ввоод поля ввода
    PaginationData: { // данные пагинации
        totalRepositoriesCount: 0, // общее число репозиториев, загруженых с сервера
        pageSize: 10, // количество репозиториев на одной странице
        currentPage: 1, // текущая страница пагинации
    },
    MyRepositoriesData: // заглушка, пока захардкодил список вместо моих репозиториев для примера
        [] as Array<MyRepositoriesDataType>,
    SearchResultData:  // заглушка, данные поиска репозиториев
        [
            {
                "id": "MDEwOlJlcG9zaXRvcnk0MjAwNTI4MA==",
                "name": "x86-bare-metal-examples",
                "url": "https://github.com/cirosantilli/x86-bare-metal-examples",
                "stargazers": {"totalCount": 4415, "__typename": "StargazerConnection"},
                "defaultBranchRef": {
                    "target": {
                        "committedDate": "2021-05-14T01:00:00Z",
                        "__typename": "Commit"
                    }, "__typename": "Ref"
                },
                "__typename": "Repository"
            }, {
            "id": "MDEwOlJlcG9zaXRvcnk2NDUzNDg1OQ==",
            "name": "linux-kernel-module-cheat",
            "url": "https://github.com/cirosantilli/linux-kernel-module-cheat",
            "stargazers": {"totalCount": 3512, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-07-19T19:21:18Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxNjY5MDkzOA==",
            "name": "sunfish",
            "url": "https://github.com/thomasahle/sunfish",
            "stargazers": {"totalCount": 2690, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-04-19T16:11:07Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOJDEsQg",
            "name": "multidiffusion-upscaler-for-automatic1111",
            "url": "https://github.com/pkuliyi2015/multidiffusion-upscaler-for-automatic1111",
            "stargazers": {"totalCount": 2311, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-05-22T19:44:01Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOIMSnvQ",
            "name": "a1111-sd-webui-tagcomplete",
            "url": "https://github.com/DominikDoom/a1111-sd-webui-tagcomplete",
            "stargazers": {"totalCount": 1514, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-05-21T11:54:38Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOIOBktw",
            "name": "A1111-Web-UI-Installer",
            "url": "https://github.com/EmpireMediaScience/A1111-Web-UI-Installer",
            "stargazers": {"totalCount": 1375, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-04-15T17:58:47Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOItd-Ug",
            "name": "ultimate-upscale-for-automatic1111",
            "url": "https://github.com/Coyote-A/ultimate-upscale-for-automatic1111",
            "stargazers": {"totalCount": 645, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-05-05T00:22:21Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOJC9QYQ",
            "name": "a1111-sd-webui-locon",
            "url": "https://github.com/KohakuBlueleaf/a1111-sd-webui-locon",
            "stargazers": {"totalCount": 422, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-05-21T11:15:35Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOJNPcRw",
            "name": "infinite-zoom-automatic1111-webui",
            "url": "https://github.com/v8hid/infinite-zoom-automatic1111-webui",
            "stargazers": {"totalCount": 404, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-05-03T17:08:52Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyMDY5MDMzMTA=",
            "name": "aqc111",
            "url": "https://github.com/bb-qq/aqc111",
            "stargazers": {"totalCount": 368, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-03-19T09:09:24Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOH-r36Q",
            "name": "automatic1111-colab",
            "url": "https://github.com/ddPn08/automatic1111-colab",
            "stargazers": {"totalCount": 284, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-03-28T00:29:49Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOJUgFQg",
            "name": "a1111-sd-webui-lycoris",
            "url": "https://github.com/KohakuBlueleaf/a1111-sd-webui-lycoris",
            "stargazers": {"totalCount": 279, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-05-17T00:19:32Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyNzk3MTAxMTA=",
            "name": "Raymo111",
            "url": "https://github.com/Raymo111/Raymo111",
            "stargazers": {"totalCount": 160, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-04-26T23:35:53Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyNzk4MjgwNjQ=",
            "name": "cirosantilli",
            "url": "https://github.com/cirosantilli/cirosantilli",
            "stargazers": {"totalCount": 109, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-08-02T14:06:38Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyNDEzMzgxOA==",
            "name": "R8051",
            "url": "https://github.com/risclite/R8051",
            "stargazers": {"totalCount": 106, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2019-10-09T01:43:23Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOIuRI0g",
            "name": "a1111-sd-webui-haku-img",
            "url": "https://github.com/KohakuBlueleaf/a1111-sd-webui-haku-img",
            "stargazers": {"totalCount": 101, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-02-10T14:33:00Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyMzk3ODQwODY=",
            "name": "pset-9",
            "url": "https://github.com/rprokap/pset-9",
            "stargazers": {"totalCount": 65, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2020-03-07T23:32:08Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxNDY3NTM1NQ==",
            "name": "LPC1114-Synthesizer",
            "url": "https://github.com/74hc595/LPC1114-Synthesizer",
            "stargazers": {"totalCount": 59, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2018-11-18T08:30:09Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOGzXTIg",
            "name": "Python-111",
            "url": "https://github.com/PickHeBin/Python-111",
            "stargazers": {"totalCount": 58, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-02-24T13:51:59Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyMTcwNjAx",
            "name": "LPC1114CodeBase",
            "url": "https://github.com/microbuilder/LPC1114CodeBase",
            "stargazers": {"totalCount": 58, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2013-12-04T01:14:59Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyMTk3OTQ4OA==",
            "name": "gr-cc1111",
            "url": "https://github.com/funoverip/gr-cc1111",
            "stargazers": {"totalCount": 55, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2014-10-05T16:22:09Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnk1OTM5NjQy",
            "name": "1110",
            "url": "https://github.com/n01se/1110",
            "stargazers": {"totalCount": 54, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2012-10-03T20:19:14Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxNzM4NDQ0OTc=",
            "name": "java_jdk1.8.0_111",
            "url": "https://github.com/daiqingliang/java_jdk1.8.0_111",
            "stargazers": {"totalCount": 49, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2019-08-17T11:04:10Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOJJA49w",
            "name": "a1111-sd-zoe-depth",
            "url": "https://github.com/sanmeow/a1111-sd-zoe-depth",
            "stargazers": {"totalCount": 49, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-03-14T10:02:25Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOJFdeXg",
            "name": "a1111-stable-diffusion-webui-vram-estimator",
            "url": "https://github.com/space-nuko/a1111-stable-diffusion-webui-vram-estimator",
            "stargazers": {"totalCount": 48, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-03-05T03:42:33Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyNzUzNTMwOTM=",
            "name": "ADS1115_WE",
            "url": "https://github.com/wollewald/ADS1115_WE",
            "stargazers": {"totalCount": 47, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-10-24T18:25:39Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkzNjU2ODY2MTg=",
            "name": "ads1115",
            "url": "https://github.com/hepingood/ads1115",
            "stargazers": {"totalCount": 43, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-04-16T04:44:09Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyMzAzNjIwMg==",
            "name": "afinn-111",
            "url": "https://github.com/words/afinn-111",
            "stargazers": {"totalCount": 43, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-11-01T13:57:44Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnk3NDkwMjMwMA==",
            "name": "Vivecraft_111",
            "url": "https://github.com/jrbudda/Vivecraft_111",
            "stargazers": {"totalCount": 41, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2021-11-11T23:25:14Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOGgjO9w",
            "name": "111-one-button-games-in-2021",
            "url": "https://github.com/abagames/111-one-button-games-in-2021",
            "stargazers": {"totalCount": 38, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-08-26T08:33:48Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxNzg1ODQ1NjE=",
            "name": "personJudge",
            "url": "https://github.com/ycl-true/personJudge",
            "stargazers": {"totalCount": 37, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2020-03-18T14:53:03Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnk0NDc2NTE2Nw==",
            "name": "sentient",
            "url": "https://github.com/dantame/sentient",
            "stargazers": {"totalCount": 34, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2015-11-11T11:39:18Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOIs1g7A",
            "name": "automatic1111-webui-nix",
            "url": "https://github.com/virchau13/automatic1111-webui-nix",
            "stargazers": {"totalCount": 33, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-04-15T00:36:17Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOIuCBcw",
            "name": "Dark-Themes-SD-WebUI-Automatic1111",
            "url": "https://github.com/Nacurutu/Dark-Themes-SD-WebUI-Automatic1111",
            "stargazers": {"totalCount": 32, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-05-22T15:20:40Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnk1ODg0NjUx",
            "name": "xkcd-1110",
            "url": "https://github.com/dividuum/xkcd-1110",
            "stargazers": {"totalCount": 32, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2012-09-25T17:05:29Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyNTI3NDUzOTU=",
            "name": "CVE-2020-11107",
            "url": "https://github.com/S1lkys/CVE-2020-11107",
            "stargazers": {"totalCount": 31, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2020-04-03T14:04:35Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOJHyPZA",
            "name": "db-storage1111",
            "url": "https://github.com/takoyaro/db-storage1111",
            "stargazers": {"totalCount": 29, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-05-02T12:40:49Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOJRh3ew",
            "name": "a1111-sd-webui-tome",
            "url": "https://github.com/SLAPaper/a1111-sd-webui-tome",
            "stargazers": {"totalCount": 29, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-05-14T08:25:13Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxNjcyODUwMzE=",
            "name": "wooldridge",
            "url": "https://github.com/spring-haru/wooldridge",
            "stargazers": {"totalCount": 28, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2021-06-10T06:15:25Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxOTU3NjYyNjc=",
            "name": "n3d1117.github.io",
            "url": "https://github.com/n3d1117/n3d1117.github.io",
            "stargazers": {"totalCount": 28, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-05-29T09:32:59Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOIXjTUA",
            "name": "auto1111-improved-prompt-matrix",
            "url": "https://github.com/ArrowM/auto1111-improved-prompt-matrix",
            "stargazers": {"totalCount": 27, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-03-30T14:10:45Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxMjc2NTgyNjQ=",
            "name": "esp32-ads1115",
            "url": "https://github.com/Molorius/esp32-ads1115",
            "stargazers": {"totalCount": 27, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2018-04-01T18:13:06Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnk5NjM4MjgyNg==",
            "name": "vue-music",
            "url": "https://github.com/WangQingye/vue-music",
            "stargazers": {"totalCount": 27, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2017-08-25T09:57:47Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkzMjYyOTYzNDg=",
            "name": "javascript-basic-program",
            "url": "https://github.com/sanusanth/javascript-basic-program",
            "stargazers": {"totalCount": 27, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2021-01-10T07:49:14Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnk0MzM5NjY1Mw==",
            "name": "sentiment-analysis",
            "url": "https://github.com/Lissy93/sentiment-analysis",
            "stargazers": {"totalCount": 26, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-12-06T17:28:47Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxNTEyMjEwMTQ=",
            "name": "cve-2017-11176",
            "url": "https://github.com/lexfo/cve-2017-11176",
            "stargazers": {"totalCount": 26, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2018-10-02T10:26:38Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkzOTI4NTQ5MDg=",
            "name": "INFO1112-Materials",
            "url": "https://github.com/SolSaviour/INFO1112-Materials",
            "stargazers": {"totalCount": 26, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-10-26T00:06:38Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxODgxOTY2NTQ=",
            "name": "Phishing-Dataset",
            "url": "https://github.com/GregaVrbancic/Phishing-Dataset",
            "stargazers": {"totalCount": 26, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-12-22T15:01:25Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyNDk3MDc5MjE=",
            "name": "lr1110_driver",
            "url": "https://github.com/Lora-net/lr1110_driver",
            "stargazers": {"totalCount": 25, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-04-13T13:22:36Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxNzk1OTg2OTM=",
            "name": "ads1115-linux-rpi",
            "url": "https://github.com/giobauermeister/ads1115-linux-rpi",
            "stargazers": {"totalCount": 25, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2019-04-10T14:04:11Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOIa9pqA",
            "name": "CFG-Schedule-for-Automatic1111-SD",
            "url": "https://github.com/guzuligo/CFG-Schedule-for-Automatic1111-SD",
            "stargazers": {"totalCount": 25, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-03-09T10:43:02Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyNTI4NzYxNDM=",
            "name": "CVE-2020-11108-PoC",
            "url": "https://github.com/Frichetten/CVE-2020-11108-PoC",
            "stargazers": {"totalCount": 24, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2020-05-10T22:35:45Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkzMTA4Mzc3NzU=",
            "name": "neurons",
            "url": "https://github.com/Aryia-Behroziuan/neurons",
            "stargazers": {"totalCount": 24, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2020-11-07T12:17:06Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOGYGBxw",
            "name": "SunshineTr",
            "url": "https://github.com/Hannstcott/SunshineTr",
            "stargazers": {"totalCount": 24, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-04-10T08:42:45Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkzMzg3NzU3Nzc=",
            "name": "btsync",
            "url": "https://github.com/Auska/btsync",
            "stargazers": {"totalCount": 23, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-05-30T11:18:28Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxNjgyNjg2Mw==",
            "name": "TEST",
            "url": "https://github.com/RendySetiawan/TEST",
            "stargazers": {"totalCount": 21, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2014-02-14T04:19:55Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyNjc3OTczNjQ=",
            "name": "NTAJ1113",
            "url": "https://github.com/natarazworld/NTAJ1113",
            "stargazers": {"totalCount": 20, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2020-09-30T08:08:00Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOH_LZ_w",
            "name": "111-1-4year-undergraduateC-C-program",
            "url": "https://github.com/chendannytw/111-1-4year-undergraduateC-C-program",
            "stargazers": {"totalCount": 20, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-03-01T03:35:26Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxMzQ3NDgyMzg=",
            "name": "A111_Pulsed_Radar_Breakout",
            "url": "https://github.com/sparkfunX/A111_Pulsed_Radar_Breakout",
            "stargazers": {"totalCount": 20, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2020-11-23T19:52:04Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxMTAxMzU1Njk=",
            "name": "CS111-Rutgers",
            "url": "https://github.com/USMC1941/CS111-Rutgers",
            "stargazers": {"totalCount": 20, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2021-09-05T00:30:57Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnk1NTEyNTk0OQ==",
            "name": "ADS1115",
            "url": "https://github.com/ControlEverythingCommunity/ADS1115",
            "stargazers": {"totalCount": 19, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2016-12-23T07:29:41Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOIX_S8g",
            "name": "CPT111_Tuto_questions_Hints",
            "url": "https://github.com/hiaweiqi0906/CPT111_Tuto_questions_Hints",
            "stargazers": {"totalCount": 19, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-01-10T00:53:59Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnk2NTM0NjQ4Mw==",
            "name": "ADS1115",
            "url": "https://github.com/addicore/ADS1115",
            "stargazers": {"totalCount": 18, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2016-08-10T03:27:45Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkzNDQ3MzQyMjM=",
            "name": "111ty",
            "url": "https://github.com/danfascia/111ty",
            "stargazers": {"totalCount": 18, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2021-06-05T22:10:27Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnk5MTU1OTIw",
            "name": "lpc1114fn28",
            "url": "https://github.com/engineergorman/lpc1114fn28",
            "stargazers": {"totalCount": 18, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2014-12-19T18:32:32Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOIKceRQ",
            "name": "OneClickStableDifusionAutomatic1111Colab",
            "url": "https://github.com/beothorn/OneClickStableDifusionAutomatic1111Colab",
            "stargazers": {"totalCount": 18, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-03-27T21:56:03Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOHdyCbQ",
            "name": "Comp_Sci_Sem_2",
            "url": "https://github.com/danderfer/Comp_Sci_Sem_2",
            "stargazers": {"totalCount": 18, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-06-07T20:31:10Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxNTExMzA3NDI=",
            "name": "ADS1118",
            "url": "https://github.com/denkitronik/ADS1118",
            "stargazers": {"totalCount": 17, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2019-09-23T05:39:01Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxNDk2MTI5OTg=",
            "name": "1112.js",
            "url": "https://github.com/dtinth/1112.js",
            "stargazers": {"totalCount": 17, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2018-09-20T18:22:45Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOGyh25g",
            "name": "leyr1112",
            "url": "https://github.com/leyr1112/leyr1112",
            "stargazers": {"totalCount": 17, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-12-21T18:35:18Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyOTY0OTE3Mjc=",
            "name": "PCParser",
            "url": "https://github.com/rosalogia/PCParser",
            "stargazers": {"totalCount": 17, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2020-10-06T04:01:48Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxMDE5NTg0ODM=",
            "name": "AM111",
            "url": "https://github.com/JiaweiZhuang/AM111",
            "stargazers": {"totalCount": 16, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2017-11-22T02:52:49Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxNzA0MTA5NTE=",
            "name": "ZCU111-PYNQ",
            "url": "https://github.com/Xilinx/ZCU111-PYNQ",
            "stargazers": {"totalCount": 16, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-10-11T17:37:25Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkzMzcyMDk5",
            "name": "s1112v",
            "url": "https://github.com/isel-leic-ps/s1112v",
            "stargazers": {"totalCount": 16, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2012-02-09T11:45:49Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOJj4u8g",
            "name": "a1111-mini-paint",
            "url": "https://github.com/0Tick/a1111-mini-paint",
            "stargazers": {"totalCount": 16, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-05-18T19:43:58Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyMTI0NDczMjg=",
            "name": "https-agpl.fsf.org-",
            "url": "https://github.com/marmollie101/https-agpl.fsf.org-",
            "stargazers": {"totalCount": 16, "__typename": "StargazerConnection"},
            "defaultBranchRef": null,
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxMzM3OTE4MDU=",
            "name": "CVE-2018-1111",
            "url": "https://github.com/knqyf263/CVE-2018-1111",
            "stargazers": {"totalCount": 15, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2018-05-17T10:03:06Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnk2MjU4MzYxMQ==",
            "name": "STM32-ADS1115",
            "url": "https://github.com/VasenevEA/STM32-ADS1115",
            "stargazers": {"totalCount": 15, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2017-04-29T14:56:38Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkzOTgzOTkxOTY=",
            "name": "BRACU-CSE111",
            "url": "https://github.com/Mahrjose/BRACU-CSE111",
            "stargazers": {"totalCount": 15, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2021-10-07T10:56:09Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnk2Nzk3OTQ3Nw==",
            "name": "cs1113f16",
            "url": "https://github.com/kevinsullivan/cs1113f16",
            "stargazers": {"totalCount": 15, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2017-01-04T15:26:24Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyNTEyODcxMjg=",
            "name": "lr1110_evk_demo_app",
            "url": "https://github.com/Lora-net/lr1110_evk_demo_app",
            "stargazers": {"totalCount": 14, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2021-11-02T21:15:06Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnk2MDY4OTYzOQ==",
            "name": "sxq111.github.io",
            "url": "https://github.com/sxq111/sxq111.github.io",
            "stargazers": {"totalCount": 14, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2019-11-18T05:50:16Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxMTA3Mzk0NzI=",
            "name": "ADS1115",
            "url": "https://github.com/baruch/ADS1115",
            "stargazers": {"totalCount": 14, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2017-11-14T20:12:17Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOGRlDww",
            "name": "2021_taobao_1111_autoscript",
            "url": "https://github.com/cibimo/2021_taobao_1111_autoscript",
            "stargazers": {"totalCount": 14, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2021-10-28T15:17:04Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxMjQxNjI2MjQ=",
            "name": "SuperPuperDuperLayout",
            "url": "https://github.com/SugarAndCandy/SuperPuperDuperLayout",
            "stargazers": {"totalCount": 14, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2018-04-06T22:41:04Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkzODgzMTQ3MzI=",
            "name": "111",
            "url": "https://github.com/sunhao1930/111",
            "stargazers": {"totalCount": 13, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2021-07-22T03:32:02Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxMzM5NTc4ODU=",
            "name": "CVE-2018-1111",
            "url": "https://github.com/kkirsche/CVE-2018-1111",
            "stargazers": {"totalCount": 13, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2018-05-21T13:10:47Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnk1NjQ4NzczNQ==",
            "name": "ads1115-driver",
            "url": "https://github.com/ElektorLabs/ads1115-driver",
            "stargazers": {"totalCount": 13, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2016-04-18T07:50:06Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnk1NjkyNTk2Nw==",
            "name": "chinese-char-animations",
            "url": "https://github.com/nmarley/chinese-char-animations",
            "stargazers": {"totalCount": 13, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2016-04-24T10:24:04Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOI0D8PQ",
            "name": "discord-rpc-for-automatic1111-webui",
            "url": "https://github.com/kabachuha/discord-rpc-for-automatic1111-webui",
            "stargazers": {"totalCount": 13, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-01-29T08:46:30Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkzNjIzOTcwNzI=",
            "name": "github",
            "url": "https://github.com/NhaPhatHanh/github",
            "stargazers": {"totalCount": 13, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2021-04-28T08:38:41Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxNzIwNjcxNA==",
            "name": "file.js",
            "url": "https://github.com/ZoltCyber/file.js",
            "stargazers": {"totalCount": 13, "__typename": "StargazerConnection"},
            "defaultBranchRef": null,
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkxMTkyNDg4Nzc=",
            "name": "BTSync-DHT-Docker",
            "url": "https://github.com/FreemanZY/BTSync-DHT-Docker",
            "stargazers": {"totalCount": 12, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2019-09-03T09:02:41Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOHxupKg",
            "name": "fantasy1114",
            "url": "https://github.com/fantasy1114/fantasy1114",
            "stargazers": {"totalCount": 12, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-01-04T13:52:26Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkyMzE3MDk3MzE=",
            "name": "SP-111_R1_Plate_Files",
            "url": "https://github.com/blindassassin111/SP-111_R1_Plate_Files",
            "stargazers": {"totalCount": 12, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2021-04-04T02:13:54Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOIc5vWg",
            "name": "Nokia1110_ESP32",
            "url": "https://github.com/ospanic/Nokia1110_ESP32",
            "stargazers": {"totalCount": 12, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-11-18T06:42:08Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkzMDgwOTcwMzg=",
            "name": "References",
            "url": "https://github.com/Aryia-Behroziuan/References",
            "stargazers": {"totalCount": 12, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2020-10-28T17:48:43Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOHIJ_Aw",
            "name": "nate.283090",
            "url": "https://github.com/Nate0634034090/nate.283090",
            "stargazers": {"totalCount": 12, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2022-04-05T22:02:18Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "MDEwOlJlcG9zaXRvcnkzMDQ5OTU3MTc=",
            "name": "xiaozhi1111",
            "url": "https://github.com/dezhizhang/xiaozhi1111",
            "stargazers": {"totalCount": 11, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2021-06-13T15:32:20Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }, {
            "id": "R_kgDOHMkv_w",
            "name": "CS1114-material",
            "url": "https://github.com/sebastianromerocruz/CS1114-material",
            "stargazers": {"totalCount": 11, "__typename": "StargazerConnection"},
            "defaultBranchRef": {
                "target": {
                    "committedDate": "2023-05-04T14:54:55Z",
                    "__typename": "Commit"
                }, "__typename": "Ref"
            },
            "__typename": "Repository"
        }
        ],
}
export type SearchResultDataType = typeof initialStateGhList.SearchResultData
export type PaginationDataType = typeof initialStateGhList.PaginationData

let ghListReducer = (state: initialStateGhListType = initialStateGhList, action: GithubActionTypes): initialStateGhListType => {//редьюсер инициализации приложения
    let stateCopy: initialStateGhListType; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_SEARCH_QUERY: // экшн задания поискового запроса в стейт
            stateCopy = {
                ...state, // копия всего стейта
                SearchQuery: action.SearchQuery
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_PAGINATION_DATA: // экшн задания данных пагинации в стейт
            stateCopy = {
                ...state, // копия всего стейта
                PaginationData: action.PaginationData
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_MY_REPOSITORIES_DATA: // экшн задания MyRepositoriesData
            stateCopy = {
                ...state, // копия всего стейта
                MyRepositoriesData: action.MyRepositoriesData
            }
            return stateCopy; // возврат копии стейта после изменения
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}

export const setPaginationDataThunkCreator = (PaginationData: PaginationDataType): ComThunkTp<GithubActionTypes> => {//санкреатор задания PaginationData в LocalStorage и в стейт
    return async (dispatch, getState) => { // санка задания PaginationData в LocalStorage
        console.log( "запись PaginationData в LocalStorage" )
        const response1 = await apiCommon.putPaginationData( PaginationData )  //записать значение PaginationData в localStorage
        if (response1) {
            console.log( "запись PaginationData в стейт" )
            dispatch( GithubActions.setPaginationDataAC( response1 ) )  //записать считаное из localStorage значение PaginationData в store
        }
    }
}
export const getPaginationDataThunkCreator = (): ComThunkTp<GithubActionTypes> => {//санкреатор получения PaginationData из LocalStorage и запись в стейт
    return async (dispatch, getState) => { // санка получения PaginationData из LocalStorage
        console.log( "получить PaginationData из LocalStorage" )
        const response1 = await apiCommon.getPaginationData()  //получить значение PaginationData из localStorage
        if (response1) {
            console.log( "запись PaginationData в стейт" )
            dispatch( GithubActions.setPaginationDataAC( response1 ) )  //записать считаное из localStorage значение PaginationData в store
        }
    }
}
export const setSearchQueryThunkCreator = (SearchQuery: string): ComThunkTp<GithubActionTypes> => {//санкреатор задания SearchQuery в LocalStorage и в стейт
    return async (dispatch, getState) => { // санка задания SearchQuery в LocalStorage
        console.log( "запись SearchQuery в LocalStorage" )

        const response1 = await apiCommon.putSearchQuery( SearchQuery )  //записать значение SearchQuery в localStorage
        console.log( "запись SearchQuery в стейт" )
        dispatch( GithubActions.setSearchQueryAC( response1 ) )  //записать считаное из localStorage значение PaginationData в store
        if (response1 === "") {
            console.log( "поле поиска пустое, запускаем зануление  PaginationData LocalStorage и state" )
            dispatch(setPaginationDataThunkCreator(initialStateGhList.PaginationData))
        }
    }
}
export const getSearchQueryThunkCreator = (): ComThunkTp<GithubActionTypes> => {//санкреатор получения SearchQuery из LocalStorage и в стейт
    return async (dispatch, getState) => { // санка получения SearchQuery из LocalStorage
        console.log( "получить SearchQuery из LocalStorage" )

        const response1 = await apiCommon.getSearchQuery()  //получить значение SearchQuery в localStorage
        console.log( "запись SearchQuery в стейт" )
        dispatch( GithubActions.setSearchQueryAC( response1 ) )  //записать считаное из localStorage значение PaginationData в store
    }
}
export const getMyRepositoriesDataThCr = (): ComThunkTp<GithubActionTypes> => {//санкреатор получения MyRepositoriesData с gitHub через axios/grapgQl
    return async (dispatch, getState) => { // санка
        console.log( "получение MyRepositoriesData с gitHub через axios/grapgQl" )
        const response1:Array<MyRepositoriesDataType> = await gitHubQuery.getStarredRepos()  //получить MyRepositoriesData с gitHub через axios/grapgQl
        dispatch( GithubActions.setMyRepositoriesDataAC( response1 ) )  //записать полученное MyRepositoriesData с gitHub в store
    }
}



export default ghListReducer;










