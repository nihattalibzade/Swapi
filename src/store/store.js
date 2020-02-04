import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const characterURL = 'https://swapi.co/api/people/';
const filmsURL = 'https://swapi.co/api/films/';
const starshipsURL = 'https://swapi.co/api/starships/';
const planetsURL = 'https://swapi.co/api/planets/';

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
            axios.get(characterURL).then(result => {
                commit('saveCharacters', result.data.results);
            }).catch(error => {
                throw new Error(`API ${error}`);
            });
        },
        loadFilms({commit}) {
            axios.get(filmsURL).then(result => {
                commit('saveFilms', result.data.results);
            }).catch(error => {
                throw new Error(`API ${error}`);
            });
        },
        loadStarships({commit}) {
            axios.get(starshipsURL).then(result => {
                commit('saveStarships', result.data.results);
            }).catch(error => {
                throw new Error(`API ${error}`);
            });
        },
        loadPlanets({commit}) {
            axios.get(planetsURL).then(result => {
                commit('savePlanets', result.data.results);
            }).catch(error => {
                throw new Error(`API ${error}`);
            });
        },

        loadCharacter({commit}, url) {
            this.person = {
                name: '',
                homeworld: '',
                films: [],
                starships: [],
            };
            commit('loadingState', true);

            axios.get(url)
                .then(response => {
                    this.person.name = response.data.name;
                    axios.get(response.data.homeworld)
                        .then(response2 => {
                            this.person.homeworld = response2.data.name;
                        });
                    response.data.films.forEach((film) => {
                        axios.get(film)
                            .then(response2 => {
                                this.person.films.push(response2.data.title);
                            })
                    });
                    response.data.starships.forEach((ship) => {
                        axios.get(ship)
                            .then(response2 => {
                                this.person.starships.push(response2.data.name);
                            })
                    });
                    commit('saveCharacter', this.person);
                })
                .catch(error => {
                    throw new Error(`API ${error}`);
                }).finally(() => setTimeout(function () { commit('loadingState', false); }.bind(this), 2000));
        },

        loadPlanet({commit}, url) {
            this.world = {
                name: '',
                population: '',
                climate: '',
                orbital_period: '',
                terrain: '',
                residents: [],
                films: []
            };
            commit('loadingState', true);

            axios.get(url)
                .then(response => {
                    this.world.name = response.data.name;
                    this.world.population = response.data.population;
                    this.world.climate = response.data.climate;
                    this.world.orbital_period = response.data.orbital_period;
                    this.world.terrain = response.data.terrain;

                    response.data.residents.forEach((resident) => {
                        axios.get(resident)
                            .then(response2 => {
                                this.world.residents.push(response2.data.name);
                            })
                    });
                    response.data.films.forEach((film) => {
                        axios.get(film)
                            .then(response2 => {
                                this.world.films.push(response2.data.title);
                            })
                    });
                    commit('savePlanet', this.world);
                })
                .catch(error => {
                    throw new Error(`API ${error}`);
                }).finally(() => setTimeout(function () { commit('loadingState', false); }.bind(this), 2000));
        },

        loadFilm: function ({commit}, url) {
            this.movie = {
                title: '',
                director: '',
                producer: '',
                episode_id: '',
                opening_crawl: '',
                characters: [],
                planets: [],
                starships: []
            };
            commit('loadingState', true);

            axios.get(url)
                .then(response => {
                    this.movie.title = response.data.title;
                    this.movie.director = response.data.director;
                    this.movie.producer = response.data.producer;
                    this.movie.episode_id = response.data.episode_id;
                    this.movie.opening_crawl = response.data.opening_crawl;

                    response.data.characters.forEach((resident) => {
                        axios.get(resident)
                            .then(response2 => {
                                this.movie.characters.push(response2.data.name);
                            })
                    });
                    response.data.planets.forEach((planet) => {
                        axios.get(planet)
                            .then(response2 => {
                                this.movie.planets.push(response2.data.name);
                            })
                    });
                    response.data.starships.forEach((starship) => {
                        axios.get(starship)
                            .then(response2 => {
                                this.movie.starships.push(response2.data.name);
                            })
                    });
                    commit('saveFilm', this.movie);
                })
                .catch(e => {
                    this.errors.push(e)
                }).finally(() => setTimeout(function () { commit('loadingState', false); }.bind(this), 2000));
        },

        loadStarship: function ({commit}, url) {
            this.ship = {
                name: '',
                passengers: '',
                manufacturer: '',
                model: '',
                crew: '',
                films: [],
                pilots: []
            };
            commit('loadingState', true);

            axios.get(url)
                .then(response => {
                    this.ship.name = response.data.name;
                    this.ship.passengers = response.data.passengers;
                    this.ship.manufacturer = response.data.manufacturer;
                    this.ship.model = response.data.model;
                    this.ship.crew = response.data.crew;

                    response.data.films.forEach((film) => {
                        axios.get(film)
                            .then(response2 => {
                                this.ship.films.push(response2.data.title);
                            })
                    });
                    response.data.pilots.forEach((pilot) => {
                        axios.get(pilot)
                            .then(response2 => {
                                this.ship.pilots.push(response2.data.name);
                            })
                    });
                    commit('saveStarship', this.ship);
                })
                .catch(e => {
                    this.errors.push(e)
                }).finally(() => setTimeout(function () { commit('loadingState', false); }.bind(this), 2000));
        },
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
