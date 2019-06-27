import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import ZipService from "@/services/ZipService.js";
export const namespaced = true;
export default new Vuex.Store({
  state: {
    temps: [],
    fulltemps: [],
    user: { id: "12", name: "Kendra" },
    date: { day: "01", month: "06", year: "2018" },
    zipcode: 91011,
    categories: [
      "Michael Scott",
      "Dwight",
      "Phyllis",
      "Angela",
      "Kevin",
      "Stanley"
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
      state.fulltemps = temps.map(temp => temp);
      // state.events.find(event => event.id === id)
    }
  },
  actions: {
    fetchTemps({ commit }, zip) {
      ZipService.getHighAndLow("91103", "2009-05-01", "2009-05-31")
        .then(res => res.json())
        .then(data => {
          commit("SET_TEMPS", data.results);
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
    getTemps: state => datatype => {
      // console.log("DATATYPE", datatype);
      let filteredTemps = state.fulltemps.filter(
        temp => temp.datatype === datatype
      );
      return filteredTemps.map(temp => temp.value);
      // console.log("HIGH TEMPS", temp.datatype)
    },
    getAverage: state => {
      let dataArray = [["date", "high temp", "average temp", "low temp"]];
      state.fulltemps.forEach(function(value) {
        const cleanDate = value.date.split("T")[0].split("-")[2];
        if (dataArray[dataArray.length - 1][0] === cleanDate) {
          let average = (dataArray[dataArray.length - 1][1] + value.value) / 2;
          dataArray[dataArray.length - 1].push(average, value.value);
        } else {
          dataArray.push([cleanDate, value.value]);
        }
      });
      return dataArray;
    }
  }
});
