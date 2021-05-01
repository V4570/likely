<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
