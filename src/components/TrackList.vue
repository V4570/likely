<template>
  <div class="container" id="track-list">
    <div class="columns is-mobile">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="columns">
          <div class="column is-1 has-text-centered">
            <b-tooltip label="Save Playlist"
                       type="is-dark">
              <font-awesome-icon icon="save" class="save-btn" @click="isComponentModalActive = true"/>
            </b-tooltip>
          </div>
          <div class="column is-half is-offset-2 has-text-centered">
            List based on {{ selected.name }}
          </div>
          <div class="column is-1 is-offset-2 has-text-centered">
            <b-tooltip label="Close"
                       type="is-dark">
              <font-awesome-icon icon="times-circle" class="close-btn" @click="$emit('clear-list')"/>
            </b-tooltip>
          </div>
        </div>
        <ul id="recommended-tracks">
          <li v-for="track in results" :key="track.name" class="list-object">
            <div class="columns is-mobile is-vcentered">
              <div class="column is-2-desktop is-2-tablet is-2-mobile">
                <img class="rounded-corners b-image-wrapper"
                     :src="`${track.album.images.length > 0 ?
                       track.album.images[1].url : noImg}`" alt="Album Cover"/>
              </div>
              <div class="column is-4-desktop is-two-thirds-mobile has-text-left truncate">
                <b>{{track.name}}</b>
                <br/>
                <small v-for="(artist, index) in track.artists" :key="artist.name">
                  <template v-if="index < track.artists.length -1">
                    {{ artist.name }},
                  </template>
                  <template v-else>
                    {{ artist.name }}
                  </template>
                </small>
              </div>
              <div class="column is-3-desktop is-one-third-mobile has-text-left">
                <div v-if="track.preview_url">
                  <b>Preview:</b>
                  <br/>
                  <audio
                      :ref="`player-${track.name}`"
                      controls
                      :src="track.preview_url"
                      type="audio/mpeg"
                      @play="stopOthers(track.name)"
                  ></audio>
                </div>
                <div v-else>
                  <font-awesome-icon icon="times-circle" style="font-size: 1vw;" class="has-text-grey has-text-justified"/>
                  <span class="has-text-grey"> Preview not available.</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <b-modal
        v-model="isComponentModalActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-label="Playlist Name Modal"
        aria-modal>
      <template #default="props">
        <playlist-name-modal v-bind="playlistName" @close="props.close" @save="saveList"></playlist-name-modal>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import vinylImg from '../assets/no-image.png'
import {isEmpty} from 'lodash'
import PlaylistNameModal from "@/components/PlaylistNameModal"

export default {
  components: {
    PlaylistNameModal
  },
  data () {
    return {
      pendingRequest: false,
      results: [],
      noImg: vinylImg,
      track: {},
      playingAudio: false,
      currentlyPlaying: null,
      currentTrack: null,
      isComponentModalActive: false,
      playlistName: ''
    }
  },

  props: {
    selected: Object,
    type: Boolean
  },

  watch: {
    selected () {
      if(!isEmpty(this.selected)){
        this.createList();
      }
    }
  },
  methods: {
    async createList () {

      try {

        this.pendingRequest = true;
        const selectedID = this.selected.id
        const type_search = this.type ? 'a' : 't'

        const request_options = {
          method: 'GET',
          url: `${process.env.VUE_APP_BACKEND_URL}/recommendations?seed=${selectedID}&type=${type_search}`,
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.$store.state.token
          }
        }

        const response = await axios(request_options)
        this.results = Object.keys(response.data).length === 0 ? [] : response.data.tracks

        if(!isEmpty(this.results) && !this.type){
          this.results.unshift(this.selected)
        }
      } catch (e) {

        console.log(e);
      } finally {

        this.pendingRequest = false;
      }
    },

    async saveList(name) {

      if(name){
        try{

          const options = {
            method: 'POST',
            url: `${process.env.VUE_APP_BACKEND_URL}/playlist/save`,
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + this.$store.state.token
            },
            data: {
              "name": name,
              "tracks": this.results
            }
          }

          const response = await axios(options)



          const toastMessage = `Playlist "${response.data.name}" saved with id: ${response.data.id}.`
          this.$buefy.toast.open({
            duration: 3000,
            message: toastMessage,
            type: 'is-success'
          })

          this.isComponentModalActive = false

        } catch (e) {
          const errorResponse = e.response

          const conflictError = `Playlist "${name}" already exists`
          switch(errorResponse.status){
            case 409:

              this.$buefy.toast.open({
                duration: 3000,
                message: conflictError,
                type: 'is-danger'
              })
              break
            default:

              this.$buefy.toast.open({
                duration: 3000,
                message: "Something went wrong.",
                type: 'is-danger'
              })
          }
        }
      }

    },

    stopOthers(newTrack) {
      if (this.currentTrack && this.currentTrack !== newTrack) {
        let refName = `player-${this.currentTrack}`;
        let player = this.$refs[refName][0];
        player.pause();
      }
      if(newTrack){
        this.currentTrack = newTrack;
      }
    }
  }
}
</script>

<style scoped>
.rounded-corners{
  border-radius: 20%;
  width: 70%;
}

.list-object{
  margin-bottom: 30px;
  background-color: rgba(255,255,255,0.1) !important;
  backdrop-filter: blur(10px);
  border-radius: 8px;
}
.save-btn{
  font-size: 1.3vw;
}

.save-btn:hover{
  color: #1DB954;
  cursor: pointer;
}

.close-btn{
  font-size: 1.3vw;
}

.close-btn:hover{
  color: #EE3148;
  cursor: pointer;
}

.truncate {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>