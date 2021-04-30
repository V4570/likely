<template>
  <form action="">
    <div class="modal-card" style="width: auto" v-on:keyup.enter="login">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
        <button
            type="button"
            class="delete"
            @click="$emit('close')"/>
      </header>
      <section class="modal-card-body">
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
            label="Login"
            type="is-primary" @click="login"/>
      </footer>
    </div>
  </form>
</template>

<script>

export default {
  name: "LoginModal",
  data () {
    return {
      modalUsername: '',
      modalPassword: ''
    }
  },
  props: {
    canCancel: Boolean
  },
  methods: {
    login () {
      this.$emit('login', {username: this.modalUsername, password: this.modalPassword})
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