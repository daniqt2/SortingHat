<script setup lang="ts">
import { ref } from "vue";
import Chat from "./components/Chat.vue";
import NavBar from "./components/NavBar.vue";

const start = ref(false);
const finished = ref(false);
</script>

<template>
  <div class="chat-bod" :class="{ wand: !start }">
    <NavBar />
    <h1 class="font-bold text-2xl text-">✨ Welcome to the Sorting Hat! ✨</h1>

    <button
      v-if="!start"
      @click="start = !start"
      class="p-4 px-10 rounded-full mt-10 bg-slate-300 text-zinc-900 hover:font-bold hover:text-hufflepuff hover:bg-griffindor"
    >
      {{ finished ? "start again" : "S T A R T " }}
    </button>

    <v-expand-transition>
      <div class="flex h-full p-4 lg:px-10" v-if="start">
        <Chat @finish="start = false" />
      </div>
    </v-expand-transition>
  </div>
</template>

<style scoped></style>
