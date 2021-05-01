<template>
  <div class="hero is-fullheight has-text-light">
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
            <b-navbar-item tag="div">
              <Signup />
            </b-navbar-item>
            <b-navbar-item tag="div">
              <Login />
            </b-navbar-item>
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
import Search from './Search.vue'
import TrackList from './TrackList.vue'
import Signup from "./Signup";
import Login from './Login.vue'
import logo from '../assets/likely-logo.png'
import logoL from '../assets/likely-logo-l.png'

export default {
  name: 'Home',
  components: {
    Search,
    TrackList,
    Signup,
    Login
  },
  data () {
    return {
      showList: false,
      selected: {},
      type: "",
      showNav: false,
      likelyLogo: logo,
      likelyLogoL: logoL,
    }
  },
  methods: {
    onRecommendationsRequest (selected) {
      this.type = selected.type
      this.selected = Object.assign({}, selected.selection)
      this.showList = true
    },
    clearRecommendationsList () {
      this.selected = Object.assign({}, {})
      this.showList = false
    }
  }
}
</script>

<style>
#logoL{
  margin-top: 60px;
}
</style>
