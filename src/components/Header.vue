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
                filteredItem: {}
            }
        },

        computed: mapState(['characters', "planets", "starships", "films"]),

        methods: {

            filterData: function () {

                if(this.filterObjects(this.characters)) {
                    this.resetComponents('saveCharacter', 'loadCharacter', this.filteredItem.url);
                }
                else if (this.filterObjects(this.starships)){
                    this.resetComponents('saveStarship', 'loadStarship', this.filteredItem.url);
                }
                else if (this.filterObjects(this.planets)){
                    this.resetComponents('savePlanet', 'loadPlanet', this.filteredItem.url);
                }
                else if (this.filterObjects(this.films)){
                    this.resetComponents('saveFilm', 'loadFilm', this.filteredItem.url);
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
            },
            
            filterObjects: function (items) {
                return this.filteredItem = items.filter(item => item.name.toLowerCase().includes(this.filterCharacter.toLowerCase()))[0];
            }
        }
    }
</script>

<style scoped>

</style>
