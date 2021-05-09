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

                <b-field label="Password"
                         label-position="on-border"
                         :type="{'is-warning': !passwordValidate, 'is-success': passwordValidate}"
                         :message="{
                          'Minimum 8 characters': !this.pEightMatch,
                          'One lowercase letter': !this.pLowerMatch,
                          'One uppercase letter': !this.pUpperMatch,
                          'One digit': !this.pNumMatch,
                          'One special character': !this.pSpecialMatch,
                          'No white spaces': !this.pWhiteMatch
                        }"
                         class="has-text-left">
                  <b-input
                      type="password"
                      v-model="password"
                      @input="validatePassword"
                      password-reveal
                      placeholder="Your password"
                      required
                      icon="lock"
                      maxlength="30">
                  </b-input>
                </b-field>

                <b-field label="Repeat Password"
                         label-position="on-border"
                         :type="{'is-danger': !passwordsMatch, 'is-success': passwordsMatch}"
                         :message="{'Passwords do not match': !passwordsMatch}"
                         class="has-text-left">
                  <b-input
                      type="password"
                      v-model="password2"
                      @input="checkPasswords"
                      password-reveal
                      placeholder="Your password"
                      required
                      icon="lock"
                      maxlength="30">
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
import { isEmpty } from 'lodash'
import { helpers } from 'vuelidate/lib/validators'

export default {
  name: "Signup",
  data () {
    return {
      username: '',
      email: '',
      password: '',
      password2: '',
      passwordsMatch: false,
      passwordValidate: false,

      passwordNumberValidator: helpers.regex('p_num', /^(?=.*\d)/),
      pNumMatch: false,

      passwordLowercaseValidator: helpers.regex('p_lower', /^(?=.*[a-z])/),
      pLowerMatch: false,

      passwordUppercaseValidator: helpers.regex('p_upper', /^(?=.*[A-Z])/),
      pUpperMatch: false,

      passwordSpecialValidator: helpers.regex('p_special', /^(?=.*[!#$%&? "])/),
      pSpecialMatch: false,

      passwordNoWhiteSpaceValidator: helpers.regex('p_white', /^(?!.*\s)/),
      pWhiteMatch: false,

      passwordAtLeastEightValidator: helpers.regex('p_eight', /.{8,}$/),
      pEightMatch: false
    }
  },
  methods: {
    validatePassword(){

      if(!isEmpty(this.password)){
        this.pEightMatch = !!this.passwordAtLeastEightValidator(this.password)
        this.pWhiteMatch = !!this.passwordNoWhiteSpaceValidator(this.password)
        this.pSpecialMatch = !!this.passwordSpecialValidator(this.password)
        this.pUpperMatch = !!this.passwordUppercaseValidator(this.password)
        this.pLowerMatch = !!this.passwordLowercaseValidator(this.password)
        this.pNumMatch = !!this.passwordNumberValidator(this.password)

        this.passwordValidate = !!(
            this.pEightMatch && this.pWhiteMatch &&
            this.pSpecialMatch && this.pUpperMatch &&
            this.pLowerMatch && this.pNumMatch)
      }
      else{
        this.pEightMatch = false
        this.pWhiteMatch = false
        this.pSpecialMatch = false
        this.pUpperMatch = false
        this.pLowerMatch = false
        this.pNumMatch = false
        this.passwordValidate = false
      }
    },
    checkPasswords() {
      if(isEmpty(this.password) || isEmpty(this.password2)){
        this.passwordsMatch = false
      }else{
        this.passwordsMatch = (this.password === this.password2)
      }
    },
    signup () {
      if(isEmpty(this.password) || isEmpty(this.username) || isEmpty(this.email)){
        this.alertCustomError("Empty Fields",
            "All fields are required to signup.")
      }
      else{
        this.$store.dispatch(SIGNUP_REQUEST,
            {username: this.username, password: this.password, email: this.email}).then(() =>{
          this.$router.push('/login')

          const toastMessage = `User ${this.username} created successfully.`

          this.$buefy.toast.open({
            duration: 3000,
            message: toastMessage,
            type: 'is-success'
          })
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
      }
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