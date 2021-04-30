<template>
  <div id="app" class="hero is-fullheight has-text-light">
    <div class="hero-head">
      <header class="navbar">
        <div class="navbar-brand">
          <a class="navbar-item">
            <b-image :src="likelyLogo" alt="Likely: get song recommendations."/>
          </a>

          <div class="navbar-burger" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="navbar-menu" v-bind:class="{ 'is-active' : showNav }">
          <!-- navbar start, navbar end -->
          <div class="navbar-end">

          </div>
        </div>
      </header>

      <img :src="likelyLogoL" alt="likely logo" id="logoL"/>
      <Search @recommend-list="onRecommendationsRequest" />
    </div>
    <div class="hero-body">
      <TrackList v-show="showList"
                 :selected="selected"
                 :type=type
                 @clear-list="clearRecommendationsList" />
    </div>
  </div>
</template>

<script>
import Search from './components/Search.vue'
import TrackList from './components/TrackList.vue'
import logo from './assets/likely-logo.png'
import logoL from './assets/likely-logo-l.png'

export default {
  name: 'App',
  components: {
    Search,
    TrackList
  },
  data () {
    return {
      showList: false,
      selected: {},
      type: "",
      showNav: false,
      likelyLogo: logo,
      likelyLogoL: logoL
    }
  },
  methods: {
    onRecommendationsRequest (selected) {
      this.type = selected.type
      this.selected = Object.assign({}, this.selected, selected.selection)
      this.showList = true
    },
    clearRecommendationsList () {
      this.selected = Object.assign({}, {})
      this.showList = false
    }
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
}

#logoL{
  margin-top: 60px;
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
