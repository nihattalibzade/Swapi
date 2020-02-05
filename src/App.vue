<template>
  <div id="app">
    <Header msg="Star Wars API Challenge"></Header>
  </div>
</template>

<script>
import Header from "./components/Header"
import * as consts from './store/consts'

export default {
  name: 'app',
  components: {
    Header,
  },
  created() {
    this.$store.dispatch('loadCharacter', consts.characterURL + 1);
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
  .card_wrapper {
    transition: box-shadow .2s;
  }
  .card_wrapper:hover {
    box-shadow: 10px 10px 10px rgba(33,33,33,.2);
  }

</style>
