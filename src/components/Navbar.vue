<template>
  <b-navbar class="blurry-nav">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{path: '/'}">
        <b-image :src="likelyLogo" alt="Likely: get song recommendations."/>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button label="Logout"
                    type="is-light"
                    @click="logout"/>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import logo from '@/assets/likely-logo.png'
import { LOGOUT } from "@/store"
import {mapGetters} from "vuex"

export default {
  name: "Navbar",
  components: {
  },
  data () {
    return{
      likelyLogo: logo,
      showNav: false,
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  methods: {
    logout () {
      this.$store.dispatch(LOGOUT).then(() => this.$router.push("/login"));
    }
  }
}
</script>

<style scoped>
.blurry-nav{
  background-color: rgba(255,255,255,0.1) !important;
  backdrop-filter: blur(10px);
}
</style>