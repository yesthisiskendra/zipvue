<template>
  <div class="about">
    <h3>An Experiment with Vue</h3>
    <!-- {{ $store.state.user.name }} -->
    <!-- <h2>{{ userName }}</h2> -->
    <h2>
      By
      <a :href="githublink" target="_blank">{{ user.name }}</a>
    </h2>
    <h6>With help from</h6>
    <div v-for="cat in categories" :key="cat">{{ cat }}</div>
    <a :href="kittylink" target="_blank">
      <h6>of the Michael Scott Kitten Co</h6>
    </a>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      githublink: "https://github.com/yesthisiskendra?tab=repositories",
      kittylink: "https://www.instagram.com/michaelscottkittenco/"
    };
  },
  computed: {
    catLength() {
      return this.$store.getters.catLength;
    },
    ...mapState(["categories", "user"])
  }
};
</script>

<style lang="scss" scoped></style>
