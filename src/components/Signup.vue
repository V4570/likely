<template>
  <div id="login" class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <div class="card">
              <div class="card-header">
                <div class="card-header-title is-centered">
                  Signup to Likely
                </div>
              </div>
              <div class="card-content">
                <b-field label="Email" label-position="on-border">
                  <b-input
                      type="email"
                      v-model="email"
                      placeholder="Your email"
                      required
                      icon="envelope">
                  </b-input>
                </b-field>

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
                  Already have an account?
                </div>
                <router-link to="/login">Go back to the login page.</router-link>
              </div>
              <div class="card-footer">
                <div class="card-footer-item">
                  <b-button
                      label="Signup"
                      type="is-primary"
                      @click="signup"/>
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
import { SIGNUP_REQUEST } from "@/store"

export default {
  name: "Signup",
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signup () {
      this.$store.dispatch(SIGNUP_REQUEST,
          {username: this.username, password: this.password, email: this.email}).then(() =>{
        this.$router.push('/login')
      }).catch(e => {
        const errorResponse = e.response

        switch (errorResponse.status) {
          case 409:
            this.alertCustomError("Conflict Error",
                "A user with this username or email already exists.<br/>" +
                "Try Logging in or use another username and email.")
            break
          default:
            console.log(e)
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