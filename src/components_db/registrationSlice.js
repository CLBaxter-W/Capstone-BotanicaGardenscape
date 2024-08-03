import { createSlice } from "@reduxjs/toolkit";
import { api } from "../app/api";

const registrationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

const registrationSlice = createSlice({
  name: "registration",
  initialState: {},
  reducers: {
    setToken: ({ payload }) => {
      console.log("Registration setToken: ", payload.token);
      window.sessionStorage.setItem("Token", payload.token);
    },

    clearToken: () => {
      window.sessionStorage.removeItem("Token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.registration.matchFulfilled,
      (state, { payload }) => {
        console.log("registration bob");
        // window.sessionStorage.setItem(
        //   "Token",
        //   payload.token
        //     ? payload.token
        //     : window.sessionStorage.removeItem("Token")
        // );
      }
    );
  },
});

export const { useRegistrationMutation } = registrationApi;

export const { setToken, clearToken } = registrationSlice.actions;

export default registrationSlice.reducer;
