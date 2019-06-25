<template>
  <div>
    <h3>For {{ zipcode }}</h3>
    <BarChart />
    <WeekChart />
    <MonthChart />
    <YearChart />
  </div>
</template>

<script>
import WeekChart from "@/components/WeekChart.vue";
import MonthChart from "@/components/MonthChart.vue";
import YearChart from "@/components/YearChart.vue";
import BarChart from "@/components/BarChart.vue";
export default {
  components: {
    BarChart,
    WeekChart,
    MonthChart,
    YearChart
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
