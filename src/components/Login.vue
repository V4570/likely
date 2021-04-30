<template>
  <section>
    <b-button
        label="Login"
        type="is-light"
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
        <login-modal @close="props.close" @login="login"></login-modal>
      </template>
    </b-modal>
  </section>
</template>

<script>
import LoginModal from "@/components/LoginModal";
import {isEmpty} from "lodash";
import axios from "axios";

export default {
  components: {
    LoginModal
  },
  data() {
    return {
      isComponentModalActive: false,
      username: '',
      password: ''
    }
  },
  methods: {
    async login (credentials) {
      this.username = credentials.username
      this.password = credentials.password

      if (isEmpty(this.username) || isEmpty(this.password)){
        console.log('empty fields')
      }

      try{

        const loginOptions = {
          method: 'POST',
          url: `${process.env.VUE_APP_BACKEND_URL}/login`,
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          data: {
            username: this.username,
            password: this.password
          }
        }

        const response = await axios(loginOptions)

        console.log(response)
        this.username = ''
        this.password = ''
      }
      catch (e){
        const errorResponse = e.response

        switch (errorResponse.status){
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