<template>
  <div class="about">
    <h3>An Experiment with Vue</h3>
    <!-- {{ $store.state.user.name }} -->
    <!-- <h2>{{ userName }}</h2> -->
    <h2>{{ user.name }}</h2>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    catLength() {
      return this.$store.getters.catLength;
    },
    ...mapState(["categories", "user"])
  }
};
// export default {
//   computed: mapState({
//     userName: state => state.user.name
//   })
// };
// export default {
//   computed: {
//     userName() {
//       return this.$store.state.user.name;
//     }
//   }
// };
</script>

<style lang="scss" scoped></style>
