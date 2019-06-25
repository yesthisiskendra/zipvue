<template>
  <div>
    <h3>For {{ zipcode }}</h3>
    <MonthChart />
    <YearChart />
  </div>
</template>

<script>
import MonthChart from "@/components/MonthChart.vue";
import YearChart from "@/components/YearChart.vue";
export default {
  components: {
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
