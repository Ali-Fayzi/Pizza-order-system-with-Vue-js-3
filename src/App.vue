

<template>
  <router-view />
</template>
<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style>
:root {
  --primary-color: #006994;
  --background-color: #333;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
body {
  overflow-x: hidden;
  color: white;
  min-height: 100vh;
  background: var(--background-color);
}
</style>