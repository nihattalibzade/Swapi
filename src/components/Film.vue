<template>
    <div class="container-fluid mt-5" v-if="film !== undefined">
        <div v-if="!isLoading" class="row">
            <div class="col-md-6 col-sm-12">
                <div class="mb-5 card_wrapper">
                    <b-card class="card_header"
                            border-variant="dark"
                            header-border-variant="dark"
                            :header="film.name + ' (Movie)'">
                        <b-card-text class="text-left">
                            <em><b>Director</b></em>: {{film.director}} <br>
                            <em><b>Producer</b></em>: {{film.producer}} <br>
                            <em><b>Episode</b></em>: {{film.episode_id}} <br>
                            <em><b>Opening</b></em>: {{film.opening_crawl}} <br>
                        </b-card-text>

                    </b-card>
                </div>

                <div class="mb-5 card_wrapper">
                    <b-card class="card_header"
                            border-variant="dark"
                            header-border-variant="dark"
                            header="Characters">
                        <b-card-text v-for="character in film.characters">
                            {{character}}
                        </b-card-text>
                    </b-card>
                </div>
            </div>

            <div class="col-md-6 col-sm-12">
                <div class="mb-5 card_wrapper">
                    <b-card class="card_header"
                            border-variant="dark"
                            header-border-variant="dark"
                            header="Planets">
                        <b-card-text v-for="planet in film.planets">
                            {{planet}}
                        </b-card-text>
                    </b-card>
                </div>
                <div class="mb-5 card_wrapper">
                    <b-card class="card_header"
                            border-variant="dark"
                            header-border-variant="dark"
                            header="Starships">
                        <b-card-text v-for="starship in film.starships">
                            {{starship}}
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
        name: "Film",
        components: {FingerprintSpinner},
        props: {},

        computed: {
            film: {
                get: function () {
                    return this.$store.getters.film;
                }
            },
            isLoading: {
                get: function () {
                    return this.$store.getters.isLoading;
                }
            }
        }
    }
</script>

<style scoped>

</style>
