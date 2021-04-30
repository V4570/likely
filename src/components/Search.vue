<template>
  <div class="container search-bar">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <section>
          <div class="columns is-centered">
            <b-field label="Get recommendations based on a favorite track or artist"
                     position="is-centered"
                     custom-class="has-text-light">
              <b-radio v-model='trackOrArtist' :native-value='false'>Track</b-radio>
              <b-radio v-model='trackOrArtist' :native-value='true'>Artist</b-radio>
            </b-field>
          </div>
          <b-field loading>
            <b-autocomplete
                rounded
                v-model="query"
                :data="searchResults"
                :loading="isFetching"
                v-on:input="autocomplete"
                v-bind:placeholder="trackOrArtist ? 'e.g. The Beatles' : 'e.g. Yellow Submarine'"
                icon="magnify"
                clearable
                @select="option => $emit('recommend-list', {selection: option, type: trackOrArtist})">

              <template slot-scope="props">
                <div class="media">
                  <div class="media-left">
                    <b-image v-if="!trackOrArtist"
                             class="is-64x64"
                             :src="`${props.option.album.images.length > 0 ?
                             props.option.album.images[props.option.album.images.length - 1].url : noImg}`"
                             :rounded="roundedImages"
                             alt="Album Cover"
                    ></b-image>
                    <b-image v-else
                             class="is-64x64"
                             :src="`${props.option.images.length > 0 ? props.option.images[props.option.images.length - 1].url : noImg}`"
                             :rounded="roundedImages"
                             alt="Album Cover"
                    ></b-image>
                  </div>
                  <div class="media-content">
                    <div v-if="!trackOrArtist" class="content">
                      <h5>{{ props.option.name }}</h5>
                      <small v-for="(artist, index) in props.option.artists" :key="artist.name">
                        <template v-if="index < props.option.artists.length -1">
                          {{ artist.name }},
                        </template>
                        <template v-else>
                          {{ artist.name }}
                        </template>
                      </small>
                    </div>
                    <div v-else
                         class="content">
                      {{ props.option.name }}
                    </div>
                  </div>
                </div>
              </template>

            </b-autocomplete>
          </b-field>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {isEmpty, debounce} from 'lodash'
import vinylImg from '../assets/no-image.png'

export default {
  data () {
    return {
      query: "",
      noImg: vinylImg,
      searchResults: [],
      selected: null,
      isFetching: false,
      roundedImages: true,
      // false search for track, true search for artist
      trackOrArtist: false,
      limit: 20
    }
  },
  methods: {

    // debounce groups inputs into one request so that we don't flood the server with every keystroke
    autocomplete: debounce(async function() {
      const results = await this.search()

      this.searchResults = [];

      if(results.length){
        results.forEach(item => {
          this.searchResults.push(item)
        })
      }

      this.isFetching = false
    }, 180),

    async search () {
      if (isEmpty(this.query)) { return []; }

      try{

        this.isFetching = true
        const searchFor = this.trackOrArtist ? "artist" : "track"

        const request_options = {
          method: 'GET',
          url: `${process.env.VUE_APP_BACKEND_URL}/search-track?q=${this.query}&search-for=${searchFor}`,
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        }

        const response = await axios(request_options)

        if (isEmpty(response.data)){
          return []
        }

        return this.trackOrArtist ? response.data.artists.items : response.data.tracks.items
      } catch (e){

        console.log(e)
      }

      return [];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-bar{
  margin-top: 60px;
}
</style>
