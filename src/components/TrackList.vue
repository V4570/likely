<template>
  <div class="container block" id="track-list">
    <div class="columns is-mobile">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            List based on {{ type ? "Artist" : "Track"}}
          </div>
          <div class="column is-1 is-offset-2">
            <b-button size="is-small"
                      v-on:click="$emit('clear-list')"
            >
              <font-awesome-icon icon="times-circle" />
            </b-button>
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
              <div class="column is-one-third-desktop is-one-third-mobile has-text-left">
                <h1>{{ track.name }}</h1>
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
                <font-awesome-icon @click.prevent="playSound(track.preview_url)" icon="play-circle" class="play-button"></font-awesome-icon>
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
      results: [],
      noImg: vinylImg,
      track: {},
      playingAudio: false
    }
  },

  props: {
    selected: Object,
    type: Boolean
  },
  componentDidUpdate() {
    console.log(this.props.selected)
  },
  async mounted() {
    this.$nextTick(async function (){
      this.results = await this.createList()
    })
  },
  methods: {
    async createList () {
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

      return await axios(request_options).then(
          response => {

            const notEmpty = Object.keys(response.data).length === 0
            if (!notEmpty){
              return response.data.tracks
            }

            return []
          }
      ).catch(error => {
        console.log(error)
      });
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
.play-button{
  color: #fff;
  font-size: 2vw;
}
.play-button:hover{
  color: #1DB954;
}
</style>