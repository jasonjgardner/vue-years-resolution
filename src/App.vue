<template>
  <div id="app">
    <ButtonReel v-if="idx >= 0" :disabled="idx !== 1" :speed="100"
                :choices="['Start', 'Stop', 'Try more', 'Do less', 'Cut back', 'Improve']"
                @clicked="idx++"
    />
    <ButtonReel v-if="idx > 1" :disabled="idx !== 2" :speed="100"
                :choices="['Farting', 'Running', 'Playa hating', 'Crushing it']"
                @clicked="idx++"
    />

    <button type="reset" @click.prevent="restart">Restart</button>
  </div>
</template>

<script>
import ButtonReel from './components/ButtonReel';

export default {
  name: 'app',
  components: {
    ButtonReel
  },
  data: () => {
    return {
      idx: 1
    }
  },
  methods: {
    restart() {
      this.idx = -1;
      setTimeout(() => this.idx = 1, 100);
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  button {
    display: block;
    margin: 1rem auto;
  }
</style>
