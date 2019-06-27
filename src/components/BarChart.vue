<template>
  <div>
    <div v-if="!temps">
      <h3>Bar Data</h3>
    </div>
    <div v-else>
      <p></p>
    </div>
    <ul>
      <li v-for="temp in temps">{{ temp }}</li>
    </ul>
  </div>
</template>
<script>
import * as d3 from "d3";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    yearData: Array
  },
  data() {
    return {
      theseTemps: [],
      barChartDrawn: false
    };
  },
  mounted() {
    // this.fetchEvent(this.id);

    this.showMeData();
    // this.doTheDamnThing();
  },
  updated() {
    if (this.temps.length > 1 && !this.barChartDrawn) {
      this.drawBarChart();
      this.barChartDrawn = true;
    } else {
      console.log("still nothing");
    }
    // this.drawBarChart();
  },
  // mounted() {
  //   // if (this.yearData.length < 1) {
  //   //   console.log("not yet");
  //   // } else {
  //   //   this.drawBarChart();
  //   // }
  //   // this.drawBarChart();
  // },
  computed: {
    doTheDamnThing() {
      return this.$store.getters["/highTemp"];
      // return this.$store.dispatch("fetchTemps", "91103");
      // if (this.temps.length < 1) {
      //   console.log("not yet again");
      // } else {
      //   this.drawBarChart();
      // }
    },
    ...mapState({
      // event: state => state.event.event,
      temps: state => state.temps
    })
  },

  methods: {
    // async loadTemps() {
    //   // let theseTemps = await this.$store.dispatch("fetchTemps", "91103");
    //   let theseTemps = this.$store.getters["/highTemp"];
    //   console.log("THESE TEMPS", theseTemps);
    //   this.theseTemps = theseTemps;
    //   this.drawBarChart();
    // },
    drawBarChart() {
      console.log("drawing bar chart!");
      //Width and height
      // await
      // console.log("draw bar chart", this.yearData);
      var w = 500;
      var h = 250;

      var dataset = this.temps;
      console.log("DATASET", dataset);
      var xScale = d3
        .scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0, w])
        .paddingInner(0.05);

      var yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, h]);

      //Create SVG element
      var svg = d3
        .select("p")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      //Create bars
      svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
          return xScale(i);
        })
        .attr("y", function(d) {
          return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
          return yScale(d);
        })
        .attr("fill", function(d) {
          console.log("*********************", d);
          return "rgb(0, 0, " + Math.round(d * 2.56) + ")";
        });

      //Create labels
      svg
        .selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
          return d;
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
          return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
          return h - yScale(d) + 14;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white");
    },
    showMeData() {
      console.log("smd", this.temps);
    },
    ...mapActions("temps", ["fetchTemps"])
  }
};
</script>
<style lang="sass" scoped>
svg
  margin: 25px;
path
  fill: none
  stroke: #76BF8A
  stroke-width: 3px
</style>
