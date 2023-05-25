import axios from "axios";
import {RepositoriesDataType} from "../common/types/commonTypes";

const GITHUB_TOKEN: string = "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"

export const query = `query {
    search(query: "stars:>50000", type: REPOSITORY, first: 10) {
        repositoryCount
        nodes {
        ... on Repository {
                id
                name
                url
                stargazers {
                    totalCount
                    __typename
                }
                defaultBranchRef {
                    target {
                    ... on Commit {
                            committedDate
                            __typename
                        }
                        __typename
                    }
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }
}` // получение Starred репозиториев среди всех
export const query2 = `query ($getQuery: String!) {
    search(query: $getQuery, type: REPOSITORY, first: 100) {
        repositoryCount
        nodes {
        ... on Repository {
                id
                name
                url
                stargazers {
                    totalCount
                    __typename
                }
                defaultBranchRef {
                    target {
                    ... on Commit {
                            committedDate
                            __typename
                        }
                        __typename
                    }
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }
}
` // поисковый запрос репозиторев
export const query3 =`query ($getId: ID!) {
    node(id: $getId) {
    ... on Repository {
            name
            stargazers {
                totalCount
                __typename
            }
            defaultBranchRef {
                target {
                ... on Commit {
                        committedDate
                        __typename
                    }
                    __typename
                }
                __typename
            }
            owner {
                avatarUrl
                login
                url
                __typename
            }
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                nodes {
                    name
                    __typename
                }
                __typename
            }
            description
            url
            __typename
        }
        __typename
    }
}
` // получить данные карточки

async function getGitHubData(queryLocal: string, variables: object) {
    const gitHubCall = await axios.post(
        `https://api.github.com/graphql`,
        {
            query: queryLocal,
            variables: variables,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'token ' + GITHUB_TOKEN,
            },
        }
    )
    return gitHubCall.data.data
}
type GetReposType = {
    search: {
        repositoryCount: number,
        nodes: Array<RepositoriesDataType>,
        __typename: string
    }
}

export const gitHubQuery = { // общий объект с методами запросов
    getStarredRepos: async () => {// получить самые популярные репозитории с гитхаб
        const response:GetReposType = await getGitHubData( query, {} )
        return (response.search.nodes) //возврат данных из поля data
    },
    searchRepos: async (searchQuery: string) => {// получить самые популярные репозитории с гитхаб
        const variablesLocal = {
            getQuery: `${searchQuery} sort:stars`,
        }
        const response:GetReposType = await getGitHubData( query2, variablesLocal )
        return (response.search.nodes) //возврат данных из поля data
    },
    getCardData: async (cardId: string) => {// получить данные карточки репозитория с гитхаб
        const variablesLocal = {
            getId: `${cardId}`,
        }
        const response = await getGitHubData( query3, variablesLocal )
        console.log("getCardData", response.node)
        return (response.node) //возврат данных из поля data
    },

}

