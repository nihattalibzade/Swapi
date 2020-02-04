<template>
    <div class="header">
        <b-card>
            <div class="col-sm-12 row">
                <div class="col-md-6">
                    <div class="d-inline-flex">
                        <b-media left-align vertical-align="center">
                            <template v-slot:aside>
                                <b-img :src='require("../assets/death-star.png")' width="80" alt="placeholder"></b-img>
                            </template>
                            <h3 class="mt-3">{{msg}}</h3>
                        </b-media>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="col-sm-12">
                        <b-input-group class="my-3">
                            <b-form-input v-model="filterCharacter" @keyup.enter="filterData" class="mr-sm-2" type="text" placeholder="Search"/>
                            <b-input-group-append>
                                <b-button :disabled="filterCharacter === ''" v-on:click="filterData" variant="dark">Search</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                </div>
            </div>
        </b-card>
        <b-alert
                variant="danger"
                dismissible
                fade
                :show="showDismissibleAlert"
                @dismissed="showDismissibleAlert=false"
        >
            No results found!
        </b-alert>
        <Character></Character>
        <Starship></Starship>
        <Film></Film>
        <Planet></Planet>
    </div>
</template>

<script>
    import Character from "./Character";
    import Starship from "./Starship";
    import Film from "./Film";
    import Planet from "./Planet";
    import {mapState} from "vuex";

    export default {
        name: "Header",
        components: {Film, Starship, Character, Planet},
        props: {
            msg: String
        },
        data() {
            return {
                filterCharacter: '',
                showDismissibleAlert: false,
                mutations: ['saveCharacter', 'saveFilm', 'saveStarship', 'savePlanet'],
            }
        },

        computed: mapState(['characters', "planets", "starships", "films"]),

        methods: {

            filterData: function () {
                let ch = this.characters.filter(d => d.name.toLowerCase().includes(this.filterCharacter.toLowerCase()))[0];
                let star = this.starships.filter(d => d.name.toLowerCase().includes(this.filterCharacter.toLowerCase()))[0];
                let film = this.films.filter(d => d.title.toLowerCase().includes(this.filterCharacter.toLowerCase()))[0];
                let pl = this.planets.filter(d => d.name.toLowerCase().includes(this.filterCharacter.toLowerCase()))[0];

                if(ch) {
                    this.resetComponents('saveCharacter', 'loadCharacter', ch.url);
                }
                else if (star){
                    this.resetComponents('saveStarship', 'loadStarship', star.url);
                }
                else if (pl){
                    this.resetComponents('savePlanet', 'loadPlanet', pl.url);
                }
                else if (film){
                    this.resetComponents('saveFilm', 'loadFilm', film.url);
                }
                else {
                    this.showDismissibleAlert = true;
                    setTimeout(function () { this.showDismissibleAlert = false }.bind(this), 5000);
                }
            },

            resetComponents: function (mutation, action, url) {
                this.mutations.filter(name => name !== mutation).forEach((mutation) => {
                    this.$store.commit(mutation, undefined);
                });
                this.$store.dispatch(action, url);
            }
        }
    }
</script>

<style scoped>

</style>
