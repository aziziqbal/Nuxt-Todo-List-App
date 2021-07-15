<template>
  <v-app>
    <v-main class="bg-img">
      <v-container style="margin-bottom:300px;">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      miniVariant: false
    }
  }
}
</script>

<style scoped>
  .bg-img {
    background-image: url('~static/bg.png');
    background-color: white;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
