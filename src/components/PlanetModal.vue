<template>
  <div class="modal-container">
    <div class="modal">
      <h2 class="modal-title">Planet Details - {{ planet.name }}</h2>
      <div class="modal-body">
        <h4>Diameter: {{ planet.diameter }}</h4>
        <h4>Climate: {{ planet.climate }}</h4>
        <h4>Population: {{ planet.population }}</h4>
      </div>

      <button class="close-button" @click="$emit('onClose')">Close</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PlanetModal",
  props: { homeworld: String, showModal: Boolean },
  async mounted() {
    await this.$store.dispatch("fetchPlanet", { usersPlanet: this.homeworld });
  },
  computed: mapState({ planet: (state) => state.planet }),
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal {
  width: 300px;
  margin: 100px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.close-button {
  margin: 10px;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
}
h4 {
  font-weight: 400;
  margin: 5px;
}
</style>
