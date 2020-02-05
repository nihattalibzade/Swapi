<template>
  <div v-if="character !== undefined" class="container-fluid mt-5">
      <div v-if="!isLoading" class="row">
        <div class="col-md-6 col-sm-12">
            <div class="mb-5 card_wrapper">
              <b-card class="card_header"
                      border-variant="dark"
                      header-border-variant="dark"
                      :header="character.name + ' (Character)'">
                <b-card-text class="text-left">
                  <em><b>Homeworld</b></em>: {{character.homeworld}}
                </b-card-text>
              </b-card>
            </div>
        </div>

        <div class="col-md-6 col-sm-12">
            <div class="mb-5 card_wrapper">
              <b-card class="card_header"
                      border-variant="dark"
                      header-border-variant="dark"
                      header="Films">
                <b-card-text v-for="film in character.films">
                  {{film}}
                </b-card-text>
              </b-card>
            </div>
            <div class="mb-5 card_wrapper">
              <b-card class="card_header"
                      border-variant="dark"
                      header-border-variant="dark"
                      header="Starships">
                <b-card-text v-for="ship in character.starships">
                  {{ship}}
                </b-card-text>
              </b-card>
            </div>
        </div>
      </div>
      <fingerprint-spinner v-if="isLoading"></fingerprint-spinner>
  </div>
</template>

<script>
    import FingerprintSpinner from './FingerprintSpinner';

    export default {
      name: 'Character',
      components: {FingerprintSpinner},
      props: {},

      computed: {
          character: {
              get: function () {
                  return this.$store.getters.character;
              }
          },
          isLoading: {
              get: function () {
                  return this.$store.getters.isLoading;
              }
          }
      },
    }
</script>
