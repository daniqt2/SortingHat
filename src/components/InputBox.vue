<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (event: "send", name: string): void;
}>();

const name = ref();
</script>

<template>
  <div class="bg-white md:w-2/5 border border-t-sky-950 rounded-lg d-flex">
    <!-- <v-text-field label="Label" variant="solo-filled"></v-text-field> -->
    <input
      placeholder="type your answer here"
      class="p-2 py-4 w-full text-right focus:outline-none"
      v-model="name"
      @keyup.enter="emit('send', name)"
    />
    <button
      class="px-4 pl-6 rounded-r-lg text-lg hover:bg-slate-900"
      @click="emit('send', name)"
    >
      ✉️
    </button>
  </div>
</template>
