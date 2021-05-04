<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Save new Playlist</p>
        <button
            type="button"
            class="delete"
            @click="$emit('close')"/>
      </header>
      <section class="modal-card-body">
        <b-field label="Playlist Name">
          <b-input
              :value="playlistName"
              v-model="name"
              placeholder="New playlist"
              required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button
            label="Close"
            @click="$emit('close')" />
        <b-button
            label="Create"
            type="is-primary" @click="$emit('save', name)" />
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: "PlaylistNameModal",
  data () {
    return {
      name: ''
    }
  },
  props: {
    canCancel: Boolean,
    playlistName: String
  }
}
</script>

<style scoped>

</style>