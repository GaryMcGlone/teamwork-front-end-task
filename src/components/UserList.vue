<template>
  <table class="user-table">
    <tr>
      <th v-for="(column, index) in columns" :key="index">
        {{ column }}
      </th>
    </tr>
    <tr v-for="(user, index) in users" :key="index">
      <td>{{ user.name }}</td>
      <td>{{ user.height }}</td>
      <td>{{ user.mass }}</td>
      <td>{{ new Date(user.created).toLocaleString() }}</td>
      <td>{{ new Date(user.edited).toLocaleString() }}</td>
      <td>
        <button class="planet-button" @click="viewPlanet(user.homeworld)">
          VIEW PLANET
        </button>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "UserList",
  props: { users: Array },
  data() {
    return {
      columns: ["name", "height", "mass", "created", "edited", "planet"],
    };
  },
  methods: {
    viewPlanet(homeworld) {
      this.$emit("onViewHomeworld", homeworld);
    },
    sortByColumn(column) {
      this.$emit("onSort", column);
    },
  },
};
</script>

<style scoped>
.user-table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 75%;
}

.user-table td,
.user-table th {
  border: 1px solid #ddd;
  padding: 20px;
}

.user-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.user-table tr:hover {
  background-color: #ddd;
}

.user-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #1f3baf;
  color: white;
}

.planet-button {
  padding: 10px;
  background-color: #1f3baf;
  color: white;
  border: none;
  width: 100%;
}

th:hover {
  cursor: pointer;
}
</style>
