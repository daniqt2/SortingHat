<script setup lang="ts">
import { ref, onMounted } from "vue";
const { text } = defineProps<{ text: string }>();

const showMessafe = ref(false);
onMounted(() => setTimeout(() => (showMessafe.value = true)));
</script>

<template>
  <v-slide-y-transition>
    <div
      v-show="showMessafe"
      class="shadow-sm shadow-white inline-block p-4 px-5 float-left m-2 hover:font-bold hover:cursor-pointer hover:shadow-sm hover:bg-gray-300 rounded-lg hover:bg-opacity-20"
    >
      {{ text }}
    </div>
  </v-slide-y-transition>
</template>
