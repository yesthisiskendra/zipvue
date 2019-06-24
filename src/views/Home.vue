<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <ZipInput />
  </div>
</template>

<script>
// @ is an alias to /src
import ZipInput from "@/components/ZipInput.vue";

export default {
  name: "home",
  components: {
    ZipInput
  }
};
</script>
