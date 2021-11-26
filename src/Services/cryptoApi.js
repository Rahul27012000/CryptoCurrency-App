import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const cryptoApiHeaders={
    'x-rapidapi-host': process.env.RANKING,
    'x-rapidapi-key': process.env.KEY
}

const baseUrl=process.env.URL
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi=createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getCryptos: builder.query({
        query: (count) => createRequest(`/coins?limit=${count}`),
      }), 
      getExchanges: builder.query({
        query: () => createRequest('/exchanges'),
      }),
      getCryptoDetails: builder.query({
        query: (coinID) => createRequest(`/coin/${coinID}`),
      }),
      getCryptoHistory: builder.query({
        query: ({ coinID, timeperiod }) => createRequest(`coin/${coinID}/history/${timeperiod}`),
      }), 
    })
})

export const { 
  useGetCryptosQuery, useGetCryptoDetailsQuery, useGetExchangesQuery, useGetCryptoHistoryQuery
 } = cryptoApi;
  