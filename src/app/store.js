import { configureStore } from "@reduxjs/toolkit";
import {cryptoApi} from '../Services/cryptoApi'
import { cryptoNewsApi } from "../Services/cryptonewsApi";
export default configureStore({
    reducer: {
      [cryptoApi.reducerPath]: cryptoApi.reducer,
      [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    },
  });