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
<!--  <header class="navbar blurry-nav">-->
<!--    <div class="navbar-brand">-->
<!--      <router-link to="/" class="navbar-item">-->
<!--        <b-image :src="likelyLogo" alt="Likely: get song recommendations."/>-->
<!--      </router-link>-->

<!--      <div class="navbar-burger" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }">-->
<!--        <span></span>-->
<!--        <span></span>-->
<!--        <span></span>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="navbar-menu" v-bind:class="{ 'is-active' : showNav }">-->
<!--      &lt;!&ndash; navbar start, navbar end &ndash;&gt;-->
<!--      <div class="navbar-end">-->
<!--        <b-navbar-item>-->
<!--          -->
<!--        </b-navbar-item>-->
<!--      </div>-->
<!--    </div>-->
<!--  </header>-->
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