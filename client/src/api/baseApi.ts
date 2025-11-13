import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const API_HOST = import.meta.env.VITE_API_HOST || "http://localhost:3001/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl: API_HOST,
});

// Делаем еще 2 попытки запроса, если первая не удалась. Дальше нет смысла стучатьяс в ручку
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

// TODO: Возможно нужно будет подредактировать, когда буду запросы добавлять

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Advertisements"],
  endpoints: () => ({}),
});
