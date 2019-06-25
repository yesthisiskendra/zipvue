<template>
  <div>
    <h3>For {{ zipcode }}</h3>
    <WeekChart />
    <MonthChart />
    <YearChart />
    <!-- <LineChart/>
    <AreaChart/>-->
  </div>
</template>

<script>
import WeekChart from "@/components/WeekChart.vue";
import MonthChart from "@/components/MonthChart.vue";
import YearChart from "@/components/YearChart.vue";
import LineChart from "@/components/LineChart.vue";
import AreaChart from "@/components/AreaChart.vue";
export default {
  components: {
    WeekChart,
    MonthChart,
    YearChart,
    LineChart,
    AreaChart
  },
  props: {
    zipcode: String
  },
  data() {
    return {
      errors: []
    };
  },
  mounted() {
    // console.log("PROPS", this.zipcode);
  },
  methods: {
    onSubmit() {
      console.log("SUBMIT 2");
      window.location.href = "/zip/" + this.zipcode;
    }
  }
};
</script>
