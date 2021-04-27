<template>
  <div class="container block">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <section>
          <b-field label="Get recommendations based on a favorite track or artist">
            <b-radio v-model='trackOrArtist' :native-value='false'>Track</b-radio>
            <b-radio v-model='trackOrArtist' :native-value='true'>Artist</b-radio>
          </b-field>
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
                      {{ props.option.name }}
                      <br>
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
    }
  },
  methods: {
    async autocomplete () {
      const results = await this.searchTrack();

      this.searchResults = [];
      if(results.length){
        results.forEach(item => {
          this.searchResults.push(item)
        })
      }
      this.isFetching = false
    },
    async searchTrack () {
      if ((this.query !== "") && (typeof this.query !== 'undefined')) {
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
        const res = await axios(request_options).then(
            function (response) {

              const notEmpty = Object.keys(response.data).length === 0
              if (!notEmpty){
                return response.data
              }

              return []
            }
        ).catch(function (error){
          console.log(error)
          return Promise.reject(error)
        });

        return this.trackOrArtist ? res.artists.items : res.tracks.items
      }

      return [];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
