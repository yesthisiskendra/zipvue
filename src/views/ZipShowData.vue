<template>
  <div>
    <h3>For {{ zipcode }}</h3>
    <div v-if="!temps">
      <p>loading</p>
    </div>

    <BarChart />

    <!-- <TimeChart /> -->
  </div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
// import TimeChart from "@/components/TimeChart.vue";
import ZipService from "@/services/ZipService.js";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    zipcode: String
  },
  components: {
    BarChart
  },
  created() {
    // this.fetchEvent(this.id);
    this.$store.dispatch("fetchTemps", "91103");
  },
  computed: mapState({
    // event: state => state.event.event,
    temps: state => state.temps
  }),
  methods: {
    ...mapActions("temps", ["fetchTemps"])
  }
};
</script>
