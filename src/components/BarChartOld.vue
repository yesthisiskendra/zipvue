<template>
  <div>
    <div v-if="barData.length < 1">loading chart!</div>
    <div v-else>
      <h3>Bar Data</h3>
      <p></p>
    </div>
  </div>
</template>
<script>
import * as d3 from "d3";
import ZipService from "@/services/ZipService.js";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    yearData: Array
  },
  data() {
    return {
      loading: false,
      barData: []
    };
  },
  mounted() {
    console.log("mounted called 1");
    // this.drawBarChart();
    this.logit();
    console.log("mounted called2");
    if (this.yearData.length < 1) {
      console.log("no data yet");
    } else {
      console.log("yes data", this.yearData);
    }
  },
  created() {
    this.$store.dispatch("fetchTemps", "91103");
    this.drawBarChart();
    // ZipService.getStations()
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.log("error", error);
    //   });
    // ZipService.getHigh("91103", "2009-05-01", "2009-05-31")
    //   .then(res => res.json())
    //   .then(data => {
    //     data.results.forEach(element => {
    //       console.log("element", element.value);
    //       this.barData.push(element.value);
    //     });
    //     this.drawBarChart();
    //     console.log(typeof data);
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.log("error", error);
    //   });
  },
  computed: mapState({
    event: state => state.event.event
  }),
  methods: {
    logit() {
      this.loading = true;
      console.log("**********************");
      console.log(this.yearData);
      this.loading = false;
      if (this.yearData.length < 1) {
        console.log("not yet");
      } else {
        console.log("logit");
        this.barData = this.yearData;
      }
    },
    async drawBarChart() {
      //Width and height
      console.log("draw bar chart", this.yearData);
      var w = 500;
      var h = 250;

      var dataset = await this.yearData;
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
    ...mapActions("event", ["fetchEvent"])
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
