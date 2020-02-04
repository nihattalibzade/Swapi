<template>
  <div id="app">
    <Navbar></Navbar>
    <Header msg="Star Wars API Challenge"></Header>
  </div>
</template>

<script>
import Character from './components/Character.vue'
import Navbar from './components/Navbar'
import Header from "./components/Header";

export default {
  name: 'app',
  components: {
    Header,
    Character,
    Navbar
  },
  created() {
    this.$store.dispatch('loadCharacter', 'https://swapi.co/api/people/1/')
    this.$store.dispatch('loadCharacters');
    this.$store.dispatch('loadFilms');
    this.$store.dispatch('loadStarships');
    this.$store.dispatch('loadPlanets');
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  .card-header {
    font-size: 25px;
    font-weight: bold;
  }
/*https://codepen.io/ovdojoey/pen/BomKyZ*/

</style>
