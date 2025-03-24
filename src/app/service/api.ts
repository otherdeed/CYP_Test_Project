import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { type GameData,  type Game } from "../../types/game.type";

const baseQuery = fetchBaseQuery({
    baseUrl:'https://67dd7b91e00db03c406bd37a.mockapi.io/api'
})

const baseQueryApi = retry(baseQuery, {maxRetries: 1})
export const Api = createApi({
    reducerPath:'serverApi',
    baseQuery: baseQueryApi,
    endpoints: () => ({})
})

export const serverApi = Api.injectEndpoints({
    endpoints:(builder) =>({
        getAllGames: builder.query<GameData[], void>({
            query:() =>({
                url: 'games',
                method: 'GET',
            })
        }),
        deleteGames: builder.mutation<GameData, string>({
            query: (id) =>({
                url: `games/${id}`,
                method: 'DELETE',
            })
        }),
        addGame: builder.mutation<GameData, Game>({
            query: (game) => ({
                url: 'games',
                method: 'POST',
                body: game,
            })
        }),
        getGame: builder.query<GameData, string>({
            query:(id) =>({
                url: `games/${id}`,
                method: 'GET',
            })
        }),
    })
})

export const {useAddGameMutation, useDeleteGamesMutation, useGetGameQuery, useGetAllGamesQuery} = serverApi
export const {endpoints:{getAllGames, deleteGames, addGame, getGame}} = serverApi