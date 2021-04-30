<template>
  <form action="">
    <div class="modal-card" style="width: auto" v-on:keyup.enter="signup">
      <header class="modal-card-head">
        <p class="modal-card-title">Signup</p>
        <button
            type="button"
            class="delete"
            @click="$emit('close')"/>
      </header>
      <section class="modal-card-body">
        <b-field label="Email">
          <b-input
              type="email"
              v-model="modalEmail"
              placeholder="Your email"
              required>
          </b-input>
        </b-field>

        <b-field label="Username">
          <b-input
              type="username"
              v-model="modalUsername"
              placeholder="Your username"
              required>
          </b-input>
        </b-field>

        <b-field label="Password">
          <b-input
              type="password"
              v-model="modalPassword"
              password-reveal
              placeholder="Your password"
              required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button
            label="Close"
            @click="close" />
        <b-button
            label="Signup"
            type="is-primary" @click="signup"/>
      </footer>
    </div>
  </form>
</template>

<script>

export default {
  name: "SignupModal",
  data () {
    return {
      modalUsername: '',
      modalEmail: '',
      modalPassword: ''
    }
  },
  props: {
    canCancel: Boolean
  },
  methods: {
    signup () {
      this.$emit('signup',
          {email: this.modalEmail, username: this.modalUsername, password: this.modalPassword})
    },
    close () {
      this.$emit('close')
      this.modalUsername = ''
      this.modalPassword = ''
    }
  }
}
</script>

<style scoped>

</style>