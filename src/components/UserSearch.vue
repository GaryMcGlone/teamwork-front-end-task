<template>
  <div class="search-container">
    <label for="userSearch" class="label"> Search </label>
    <div class="input-group">
      <input
        class="search"
        name="userSearch"
        type="text"
        placeholder="Enter Search"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSearch",
  methods: {
    // Emit search value to parent to filter user list array
    onInput(event) {
      this.$emit("onSearch", event.target.value);
    },
  },
};
</script>

<style scoped>
.search {
  width: 100%;
  margin-bottom: 25px;
}
input {
  flex: 1;
  color: grey;
  font-size: 16px;
  padding: 7.5px;
}
.input-group {
  display: flex;
  flex-direction: row;
}
.label {
  font-size: 18px;
  font-weight: bold;
}
.search-button {
  height: 32.5px;
  width: 150px;
  background-color: #04aa6d;
  color: white;
  padding: 0;
  font-size: 18px;
  border: none;
}
.search-container {
  width: 850px;
}
</style>
