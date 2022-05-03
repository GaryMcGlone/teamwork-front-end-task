import { createStore } from "vuex";
import axois from "axios";

const baseUrl = "https://swapi.dev/api/";

// In a larger scope application - state, actions & mutations would be split into own files and vuex modules
export default createStore({
  state: {
    users: [],
    planet: {},
  },
  getters: {
    getFilteredUsers: (state) => (query) =>
      query
        ? [...state.users].filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
        : [],

    // if sorting a string use localeCompare else just a - b sort
    getSortedByColumn: (state) => (column, orderBy) => {
      if (column != "name") {
        if (orderBy === "asc")
          return [...state.users].sort((a, b) => a[column] - b[column]);
        else return [...state.users].sort((a, b) => b[column] - a[column]);
      } else {
        if (orderBy === "asc")
          return [...state.users].sort((a, b) =>
            a[column].localeCompare(b[column])
          );
        else
          return [...state.users].sort((a, b) =>
            b[column].localeCompare(a[column])
          );
      }
    },
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_PLANET(state, planet) {
      state.planet = planet;
    },
  },

  // LocalStorage used to cache API Call, only 1 API call made initially
  actions: {
    async fetchUsers({ commit }) {
      if (!localStorage.getItem("data")) {
        try {
          const response = await axois.get(baseUrl + "people");
          commit("SET_USERS", response.data.results);
          localStorage.setItem("data", JSON.stringify(response.data.results));
        } catch (err) {
          console.log(err);
        }
      } else {
        let users = JSON.parse(localStorage.getItem("data"));
        commit("SET_USERS", users);
      }
    },

    async fetchPlanet({ commit }, payload) {
      try {
        const response = await axois.get(payload.usersPlanet);
        commit("SET_PLANET", response.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
