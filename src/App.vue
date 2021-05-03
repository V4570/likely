<template>
  <div id="app">
    <Navbar v-if="isAuthenticated"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

// Colors
$bg-color: hsl(256,33%,10%);
$dot-color: hsl(256,33%,70%);

// Dimensions
$dot-size: 1px;
$dot-space: 22px;

body {
  background:
      linear-gradient(90deg, $bg-color ($dot-space - $dot-size), transparent 1%) center,
linear-gradient($bg-color ($dot-space - $dot-size), transparent 1%) center,
$dot-color;
  background-size: $dot-space $dot-space;
}

</style>
