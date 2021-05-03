<template>
  <div id="login" class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <div class="card">
              <div class="card-header">
                <div class="card-header-title is-centered">
                  Login to Likely
                </div>
              </div>
              <div class="card-content">
                <b-field label="Username" label-position="on-border">
                  <b-input
                      type="username"
                      v-model="username"
                      placeholder="Your username"
                      required
                      icon="user">
                  </b-input>
                </b-field>

                <b-field label="Password" label-position="on-border">
                  <b-input
                      type="password"
                      v-model="password"
                      password-reveal
                      placeholder="Your password"
                      required
                      icon="lock">
                  </b-input>
                </b-field>
                <div class="mt-5">
                  Don't have an account?
                </div>
                <router-link to="/signup">Sign Up!</router-link>
              </div>
              <div class="card-footer">
                <div class="card-footer-item">
                  <b-button
                      label="Login"
                      type="is-primary"
                      @click="login"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {LOGIN_REQUEST} from "@/store";
import {isEmpty} from "lodash";

export default {
  name: "Login",
  data () {
    return {
      username: '',
      password: '',
      isLoading: this.authStatus === 'loading'
    }
  },
  computed: {
    ...mapGetters(["authStatus"])
  },
  methods: {
    login () {
      if (isEmpty(this.username) || isEmpty(this.password)){
        console.log('empty fields')
      }

      this.$store.dispatch(LOGIN_REQUEST, {username: this.username, password: this.password}).then(() => {
        this.$router.push('/')
      }).catch(e => {
        const errorResponse = e.response

        switch (errorResponse.status) {
          case 404:
            this.alertCustomError('User not found', 'A user with this username was not found.')
            break
          case 401:
            this.alertCustomError('Wrong Password', 'Incorrect Password')
            this.password = ''
            break
          case 500:
            console.log('server error')
        }

      })
    },
    alertCustomError(errorTitle, msg) {
      this.$buefy.dialog.alert({
        title: errorTitle,
        message: msg,
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        ariaModal: true
      })
    }
  }
}
</script>

<style scoped>

</style>