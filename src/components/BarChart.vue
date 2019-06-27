<template>
  <div>
    <div v-if="!temps">
      <h3>Bar Data</h3>
    </div>
    <div v-else>
      <p></p>
    </div>
    <!-- <ul v-if="highTemps">
      <li v-for="htemp in highTemps">{{ htemp }}</li>
    </ul>
    <h4>TMAX</h4>
    {{ getTemps("TMAX") }}
    <h4>TMIN</h4>
    {{ getTemps("TMIN") }}-->
  </div>
</template>
<script>
import * as d3 from "d3";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  props: {
    yearData: Array,
    timeline: String
  },
  data() {
    return {
      theseTemps: [],
      barChartDrawn: false
    };
  },
  updated() {
    // SOS: How to do this the Vue way!?
    // I played around with a few different ways to handle this...
    // Pretty sure this goes AGAINST convention but totally not sure how to do it the "correct" way
    if (this.temps.length > 1 && !this.barChartDrawn) {
      this.drawBarChart();
      this.barChartDrawn = true;
    } else {
      console.log("I can't wait to learn how to do this the proper way!!");
    }
  },
  computed: {
    ...mapGetters(["getTemps", "getAverage"]),
    ...mapState(["temps"])
  },
  methods: {
    drawBarChart() {
      // console.log(this.highTemps);
      var w = 500;
      var h = 250;

      var dataset = this.getTemps("TMAX");
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
          let fill = (d - 60) * 10;
          return "rgb(0, " + Math.round(fill) + ",256)";
          // return "rgb(0, 0, " + Math.round(fill) + ")";
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
        .attr("fill", "navy");
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
