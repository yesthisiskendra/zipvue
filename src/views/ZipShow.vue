<template>
  <div>
    <h3>For {{ zipcode }}</h3>
    <WeekChart />
    <MonthChart />
    <YearChart />
  </div>
</template>

<script>
import WeekChart from "@/components/WeekChart.vue";
import MonthChart from "@/components/MonthChart.vue";
import YearChart from "@/components/YearChart.vue";
export default {
  components: {
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
