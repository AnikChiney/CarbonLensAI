// state/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 🔥 Base Query with Dynamic Token Handling
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers) => {
    // Get token from localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfoEcoTrack"));
    const token = userInfo?.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
  credentials: "include", // ✅ Important: send cookies along with requests
});

export const api = createApi({
  baseQuery,
  reducerPath: "adminApi",
  tagTypes: ["User", "Dashboard"],
  endpoints: (build) => ({

    // ================= AUTH =================

    login: build.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),

    googleLogin: build.mutation({
      query: (data) => ({
        url: "auth/google",
        method: "POST",
        body: data,
      }),
    }),

    register: build.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),

    logout: build.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),

    // ================= USER =================

    getUser: build.query({
      query: () => ({
        url: "userdata/get-user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // ================= NEWS =================

    getGlobalNews: build.query({
      query: ({ page, pageSize }) => ({
        url: "news/get-global-news",
        method: "GET",
        params: { page, pageSize },
      }),
    }),

    getLocalNews: build.query({
      query: ({ page, pageSize }) => ({
        url: "news/get-local-news",
        method: "GET",
        params: { page, pageSize },
      }),
    }),

    getTopHeadlines: build.query({
      query: ({ page, pageSize }) => ({
        url: "news/get-top-headlines",
        method: "GET",
        params: { page, pageSize },
      }),
    }),

    // ================= ECO TIPS =================

    getRandomWhoStandards: build.query({
      query: () => ({
        url: "who-standards/get-random",
        method: "GET",
      }),
    }),

    getRandomEcofriendlyTips: build.query({
      query: () => ({
        url: "eco-tips/get-random",
        method: "GET",
      }),
    }),

    getOneTip: build.query({
      query: () => ({
        url: "eco-tips/get-one",
        method: "GET",
      }),
    }),

    // ================= CARBON =================

    getCarbonStats: build.query({
      query: ({ year, month }) => ({
        url: `carbon/get-stats/${year}/${month}`,
        method: "GET",
      }),
      maxRetries: 2,
    }),

    getTwelveMonthCarbon: build.query({
      query: () => ({
        url: `carbon/get-twelve-month`,
        method: "GET",
      }),
    }),

    saveCarbonData: build.mutation({
      query: (data) => ({
        url: `carbon/save`,
        method: "POST",
        body: data,
      }),
    }),

    // ================= WATER =================

    getWaterStats: build.query({
      query: ({ year, month }) => ({
        url: `userdata/water-usage/get-stats/${year}/${month}`,
        method: "GET",
      }),
    }),

    getTwelveMonthWater: build.query({
      query: () => ({
        url: `userdata/water-usage/get-twelve-month`,
        method: "GET",
      }),
    }),

    saveWaterData: build.mutation({
      query: (data) => ({
        url: `userdata/water-usage/save`,
        method: "POST",
        body: data,
      }),
    }),

  }),
});

// ================= EXPORT HOOKS =================

export const {
  // Auth
  useLoginMutation,
  useGoogleLoginMutation,
  useRegisterMutation,
  useLogoutMutation,

  // User
  useGetUserQuery,

  // News
  useGetGlobalNewsQuery,
  useGetLocalNewsQuery,
  useGetTopHeadlinesQuery,

  // Eco Tips
  useGetRandomEcofriendlyTipsQuery,
  useGetRandomWhoStandardsQuery,
  useGetOneTipQuery,

  // Carbon
  useGetCarbonStatsQuery,
  useGetTwelveMonthCarbonQuery,
  useSaveCarbonDataMutation,

  // Water
  useGetWaterStatsQuery,
  useGetTwelveMonthWaterQuery,
  useSaveWaterDataMutation,
} = api;
