<template>
  <section>
    <b-button
        label="Signup"
        type="is-primary"
        @click="isComponentModalActive = true" />
    <b-modal
        v-model="isComponentModalActive"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-label="Example Modal"
        aria-modal>
      <template #default="props">
        <signup-modal @close="props.close" @signup="signup"></signup-modal>
      </template>
    </b-modal>
  </section>
</template>

<script>
import SignupModal from "@/components/SignupModal";
import {isEmpty} from "lodash";
import axios from "axios";

export default {
  components: {
    SignupModal
  },
  data() {
    return {
      isComponentModalActive: false,
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    async signup (credentials) {
      this.username = credentials.username
      this.password = credentials.password
      this.email = credentials.email

      if (isEmpty(this.username) || isEmpty(this.password)){
        console.log('empty fields')
      }

      try{

        const loginOptions = {
          method: 'POST',
          url: `${process.env.VUE_APP_BACKEND_URL}/signup`,
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          data: {
            email: this.email,
            username: this.username,
            password: this.password
          }
        }

        const response = await axios(loginOptions)


        console.log(response)
        this.username = ''
        this.password = ''
        this.email = ''
      }
      catch (e){
        const errorResponse = e.response

        switch (errorResponse.status){
          case 409:
            this.alertCustomError("Conflict Error",
                "A user with this username or email already exists.<br/>" +
                "Try Logging in or use another username and email.")
            break
          default:
            console.log(e)
        }
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