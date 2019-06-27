<template>
  <div>
    <div v-if="loading">loading chart!</div>
    <div v-else>
      <h3>Year Data</h3>
      <p></p>
    </div>
  </div>
</template>
<script>
import * as d3 from "d3";
import ZipService from "@/services/ZipService.js";
export default {
  data() {
    return {
      loading: false,
      barData: [],
      yearData: []
    };
  },
  mounted() {
    console.log("mounted called 1");
    // this.drawBarChart();
    this.logit();
    this.drawBarChart();
    console.log("mounted called2");
    this.generateYearData();
  },
  created() {
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
  methods: {
    logit() {
      this.loading = true;
      console.log("**********************");
      console.log(this.yearData);
      this.loading = false;
    },
    getTemp() {
      const [max, min] = [95, 75];
      let temp = Math.floor(Math.random() * (+max - +min)) + +min;
      return temp;
    },
    async generateYearData(year) {
      let yearData = [];
      for (let i = 0; i < 12; i++) {
        if (i == 1) {
          for (let ii = 1; ii < 29; ii++) {
            let temp = this.getTemp();
            yearData.push([year, i, ii, temp]);
          }
        } else if ([0, 2, 4, 6, 7, 9, 11].includes(i)) {
          for (let ii = 1; ii < 32; ii++) {
            let temp = this.getTemp();
            yearData.push([year, i, ii, temp]);
          }
        } else {
          for (let ii = 1; ii < 31; ii++) {
            let temp = this.getTemp();
            yearData.push([year, i, ii, temp]);
          }
        }
      }
      this.yearData = yearData;
    },
    async drawBarChart() {
      //Width and height
      var w = 500;
      var h = 300;
      var padding = 40;

      var dataset, xScale, yScale, xAxis, yAxis; //Empty, for now

      //For converting strings to Dates
      var parseTime = d3.timeParse("%m/%d/%y");

      //For converting Dates to strings
      var formatTime = d3.timeFormat("%e");

      //Function for converting CSV values from strings to Dates and numbers
      var rowConverter = function(d) {
        console.log("^^^^^", {
          Date: parseTime(d[0]),
          Amount: parseInt(d[1])
        });
        return {
          Date: parseTime(d[0]),
          Amount: parseInt(d[1])
        };
      };
      const data = [
        ["01/01/17", 35],
        ["01/02/17", 30],
        ["01/03/17", 24],
        ["01/04/17", 37],
        ["01/05/17", 54],
        ["01/06/17", 55],
        ["01/07/17", 62],
        ["01/08/17", 62],
        ["01/09/17", 70],
        ["01/10/17", 66],
        ["01/11/17", 51],
        ["01/12/17", 63],
        ["01/13/17", 74],
        ["01/14/17", 58],
        ["01/15/17", 69],
        ["01/16/17", 56],
        ["01/17/17", 56],
        ["01/18/17", 50],
        ["01/19/17", 52],
        ["01/20/17", 48],
        ["01/21/17", 55],
        ["01/22/17", 44],
        ["01/23/17", 35],
        ["01/24/17", 32],
        ["01/25/17", 35],
        ["01/26/17", 21],
        ["01/27/17", 15],
        ["01/28/17", 32],
        ["01/29/17", 21],
        ["01/30/17", 12],
        ["01/31/17", 23]
      ];
      //Load in the data
      //   d3.csv("time_scale_data.csv", rowConverter, function(data) {
      //Copy data into global dataset
      dataset = await data.forEach(item => rowConverter(item));
      //   d3.data(dataset);
      this.yearData = dataset;

      //Discover start and end dates in dataset
      //   var startDate = d3.min(dataset, function(d) {
      //     return d.Date;
      //   });
      //   var endDate = d3.max(dataset, function(d) {
      //     return d.Date;
      //   });

      //Create scale functions
      xScale = d3
        .scaleTime()
        // .domain([
        //   d3.timeDay.offset(startDate, -1), //startDate minus one day, for padding
        //   d3.timeDay.offset(endDate, 1) //endDate plus one day, for padding
        // ])
        .range([padding, w - padding]);

      yScale = d3
        .scaleLinear()
        .domain([
          0, //Because I want a zero baseline
          d3.max(dataset, function(d) {
            return d.Amount;
          })
        ])
        .range([h - padding, padding]);

      //Define X axis
      xAxis = d3
        .axisBottom()
        .scale(xScale)
        .ticks(9)
        .tickFormat(formatTime);

      //Define Y axis
      yAxis = d3
        .axisLeft()
        .scale(yScale)
        .ticks(10);

      //Create SVG element
      var svg = d3
        .select("p")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      //Generate guide lines
      svg
        .selectAll("line")
        .data(dataset)
        .enter()
        .append("line")
        .attr("x1", function(d) {
          return xScale(d.Date);
        })
        .attr("x2", function(d) {
          return xScale(d.Date);
        })
        .attr("y1", h - padding)
        .attr("y2", function(d) {
          return yScale(d.Amount);
        })
        .attr("stroke", "#ddd")
        .attr("stroke-width", 1);

      //Generate circles last, so they appear in front
      svg
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return xScale(d.Date);
        })
        .attr("cy", function(d) {
          return yScale(d.Amount);
        })
        .attr("r", 2);

      //Create X axis
      svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

      //Create Y axis
      svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);
      //   });
    }
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
