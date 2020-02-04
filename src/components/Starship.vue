<template>
    <div class="container-fluid mt-5" v-if="starship !== undefined">
        <div v-if="!isLoading" class="row">
            <div class="col-md-6 col-sm-12">
                <div class="mb-5">
                    <b-card class="card_header"
                            border-variant="dark"
                            header-border-variant="dark"
                            :header="starship.name + ' (Starship)'">
                        <b-card-text class="text-left">
                            <em><b>Passengers</b></em>: {{starship.passengers}} <br>
                            <em><b>Manufacturer</b></em>: {{starship.manufacturer}} <br>
                            <em><b>Model</b></em>: {{starship.model}} <br>
                            <em><b>Crew</b></em>: {{starship.crew}} <br>
                        </b-card-text>

                    </b-card>
                </div>
            </div>

            <div class="col-md-6 col-sm-12">
                <div class="mb-5">
                    <b-card class="card_header"
                            border-variant="dark"
                            header-border-variant="dark"
                            header="Films">
                        <b-card-text v-for="film in starship.films">
                            {{film}}
                        </b-card-text>
                    </b-card>
                </div>
                <div class="mb-5">
                    <b-card class="card_header"
                            border-variant="dark"
                            header-border-variant="dark"
                            header="Pilots">
                        <b-card-text v-for="pilot in starship.pilots">
                            {{pilot}}
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
        name: "Starship",
        components: {FingerprintSpinner},
        props: {},

        computed: {
            starship: {
                get: function () {
                    return this.$store.getters.starship;
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
