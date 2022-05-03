<template>
  <HeaderItem />

  <UserSearch />

  <UserList @onViewHomeworld="openModal" :users="users" />

  <div v-if="showModal" class="planet-modal-container">
    <PlanetModal :homeworld="homeworld" @onClose="showModal = false" />
  </div>
</template>

<script>
import HeaderItem from "./components/HeaderItem.vue";
import UserList from "./components/UserList.vue";
import UserSearch from "./components/UserSearch.vue";
import PlanetModal from "./components/PlanetModal.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    HeaderItem,
    UserList,
    UserSearch,
    PlanetModal,
  },
  data() {
    return {
      showModal: false,
      homeworld: "",
      query: "",
      sortBy: "",
      sortOrder: "asc",
    };
  },
  async mounted() {
    await this.$store.dispatch("fetchUsers");
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
  },
  methods: {
    openModal: function (event) {
      (this.homeworld = event), (this.showModal = true);
    },
  },
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}
html,
body {
  margin: 0;
  padding: 0;
}
</style>
