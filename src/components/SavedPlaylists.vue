<template>
  <div class="container">
    <div class="section-head mt-5">
      <div class="title has-text-light">
        Saved Playlists
      </div>

    </div>
    <div class="section">
      <b-collapse class="card saved-playlists"
                  animation="slide"
                  v-for="(playlist,index) in playlists"
                  :key="index"
                  :open="isOpen === index"
                  @open="isOpen = index">

        <template #trigger="props">
          <div
              class="card-header"
              role="button"
          >
            <p class="card-header-title has-text-light is-centered">
              {{ playlist.name }}
            </p>
            <a class="card-header-icon has-text-light">
              <b-icon
                  :icon="props.open ? 'caret-down' : 'caret-up'">
              </b-icon>
            </a>
          </div>
        </template>

        <div class="card-content has-text-light">
          <ul>
            <li v-for="(track, index) in playlist.tracks" :key="index" class="list-object">
              <div class="columns is-mobile is-vcentered">
                <div class="column is-2-desktop is-2-tablet is-2-mobile">
                  <img class="rounded-corners b-image-wrapper"
                       :src="`${track.album.images.length > 0 ?
                         track.album.images[2].url : noImg}`" alt="Album Cover"/>
                </div>
                <div class="column is-4-desktop is-two-thirds-mobile has-text-left truncate">
                  <b>{{track.name}}</b>
                  <br/>
                  <small v-for="(artist, index) in track.artists" :key="index">
                    <template v-if="index < track.artists.length -1">
                      {{ artist.name }},
                    </template>
                    <template v-else>
                      {{ artist.name }}
                    </template>
                  </small>
                </div>
                <div class="column is-5-desktop is-one-third-mobile has-text-left">
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
                <div class="column is-1-desktop has-text-left">
                  <a :href="track.external_urls.spotify"
                     class="spotify-btn"
                     target="_blank">
                    <font-awesome-icon :icon="['fab', 'spotify']"/>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </b-collapse>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import vinylImg from '@/assets/no-image.png'

export default {
  name: "SavedPlaylists",
  data () {
    return {
      playlists: [],
      isOpen: -1,
      noImg: vinylImg,
      playingAudio: false,
      currentlyPlaying: null,
      currentTrack: null,
    }
  },
  async created () {
    await this.getSavedPlaylists()
  },
  methods: {
    async getSavedPlaylists() {

      try{

        const options = {
          method: 'GET',
          url: "/api/playlists",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.$store.state.token
          }
        }

        const response = await axios(options)

        this.playlists = response.data.playlists

      } catch (e) {
        const errorResponse = e.response

        console.log(errorResponse.status)
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
.saved-playlists{
  background-color: rgba(255,255,255,0.1) !important;
  backdrop-filter: blur(10px);
  border-radius: 8px;
}

.spotify-btn{
  color: #fff;
  font-size: 1.2vw;
}

.spotify-btn:hover{
  color: #1DB954;
  cursor: pointer;
}

.truncate {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>