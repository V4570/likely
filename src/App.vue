<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Search v-on:recommend-list="onRecommendationsRequest" />
    <TrackList v-if="showList"
               :selected="selected"
               :type=type
               v-on:clear-list="clearRecommendationsList" :key="rerender"/>
  </div>
</template>

<script>
import Search from './components/Search.vue'
import TrackList from './components/TrackList.vue'

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
      rerender: 0
    }
  },
  methods: {
    onRecommendationsRequest (selected) {
      this.type = selected.type
      this.selected = Object.assign({}, this.selected, selected.selection)
      this.showList = true
      // xor the rerender variable to force rerender the tracklist object to fetch new data from the backend
      // 0 XOR 1 = 1 ; 1 XOR 1 = 0
      this.rerender ^= 1
    },
    clearRecommendationsList () {
      this.selected = Object.assign({}, {})
      this.showList = false
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
