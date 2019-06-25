<template>
  <div>
    <h3>For {{ zipcode }}</h3>
    <MonthChart />
    <YearChart />
    <LineChart />
  </div>
</template>

<script>
import MonthChart from "@/components/MonthChart.vue";
import YearChart from "@/components/YearChart.vue";
import LineChart from "@/components/LineChart.vue";
export default {
  components: {
    MonthChart,
    YearChart,
    LineChart
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
    console.log("PROPS", this.zipcode);
  },
  methods: {
    onSubmit() {
      console.log("SUBMIT 2");
      window.location.href = "/zip/" + this.zipcode;
    }
  }
};
</script>
