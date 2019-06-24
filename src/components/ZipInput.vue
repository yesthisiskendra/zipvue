<template>
      <form class="review-form" @submit.prevent="onSubmit">
          <p v-if="errors.length">Please correct the following error(s):
              <ul>
                  <li v-for="error in errors">{{ error }}</li>
              </ul>
          </p>
          <p>
              <!-- <label for="zipcode">Zipcode:</label> -->
              <input id="zipcode" v-model="zipcode" placeholder="zip code">
          </p>
          
          <p>
            <input type="submit" value="Submit">  
          </p>  
  
      </form>
</template>

<script>
export default {
  data() {
    return {
      zipcode: null,
      errors: []
    };
  },
  methods: {
    onSubmit(){
      console.log("SUBMIT 2");
      window.location.href = "/zip/" + this.zipcode;
    }
  }
};
</script>

<style scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}

.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
