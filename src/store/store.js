import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as consts from './consts'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        characters: [],
        planets: [],
        starships: [],
        films: [],
        character: undefined,
        planet: undefined,
        starship: undefined,
        film: undefined,
        isLoading: Boolean
    },

    actions: {
        loadCharacters({commit}) {
            axios.get(consts.characterURL).then(result => {
                commit('saveCharacters', result.data.results);
            }).catch(error => {
                throw new Error(`API ${error}`);
            });
        },
        loadFilms({commit}) {
            axios.get(consts.filmsURL).then(result => {
                commit('saveFilms', result.data.results);
            }).catch(error => {
                throw new Error(`API ${error}`);
            });
        },
        loadStarships({commit}) {
            axios.get(consts.starshipsURL).then(result => {
                commit('saveStarships', result.data.results);
            }).catch(error => {
                throw new Error(`API ${error}`);
            });
        },
        loadPlanets({commit}) {
            axios.get(consts.planetsURL).then(result => {
                commit('savePlanets', result.data.results);
            }).catch(error => {
                throw new Error(`API ${error}`);
            });
        },

        loadCharacter({commit, dispatch}, url) {
            commit('loadingState', true);

            axios.get(url)
                .then(response => {
                    consts.person.name = response.data.name;
                    consts.person.homeworld = dispatch('getResponse', response.data.homeworld).name;
                    response.data.films.forEach((film) => {
                        consts.person.films.push(dispatch('getResponse', film).title);
                    });
                    response.data.starships.forEach((ship) => {
                        consts.person.starships.push(dispatch('getResponse', ship).name);
                    });
                    commit('saveCharacter', consts.person);
                })
                .catch(error => {
                    throw new Error(`API ${error}`);
                }).finally(() => setTimeout(function () { commit('loadingState', false); }.bind(this), 2000));
        },

        loadPlanet({commit}, url) {
            commit('loadingState', true);

            axios.get(url)
                .then(response => {
                    consts.world.name = response.data.name;
                    consts.world.population = response.data.population;
                    consts.world.climate = response.data.climate;
                    consts.world.orbital_period = response.data.orbital_period;
                    consts.world.terrain = response.data.terrain;

                    response.data.residents.forEach((resident) => {
                        consts.world.residents.push(this.getResponse(resident).name);
                    });
                    response.data.films.forEach((film) => {
                        consts.world.residents.push(this.getResponse(film).title);
                    });
                    commit('savePlanet', consts.world);
                })
                .catch(error => {
                    throw new Error(`API ${error}`);
                }).finally(() => setTimeout(function () { commit('loadingState', false); }.bind(this), 2000));
        },

        loadFilm: function ({commit}, url) {
            commit('loadingState', true);

            axios.get(url)
                .then(response => {
                    consts.movie.title = response.data.title;
                    consts.movie.director = response.data.director;
                    consts.movie.producer = response.data.producer;
                    consts.movie.episode_id = response.data.episode_id;
                    consts.movie.opening_crawl = response.data.opening_crawl;

                    response.data.characters.forEach((resident) => {
                        axios.get(resident)
                            .then(response2 => {
                                consts.movie.characters.push(response2.data.name);
                            })
                    });
                    response.data.planets.forEach((planet) => {
                        axios.get(planet)
                            .then(response2 => {
                                consts.movie.planets.push(response2.data.name);
                            })
                    });
                    response.data.starships.forEach((starship) => {
                        axios.get(starship)
                            .then(response2 => {
                                consts.movie.starships.push(response2.data.name);
                            })
                    });
                    commit('saveFilm', consts.movie);
                })
                .catch(e => {
                    this.errors.push(e)
                }).finally(() => setTimeout(function () { commit('loadingState', false); }.bind(this), 2000));
        },

        loadStarship: function ({commit}, url) {
            commit('loadingState', true);

            axios.get(url)
                .then(response => {
                    consts.ship.name = response.data.name;
                    consts.ship.passengers = response.data.passengers;
                    consts.ship.manufacturer = response.data.manufacturer;
                    consts.ship.model = response.data.model;
                    consts.ship.crew = response.data.crew;

                    response.data.films.forEach((film) => {
                        axios.get(film)
                            .then(response2 => {
                                consts.ship.films.push(response2.data.title);
                            })
                    });
                    response.data.pilots.forEach((pilot) => {
                        axios.get(pilot)
                            .then(response2 => {
                                consts.ship.pilots.push(response2.data.name);
                            })
                    });
                    commit('saveStarship', consts.ship);
                })
                .catch(e => {
                    this.errors.push(e)
                }).finally(() => setTimeout(function () { commit('loadingState', false); }.bind(this), 2000));
        },

        getResponse (data) {
            axios.get(data)
                .then(response => {
                    return response.data;
                })
        }
    },
    mutations: {
        saveCharacters(state, characters) {
            state.characters = characters;
        },
        saveCharacter(state, character) {
            state.character = character;
        },
        saveFilms(state, films) {
            state.films = films;
        },
        saveFilm(state, movie) {
            state.film = movie;
        },
        saveStarships(state, starships) {
            state.starships = starships;
        },
        saveStarship(state, ship) {
            state.starship = ship;
        },
        savePlanets(state, planets) {
            state.planets = planets;
        },
        savePlanet(state, world) {
            state.planet = world;
        },
        loadingState(state, isLoading) {
            state.isLoading = isLoading;
        }
    },
    getters: {
        character: state => state.character,
        characters: state => state.characters,
        planet: state => state.planet,
        planets: state => state.planets,
        film: state => state.film,
        films: state => state.films,
        starship: state => state.starship,
        starships: state => state.starships,
        isLoading: state => state.isLoading
    },
});
