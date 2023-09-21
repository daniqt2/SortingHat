<script setup lang="ts">
import { ref } from "vue";
import { IMessage } from "../models/messages.interface";
const { message } = defineProps<{ message: IMessage }>();

const showMessafe = ref(true);
</script>

<template>
  <!-- <v-slide-x-transition v-bind="message.message"> -->
  <div
    :class="{ 'd-flex flex-row-reverse': message.isUser }"
    v-show="showMessafe"
  >
    <div
      class="shadow-lg p-5 mb-4 rounded-t-lg border border-1"
      :class="{
        out: message.isUser,
        incoming: !message.isUser,
      }"
    >
      {{ message.message }}
    </div>
  </div>
  <!-- </v-slide-x-transition> -->
</template>

<style>
.incoming {
  @apply rounded-r-lg text-cyan-900  font-light max-w-xl text-left bg-white;
}

.out {
  @apply rounded-l-lg  text-right font-semibold bg-slate-900 bg-opacity-75 shadow-sm shadow-white border-white;
}
</style>
