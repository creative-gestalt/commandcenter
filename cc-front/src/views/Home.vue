<template>
  <command-center />
</template>

<script lang="ts">
import Vue from "vue";
import CommandCenter from "../components/CommandCenter.vue";

export default Vue.extend({
  name: "Home",

  components: {
    CommandCenter,
  },
});
</script>
