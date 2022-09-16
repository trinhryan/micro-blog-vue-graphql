<template>
  <div id="app">
    <div id="nav" class="text-center grid grid-flow-col gap-5 justify-center font-semibold p-5">
      <router-link to="/">Home</router-link>|
      <router-link to="/addpost">New Post</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "app"
};
</script>
<style lang="scss"></style>
