<template>
  <div class="hero is-fullheight has-text-light">
    <div class="hero-head">
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
import Search from '@/components/Search.vue'
import TrackList from '@/components/TrackList.vue'
import logo from '@/assets/likely-logo.png'
import logoL from '@/assets/likely-logo-l.png'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
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
  computed: {
    ...mapGetters(["isAuthenticated"])
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
