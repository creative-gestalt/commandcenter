<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-title>Deploy Project</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="projectName"
              placeholder="Project Name"
              outlined
              dense
            ></v-text-field>
            <v-btn @click="deployProject" width="100%"> deploy </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-title>Run Command</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="command"
              placeholder="Command"
              outlined
              dense
            ></v-text-field>
            <v-btn @click="runCommand" width="100%"> run </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Service } from "@/interfaces/service.interface";

export default Vue.extend({
  name: "CommandCenter",
  data: () => ({
    newService: {} as Service,
    serviceName: "",
    projectName: "",
    command: "",
    loading: false,
    plexLoading: false,
    createServiceLoading: false,
    removeServiceLoading: false,
  }),
  methods: {
    async deployProject(): Promise<void> {
      this.loading = true;
      await this.$store.dispatch("deployProject", {
        projectName: this.projectName,
      });
      this.loading = false;
    },
    async runCommand(): Promise<void> {
      await this.$store.dispatch("runCommand", this.command);
    },
  },
  computed: {
    progress(): string {
      return this.$store.getters.progress;
    },
  },
});
</script>
