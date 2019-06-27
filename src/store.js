import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import ZipService from "@/services/ZipService.js";
export const namespaced = true;
export default new Vuex.Store({
  state: {
    temps: [],
    user: { id: "abc123", name: "Kendra" },
    date: { day: "01", month: "06", year: "2018" },
    zipcode: 91011,
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ],
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
      { id: 3, text: "...", done: true },
      { id: 4, text: "...", done: false }
    ]
  },
  mutations: {
    SET_TEMPS(state, temps) {
      state.temps = temps.map(temp => temp.value);
      // state.events.find(event => event.id === id)
    }
  },
  actions: {
    fetchTemps({ commit }, zip) {
      ZipService.getHigh("91103", "2009-05-01", "2009-05-31")
        .then(res => res.json())
        .then(data => {
          commit("SET_TEMPS", data.results);
          // data.results.forEach(element => {
          //   console.log("element", element.value);
          //   this.allYearData.push(element.value);
          // });
          // this.drawBarChart();
          // console.log(typeof data);
          // console.log(data);
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  },
  getters: {
    catLength: state => {
      return state.categories.length;
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    },
    highTemp: state => {
      return state.temps.filter(temp => temp.TMAX);
    }
  }
});
