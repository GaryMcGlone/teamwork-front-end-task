<template>
  <HeaderItem />

  <UserSearch @onSearch="setQuery" />

  <UserList
    @onViewHomeworld="openModal"
    @onSort="setSortBy"
    :users="searchedUsers.length > 0 ? searchedUsers : sortedUsers"
  />

  <div v-if="showModal" class="planet-modal-container">
    <PlanetModal :homeworld="homeworld" @onClose="showModal = false" />
  </div>
</template>

<script>
import HeaderItem from "./components/HeaderItem.vue";
import UserList from "./components/UserList.vue";
import UserSearch from "./components/UserSearch.vue";
import PlanetModal from "./components/PlanetModal.vue";
import { mapGetters } from "vuex";

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
    ...mapGetters({
      getSortedByColumn: "getSortedByColumn",
      getFilteredUsers: "getFilteredUsers",
    }),
    searchedUsers() {
      return this.getFilteredUsers(this.query);
    },
    sortedUsers() {
      return this.getSortedByColumn(this.sortBy, this.sortOrder);
    },
  },
  methods: {
    openModal(event) {
      (this.homeworld = event), (this.showModal = true);
    },
    setQuery(event) {
      this.query = event;
    },
    setSortBy(event) {
      this.sortOrder === "asc"
        ? (this.sortOrder = "desc")
        : (this.sortOrder = "asc");
      this.sortBy = event;
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
