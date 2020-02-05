<template>
    <div class="container-fluid mt-5" v-if="planet !== undefined">
        <div v-if="!isLoading" class="row">
            <div class="col-md-6 col-sm-12">
                <div class="mb-5 card_wrapper">
                    <b-card class="card_header"
                            border-variant="dark"
                            header-border-variant="dark"
                            :header="planet.name + ' (Planet)'">
                        <b-card-text class="text-left">
                            <em><b>Population</b></em>: {{planet.population}} <br>
                            <em><b>Climate</b></em>: {{planet.climate}} <br>
                            <em><b>Orbital Period</b></em>: {{planet.orbital_period}} <br>
                            <em><b>Terrain</b></em>: {{planet.terrain}} <br>
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
                        <b-card-text v-for="film in planet.films">
                            {{film}}
                        </b-card-text>
                    </b-card>
                </div>
                <div class="mb-5 card_wrapper">
                    <b-card class="card_header"
                            border-variant="dark"
                            header-border-variant="dark"
                            header="Residents">
                        <b-card-text v-for="resident in planet.residents">
                            {{resident}}
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
        name: "Planet",
        components: {FingerprintSpinner},
        props: {},

        computed: {
            planet: {
                get: function () {
                    return this.$store.getters.planet;
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

<style scoped>

</style>
