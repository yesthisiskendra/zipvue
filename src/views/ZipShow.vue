<template>
  <div>
    <h3>For {{ zipcode }}</h3>
    <LineChart title="Week Chart" numdays="8"/>
    <LineChart title="Month Chart" numdays="32"/>
    <LineChart title="Year Chart" numdays="366"/>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart.vue";
import { mapState } from "vuex";
export default {
  components: {
    LineChart
  },
  data() {
    return {
      errors: [],
      myYearData: []
    };
  },
  // mounted() {
  //   this.getUpdatedData("2018");
  //   // console.log("PROPS", this.zipcode);
  // },
  computed: {
    ...mapState(["zipcode"])
  },
  methods: {
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
      return yearData;
    },
    async getYearData(year) {
      // console.log(year);
      const generatedYearData = await this.generateYearData(year);
      return generatedYearData;
    },
    async getUpdatedData(year) {
      this.myYearData = await this.getYearData(year);
      // console.log("M Y D", this.myYearData);
    }
  }
};
</script>
