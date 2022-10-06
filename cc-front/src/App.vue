<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Command Center</div>
      <v-spacer></v-spacer>
      <div class="mr-5">{{ $store.getters.progress }}</div>
      <v-progress-circular
        v-if="
          $store.getters.progress.length > 0 &&
          !$store.getters.progress.includes('Error:')
        "
        indeterminate
      ></v-progress-circular>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { io } from "socket.io-client";

export default Vue.extend({
  name: "App",
  created(): void {
    // const socket = io("ws://192.168.1.189:3002");
    const socket = io("ws://192.168.1.250:3002");
    socket.on("progress", (data: any) => {
      setTimeout(() => this.$store.commit("SET_PROGRESS", data), 1000);
    });
  },
});
</script>
<style lang="scss">
$scrollbar-bg-color: #171717;
$scrollbar-thumb-color: #898989;

html {
  background-color: black;
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 10px;
  background-color: $scrollbar-bg-color;
}
::-webkit-scrollbar-thumb {
  border-radius: 50px;
  background-color: $scrollbar-thumb-color;
}
</style>
