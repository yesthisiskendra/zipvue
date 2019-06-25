<template>
  <div>
    <div v-if="loading">loading chart!</div>
    <div v-else>
      <h3>Year Data</h3>
      <svg width="500" height="100">
        <g style="transform: translate(0, 10px)">
          <path :d="line"></path>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "vue-line-chart",
  data() {
    return {
      loading: false,
      data: [],
      line: ""
    };
  },
  mounted() {
    this.calculatePath();
  },
  created() {
    this.generateData();
  },
  methods: {
    getScales() {
      const x = d3.scaleTime().range([0, 430]);
      const y = d3.scaleLinear().range([210, 0]);
      d3.axisLeft().scale(x);
      d3.axisBottom().scale(y);
      x.domain(d3.extent(this.data, (d, i) => i));
      y.domain([0, d3.max(this.data, d => d)]);
      return { x, y };
    },
    calculatePath() {
      const scale = this.getScales();
      const path = d3
        .line()
        .x((d, i) => scale.x(i))
        .y(d => scale.y(d));
      this.line = path(this.data);
    },
    generateData() {
      this.loading = true;
      let yearData = [];
      for (let i = 1; i < 366; i++) {
        const [max, min] = [95, 75];
        let temp = Math.floor(Math.random() * (+max - +min)) + +min;
        yearData.push(temp);
        // monthData.push([i.toString(), temp, 'LightSkyBlue', temp])
      }
      this.data = yearData;
      this.loading = false;
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
