<template>
  <div class="container block" id="track-list">
    <div class="columns is-mobile">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            List based on {{ selected.name }}
          </div>
          <div class="column is-1 is-offset-2">
            <font-awesome-icon icon="times-circle" class="close-btn" @click="$emit('clear-list')"/>
          </div>
        </div>
        <ul id="recommended-tracks">
          <li v-for="track in results" :key="track.name" class="list-object">
            <div class="columns is-mobile">
              <div class="column is-2-desktop is-2-tablet is-2-mobile">
                <img class="rounded-corners b-image-wrapper"
                     :src="`${track.album.images.length > 0 ?
                       track.album.images[1].url : noImg}`" alt="Album Cover"/>
              </div>
              <div class="column is-two-fifths-desktop is-one-third-mobile has-text-left">
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
                <br/>
                <br/>
                <div v-if="track.preview_url">
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
  </div>
</template>

<script>
import axios from "axios";
import vinylImg from '../assets/no-image.png'
import {isEmpty} from 'lodash'
export default {

  data () {
    return {
      pendingRequest: false,
      results: [],
      noImg: vinylImg,
      track: {},
      playingAudio: false,
      currentlyPlaying: null,
      currentTrack: null
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
}
.list-object{
  margin-bottom: 50px;
}
.close-btn{
  font-size: 1vw;
}
.close-btn:hover{
  color: #EE3148;
  cursor: pointer;
}
</style>