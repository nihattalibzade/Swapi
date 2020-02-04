export const characterURL = 'https://swapi.co/api/people/';
export const filmsURL = 'https://swapi.co/api/films/';
export const starshipsURL = 'https://swapi.co/api/starships/';
export const planetsURL = 'https://swapi.co/api/planets/';

export const person = {
    name: '',
    homeworld: '',
    films: [],
    starships: [],
};

export const world = {
    name: '',
    population: '',
    climate: '',
    orbital_period: '',
    terrain: '',
    residents: [],
    films: []
};

export const movie = {
    title: '',
    director: '',
    producer: '',
    episode_id: '',
    opening_crawl: '',
    characters: [],
    planets: [],
    starships: []
};

export const ship = {
    name: '',
    passengers: '',
    manufacturer: '',
    model: '',
    crew: '',
    films: [],
    pilots: []
};
